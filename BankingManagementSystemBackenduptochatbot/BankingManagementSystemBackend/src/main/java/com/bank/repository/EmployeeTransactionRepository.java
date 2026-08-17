package com.bank.repository;

import java.math.BigDecimal;
import java.util.List;

import com.bank.dto.response.EmployeeTransactionResponse;

public interface EmployeeTransactionRepository {

    boolean accountExists(String accountNumber);

    BigDecimal getBalance(String accountNumber);

    void updateBalance(
            String accountNumber,
            BigDecimal balance
    );

    void insertTransaction(
            String accountNumber,
            String fromAccount,
            String toAccount,
            String transactionType,
            BigDecimal amount,
            String description,
            String status
    );

    EmployeeTransactionResponse getAccountDetails(
            String accountNumber
    );

    List<EmployeeTransactionResponse> getAllTransactions(
            int offset,
            int limit
    );

    List<EmployeeTransactionResponse> getTransactionsByAccount(
            String accountNumber,
            int offset,
            int limit
    );
}