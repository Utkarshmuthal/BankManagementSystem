package com.bank.controller;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bank.dto.response.CustomerTransactionHistoryResponse;
import com.bank.service.CustomerTransactionHistoryService;

@RestController
@RequestMapping("/api/customer/transactions")
public class CustomerTransactionHistoryController {

    private final CustomerTransactionHistoryService service;

    public CustomerTransactionHistoryController(
            CustomerTransactionHistoryService service) {

        this.service = service;
    }

    // Get transaction history
    @GetMapping("/history")
    public ResponseEntity<Map<String, Object>> getTransactionHistory(

            @RequestParam String accountNumber,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate fromDate,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate toDate,

            @RequestParam(required = false)
            String transactionType,

            @RequestParam(required = false)
            String search,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "8")
            int size) {

        List<CustomerTransactionHistoryResponse> transactions =
                service.getTransactions(
                        accountNumber,
                        fromDate,
                        toDate,
                        transactionType,
                        search,
                        page,
                        size
                );

        int totalTransactions =
                service.getTransactionCount(
                        accountNumber,
                        fromDate,
                        toDate,
                        transactionType,
                        search
                );

        Map<String, Object> response = new HashMap<>();

        response.put("transactions", transactions);
        response.put("totalTransactions", totalTransactions);
        response.put("page", page);
        response.put("size", size);
        response.put(
                "totalPages",
                (int) Math.ceil((double) totalTransactions / size)
        );

        return ResponseEntity.ok(response);
    }


    // Get transaction summary
    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getTransactionSummary(

            @RequestParam String accountNumber,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate fromDate,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate toDate) {

        BigDecimal currentBalance =
                service.getCurrentBalance(accountNumber);

        BigDecimal totalDeposits =
                service.getTotalDeposits(
                        accountNumber,
                        fromDate,
                        toDate
                );

        BigDecimal totalWithdrawals =
                service.getTotalWithdrawals(
                        accountNumber,
                        fromDate,
                        toDate
                );

        int totalTransactions =
                service.getTransactionCount(
                        accountNumber,
                        fromDate,
                        toDate,
                        null,
                        null
                );

        Map<String, Object> response = new HashMap<>();

        response.put("currentBalance", currentBalance);
        response.put("totalDeposits", totalDeposits);
        response.put("totalWithdrawals", totalWithdrawals);
        response.put("totalTransactions", totalTransactions);

        return ResponseEntity.ok(response);
    }
}