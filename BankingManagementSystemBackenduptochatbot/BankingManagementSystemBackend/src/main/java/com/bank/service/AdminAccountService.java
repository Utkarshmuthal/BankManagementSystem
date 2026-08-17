package com.bank.service;

import java.util.List;

import com.bank.dto.response.AdminAccountResponse;

public interface AdminAccountService {

    // Get all accounts
    List<AdminAccountResponse> getAllAccounts();

    // Get account by ID
    AdminAccountResponse getAccountById(Long accountId);

}