package com.bank.serviceImpl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bank.dto.request.LoginRequest;
import com.bank.dto.response.LoginResponse;
import com.bank.entity.User;
import com.bank.repository.UserRepository;
import com.bank.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // =====================================================
    // LOGGER
    // =====================================================

    private static final Logger logger =
            LoggerFactory.getLogger(UserServiceImpl.class);


    @Override
    public LoginResponse login(LoginRequest request) {

        // =====================================================
        // LOGIN ATTEMPT
        // =====================================================

        logger.info(
                "Login attempt for email: {}",
                request.getEmail()
        );


        User user = userRepository.findByEmail(
                request.getEmail()
        );


        // =====================================================
        // USER NOT FOUND
        // =====================================================

        if (user == null) {

            logger.warn(
                    "Login failed - user not found for email: {}",
                    request.getEmail()
            );

            return new LoginResponse(
                    "User not found",
                    null,
                    null
            );
        }


        String enteredPassword = request.getPassword();
        String storedPassword = user.getPassword();

        boolean passwordValid = false;


        // =====================================================
        // CHECK WHETHER PASSWORD IS ALREADY BCrypt HASHED
        // =====================================================

        if (storedPassword != null &&
            storedPassword.startsWith("$2a$")) {

            logger.debug(
                    "BCrypt password detected for userId: {}",
                    user.getId()
            );

            // Existing BCrypt password
            passwordValid = passwordEncoder.matches(
                    enteredPassword,
                    storedPassword
            );

        } else {

            // =================================================
            // LEGACY PLAIN-TEXT PASSWORD MIGRATION
            // =================================================

            logger.debug(
                    "Legacy plain-text password detected for userId: {}",
                    user.getId()
            );


            if (storedPassword != null &&
                storedPassword.equals(enteredPassword)) {

                passwordValid = true;


                // Convert old password to BCrypt
                String encodedPassword =
                        passwordEncoder.encode(enteredPassword);


                // Update database
                userRepository.updatePassword(
                        user.getId(),
                        encodedPassword
                );


                logger.info(
                        "Legacy password migrated to BCrypt for userId: {}",
                        user.getId()
                );
            }
        }


        // =====================================================
        // PASSWORD INVALID
        // =====================================================

        if (!passwordValid) {

            logger.warn(
                    "Login failed - invalid password for userId: {}",
                    user.getId()
            );

            return new LoginResponse(
                    "Invalid Password",
                    null,
                    null
            );
        }


        // =====================================================
        // CHECK USER STATUS
        // =====================================================

        if ("INACTIVE".equals(user.getStatus())) {

            logger.warn(
                    "Login blocked - inactive account. userId: {}",
                    user.getId()
            );

            return new LoginResponse(
                    "User account is inactive",
                    null,
                    null
            );
        }


        // =====================================================
        // GET CUSTOMER ID
        // =====================================================

        Long customerId =
                userRepository.findCustomerIdByUserId(
                        user.getId()
                );


        // =====================================================
        // LOGIN RESPONSE
        // =====================================================

        LoginResponse response = new LoginResponse();

        response.setMessage("Login Successful");
        response.setUserId(user.getId());
        response.setRole(user.getRole());
        response.setCustomerId(customerId);


        // =====================================================
        // LOGIN SUCCESS
        // =====================================================

        logger.info(
                "Login successful - userId: {}, role: {}",
                user.getId(),
                user.getRole()
        );


        return response;
    }
}