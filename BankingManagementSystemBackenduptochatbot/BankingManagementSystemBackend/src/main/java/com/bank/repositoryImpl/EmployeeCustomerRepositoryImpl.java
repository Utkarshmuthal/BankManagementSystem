package com.bank.repositoryImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.bank.dto.response.EmployeeCustomerDetailsResponse;
import com.bank.dto.response.EmployeeCustomerInfoResponse;
import com.bank.repository.EmployeeCustomerRepository;

@Repository
public class EmployeeCustomerRepositoryImpl
        implements EmployeeCustomerRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    // =====================================================
    // GET ONLY APPROVED CUSTOMERS
    // PAGINATION
    // =====================================================

    @Override
    public List<EmployeeCustomerInfoResponse> getApprovedCustomers(
            int page,
            int size) {

        int offset = page * size;

        String sql = """
                SELECT
                    cp.customer_id,
                    cp.full_name,
                    cp.mobile_number,
                    cp.email,

                    a.account_number,
                    a.account_type,
                    a.balance,
                    a.status

                FROM customer_profiles cp

                INNER JOIN accounts a
                    ON cp.customer_id = a.customer_id

                WHERE cp.approval_status = 'APPROVED'

                ORDER BY cp.customer_id DESC

                LIMIT ? OFFSET ?
                """;

        return jdbcTemplate.query(
                sql,
                new Object[]{
                        size,
                        offset
                },

                (rs, rowNum) -> {

                    EmployeeCustomerInfoResponse customer =
                            new EmployeeCustomerInfoResponse();

                    customer.setCustomerId(
                            rs.getLong("customer_id")
                    );

                    customer.setFullName(
                            rs.getString("full_name")
                    );

                    customer.setMobile(
                            rs.getString("mobile_number")
                    );

                    customer.setEmail(
                            rs.getString("email")
                    );

                    customer.setAccountNumber(
                            rs.getString("account_number")
                    );

                    customer.setAccountType(
                            rs.getString("account_type")
                    );

                    customer.setBalance(
                            rs.getBigDecimal("balance")
                    );

                    customer.setStatus(
                            rs.getString("status")
                    );

                    return customer;
                }
        );
    }


    // =====================================================
    // APPROVED CUSTOMER COUNT
    // =====================================================

    @Override
    public int getApprovedCustomerCount() {

        String sql = """
                SELECT COUNT(*)
                FROM customer_profiles
                WHERE approval_status = 'APPROVED'
                """;

        return jdbcTemplate.queryForObject(
                sql,
                Integer.class
        );
    }


    // =====================================================
    // CUSTOMER DETAILS
    // =====================================================

    @Override
    public EmployeeCustomerDetailsResponse getCustomerDetails(
            Long customerId) {

        String sql = """
                SELECT

                    cp.customer_id,
                    cp.user_id,

                    cp.full_name,
                    cp.dob,
                    cp.gender,
                    cp.mobile_number,
                    cp.email,

                    cp.address,
                    cp.city,
                    cp.state,
                    cp.pin_code,

                    cp.aadhaar_number,
                    cp.pan_number,

                    cp.aadhaar_image,
                    cp.pan_image,

                    cp.approval_status,

                    a.account_number,
                    a.account_type,
                    a.balance,
                    a.status

                FROM customer_profiles cp

                LEFT JOIN accounts a
                    ON cp.customer_id = a.customer_id

                WHERE cp.customer_id = ?
                  AND cp.approval_status = 'APPROVED'
                """;

        return jdbcTemplate.queryForObject(
                sql,
                new Object[]{customerId},

                (rs, rowNum) -> {

                    EmployeeCustomerDetailsResponse c =
                            new EmployeeCustomerDetailsResponse();


                    // =================================================
                    // CUSTOMER INFORMATION
                    // =================================================

                    c.setCustomerId(
                            rs.getLong("customer_id")
                    );

                    c.setUserId(
                            rs.getLong("user_id")
                    );

                    c.setFullName(
                            rs.getString("full_name")
                    );

                    if (rs.getDate("dob") != null) {

                        c.setDob(
                                rs.getDate("dob").toLocalDate()
                        );
                    }

                    c.setGender(
                            rs.getString("gender")
                    );

                    c.setMobile(
                            rs.getString("mobile_number")
                    );

                    c.setEmail(
                            rs.getString("email")
                    );

                    c.setAddress(
                            rs.getString("address")
                    );

                    c.setCity(
                            rs.getString("city")
                    );

                    c.setState(
                            rs.getString("state")
                    );

                    c.setPinCode(
                            rs.getString("pin_code")
                    );


                    // =================================================
                    // KYC
                    // =================================================

                    c.setAadhaarNo(
                            rs.getString("aadhaar_number")
                    );

                    c.setPanNo(
                            rs.getString("pan_number")
                    );

                    c.setAadhaarImage(
                            rs.getString("aadhaar_image")
                    );

                    c.setPanImage(
                            rs.getString("pan_image")
                    );


                    // =================================================
                    // APPROVAL
                    // =================================================

                    c.setApprovalStatus(
                            rs.getString("approval_status")
                    );


                    // =================================================
                    // ACCOUNT
                    // =================================================

                    c.setAccountNumber(
                            rs.getString("account_number")
                    );

                    c.setAccountType(
                            rs.getString("account_type")
                    );

                    c.setBalance(
                            rs.getBigDecimal("balance")
                    );

                    c.setAccountStatus(
                            rs.getString("status")
                    );


                    return c;
                }
        );
    }


    // =====================================================
    // TOGGLE ACCOUNT STATUS
    //
    // ACTIVE    -> INACTIVE
    // INACTIVE  -> ACTIVE
    // =====================================================

    @Override
    public String toggleAccountStatus(Long customerId) {

        // =====================================================
        // 1. Check account exists
        // =====================================================

        String checkSql = """
                SELECT COUNT(*)
                FROM accounts
                WHERE customer_id = ?
                """;

        Integer count = jdbcTemplate.queryForObject(
                checkSql,
                Integer.class,
                customerId
        );

        if (count == null || count == 0) {
            return "ACCOUNT_NOT_FOUND";
        }


        // =====================================================
        // 2. Toggle ACTIVE <-> INACTIVE
        // =====================================================

        String updateSql = """
                UPDATE accounts
                SET status =
                    CASE
                        WHEN UPPER(status) = 'ACTIVE'
                        THEN 'INACTIVE'
                        ELSE 'ACTIVE'
                    END
                WHERE customer_id = ?
                """;

        int updated = jdbcTemplate.update(
                updateSql,
                customerId
        );


        if (updated == 0) {
            return "UPDATE_FAILED";
        }


        // =====================================================
        // 3. Get NEW status immediately
        // =====================================================

        String selectSql = """
                SELECT status
                FROM accounts
                WHERE customer_id = ?
                """;

        return jdbcTemplate.queryForObject(
                selectSql,
                String.class,
                customerId
        );
    }}