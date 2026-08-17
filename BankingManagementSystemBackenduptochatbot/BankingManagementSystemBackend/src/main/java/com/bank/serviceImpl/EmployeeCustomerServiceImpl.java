package com.bank.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.dto.response.EmployeeCustomerDetailsResponse;
import com.bank.dto.response.EmployeeCustomerInfoResponse;
import com.bank.repository.EmployeeCustomerRepository;
import com.bank.service.EmployeeCustomerService;

@Service
public class EmployeeCustomerServiceImpl
        implements EmployeeCustomerService {

    @Autowired
    private EmployeeCustomerRepository employeeCustomerRepository;


    // =====================================================
    // GET APPROVED CUSTOMERS
    // =====================================================

    @Override
    public List<EmployeeCustomerInfoResponse> getApprovedCustomers(
            int page,
            int size) {

        return employeeCustomerRepository
                .getApprovedCustomers(
                        page,
                        size
                );
    }


    // =====================================================
    // GET APPROVED CUSTOMER COUNT
    // =====================================================

    @Override
    public int getApprovedCustomerCount() {

        return employeeCustomerRepository
                .getApprovedCustomerCount();
    }


    // =====================================================
    // GET CUSTOMER DETAILS
    // =====================================================

    @Override
    public EmployeeCustomerDetailsResponse getCustomerDetails(
            Long customerId) {

        return employeeCustomerRepository
                .getCustomerDetails(
                        customerId
                );
    }


    // =====================================================
    // TOGGLE ACCOUNT STATUS
    // ACTIVE <-> INACTIVE
    // =====================================================

    @Override
    public String toggleAccountStatus(
            Long customerId) {

        String result =
                employeeCustomerRepository
                        .toggleAccountStatus(
                                customerId
                        );


        if ("ACCOUNT_NOT_FOUND".equals(result)) {

            return "Account not found for this customer.";
        }


        if ("UPDATE_FAILED".equals(result)) {

            return "Unable to update account status.";
        }


        if ("ACTIVE".equals(result)) {

            return "Customer account activated successfully.";
        }


        if ("INACTIVE".equals(result)) {

            return "Customer account deactivated successfully.";
        }


        return "Account status updated successfully.";
    }
}