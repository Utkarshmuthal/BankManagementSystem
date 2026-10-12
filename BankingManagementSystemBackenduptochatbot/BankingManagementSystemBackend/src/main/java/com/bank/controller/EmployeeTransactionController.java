package com.bank.controller;

import java.util.List;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bank.dto.ApiResponse;
import com.bank.dto.request.EmployeeTransactionRequest;
import com.bank.dto.response.EmployeeTransactionResponse;
import com.bank.service.EmployeeTransactionService;

@RestController
@RequestMapping("/api/employee/transactions")
//@RequestMapping("/employee/transactions")
public class EmployeeTransactionController {

    private final EmployeeTransactionService service;

    public EmployeeTransactionController(
            EmployeeTransactionService service) {

        this.service = service;
    }

    // =========================================================
    // DEPOSIT
    // =========================================================

    @PostMapping("/deposit")
    public ResponseEntity<ApiResponse<EmployeeTransactionResponse>>
    deposit(
            @RequestBody EmployeeTransactionRequest request) {

        EmployeeTransactionResponse response =
                service.deposit(request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        200,
                        "Amount deposited successfully",
                        response
                )
        );
    }

    // =========================================================
    // WITHDRAW
    // =========================================================

    @PostMapping("/withdraw")
    public ResponseEntity<ApiResponse<EmployeeTransactionResponse>>
    withdraw(
            @RequestBody EmployeeTransactionRequest request) {

        EmployeeTransactionResponse response =
                service.withdraw(request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        200,
                        "Amount withdrawn successfully",
                        response
                )
        );
    }

    // =========================================================
    // TRANSFER
    // =========================================================

    @PostMapping("/transfer")
    public ResponseEntity<ApiResponse<EmployeeTransactionResponse>>
    transfer(
            @RequestBody EmployeeTransactionRequest request) {

        EmployeeTransactionResponse response =
                service.transfer(request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        200,
                        "Amount transferred successfully",
                        response
                )
        );
    }

    // =========================================================
    // ACCOUNT DETAILS
    // =========================================================

    @GetMapping("/account/{accountNumber}")
    public ResponseEntity<ApiResponse<EmployeeTransactionResponse>>
    getAccountDetails(
            @PathVariable String accountNumber) {

        EmployeeTransactionResponse response =
                service.getAccountDetails(accountNumber);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        200,
                        "Account details fetched successfully",
                        response
                )
        );
    }

    // =========================================================
    // ALL TRANSACTION HISTORY - PAGINATION
    // =========================================================

    @GetMapping("/history")
    public ResponseEntity<ApiResponse<List<EmployeeTransactionResponse>>>
    getAllTransactions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size) {

        List<EmployeeTransactionResponse> response =
                service.getAllTransactions(page, size);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        200,
                        "All transactions fetched successfully",
                        response
                )
        );
    }

    // =========================================================
    // PARTICULAR CUSTOMER TRANSACTION HISTORY - PAGINATION
    // =========================================================

    @GetMapping("/history/{accountNumber}")
    public ResponseEntity<ApiResponse<List<EmployeeTransactionResponse>>>
    getTransactionsByAccount(
            @PathVariable String accountNumber,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size) {

        List<EmployeeTransactionResponse> response =
                service.getTransactionsByAccount(
                        accountNumber,
                        page,
                        size
                );

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        200,
                        "Customer transaction history fetched successfully",
                        response
                )
        );
    }
}