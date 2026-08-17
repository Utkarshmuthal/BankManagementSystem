package com.bank.repositoryImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.bank.dto.response.CustomerDetailsResponse;
import com.bank.dto.response.CustomerResponse;
import com.bank.entity.CustomerProfile;
import com.bank.repository.CustomerProfileRepository;

@Repository
public class CustomerProfileRepositoryImpl implements CustomerProfileRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public int saveCustomer(CustomerProfile customer) {

        String sql = """
                INSERT INTO customer_profiles(
                    user_id,
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
                    aadhaar_image,
                    pan_image,
                    preferred_account_type,
                    approval_status,
                    email
                )
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
                """;

        return jdbcTemplate.update(
                sql,
                customer.getUserId(),
                customer.getFullName(),
                customer.getDob(),
                customer.getGender(),
                customer.getMobile(),
                customer.getAddress(),
                customer.getCity(),
                customer.getState(),
                customer.getPinCode(),
                customer.getAadhaarNo(),
                customer.getPanNo(),
                customer.getAadhaarImage(),
                customer.getPanImage(),
                customer.getAccountType(),
                customer.getApprovalStatus(),
                customer.getEmail());
    }

    @Override
    public List<CustomerResponse> getPendingCustomers() {

        String sql = """
                SELECT
                    cp.customer_id,
                    cp.full_name,
                    u.email,
                    cp.mobile_number,
                    cp.preferred_account_type,
                    cp.approval_status
                FROM customer_profiles cp
                INNER JOIN users u
                ON cp.user_id=u.id
                WHERE cp.approval_status='PENDING_APPROVAL'
                ORDER BY cp.customer_id DESC
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> {

            CustomerResponse response = new CustomerResponse();

            response.setCustomerId(rs.getLong("customer_id"));
            response.setFullName(rs.getString("full_name"));
            response.setEmail(rs.getString("email"));
            response.setMobile(rs.getString("mobile_number"));
            response.setAccountType(rs.getString("preferred_account_type"));
            response.setApprovalStatus(rs.getString("approval_status"));

            return response;
        });
    }

    @Override
    public List<CustomerResponse> getPendingCustomers(int page, int size) {

        int offset = page * size;

        String sql = """
                SELECT
                    cp.customer_id,
                    cp.full_name,
                    u.email,
                    cp.mobile_number,
                    cp.preferred_account_type,
                    cp.approval_status
                FROM customer_profiles cp
                INNER JOIN users u
                ON cp.user_id=u.id
                WHERE cp.approval_status='PENDING_APPROVAL'
                ORDER BY cp.customer_id DESC
                LIMIT ? OFFSET ?
                """;

        return jdbcTemplate.query(
                sql,
                new Object[]{size, offset},
                (rs, rowNum) -> {

                    CustomerResponse response = new CustomerResponse();

                    response.setCustomerId(rs.getLong("customer_id"));
                    response.setFullName(rs.getString("full_name"));
                    response.setEmail(rs.getString("email"));
                    response.setMobile(rs.getString("mobile_number"));
                    response.setAccountType(rs.getString("preferred_account_type"));
                    response.setApprovalStatus(rs.getString("approval_status"));

                    return response;
                });
    }


    @Override
    public int updateApprovalStatus(Long customerId, String status) {

        String sql = """
                UPDATE customer_profiles
                SET approval_status=?
                WHERE customer_id=?
                """;

        return jdbcTemplate.update(sql, status, customerId);
    }

    @Override
    public Long getUserIdByCustomerId(Long customerId) {

        String sql = """
                SELECT user_id
                FROM customer_profiles
                WHERE customer_id=?
                """;

        return jdbcTemplate.queryForObject(
                sql,
                Long.class,
                customerId);
    }

    @Override
    public List<CustomerResponse> getApprovedCustomers() {

        String sql = """
                SELECT
                    cp.customer_id,
                    cp.full_name,
                    u.email,
                    cp.mobile_number,
                    cp.preferred_account_type,
                    cp.approval_status
                FROM customer_profiles cp
                INNER JOIN users u
                ON cp.user_id=u.id
                WHERE cp.approval_status='APPROVED'
                ORDER BY cp.customer_id DESC
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> {

            CustomerResponse response = new CustomerResponse();

            response.setCustomerId(rs.getLong("customer_id"));
            response.setFullName(rs.getString("full_name"));
            response.setEmail(rs.getString("email"));
            response.setMobile(rs.getString("mobile_number"));
            response.setAccountType(rs.getString("preferred_account_type"));
            response.setApprovalStatus(rs.getString("approval_status"));

            return response;
        });
    }

    @Override
    public List<CustomerResponse> getRejectedCustomers() {

        String sql = """
                SELECT
                    cp.customer_id,
                    cp.full_name,
                    u.email,
                    cp.mobile_number,
                    cp.preferred_account_type,
                    cp.approval_status
                FROM customer_profiles cp
                INNER JOIN users u
                ON cp.user_id=u.id
                WHERE cp.approval_status='REJECTED'
                ORDER BY cp.customer_id DESC
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> {

            CustomerResponse response = new CustomerResponse();

            response.setCustomerId(rs.getLong("customer_id"));
            response.setFullName(rs.getString("full_name"));
            response.setEmail(rs.getString("email"));
            response.setMobile(rs.getString("mobile_number"));
            response.setAccountType(rs.getString("preferred_account_type"));
            response.setApprovalStatus(rs.getString("approval_status"));

            return response;
        });
    }

    @Override
    public List<CustomerResponse> searchCustomers(
            String keyword,
            String status,
            int page,
            int size) {

        int offset = page * size;

        StringBuilder sql = new StringBuilder("""
            SELECT
                cp.customer_id,
                cp.full_name,
                u.email,
                cp.mobile_number,
                cp.preferred_account_type,
                cp.approval_status
            FROM customer_profiles cp
            INNER JOIN users u
            ON cp.user_id = u.id
            WHERE 1=1
            """);

        List<Object> params = new ArrayList<>();


        // ================================
        // SEARCH KEYWORD
        // ================================

        if (keyword != null && !keyword.trim().isEmpty()) {

            sql.append("""
                AND (
                    LOWER(cp.full_name) LIKE ?
                    OR LOWER(u.email) LIKE ?
                    OR cp.mobile_number LIKE ?
                )
                """);

            String search =
                    "%" + keyword.toLowerCase() + "%";

            params.add(search);
            params.add(search);
            params.add("%" + keyword + "%");
        }


        // ================================
        // STATUS FILTER
        // ================================

        if (status != null
                && !status.equalsIgnoreCase("ALL")
                && !status.trim().isEmpty()) {

            sql.append(
                " AND cp.approval_status = ? "
            );

            params.add(status);
        }


        // ================================
        // ORDER
        // ================================

        sql.append("""
            ORDER BY cp.customer_id DESC
            LIMIT ? OFFSET ?
            """);


        params.add(size);
        params.add(offset);


        return jdbcTemplate.query(
                sql.toString(),
                params.toArray(),
                (rs, rowNum) -> {

                    CustomerResponse response =
                            new CustomerResponse();

                    response.setCustomerId(
                            rs.getLong("customer_id")
                    );

                    response.setFullName(
                            rs.getString("full_name")
                    );

                    response.setEmail(
                            rs.getString("email")
                    );

                    response.setMobile(
                            rs.getString("mobile_number")
                    );

                    response.setAccountType(
                            rs.getString(
                                "preferred_account_type"
                            )
                    );

                    response.setApprovalStatus(
                            rs.getString(
                                "approval_status"
                            )
                    );

                    return response;
                });
    }    @Override
    public int getPendingCount() {

        String sql = """
                SELECT COUNT(*)
                FROM customer_profiles
                WHERE approval_status='PENDING_APPROVAL'
                """;

        return jdbcTemplate.queryForObject(sql, Integer.class);
    }

    @Override
    public int getApprovedCount() {

        String sql = """
                SELECT COUNT(*)
                FROM customer_profiles
                WHERE approval_status='APPROVED'
                """;

        return jdbcTemplate.queryForObject(sql, Integer.class);
    }

    @Override
    public int getRejectedCount() {

        String sql = """
                SELECT COUNT(*)
                FROM customer_profiles
                WHERE approval_status='REJECTED'
                """;

        return jdbcTemplate.queryForObject(sql, Integer.class);
    }

    @Override
    public int getTotalCount() {

        String sql = """
                SELECT COUNT(*)
                FROM customer_profiles
                """;

        return jdbcTemplate.queryForObject(sql, Integer.class);
    }
    
    @Override
    public CustomerDetailsResponse getCustomerDetailsById(Long customerId) {

        String sql = """
            SELECT
                cp.customer_id,
                cp.user_id,
                u.email,
                cp.full_name,
                cp.dob,
                cp.gender,
                cp.mobile_number,
                cp.address,
                cp.city,
                cp.state,
                cp.pin_code,
                cp.aadhaar_number,
                cp.pan_number,
                cp.preferred_account_type,
                cp.approval_status,
                cp.aadhaar_image,
                cp.pan_image
            FROM customer_profiles cp
            INNER JOIN users u
            ON cp.user_id=u.id
            WHERE cp.customer_id=?
            """;

        return jdbcTemplate.queryForObject(sql,
                new Object[]{customerId},
                (rs,rowNum)->{

            CustomerDetailsResponse c=new CustomerDetailsResponse();

            c.setCustomerId(rs.getLong("customer_id"));
            c.setUserId(rs.getLong("user_id"));
            c.setEmail(rs.getString("email"));
            c.setFullName(rs.getString("full_name"));
            c.setDob(rs.getDate("dob").toLocalDate());
            c.setGender(rs.getString("gender"));
            c.setMobile(rs.getString("mobile_number"));
            c.setAddress(rs.getString("address"));
            c.setCity(rs.getString("city"));
            c.setState(rs.getString("state"));
            c.setPinCode(rs.getString("pin_code"));
            c.setAadhaarNo(rs.getString("aadhaar_number"));
            c.setPanNo(rs.getString("pan_number"));
            c.setAccountType(rs.getString("preferred_account_type"));
            c.setApprovalStatus(rs.getString("approval_status"));
            c.setAadhaarImage(rs.getString("aadhaar_image"));
            c.setPanImage(rs.getString("pan_image"));

            return c;
        });

    }}