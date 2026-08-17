package com.bank.repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface ReportsRepository {


    // =====================================================
    // TRANSACTION
    // =====================================================

    int getTotalTransactions(
            LocalDate fromDate,
            LocalDate toDate
    );


    int getTransactionCount(
            String transactionType,
            LocalDate fromDate,
            LocalDate toDate
    );


    BigDecimal getTransactionAmount(
            String transactionType,
            LocalDate fromDate,
            LocalDate toDate
    );


    // =====================================================
    // CUSTOMER
    // =====================================================

    int getTotalCustomers();


    int getCustomerCount(
            String approvalStatus
    );


    // =====================================================
    // ACCOUNT
    // =====================================================

    int getTotalAccounts();


    int getAccountTypeCount(
            String accountType
    );


    // =====================================================
    // RECENT ACTIVITY
    // =====================================================

    List<Map<String, Object>> getRecentActivity(
            LocalDate fromDate,
            LocalDate toDate
    );


    // =====================================================
    // CHART
    // =====================================================

    List<Map<String, Object>> getMonthlyChart(
            LocalDate fromDate,
            LocalDate toDate
    );
}