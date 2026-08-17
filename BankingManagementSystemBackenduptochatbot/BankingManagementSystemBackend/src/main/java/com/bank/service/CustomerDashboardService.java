package com.bank.service;

import org.springframework.web.multipart.MultipartFile;

import com.bank.dto.request.UpdateCustomerProfileRequest;
import com.bank.dto.response.CustomerDashboardResponse;
import com.bank.dto.response.CustomerProfileResponse;
import com.bank.dto.response.MyAccountResponse;

public interface CustomerDashboardService {

    CustomerDashboardResponse getDashboard(Long customerId);
    MyAccountResponse getMyAccount(Long customerId);
    CustomerProfileResponse getProfile(Long customerId);
    boolean updateProfile(
            Long customerId,
            UpdateCustomerProfileRequest request
    );
    String uploadProfilePhoto(
            Long customerId,
            MultipartFile file
    );

}