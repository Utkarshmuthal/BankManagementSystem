package com.bank.controller;

import com.bank.dto.response.AdminCustomerResponse;

import com.bank.dto.ApiResponse;
import com.bank.service.AdminCustomerService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/customers")
//@RequestMapping("/admin/customers")
public class AdminCustomerController {

    private final AdminCustomerService adminCustomerService;

    public AdminCustomerController(
            AdminCustomerService adminCustomerService) {

        this.adminCustomerService = adminCustomerService;
    }

    // =========================================================
    // GET ALL CUSTOMERS
    // GET /api/admin/customers
    // =========================================================

    @GetMapping
    public ResponseEntity<ApiResponse<List<AdminCustomerResponse>>> getAllCustomers() {

        List<AdminCustomerResponse> customers =
                adminCustomerService.getAllCustomers();

        ApiResponse<List<AdminCustomerResponse>> response =
                new ApiResponse<>(
                        true,
                        HttpStatus.OK.value(),
                        "Customers retrieved successfully",
                        customers
                );

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // GET CUSTOMER BY ID
    // GET /api/admin/customers/{id}
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AdminCustomerResponse>> getCustomerById(
            @PathVariable("id") Long customerId) {

        AdminCustomerResponse customer =
                adminCustomerService.getCustomerById(customerId);

        ApiResponse<AdminCustomerResponse> response =
                new ApiResponse<>(
                        true,
                        HttpStatus.OK.value(),
                        "Customer retrieved successfully",
                        customer
                );

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // DELETE CUSTOMER
    // DELETE /api/admin/customers/{id}
    // =========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCustomer(
            @PathVariable("id") Long customerId) {

        adminCustomerService.deleteCustomerById(customerId);

        ApiResponse<Void> response =
                new ApiResponse<>(
                        true,
                        HttpStatus.OK.value(),
                        "Customer deleted successfully",
                        null
                );

        return ResponseEntity.ok(response);
    }
}