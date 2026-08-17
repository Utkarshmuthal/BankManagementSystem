package com.bank.repository;

import com.bank.dto.request.UpdateCustomerProfileRequest;
import com.bank.dto.response.CustomerDashboardResponse;

import com.bank.dto.response.MyAccountResponse;
import com.bank.entity.CustomerProfile;

public interface CustomerDashboardRepository {

    CustomerDashboardResponse getDashboard(Long customerId);
    MyAccountResponse getMyAccount(Long customerId);
    CustomerProfile getProfile(Long customerId);
    int updateProfile(
            Long customerId,
            UpdateCustomerProfileRequest request
    );
    int updateProfileImage(
            Long customerId,
            String imagePath
    );

}