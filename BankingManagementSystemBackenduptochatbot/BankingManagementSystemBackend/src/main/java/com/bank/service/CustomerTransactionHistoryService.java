package com.bank.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.bank.dto.response.CustomerTransactionHistoryResponse;

public interface CustomerTransactionHistoryService {

    // =========================================================
    // GET TRANSACTION HISTORY
    // =========================================================

    List<CustomerTransactionHistoryResponse> getTransactions(
            String accountNumber,
            LocalDate fromDate,
            LocalDate toDate,
            String transactionType,
            String search,
            int page,
            int size
    );


    // =========================================================
    // GET TOTAL TRANSACTION COUNT
    // =========================================================

    int getTransactionCount(
            String accountNumber,
            LocalDate fromDate,
            LocalDate toDate,
            String transactionType,
            String search
    );


    // =========================================================
    // GET TOTAL DEPOSITS
    // =========================================================

    BigDecimal getTotalDeposits(
            String accountNumber,
            LocalDate fromDate,
            LocalDate toDate
    );


    // =========================================================
    // GET TOTAL WITHDRAWALS
    // =========================================================

    BigDecimal getTotalWithdrawals(
            String accountNumber,
            LocalDate fromDate,
            LocalDate toDate
    );


    // =========================================================
    // GET CURRENT BALANCE
    // =========================================================

    BigDecimal getCurrentBalance(
            String accountNumber
    );
}