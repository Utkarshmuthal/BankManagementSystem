package com.bank.repositoryImpl;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.bank.repository.PasswordResetOtpRepository;

@Repository
public class PasswordResetOtpRepositoryImpl
        implements PasswordResetOtpRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void saveOtp(String email, String otp) {

        // Remove previous OTP for this email
        String deleteSql = """
                DELETE FROM password_reset_otp
                WHERE email = ?
                """;

        jdbcTemplate.update(deleteSql, email);

        // OTP valid for 5 minutes
        LocalDateTime expiresAt =
                LocalDateTime.now().plusMinutes(5);

        String insertSql = """
                INSERT INTO password_reset_otp
                (email, otp, expires_at, verified, created_at)
                VALUES (?, ?, ?, false, CURRENT_TIMESTAMP)
                """;

        jdbcTemplate.update(
                insertSql,
                email,
                otp,
                expiresAt
        );
    }

    @Override
    public boolean verifyOtp(String email, String otp) {

        String sql = """
                SELECT COUNT(*)
                FROM password_reset_otp
                WHERE email = ?
                AND otp = ?
                AND expires_at > CURRENT_TIMESTAMP
                AND verified = false
                """;

        Integer count = jdbcTemplate.queryForObject(
                sql,
                Integer.class,
                email,
                otp
        );

        if (count != null && count > 0) {

            String updateSql = """
                    UPDATE password_reset_otp
                    SET verified = true
                    WHERE email = ?
                    AND otp = ?
                    """;

            jdbcTemplate.update(
                    updateSql,
                    email,
                    otp
            );

            return true;
        }

        return false;
    }

    @Override
    public boolean isOtpVerified(String email) {

        String sql = """
                SELECT COUNT(*)
                FROM password_reset_otp
                WHERE email = ?
                AND verified = true
                AND expires_at > CURRENT_TIMESTAMP
                """;

        Integer count = jdbcTemplate.queryForObject(
                sql,
                Integer.class,
                email
        );

        return count != null && count > 0;
    }

    @Override
    public void deleteOtp(String email) {

        String sql = """
                DELETE FROM password_reset_otp
                WHERE email = ?
                """;

        jdbcTemplate.update(sql, email);
    }
}