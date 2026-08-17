package com.bank.repository;

import java.util.List;

import com.bank.dto.response.CustomerDetailsResponse;
import com.bank.dto.response.CustomerResponse;
import com.bank.entity.CustomerProfile;

public interface CustomerProfileRepository {

    int saveCustomer(CustomerProfile customer);

    List<CustomerResponse> getPendingCustomers();

    List<CustomerResponse> getPendingCustomers(int page,int size);

    // VIEW BUTTON
    CustomerDetailsResponse getCustomerDetailsById(Long customerId);

    int updateApprovalStatus(Long customerId,String status);

    Long getUserIdByCustomerId(Long customerId);

    List<CustomerResponse> getApprovedCustomers();

    List<CustomerResponse> getRejectedCustomers();

    List<CustomerResponse> searchCustomers(
            String keyword,
            String status,
            int page,
            int size);
    int getPendingCount();

    int getApprovedCount();

    int getRejectedCount();

    int getTotalCount();
}