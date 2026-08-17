package com.bank.repositoryImpl;

import com.bank.dto.request.UpdateCustomerProfileRequest;
import com.bank.dto.response.CustomerDashboardResponse;
import com.bank.dto.response.MyAccountResponse;
import com.bank.entity.CustomerProfile;
import com.bank.repository.CustomerDashboardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class CustomerDashboardRepositoryImpl implements CustomerDashboardRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public CustomerDashboardResponse getDashboard(Long customerId) {

        String sql = """
                SELECT
                    cp.customer_id,
                    cp.full_name,
                    cp.approval_status,
                    a.account_number,
                    a.account_type,
                    a.balance,
                    a.status
                FROM customer_profiles cp
                INNER JOIN accounts a
                    ON cp.customer_id = a.customer_id
                WHERE cp.customer_id = ?
                """;

        return jdbcTemplate.queryForObject(sql,
                (rs, rowNum) -> {

                    CustomerDashboardResponse response = new CustomerDashboardResponse();

                    response.setCustomerId(rs.getLong("customer_id"));
                    response.setCustomerName(rs.getString("full_name"));
                    response.setAccountNumber(rs.getString("account_number"));
                    response.setAccountType(rs.getString("account_type"));
                    response.setBalance(rs.getBigDecimal("balance"));
                    response.setAccountStatus(rs.getString("status"));
                    response.setKycStatus(rs.getString("approval_status"));

                    return response;

                }, customerId);
    }

    @Override
    public MyAccountResponse getMyAccount(Long customerId) {

        String sql = """
            SELECT
                cp.customer_id,
                cp.full_name,
                cp.email,
                cp.mobile_number,
                cp.dob,
                cp.gender,
                cp.address,
                cp.city,
                cp.state,
                cp.pin_code,
                cp.aadhaar_number,
                cp.pan_number,
                cp.approval_status,
                a.account_number,
                a.account_type,
                a.balance,
                a.status
            FROM customer_profiles cp
            INNER JOIN accounts a
                ON cp.customer_id = a.customer_id
            WHERE cp.customer_id = ?
            """;

        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {

            MyAccountResponse response = new MyAccountResponse();

            response.setCustomerId(rs.getLong("customer_id"));
            response.setFullName(rs.getString("full_name"));
            response.setEmail(rs.getString("email"));
            response.setMobileNumber(rs.getString("mobile_number"));
            response.setDateOfBirth(rs.getDate("dob").toLocalDate());
            response.setGender(rs.getString("gender"));
            response.setAddress(rs.getString("address"));
            response.setCity(rs.getString("city"));
            response.setState(rs.getString("state"));
            response.setPinCode(rs.getString("pin_code"));

            response.setAadhaarNumber(rs.getString("aadhaar_number"));
            response.setPanNumber(rs.getString("pan_number"));
            response.setKycStatus(rs.getString("approval_status"));

            response.setAccountNumber(rs.getString("account_number"));
            response.setAccountType(rs.getString("account_type"));
            response.setBalance(rs.getBigDecimal("balance"));
            response.setAccountStatus(rs.getString("status"));

            return response;

        }, customerId);
    }

    @Override
    public CustomerProfile getProfile(Long customerId) {

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
                    profile_image
                FROM customer_profiles
                WHERE customer_id = ?
                """;

        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> {

                    CustomerProfile profile = new CustomerProfile();

                    profile.setCustomerId(
                            rs.getLong("customer_id")
                    );

                    profile.setUserId(
                            rs.getLong("user_id")
                    );

                    profile.setEmail(
                            rs.getString("email")
                    );

                    profile.setFullName(
                            rs.getString("full_name")
                    );

                    if (rs.getDate("dob") != null) {
                        profile.setDob(
                                rs.getDate("dob").toLocalDate()
                        );
                    }

                    profile.setGender(
                            rs.getString("gender")
                    );

                    profile.setMobile(
                            rs.getString("mobile_number")
                    );

                    profile.setAddress(
                            rs.getString("address")
                    );

                    profile.setCity(
                            rs.getString("city")
                    );

                    profile.setState(
                            rs.getString("state")
                    );

                    profile.setPinCode(
                            rs.getString("pin_code")
                    );

                    profile.setAadhaarNo(
                            rs.getString("aadhaar_number")
                    );

                    profile.setPanNo(
                            rs.getString("pan_number")
                    );

                    profile.setAccountType(
                            rs.getString("preferred_account_type")
                    );

                    profile.setApprovalStatus(
                            rs.getString("approval_status")
                    );

                    profile.setAadhaarImage(
                            rs.getString("aadhaar_image")
                    );

                    profile.setPanImage(
                            rs.getString("pan_image")
                    );
                    profile.setProfileImage(
                            rs.getString("profile_image")
                    );

                    return profile;
                },
                customerId
        )
        .stream()
        .findFirst()
        .orElse(null);
    }

    @Override
    public int updateProfile(
            Long customerId,
            UpdateCustomerProfileRequest request) {

        String sql = """
                UPDATE customer_profiles
                SET
                    full_name = ?,
                    mobile_number = ?,
                    address = ?,
                    city = ?,
                    state = ?,
                    pin_code = ?
                WHERE customer_id = ?
                """;

        return jdbcTemplate.update(
                sql,
                request.getFullName(),
                request.getMobile(),
                request.getAddress(),
                request.getCity(),
                request.getState(),
                request.getPinCode(),
                customerId
        );
    }

    @Override
    public int updateProfileImage(
            Long customerId,
            String imagePath) {

        String sql = """
                UPDATE customer_profiles
                SET profile_image = ?
                WHERE customer_id = ?
                """;

        return jdbcTemplate.update(
                sql,
                imagePath,
                customerId
        );
    }
}