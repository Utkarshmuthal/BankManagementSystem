package com.bank.repositoryImpl;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.bank.repository.ReportsRepository;

@Repository
public class ReportsRepositoryImpl
        implements ReportsRepository {


    @Autowired
    private JdbcTemplate jdbcTemplate;


    // =====================================================
    // TOTAL TRANSACTIONS
    // =====================================================

    @Override
    public int getTotalTransactions(
            LocalDate fromDate,
            LocalDate toDate) {

        String sql = """
                SELECT COUNT(*)
                FROM bank_transactions
                WHERE DATE(transaction_date)
                BETWEEN ? AND ?
                AND UPPER(status) = 'SUCCESS'
                """;

        Integer count =
                jdbcTemplate.queryForObject(
                        sql,
                        Integer.class,
                        Date.valueOf(fromDate),
                        Date.valueOf(toDate)
                );

        return count != null ? count : 0;
    }


    // =====================================================
    // TRANSACTION COUNT
    // =====================================================

    @Override
    public int getTransactionCount(
            String transactionType,
            LocalDate fromDate,
            LocalDate toDate) {

        String sql = """
                SELECT COUNT(*)
                FROM bank_transactions
                WHERE UPPER(transaction_type) = ?
                AND DATE(transaction_date)
                BETWEEN ? AND ?
                AND UPPER(status) = 'SUCCESS'
                """;

        Integer count =
                jdbcTemplate.queryForObject(
                        sql,
                        Integer.class,
                        transactionType.toUpperCase(),
                        Date.valueOf(fromDate),
                        Date.valueOf(toDate)
                );

        return count != null ? count : 0;
    }


    // =====================================================
    // TRANSACTION AMOUNT
    // =====================================================

    @Override
    public BigDecimal getTransactionAmount(
            String transactionType,
            LocalDate fromDate,
            LocalDate toDate) {

        String sql = """
                SELECT COALESCE(SUM(amount), 0)
                FROM bank_transactions
                WHERE UPPER(transaction_type) = ?
                AND DATE(transaction_date)
                BETWEEN ? AND ?
                AND UPPER(status) = 'SUCCESS'
                """;

        BigDecimal amount =
                jdbcTemplate.queryForObject(
                        sql,
                        BigDecimal.class,
                        transactionType.toUpperCase(),
                        Date.valueOf(fromDate),
                        Date.valueOf(toDate)
                );

        return amount != null
                ? amount
                : BigDecimal.ZERO;
    }


    // =====================================================
    // TOTAL CUSTOMERS
    // =====================================================

    @Override
    public int getTotalCustomers() {

        String sql = """
                SELECT COUNT(*)
                FROM customer_profiles
                """;

        Integer count =
                jdbcTemplate.queryForObject(
                        sql,
                        Integer.class
                );

        return count != null ? count : 0;
    }


    // =====================================================
    // CUSTOMER COUNT
    // =====================================================

    @Override
    public int getCustomerCount(
            String approvalStatus) {

        String sql = """
                SELECT COUNT(*)
                FROM customer_profiles
                WHERE UPPER(approval_status) = ?
                """;

        Integer count =
                jdbcTemplate.queryForObject(
                        sql,
                        Integer.class,
                        approvalStatus.toUpperCase()
                );

        return count != null ? count : 0;
    }


    // =====================================================
    // TOTAL ACCOUNTS
    // =====================================================

    @Override
    public int getTotalAccounts() {

        String sql = """
                SELECT COUNT(*)
                FROM accounts
                """;

        Integer count =
                jdbcTemplate.queryForObject(
                        sql,
                        Integer.class
                );

        return count != null ? count : 0;
    }


    // =====================================================
    // ACCOUNT TYPE COUNT
    // =====================================================

    @Override
    public int getAccountTypeCount(
            String accountType) {

        String sql = """
                SELECT COUNT(*)
                FROM accounts
                WHERE UPPER(account_type) = ?
                """;

        Integer count =
                jdbcTemplate.queryForObject(
                        sql,
                        Integer.class,
                        accountType.toUpperCase()
                );

        return count != null ? count : 0;
    }


    // =====================================================
    // RECENT ACTIVITY
    // =====================================================

    @Override
    public List<Map<String, Object>> getRecentActivity(
            LocalDate fromDate,
            LocalDate toDate) {

        String sql = """
                SELECT
                    UPPER(transaction_type)
                    AS activity_type,

                    COUNT(*) AS count,

                    COALESCE(SUM(amount), 0)
                    AS total_amount

                FROM bank_transactions

                WHERE DATE(transaction_date)
                BETWEEN ? AND ?

                AND UPPER(status) = 'SUCCESS'

                GROUP BY UPPER(transaction_type)

                ORDER BY activity_type
                """;

        return jdbcTemplate.queryForList(
                sql,
                Date.valueOf(fromDate),
                Date.valueOf(toDate)
        );
    }


    // =====================================================
    // TRANSACTION CHART
    // =====================================================

    @Override
    public List<Map<String, Object>> getMonthlyChart(
            LocalDate fromDate,
            LocalDate toDate) {

        String sql = """
                SELECT

                    DATE(transaction_date)
                    AS transaction_day,

                    COALESCE(
                        SUM(
                            CASE
                                WHEN UPPER(transaction_type)
                                = 'DEPOSIT'
                                THEN amount
                                ELSE 0
                            END
                        ), 0
                    ) AS deposits,

                    COALESCE(
                        SUM(
                            CASE
                                WHEN UPPER(transaction_type)
                                = 'WITHDRAW'
                                THEN amount
                                ELSE 0
                            END
                        ), 0
                    ) AS withdrawals,

                    COALESCE(
                        SUM(
                            CASE
                                WHEN UPPER(transaction_type)
                                = 'TRANSFER'
                                THEN amount
                                ELSE 0
                            END
                        ), 0
                    ) AS transfers

                FROM bank_transactions

                WHERE DATE(transaction_date)
                BETWEEN ? AND ?

                AND UPPER(status) = 'SUCCESS'

                GROUP BY DATE(transaction_date)

                ORDER BY DATE(transaction_date)
                """;

        return jdbcTemplate.queryForList(
                sql,
                Date.valueOf(fromDate),
                Date.valueOf(toDate)
        );
    }
}