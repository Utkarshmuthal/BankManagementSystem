package com.bank.repositoryImpl;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.bank.repository.AdminReportsRepository;

@Repository
public class AdminReportsRepositoryImpl
        implements AdminReportsRepository {

    private final JdbcTemplate jdbcTemplate;


    public AdminReportsRepositoryImpl(
            JdbcTemplate jdbcTemplate) {

        this.jdbcTemplate = jdbcTemplate;
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
    // TOTAL EMPLOYEES
    // =====================================================

    @Override
    public int getTotalEmployees() {

        String sql = """
                SELECT COUNT(*)
                FROM employee
                """;

        Integer count =
                jdbcTemplate.queryForObject(
                        sql,
                        Integer.class
                );

        return count != null ? count : 0;
    }


    // =====================================================
    // TOTAL ACCOUNTS
    // =====================================================

    @Override
    public int getTotalAccounts(
            LocalDate fromDate,
            LocalDate toDate) {

        String sql = """
                SELECT COUNT(*)
                FROM accounts
                WHERE DATE(created_at)
                BETWEEN ? AND ?
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
    // TOTAL LOANS
    // =====================================================

    @Override
    public int getTotalLoans(
            LocalDate fromDate,
            LocalDate toDate) {

        String sql = """
                SELECT COUNT(*)
                FROM loans
                WHERE DATE(application_date)
                BETWEEN ? AND ?
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
            String type,
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
                        type.toUpperCase(),
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
            String type,
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
                        type.toUpperCase(),
                        Date.valueOf(fromDate),
                        Date.valueOf(toDate)
                );

        return amount != null
                ? amount
                : BigDecimal.ZERO;
    }


    // =====================================================
    // LOAN COUNT
    // =====================================================

    @Override
    public int getLoanCount(
            String status,
            LocalDate fromDate,
            LocalDate toDate) {

        String sql = """
                SELECT COUNT(*)
                FROM loans
                WHERE UPPER(status) = ?
                AND DATE(application_date)
                BETWEEN ? AND ?
                """;

        Integer count =
                jdbcTemplate.queryForObject(
                        sql,
                        Integer.class,
                        status.toUpperCase(),
                        Date.valueOf(fromDate),
                        Date.valueOf(toDate)
                );

        return count != null ? count : 0;
    }


    // =====================================================
    // LOAN AMOUNT
    // =====================================================

    @Override
    public BigDecimal getLoanAmount(
            String status,
            LocalDate fromDate,
            LocalDate toDate) {

        String sql = """
                SELECT COALESCE(
                    SUM(
                        CASE
                            WHEN UPPER(status) = 'PENDING'
                            THEN requested_amount
                            ELSE COALESCE(
                                approved_amount,
                                requested_amount
                            )
                        END
                    ), 0
                )
                FROM loans
                WHERE UPPER(status) = ?
                AND DATE(application_date)
                BETWEEN ? AND ?
                """;

        BigDecimal amount =
                jdbcTemplate.queryForObject(
                        sql,
                        BigDecimal.class,
                        status.toUpperCase(),
                        Date.valueOf(fromDate),
                        Date.valueOf(toDate)
                );

        return amount != null
                ? amount
                : BigDecimal.ZERO;
    }


    // =====================================================
    // TOTAL LOAN APPLICATION AMOUNT
    // =====================================================

    @Override
    public BigDecimal getTotalLoanApplicationsAmount(
            LocalDate fromDate,
            LocalDate toDate) {

        String sql = """
                SELECT COALESCE(
                    SUM(requested_amount),
                    0
                )
                FROM loans
                WHERE DATE(application_date)
                BETWEEN ? AND ?
                """;

        BigDecimal amount =
                jdbcTemplate.queryForObject(
                        sql,
                        BigDecimal.class,
                        Date.valueOf(fromDate),
                        Date.valueOf(toDate)
                );

        return amount != null
                ? amount
                : BigDecimal.ZERO;
    }


    // =====================================================
    // LOAN DISBURSED
    // =====================================================

    @Override
    public BigDecimal getLoanDisbursedAmount(
            LocalDate fromDate,
            LocalDate toDate) {

        String sql = """
                SELECT COALESCE(
                    SUM(approved_amount),
                    0
                )
                FROM loans
                WHERE UPPER(status) IN
                    ('APPROVED', 'ACTIVE')
                AND DATE(approval_date)
                BETWEEN ? AND ?
                """;

        BigDecimal amount =
                jdbcTemplate.queryForObject(
                        sql,
                        BigDecimal.class,
                        Date.valueOf(fromDate),
                        Date.valueOf(toDate)
                );

        return amount != null
                ? amount
                : BigDecimal.ZERO;
    }


    // =====================================================
    // INTEREST COLLECTED
    // =====================================================

    @Override
    public BigDecimal getInterestCollected(
            LocalDate fromDate,
            LocalDate toDate) {

        String sql = """
                SELECT COALESCE(
                    SUM(interest_amount),
                    0
                )
                FROM loan_emi
                WHERE UPPER(status) = 'PAID'
                AND DATE(payment_date)
                BETWEEN ? AND ?
                """;

        BigDecimal amount =
                jdbcTemplate.queryForObject(
                        sql,
                        BigDecimal.class,
                        Date.valueOf(fromDate),
                        Date.valueOf(toDate)
                );

        return amount != null
                ? amount
                : BigDecimal.ZERO;
    }


    // =====================================================
    // EMPLOYEE STATUS
    // =====================================================

    @Override
    public int getEmployeeCountByStatus(
            String status) {

        String sql = """
                SELECT COUNT(*)
                FROM employee e
                INNER JOIN users u
                    ON e.user_id = u.id
                WHERE UPPER(u.status) = ?
                """;

        Integer count =
                jdbcTemplate.queryForObject(
                        sql,
                        Integer.class,
                        status.toUpperCase()
                );

        return count != null ? count : 0;
    }


    // =====================================================
    // ACCOUNT TYPE DISTRIBUTION
    // =====================================================

    @Override
    public List<Map<String, Object>>
    getAccountTypeDistribution() {

        String sql = """
                SELECT
                    account_type AS account_type,
                    COUNT(*) AS count
                FROM accounts
                GROUP BY account_type
                ORDER BY account_type
                """;

        return jdbcTemplate.queryForList(sql);
    }


    // =====================================================
    // MONTHLY TRANSACTION TREND
    // =====================================================

    @Override
    public List<Map<String, Object>>
    getMonthlyTransactionTrend(
            LocalDate fromDate,
            LocalDate toDate) {

        String sql = """
                SELECT
                    TO_CHAR(
                        DATE_TRUNC(
                            'month',
                            transaction_date
                        ),
                        'Mon'
                    ) AS month,

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

                GROUP BY DATE_TRUNC(
                    'month',
                    transaction_date
                )

                ORDER BY DATE_TRUNC(
                    'month',
                    transaction_date
                )
                """;

        return jdbcTemplate.queryForList(
                sql,
                Date.valueOf(fromDate),
                Date.valueOf(toDate)
        );
    }


    // =====================================================
    // LOAN APPLICATION TREND
    // =====================================================

    @Override
    public List<Map<String, Object>>
    getLoanApplicationTrend(
            LocalDate fromDate,
            LocalDate toDate) {

        String sql = """
                SELECT
                    TO_CHAR(
                        DATE_TRUNC(
                            'month',
                            application_date
                        ),
                        'Mon'
                    ) AS month,

                    COUNT(*) AS applications

                FROM loans

                WHERE DATE(application_date)
                    BETWEEN ? AND ?

                GROUP BY DATE_TRUNC(
                    'month',
                    application_date
                )

                ORDER BY DATE_TRUNC(
                    'month',
                    application_date
                )
                """;

        return jdbcTemplate.queryForList(
                sql,
                Date.valueOf(fromDate),
                Date.valueOf(toDate)
        );
    }
}