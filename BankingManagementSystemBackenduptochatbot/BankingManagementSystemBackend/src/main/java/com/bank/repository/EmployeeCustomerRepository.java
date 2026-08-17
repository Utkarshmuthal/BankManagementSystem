package com.bank.repository;

import java.util.List;

import com.bank.dto.response.EmployeeCustomerDetailsResponse;
import com.bank.dto.response.EmployeeCustomerInfoResponse;

public interface EmployeeCustomerRepository {

    // =====================================================
    // APPROVED CUSTOMERS
    // =====================================================

    List<EmployeeCustomerInfoResponse> getApprovedCustomers(
            int page,
            int size
    );

    // =====================================================
    // APPROVED CUSTOMER COUNT
    // =====================================================

    int getApprovedCustomerCount();

    // =====================================================
    // CUSTOMER DETAILS
    // =====================================================

    EmployeeCustomerDetailsResponse getCustomerDetails(
            Long customerId
    );

    // =====================================================
    // TOGGLE ACCOUNT STATUS
    // ACTIVE <-> INACTIVE
    // =====================================================

    String toggleAccountStatus(
            Long customerId
    );
}