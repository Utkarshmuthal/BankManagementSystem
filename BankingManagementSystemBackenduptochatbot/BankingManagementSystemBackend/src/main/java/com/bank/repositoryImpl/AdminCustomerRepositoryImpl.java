package com.bank.repositoryImpl;

import com.bank.dto.response.AdminCustomerResponse;
import com.bank.repository.AdminCustomerRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Repository
public class AdminCustomerRepositoryImpl implements AdminCustomerRepository {

    private final JdbcTemplate jdbcTemplate;

    public AdminCustomerRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<AdminCustomerResponse> findAllCustomers() {

        String sql = """
                SELECT
                    customer_id,
                    user_id,
                    email,
                    full_name,
                    dob,
                    gender,
                    mobile_number,
                    address,
                    city,
                    state,
                    pin_code,
                    aadhaar_number,
                    pan_number,
                    preferred_account_type,
                    approval_status,
                    aadhaar_image,
                    pan_image,
                    applied_at
                FROM customer_profiles
                ORDER BY applied_at DESC
                """;

        return jdbcTemplate.query(sql, customerRowMapper());
    }

    @Override
    public Optional<AdminCustomerResponse> findCustomerById(Long customerId) {

        String sql = """
                SELECT
                    customer_id,
                    user_id,
                    email,
                    full_name,
                    dob,
                    gender,
                    mobile_number,
                    address,
                    city,
                    state,
                    pin_code,
                    aadhaar_number,
                    pan_number,
                    preferred_account_type,
                    approval_status,
                    aadhaar_image,
                    pan_image,
                    applied_at
                FROM customer_profiles
                WHERE customer_id = ?
                """;

        List<AdminCustomerResponse> customers = jdbcTemplate.query(
                sql,
                customerRowMapper(),
                customerId
        );

        return customers.stream().findFirst();
    }

    @Override
    public boolean deleteCustomerById(Long customerId) {

        String sql = """
                DELETE FROM customer_profiles
                WHERE customer_id = ?
                """;

        int rowsAffected = jdbcTemplate.update(sql, customerId);

        return rowsAffected > 0;
    }

    private RowMapper<AdminCustomerResponse> customerRowMapper() {

        return (rs, rowNum) -> {

            AdminCustomerResponse customer = new AdminCustomerResponse();

            customer.setCustomerId(rs.getLong("customer_id"));
            customer.setUserId(rs.getLong("user_id"));
            customer.setEmail(rs.getString("email"));
            customer.setFullName(rs.getString("full_name"));

            Date dob = rs.getDate("dob");
            if (dob != null) {
                customer.setDob(dob.toLocalDate());
            }

            customer.setGender(rs.getString("gender"));
            customer.setMobileNumber(rs.getString("mobile_number"));
            customer.setAddress(rs.getString("address"));
            customer.setCity(rs.getString("city"));
            customer.setState(rs.getString("state"));
            customer.setPinCode(rs.getString("pin_code"));
            customer.setAadhaarNumber(rs.getString("aadhaar_number"));
            customer.setPanNumber(rs.getString("pan_number"));
            customer.setPreferredAccountType(
                    rs.getString("preferred_account_type")
            );
            customer.setApprovalStatus(rs.getString("approval_status"));
            customer.setAadhaarImage(rs.getString("aadhaar_image"));
            customer.setPanImage(rs.getString("pan_image"));

            Timestamp appliedAt = rs.getTimestamp("applied_at");
            if (appliedAt != null) {
                customer.setAppliedAt(appliedAt.toLocalDateTime());
            }

            return customer;
        };
    }
}