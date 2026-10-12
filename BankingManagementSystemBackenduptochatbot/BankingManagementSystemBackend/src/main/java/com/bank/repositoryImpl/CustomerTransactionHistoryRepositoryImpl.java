package com.bank.repositoryImpl;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.bank.dto.response.CustomerTransactionHistoryResponse;
import com.bank.repository.CustomerTransactionHistoryRepository;

@Repository
public class CustomerTransactionHistoryRepositoryImpl
        implements CustomerTransactionHistoryRepository {

    private final JdbcTemplate jdbcTemplate;

    public CustomerTransactionHistoryRepositoryImpl(
            JdbcTemplate jdbcTemplate) {

        this.jdbcTemplate = jdbcTemplate;
    }


    // =========================================================
    // GET TRANSACTION HISTORY
    // =========================================================

    @Override
    public List<CustomerTransactionHistoryResponse> getTransactions(
            String accountNumber,
            LocalDate fromDate,
            LocalDate toDate,
            String transactionType,
            String search,
            int offset,
            int limit) {

        StringBuilder sql = new StringBuilder("""
                SELECT
                    t.transaction_id,
                    t.transaction_date,
                    t.transaction_type,
                    t.account_number,
                    t.from_account,
                    t.to_account,
                    t.amount,
                    t.status,
                    t.description,
                    a.balance
                FROM bank_transactions t
                LEFT JOIN accounts a
                    ON t.account_number = a.account_number
                WHERE t.account_number = ?
                """);

        List<Object> params = new ArrayList<>();

        params.add(accountNumber);


        // =====================================================
        // FROM DATE
        // =====================================================

        if (fromDate != null) {

            sql.append("""
                    AND t.transaction_date >= ?
                    """);

            params.add(Timestamp.valueOf(fromDate.atStartOfDay()));
        }


        // =====================================================
        // TO DATE
        // =====================================================

        if (toDate != null) {

            sql.append("""
                    AND t.transaction_date < ?
                    """);

            params.add(
                    Timestamp.valueOf(
                            toDate.plusDays(1).atStartOfDay()
                    )
            );
        }


        // =====================================================
        // TRANSACTION TYPE
        // =====================================================

        if (transactionType != null
                && !transactionType.isBlank()
                && !transactionType.equalsIgnoreCase("ALL")) {

            sql.append("""
                    AND UPPER(t.transaction_type) = UPPER(?)
                    """);

            params.add(transactionType);
        }


        // =====================================================
        // SEARCH
        // =====================================================

        if (search != null && !search.isBlank()) {

            sql.append("""
                    AND (
                        CAST(t.transaction_id AS TEXT) ILIKE ?
                        OR t.description ILIKE ?
                        OR t.from_account ILIKE ?
                        OR t.to_account ILIKE ?
                    )
                    """);

            String searchValue = "%" + search.trim() + "%";

            params.add(searchValue);
            params.add(searchValue);
            params.add(searchValue);
            params.add(searchValue);
        }


        // =====================================================
        // ORDER + PAGINATION
        // =====================================================

        sql.append("""
                ORDER BY t.transaction_date DESC,
                         t.transaction_id DESC
                LIMIT ? OFFSET ?
                """);

        params.add(limit);
        params.add(offset);


        return jdbcTemplate.query(
                sql.toString(),
                (rs, rowNum) -> {

                    CustomerTransactionHistoryResponse response =
                            new CustomerTransactionHistoryResponse();

                    response.setTransactionId(
                            rs.getLong("transaction_id")
                    );

                    response.setAccountNumber(
                            rs.getString("account_number")
                    );

                    response.setFromAccount(
                            rs.getString("from_account")
                    );

                    response.setToAccount(
                            rs.getString("to_account")
                    );

                    response.setTransactionType(
                            rs.getString("transaction_type")
                    );

                    response.setAmount(
                            rs.getBigDecimal("amount")
                    );

                    response.setCurrentBalance(
                            rs.getBigDecimal("balance")
                    );

                    response.setStatus(
                            rs.getString("status")
                    );

                    response.setDescription(
                            rs.getString("description")
                    );

                    Timestamp timestamp =
                            rs.getTimestamp("transaction_date");

                    if (timestamp != null) {

                        response.setTransactionDate(
                                timestamp.toLocalDateTime()
                        );
                    }

                    return response;
                },
                params.toArray()
        );
    }


    // =========================================================
    // GET TRANSACTION COUNT
    // =========================================================

    @Override
    public int getTransactionCount(
            String accountNumber,
            LocalDate fromDate,
            LocalDate toDate,
            String transactionType,
            String search) {

        StringBuilder sql = new StringBuilder("""
                SELECT COUNT(*)
                FROM bank_transactions t
                WHERE t.account_number = ?
                """);

        List<Object> params = new ArrayList<>();

        params.add(accountNumber);


        if (fromDate != null) {

            sql.append("""
                    AND t.transaction_date >= ?
                    """);

            params.add(
                    Timestamp.valueOf(
                            fromDate.atStartOfDay()
                    )
            );
        }


        if (toDate != null) {

            sql.append("""
                    AND t.transaction_date < ?
                    """);

            params.add(
                    Timestamp.valueOf(
                            toDate.plusDays(1).atStartOfDay()
                    )
            );
        }


        if (transactionType != null
                && !transactionType.isBlank()
                && !transactionType.equalsIgnoreCase("ALL")) {

            sql.append("""
                    AND UPPER(t.transaction_type) = UPPER(?)
                    """);

            params.add(transactionType);
        }


        if (search != null && !search.isBlank()) {

            sql.append("""
                    AND (
                        CAST(t.transaction_id AS TEXT) ILIKE ?
                        OR t.description ILIKE ?
                        OR t.from_account ILIKE ?
                        OR t.to_account ILIKE ?
                    )
                    """);

            String searchValue = "%" + search.trim() + "%";

            params.add(searchValue);
            params.add(searchValue);
            params.add(searchValue);
            params.add(searchValue);
        }


        Integer count = jdbcTemplate.queryForObject(
                sql.toString(),
                Integer.class,
                params.toArray()
        );

        return count != null ? count : 0;
    }


    // =========================================================
    // GET TOTAL DEPOSITS
    // =========================================================

    @Override
    public BigDecimal getTotalDeposits(
            String accountNumber,
            LocalDate fromDate,
            LocalDate toDate) {

        StringBuilder sql = new StringBuilder("""
                SELECT COALESCE(SUM(amount), 0)
                FROM bank_transactions
                WHERE account_number = ?
                AND UPPER(transaction_type) = 'DEPOSIT'
                AND UPPER(status) = 'SUCCESS'
                """);

        List<Object> params = new ArrayList<>();

        params.add(accountNumber);


        if (fromDate != null) {

            sql.append("""
                    AND transaction_date >= ?
                    """);

            params.add(
                    Timestamp.valueOf(
                            fromDate.atStartOfDay()
                    )
            );
        }


        if (toDate != null) {

            sql.append("""
                    AND transaction_date < ?
                    """);

            params.add(
                    Timestamp.valueOf(
                            toDate.plusDays(1).atStartOfDay()
                    )
            );
        }


        return jdbcTemplate.queryForObject(
                sql.toString(),
                BigDecimal.class,
                params.toArray()
        );
    }


    // =========================================================
    // GET TOTAL WITHDRAWALS
    // =========================================================

    @Override
    public BigDecimal getTotalWithdrawals(
            String accountNumber,
            LocalDate fromDate,
            LocalDate toDate) {

        StringBuilder sql = new StringBuilder("""
                SELECT COALESCE(SUM(amount), 0)
                FROM bank_transactions
                WHERE account_number = ?
                AND UPPER(transaction_type) = 'WITHDRAW'
                AND UPPER(status) = 'SUCCESS'
                """);

        List<Object> params = new ArrayList<>();

        params.add(accountNumber);


        if (fromDate != null) {

            sql.append("""
                    AND transaction_date >= ?
                    """);

            params.add(
                    Timestamp.valueOf(
                            fromDate.atStartOfDay()
                    )
            );
        }


        if (toDate != null) {

            sql.append("""
                    AND transaction_date < ?
                    """);

            params.add(
                    Timestamp.valueOf(
                            toDate.plusDays(1).atStartOfDay()
                    )
            );
        }


        return jdbcTemplate.queryForObject(
                sql.toString(),
                BigDecimal.class,
                params.toArray()
        );
    }


    // =========================================================
    // GET CURRENT BALANCE
    // =========================================================

    @Override
    public BigDecimal getCurrentBalance(
            String accountNumber) {

        String sql = """
                SELECT balance
                FROM accounts
                WHERE account_number = ?
                AND status = 'ACTIVE'
                """;

        return jdbcTemplate.queryForObject(
                sql,
                BigDecimal.class,
                accountNumber
        );
    }
}