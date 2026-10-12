package com.bank.repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface AdminReportsRepository {

    // ============================
    // TOP CARDS
    // ============================

    int getTotalCustomers();

    int getTotalEmployees();

    int getTotalAccounts(
            LocalDate fromDate,
            LocalDate toDate
    );

    int getTotalTransactions(
            LocalDate fromDate,
            LocalDate toDate
    );

    int getTotalLoans(
            LocalDate fromDate,
            LocalDate toDate
    );


    // ============================
    // TRANSACTIONS
    // ============================

    int getTransactionCount(
            String type,
            LocalDate fromDate,
            LocalDate toDate
    );

    BigDecimal getTransactionAmount(
            String type,
            LocalDate fromDate,
            LocalDate toDate
    );


    // ============================
    // LOANS
    // ============================

    int getLoanCount(
            String status,
            LocalDate fromDate,
            LocalDate toDate
    );

    BigDecimal getLoanAmount(
            String status,
            LocalDate fromDate,
            LocalDate toDate
    );

    BigDecimal getTotalLoanApplicationsAmount(
            LocalDate fromDate,
            LocalDate toDate
    );

    BigDecimal getLoanDisbursedAmount(
            LocalDate fromDate,
            LocalDate toDate
    );

    BigDecimal getInterestCollected(
            LocalDate fromDate,
            LocalDate toDate
    );


    // ============================
    // EMPLOYEES
    // ============================

    int getEmployeeCountByStatus(
            String status
    );


    // ============================
    // ACCOUNT CHART
    // ============================

    List<Map<String, Object>> getAccountTypeDistribution();


    // ============================
    // TRANSACTION CHART
    // ============================

    List<Map<String, Object>> getMonthlyTransactionTrend(
            LocalDate fromDate,
            LocalDate toDate
    );


    // ============================
    // LOAN CHART
    // ============================

    List<Map<String, Object>> getLoanApplicationTrend(
            LocalDate fromDate,
            LocalDate toDate
    );
}