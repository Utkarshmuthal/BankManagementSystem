package com.bank.service;

public interface PasswordResetService {

    String forgotPassword(String email);

    String verifyOtp(String email, String otp);

    String resetPassword(String email, String newPassword);
}