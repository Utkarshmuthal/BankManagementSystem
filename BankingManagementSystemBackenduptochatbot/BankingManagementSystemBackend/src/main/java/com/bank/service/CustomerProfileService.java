package com.bank.service;

import java.util.List;

import com.bank.dto.ApiResponse;
import com.bank.dto.request.CustomerRegistrationRequest;
import com.bank.dto.response.CustomerDetailsResponse;
import com.bank.dto.response.CustomerResponse;
import com.bank.dto.response.EmployeeCustomerResponse;

public interface CustomerProfileService {

    // =========================================================
    // CUSTOMER REGISTRATION
    // =========================================================

    ApiResponse<String> registerCustomer(CustomerRegistrationRequest request);


    // =========================================================
    // PENDING CUSTOMERS
    // =========================================================

    ApiResponse<List<CustomerResponse>> getPendingCustomers();


    // =========================================================
    // PENDING CUSTOMERS WITH PAGINATION
    // =========================================================

    ApiResponse<List<CustomerResponse>> getPendingCustomers(int page, int size);


    // =========================================================
    // CUSTOMER DETAILS
    // =========================================================

    ApiResponse<CustomerDetailsResponse> getCustomerDetailsById(Long customerId);


    // =========================================================
    // APPROVE CUSTOMER
    // =========================================================

    ApiResponse<String> approveCustomer(Long customerId);


    // =========================================================
    // REJECT CUSTOMER
    // =========================================================

    ApiResponse<String> rejectCustomer(Long customerId);


    // =========================================================
    // APPROVED CUSTOMERS
    // =========================================================

    ApiResponse<List<CustomerResponse>> getApprovedCustomers();


    // =========================================================
    // REJECTED CUSTOMERS
    // =========================================================

    ApiResponse<List<CustomerResponse>> getRejectedCustomers();


    // =========================================================
    // SEARCH CUSTOMERS
    // =========================================================

    ApiResponse<List<CustomerResponse>> searchCustomers(
            String keyword,
            String status,
            int page,
            int size);


    // =========================================================
    // DASHBOARD
    // =========================================================

    ApiResponse<EmployeeCustomerResponse> getDashboardData();

}