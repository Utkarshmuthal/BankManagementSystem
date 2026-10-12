package com.bank.repositoryImpl;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.bank.dto.response.AdminDashboardResponse;
import com.bank.repository.AdminDashboardRepository;

@Repository
public class AdminDashboardRepositoryImpl
        implements AdminDashboardRepository {


    @Autowired
    private JdbcTemplate jdbcTemplate;


    @Override
    public AdminDashboardResponse getDashboardData() {

        String sql = """
                SELECT

                    (SELECT COUNT(*)
                     FROM customer_profiles)
                    AS total_customers,

                    (SELECT COUNT(*)
                     FROM employee)
                    AS total_employees,

                    (SELECT COUNT(*)
                     FROM accounts)
                    AS total_accounts,

                    (SELECT COUNT(*)
                     FROM loans)
                    AS total_loans,

                    (SELECT COUNT(*)
                     FROM customer_profiles
                     WHERE UPPER(approval_status)
                     = 'PENDING_APPROVAL')
                    AS pending_kyc,

                    (SELECT COALESCE(SUM(amount), 0)
                     FROM bank_transactions
                     WHERE DATE(transaction_date)
                     = CURRENT_DATE
                     AND UPPER(transaction_type)
                     = 'DEPOSIT'
                     AND UPPER(status)
                     = 'SUCCESS')
                    AS today_deposits,

                    (SELECT COALESCE(SUM(amount), 0)
                     FROM bank_transactions
                     WHERE DATE(transaction_date)
                     = CURRENT_DATE
                     AND UPPER(transaction_type)
                     = 'WITHDRAW'
                     AND UPPER(status)
                     = 'SUCCESS')
                    AS today_withdrawals,

                    (SELECT COUNT(*)
                     FROM bank_transactions
                     WHERE UPPER(status)
                     = 'SUCCESS')
                    AS total_transactions
                """;


        return jdbcTemplate.queryForObject(
                sql,
                (rs, rowNum) -> {

                    AdminDashboardResponse response =
                            new AdminDashboardResponse();


                    response.setTotalCustomers(
                            rs.getInt("total_customers")
                    );


                    response.setTotalEmployees(
                            rs.getInt("total_employees")
                    );


                    response.setTotalAccounts(
                            rs.getInt("total_accounts")
                    );


                    response.setTotalLoans(
                            rs.getInt("total_loans")
                    );


                    response.setPendingKyc(
                            rs.getInt("pending_kyc")
                    );


                    response.setTodayDeposits(
                            rs.getBigDecimal("today_deposits")
                    );


                    response.setTodayWithdrawals(
                            rs.getBigDecimal("today_withdrawals")
                    );


                    response.setTotalTransactions(
                            rs.getInt("total_transactions")
                    );


                    return response;
                }
        );
    }
}