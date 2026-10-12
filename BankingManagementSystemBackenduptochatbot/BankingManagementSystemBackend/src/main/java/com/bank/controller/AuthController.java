package com.bank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bank.dto.ApiResponse;
import com.bank.dto.request.ForgotPasswordRequest;
import com.bank.dto.request.LoginRequest;
import com.bank.dto.request.ResetPasswordRequest;
import com.bank.dto.request.VerifyOtpRequest;
import com.bank.dto.response.LoginResponse;
import com.bank.service.PasswordResetService;
import com.bank.service.UserService;

@RestController
@RequestMapping("/api/auth")
//@RequestMapping("/auth")
@CrossOrigin(
    origins = {"http://localhost:8085"},
    allowCredentials = "true"
)
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordResetService passwordResetService;


    // ============================
    // LOGIN
    // ============================

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request) {

        return userService.login(request);
    }


    // ============================
    // FORGOT PASSWORD
    // ============================

    @PostMapping("/forgot-password")
    public ApiResponse<String> forgotPassword(
            @RequestBody ForgotPasswordRequest request) {

        String message =
                passwordResetService.forgotPassword(
                        request.getEmail()
                );

        boolean success =
                "OTP sent successfully".equals(message);

        return new ApiResponse<>(
                success,
                success ? 200 : 400,
                message,
                null
        );
    }


    // ============================
    // VERIFY OTP
    // ============================

    @PostMapping("/verify-otp")
    public ApiResponse<String> verifyOtp(
            @RequestBody VerifyOtpRequest request) {

        String message =
                passwordResetService.verifyOtp(
                        request.getEmail(),
                        request.getOtp()
                );

        boolean success =
                "OTP verified successfully".equals(message);

        return new ApiResponse<>(
                success,
                success ? 200 : 400,
                message,
                null
        );
    }


    // ============================
    // RESET PASSWORD
    // ============================

    @PostMapping("/reset-password")
    public ApiResponse<String> resetPassword(
            @RequestBody ResetPasswordRequest request) {

        String message =
                passwordResetService.resetPassword(
                        request.getEmail(),
                        request.getNewPassword()
                );

        boolean success =
                "Password reset successfully".equals(message);

        return new ApiResponse<>(
                success,
                success ? 200 : 400,
                message,
                null
        );
    }
}