package com.bank.serviceImpl;

import java.security.SecureRandom;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bank.entity.User;
import com.bank.repository.PasswordResetOtpRepository;
import com.bank.repository.UserRepository;
import com.bank.service.EmailService;
import com.bank.service.PasswordResetService;

@Service
public class PasswordResetServiceImpl
        implements PasswordResetService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetOtpRepository otpRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    // =====================================================
    // LOGGER
    // =====================================================

    private static final Logger logger =
            LoggerFactory.getLogger(PasswordResetServiceImpl.class);


    @Override
    public String forgotPassword(String email) {

        logger.info(
                "Password reset requested for email: {}",
                email
        );


        User user = userRepository.findByEmail(email);


        // =====================================================
        // USER NOT FOUND
        // =====================================================

        if (user == null) {

            logger.warn(
                    "Password reset failed - email not registered: {}",
                    email
            );

            return "Email not registered";
        }


        // =====================================================
        // INACTIVE USER
        // =====================================================

        if ("INACTIVE".equals(user.getStatus())) {

            logger.warn(
                    "Password reset blocked - inactive userId: {}",
                    user.getId()
            );

            return "User account is inactive";
        }


        // Generate 6 digit OTP
        SecureRandom random = new SecureRandom();

        String otp = String.format(
                "%06d",
                random.nextInt(1000000)
        );


        // Save OTP
        otpRepository.saveOtp(email, otp);


        // Send email
        emailService.sendOtpEmail(email, otp);


        logger.info(
                "Password reset OTP generated and email sent for userId: {}",
                user.getId()
        );


        return "OTP sent successfully";
    }


    @Override
    public String verifyOtp(String email, String otp) {

        logger.info(
                "OTP verification attempt for email: {}",
                email
        );


        boolean verified =
                otpRepository.verifyOtp(email, otp);


        if (!verified) {

            logger.warn(
                    "OTP verification failed - invalid or expired OTP for email: {}",
                    email
            );

            return "Invalid or expired OTP";
        }


        logger.info(
                "OTP verification successful for email: {}",
                email
        );


        return "OTP verified successfully";
    }


    @Override
    public String resetPassword(
            String email,
            String newPassword) {


        logger.info(
                "Password reset attempt for email: {}",
                email
        );


        User user = userRepository.findByEmail(email);


        // =====================================================
        // USER NOT FOUND
        // =====================================================

        if (user == null) {

            logger.warn(
                    "Password reset failed - user not found: {}",
                    email
            );

            return "User not found";
        }


        boolean verified =
                otpRepository.isOtpVerified(email);


        // =====================================================
        // OTP NOT VERIFIED
        // =====================================================

        if (!verified) {

            logger.warn(
                    "Password reset blocked - OTP not verified for userId: {}",
                    user.getId()
            );

            return "Please verify OTP first";
        }


        // =====================================================
        // EMPTY PASSWORD
        // =====================================================

        if (newPassword == null ||
            newPassword.trim().isEmpty()) {

            logger.warn(
                    "Password reset failed - empty password for userId: {}",
                    user.getId()
            );

            return "Password cannot be empty";
        }


        // =====================================================
        // PASSWORD LENGTH VALIDATION
        // =====================================================

        if (newPassword.length() < 6) {

            logger.warn(
                    "Password reset failed - password too short for userId: {}",
                    user.getId()
            );

            return "Password must contain at least 6 characters";
        }


        // Hash password using BCrypt
        String encodedPassword =
                passwordEncoder.encode(newPassword);


        userRepository.updatePassword(
                user.getId(),
                encodedPassword
        );


        // OTP can no longer be reused
        otpRepository.deleteOtp(email);


        logger.info(
                "Password reset successful for userId: {}",
                user.getId()
        );


        return "Password reset successfully";
    }
}