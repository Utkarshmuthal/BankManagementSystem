package com.bank.repository;

public interface PasswordResetOtpRepository {

    void saveOtp(String email, String otp);

    boolean verifyOtp(String email, String otp);

    boolean isOtpVerified(String email);

    void deleteOtp(String email);
}