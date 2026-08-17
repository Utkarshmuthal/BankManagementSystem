package com.bank.service;

import java.util.List;

import com.bank.dto.request.EmployeeTransactionRequest;
import com.bank.dto.response.EmployeeTransactionResponse;

public interface EmployeeTransactionService {

    EmployeeTransactionResponse deposit(
            EmployeeTransactionRequest request);

    EmployeeTransactionResponse withdraw(
            EmployeeTransactionRequest request);

    EmployeeTransactionResponse transfer(
            EmployeeTransactionRequest request);

    EmployeeTransactionResponse getAccountDetails(
            String accountNumber);

    List<EmployeeTransactionResponse> getAllTransactions(
            int page,
            int size
    );

    List<EmployeeTransactionResponse> getTransactionsByAccount(
            String accountNumber,
            int page,
            int size
    );}