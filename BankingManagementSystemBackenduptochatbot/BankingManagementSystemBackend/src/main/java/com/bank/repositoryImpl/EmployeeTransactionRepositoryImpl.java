package com.bank.repositoryImpl;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.bank.dto.response.EmployeeTransactionResponse;
import com.bank.repository.EmployeeTransactionRepository;

@Repository
public class EmployeeTransactionRepositoryImpl
        implements EmployeeTransactionRepository {

    private final JdbcTemplate jdbcTemplate;

    public EmployeeTransactionRepositoryImpl(
            JdbcTemplate jdbcTemplate) {

        this.jdbcTemplate = jdbcTemplate;
    }


    // =========================================================
    // CHECK ACCOUNT
    // =========================================================

    @Override
    public boolean accountExists(String accountNumber) {

        String sql = """
                SELECT COUNT(*)
                FROM accounts
                WHERE account_number = ?
                AND status = 'ACTIVE'
                """;

        Integer count = jdbcTemplate.queryForObject(
                sql,
                Integer.class,
                accountNumber
        );

        return count != null && count > 0;
    }


    // =========================================================
    // GET BALANCE
    // =========================================================

    @Override
    public BigDecimal getBalance(String accountNumber) {

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


    // =========================================================
    // UPDATE BALANCE
    // =========================================================

    @Override
    public void updateBalance(
            String accountNumber,
            BigDecimal balance) {

        String sql = """
                UPDATE accounts
                SET balance = ?
                WHERE account_number = ?
                AND status = 'ACTIVE'
                """;

        jdbcTemplate.update(
                sql,
                balance,
                accountNumber
        );
    }


    // =========================================================
    // INSERT TRANSACTION
    // =========================================================

    @Override
    public void insertTransaction(
            String accountNumber,
            String fromAccount,
            String toAccount,
            String transactionType,
            BigDecimal amount,
            String description,
            String status) {

        String sql = """
                INSERT INTO bank_transactions
                (
                    account_number,
                    from_account,
                    to_account,
                    transaction_type,
                    amount,
                    transaction_date,
                    description,
                    status
                )
                VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?)
                """;

        jdbcTemplate.update(
                sql,
                accountNumber,
                fromAccount,
                toAccount,
                transactionType,
                amount,
                description,
                status
        );
    }


    // =========================================================
    // ACCOUNT DETAILS
    // =========================================================

    @Override
    public EmployeeTransactionResponse getAccountDetails(
            String accountNumber) {

        String sql = """
                SELECT
                    c.full_name,
                    a.account_number,
                    a.account_type,
                    a.balance
                FROM accounts a
                JOIN customer_profiles c
                    ON a.customer_id = c.customer_id
                WHERE a.account_number = ?
                AND a.status = 'ACTIVE'
                """;

        return jdbcTemplate.queryForObject(
                sql,
                (rs, rowNum) -> {

                    EmployeeTransactionResponse response =
                            new EmployeeTransactionResponse();

                    response.setCustomerName(
                            rs.getString("full_name")
                    );

                    response.setAccountNumber(
                            rs.getString("account_number")
                    );

                    response.setAccountType(
                            rs.getString("account_type")
                    );

                    response.setCurrentBalance(
                            rs.getBigDecimal("balance")
                    );

                    return response;
                },
                accountNumber
        );
    }


    // =========================================================
    // ALL TRANSACTIONS - PAGINATION
    // =========================================================

    @Override
    public List<EmployeeTransactionResponse> getAllTransactions(
            int offset,
            int limit) {

        String sql = """
                SELECT
                    t.transaction_id,
                    c.full_name,
                    t.account_number,
                    a.account_type,
                    a.balance,
                    t.from_account,
                    t.to_account,
                    t.transaction_type,
                    t.amount,
                    t.status,
                    t.description,
                    t.transaction_date

                FROM bank_transactions t

                LEFT JOIN accounts a
                    ON t.account_number = a.account_number

                LEFT JOIN customer_profiles c
                    ON a.customer_id = c.customer_id

                ORDER BY t.transaction_id DESC

                LIMIT ? OFFSET ?
                """;

        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> {

                    EmployeeTransactionResponse response =
                            new EmployeeTransactionResponse();

                    response.setTransactionId(
                            rs.getLong("transaction_id")
                    );

                    response.setCustomerName(
                            rs.getString("full_name")
                    );

                    response.setAccountNumber(
                            rs.getString("account_number")
                    );

                    response.setAccountType(
                            rs.getString("account_type")
                    );

                    response.setCurrentBalance(
                            rs.getBigDecimal("balance")
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

                    response.setStatus(
                            rs.getString("status")
                    );

                    response.setDescription(
                            rs.getString("description")
                    );

                    if (
                        rs.getTimestamp("transaction_date")
                        != null
                    ) {

                        response.setTransactionDate(
                                rs.getTimestamp(
                                        "transaction_date"
                                ).toLocalDateTime()
                        );
                    }

                    return response;
                },
                limit,
                offset
        );
    }


    // =========================================================
    // PARTICULAR CUSTOMER TRANSACTIONS - PAGINATION
    // =========================================================

    @Override
    public List<EmployeeTransactionResponse>
    getTransactionsByAccount(
            String accountNumber,
            int offset,
            int limit) {

        String sql = """
                SELECT
                    t.transaction_id,
                    c.full_name,
                    t.account_number,
                    a.account_type,
                    a.balance,
                    t.from_account,
                    t.to_account,
                    t.transaction_type,
                    t.amount,
                    t.status,
                    t.description,
                    t.transaction_date

                FROM bank_transactions t

                LEFT JOIN accounts a
                    ON t.account_number = a.account_number

                LEFT JOIN customer_profiles c
                    ON a.customer_id = c.customer_id

                WHERE t.account_number = ?

                ORDER BY t.transaction_id DESC

                LIMIT ? OFFSET ?
                """;

        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> {

                    EmployeeTransactionResponse response =
                            new EmployeeTransactionResponse();

                    response.setTransactionId(
                            rs.getLong("transaction_id")
                    );

                    response.setCustomerName(
                            rs.getString("full_name")
                    );

                    response.setAccountNumber(
                            rs.getString("account_number")
                    );

                    response.setAccountType(
                            rs.getString("account_type")
                    );

                    response.setCurrentBalance(
                            rs.getBigDecimal("balance")
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

                    response.setStatus(
                            rs.getString("status")
                    );

                    response.setDescription(
                            rs.getString("description")
                    );

                    if (
                        rs.getTimestamp("transaction_date")
                        != null
                    ) {

                        response.setTransactionDate(
                                rs.getTimestamp(
                                        "transaction_date"
                                ).toLocalDateTime()
                        );
                    }

                    return response;
                },
                accountNumber,
                limit,
                offset
        );
    }
}