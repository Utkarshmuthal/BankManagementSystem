package com.bank.repositoryImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.bank.entity.Account;
import com.bank.repository.AccountRepository;

@Repository
public class AccountRepositoryImpl implements AccountRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    // ============================================================
    // SAVE ACCOUNT
    // ============================================================

    @Override
    public int save(Account account) {

        String sql = """
                INSERT INTO accounts(
                    account_number,
                    customer_id,
                    account_type,
                    balance,
                    status
                )
                VALUES(?,?,?,?,?)
                """;

        return jdbcTemplate.update(
                sql,
                account.getAccountNumber(),
                account.getCustomerId(),
                account.getAccountType(),
                account.getBalance(),
                account.getStatus()
        );
    }


    // ============================================================
    // CHECK CUSTOMER ACCOUNT
    // ============================================================

    @Override
    public boolean existsByCustomerId(Long customerId) {

        String sql = """
                SELECT COUNT(*)
                FROM accounts
                WHERE customer_id=?
                """;

        Integer count = jdbcTemplate.queryForObject(
                sql,
                Integer.class,
                customerId
        );

        return count != null && count > 0;
    }


    // ============================================================
    // GET ALL ACCOUNTS
    // ============================================================

    @Override
    public List<Account> findAll() {

        String sql = """
                SELECT
                    account_id,
                    account_number,
                    customer_id,
                    account_type,
                    balance,
                    status,
                    created_at
                FROM accounts
                ORDER BY account_id DESC
                """;

        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> {

                    Account account = new Account();

                    account.setAccountId(
                            rs.getLong("account_id")
                    );

                    account.setAccountNumber(
                            rs.getString("account_number")
                    );

                    account.setCustomerId(
                            rs.getLong("customer_id")
                    );

                    account.setAccountType(
                            rs.getString("account_type")
                    );

                    account.setBalance(
                            rs.getBigDecimal("balance")
                    );

                    account.setStatus(
                            rs.getString("status")
                    );

                    if (rs.getTimestamp("created_at") != null) {

                        account.setCreatedAt(
                                rs.getTimestamp("created_at")
                                   .toLocalDateTime()
                        );
                    }

                    return account;
                }
        );
    }


    // ============================================================
    // GET ACCOUNT BY ID
    // ============================================================

    @Override
    public Account findById(Long accountId) {

        String sql = """
                SELECT
                    account_id,
                    account_number,
                    customer_id,
                    account_type,
                    balance,
                    status,
                    created_at
                FROM accounts
                WHERE account_id=?
                """;

        List<Account> accounts = jdbcTemplate.query(
                sql,

                (rs, rowNum) -> {

                    Account account = new Account();

                    account.setAccountId(
                            rs.getLong("account_id")
                    );

                    account.setAccountNumber(
                            rs.getString("account_number")
                    );

                    account.setCustomerId(
                            rs.getLong("customer_id")
                    );

                    account.setAccountType(
                            rs.getString("account_type")
                    );

                    account.setBalance(
                            rs.getBigDecimal("balance")
                    );

                    account.setStatus(
                            rs.getString("status")
                    );

                    if (rs.getTimestamp("created_at") != null) {

                        account.setCreatedAt(
                                rs.getTimestamp("created_at")
                                   .toLocalDateTime()
                        );
                    }

                    return account;
                },

                accountId
        );


        if (accounts.isEmpty()) {
            return null;
        }

        return accounts.get(0);
    }
}