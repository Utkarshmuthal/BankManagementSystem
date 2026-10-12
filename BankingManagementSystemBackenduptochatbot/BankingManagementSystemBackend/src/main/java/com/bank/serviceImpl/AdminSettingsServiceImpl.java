package com.bank.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bank.dto.request.AdminChangePasswordRequest;
import com.bank.dto.request.AdminProfileUpdateRequest;
import com.bank.entity.User;
import com.bank.repository.UserRepository;
import com.bank.service.AdminSettingsService;

@Service
public class AdminSettingsServiceImpl
        implements AdminSettingsService {


    @Autowired
    private UserRepository userRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;


    // =====================================================
    // UPDATE ADMIN EMAIL
    // =====================================================

    @Override
    public String updateAdminEmail(
            Long userId,
            AdminProfileUpdateRequest request) {


        // Find user
        User admin =
                userRepository.findById(userId);


        // Admin not found
        if (admin == null) {

            return "Admin not found";
        }


        // Check role
        if (!"ADMIN".equalsIgnoreCase(
                admin.getRole())) {

            return "Access denied";
        }


        // Validate email
        if (request.getEmail() == null ||
            request.getEmail().trim().isEmpty()) {

            return "Email cannot be empty";
        }


        String newEmail =
                request.getEmail().trim();


        // Basic email validation
        if (!newEmail.matches(
                "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {

            return "Invalid email format";
        }


        // Check whether email is same
        if (newEmail.equalsIgnoreCase(
                admin.getEmail())) {

            return "Email is already up to date";
        }


        // Check whether another user already
        // has this email
        User existingUser =
                userRepository.findByEmail(newEmail);


        if (existingUser != null &&
            !existingUser.getId().equals(userId)) {

            return "Email is already registered";
        }


        // Update email
        userRepository.updateEmail(
                userId,
                newEmail
        );


        return "Email updated successfully";
    }


    // =====================================================
    // CHANGE ADMIN PASSWORD
    // =====================================================

    @Override
    public String changeAdminPassword(
            Long userId,
            AdminChangePasswordRequest request) {


        // Find admin
        User admin =
                userRepository.findById(userId);


        if (admin == null) {

            return "Admin not found";
        }


        // Check role
        if (!"ADMIN".equalsIgnoreCase(
                admin.getRole())) {

            return "Access denied";
        }


        // Validate fields
        if (request.getCurrentPassword() == null ||
            request.getNewPassword() == null ||
            request.getConfirmPassword() == null) {

            return "All password fields are required";
        }


        // Check current password
        boolean currentPasswordCorrect =
                passwordEncoder.matches(
                        request.getCurrentPassword(),
                        admin.getPassword()
                );


        if (!currentPasswordCorrect) {

            return "Current password is incorrect";
        }


        // Check new and confirm password
        if (!request.getNewPassword().equals(
                request.getConfirmPassword())) {

            return "New password and confirm password do not match";
        }


        // Password length
        if (request.getNewPassword().length() < 6) {

            return "Password must contain at least 6 characters";
        }


        // Don't allow same password
        if (passwordEncoder.matches(
                request.getNewPassword(),
                admin.getPassword())) {

            return "New password must be different from current password";
        }


        // BCrypt new password
        String encodedPassword =
                passwordEncoder.encode(
                        request.getNewPassword()
                );


        // Update database
        userRepository.updatePassword(
                userId,
                encodedPassword
        );


        return "Password changed successfully";
    }
}