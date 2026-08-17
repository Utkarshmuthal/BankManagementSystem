package com.bank.service;

import java.util.List;

import com.bank.dto.ApiResponse;
import com.bank.dto.request.CustomerRegistrationRequest;
import com.bank.dto.response.CustomerDetailsResponse;
import com.bank.dto.response.CustomerResponse;
import com.bank.dto.response.EmployeeCustomerResponse;

public interface CustomerProfileService {

    // Customer Registration
    ApiResponse<String> registerCustomer(CustomerRegistrationRequest request);

    // Pending Requests
    ApiResponse<List<CustomerResponse>> getPendingCustomers();

    // Pending Requests with Pagination
    ApiResponse<List<CustomerResponse>> getPendingCustomers(int page, int size);

    // View Customer Details

    // Approve Customer
    ApiResponse<String> approveCustomer(Long customerId);

    // Reject Customer
    ApiResponse<String> rejectCustomer(Long customerId);

    // Approved Customers
    ApiResponse<List<CustomerResponse>> getApprovedCustomers();

    // Rejected Customers
    ApiResponse<List<CustomerResponse>> getRejectedCustomers();

    // Search Customers
    ApiResponse<List<CustomerResponse>> searchCustomers(
            String keyword,
            String status,
            int page,
            int size);
    // Dashboard Counts
    ApiResponse<EmployeeCustomerResponse> getDashboardData();

    ApiResponse<CustomerDetailsResponse> getCustomerDetailsById(Long customerId);
}