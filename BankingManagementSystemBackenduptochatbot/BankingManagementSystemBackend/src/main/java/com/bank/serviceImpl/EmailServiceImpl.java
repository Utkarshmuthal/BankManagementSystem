package com.bank.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.bank.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendOtpEmail(String toEmail, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);

        message.setSubject("Banking Management System - Password Reset OTP");

        message.setText(
            "Dear Customer,\n\n" +
            "Your OTP for resetting your Banking Management System password is:\n\n" +
            otp + "\n\n" +
            "This OTP is valid for 5 minutes.\n\n" +
            "If you did not request a password reset, please ignore this email.\n\n" +
            "Regards,\n" +
            "Banking Management System"
        );

        mailSender.send(message);
    }
}