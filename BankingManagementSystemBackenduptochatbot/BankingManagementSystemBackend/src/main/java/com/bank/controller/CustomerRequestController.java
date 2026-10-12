package com.bank.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bank.dto.ApiResponse;
import com.bank.dto.response.CustomerDetailsResponse;
import com.bank.dto.response.CustomerResponse;
import com.bank.dto.response.EmployeeCustomerResponse;
import com.bank.service.CustomerProfileService;

@RestController
@RequestMapping("/api/employee/requests")
//@RequestMapping("/employee/requests")
public class CustomerRequestController {

    @Autowired
    private CustomerProfileService customerService;

    // Pending customers with pagination
    @GetMapping
    public ApiResponse<List<CustomerResponse>> getPendingCustomers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) {

        return customerService.getPendingCustomers(page, size);
    }

    // Dashboard
    @GetMapping("/dashboard")
    public ApiResponse<EmployeeCustomerResponse> getDashboard() {
        return customerService.getDashboardData();
    }

    // Approved customers
    @GetMapping("/approved")
    public ApiResponse<List<CustomerResponse>> getApprovedCustomers() {
        return customerService.getApprovedCustomers();
    }

    // Rejected customers
    @GetMapping("/rejected")
    public ApiResponse<List<CustomerResponse>> getRejectedCustomers() {
        return customerService.getRejectedCustomers();
    }

    // Search customers
    @GetMapping("/search")
    public ApiResponse<List<CustomerResponse>>searchCustomers(

            @RequestParam(required = false) String keyword,

            @RequestParam(required = false, defaultValue = "ALL") String status,

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "6") int size) {

        return customerService.searchCustomers(
                keyword,
                status,
                page,
                size
        );
    }    // Customer details
    @GetMapping("/{customerId}")
    public ApiResponse<CustomerDetailsResponse> getCustomerDetails(
            @PathVariable Long customerId){

        return customerService.getCustomerDetailsById(customerId);
    }
    // Approve customer
    @PutMapping("/{customerId}/approve")
    public ApiResponse<String> approveCustomer(
            @PathVariable Long customerId) {

        return customerService.approveCustomer(customerId);
    }

    // Reject customer
    @PutMapping("/{customerId}/reject")
    public ApiResponse<String> rejectCustomer(
            @PathVariable Long customerId) {

        return customerService.rejectCustomer(customerId);
    }
}