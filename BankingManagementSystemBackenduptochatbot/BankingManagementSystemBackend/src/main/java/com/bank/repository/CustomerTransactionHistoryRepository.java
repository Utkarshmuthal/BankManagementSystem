package com.bank.repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.bank.dto.response.CustomerTransactionHistoryResponse;

public interface CustomerTransactionHistoryRepository {

    // Get customer transaction history
    List<CustomerTransactionHistoryResponse> getTransactions(
            String accountNumber,
            LocalDate fromDate,
            LocalDate toDate,
            String transactionType,
            String search,
            int offset,
            int limit
    );

    // Get total number of transactions
    int getTransactionCount(
            String accountNumber,
            LocalDate fromDate,
            LocalDate toDate,
            String transactionType,
            String search
    );

    // Get total deposit amount
    BigDecimal getTotalDeposits(
            String accountNumber,
            LocalDate fromDate,
            LocalDate toDate
    );

    // Get total withdrawal amount
    BigDecimal getTotalWithdrawals(
            String accountNumber,
            LocalDate fromDate,
            LocalDate toDate
    );

    // Get current account balance
    BigDecimal getCurrentBalance(
            String accountNumber
    );
}