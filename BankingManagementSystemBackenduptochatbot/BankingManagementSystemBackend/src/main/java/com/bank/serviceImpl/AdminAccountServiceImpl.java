package com.bank.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.dto.response.AdminAccountResponse;
import com.bank.entity.Account;
import com.bank.repository.AccountRepository;
import com.bank.service.AdminAccountService;

@Service
public class AdminAccountServiceImpl implements AdminAccountService {

    @Autowired
    private AccountRepository accountRepository;


    // ============================================================
    // GET ALL ACCOUNTS
    // ============================================================

    @Override
    public List<AdminAccountResponse> getAllAccounts() {

        List<Account> accounts =
                accountRepository.findAll();

        return accounts.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }


    // ============================================================
    // GET ACCOUNT BY ID
    // ============================================================

    @Override
    public AdminAccountResponse getAccountById(Long accountId) {

        Account account =
                accountRepository.findById(accountId);

        if (account == null) {
            return null;
        }

        return mapToResponse(account);
    }


    // ============================================================
    // MAP ACCOUNT → RESPONSE
    // ============================================================

    private AdminAccountResponse mapToResponse(Account account) {

        AdminAccountResponse response =
                new AdminAccountResponse();

        response.setAccountId(
                account.getAccountId()
        );

        response.setAccountNumber(
                account.getAccountNumber()
        );

        response.setCustomerId(
                account.getCustomerId()
        );

        response.setAccountType(
                account.getAccountType()
        );

        response.setBalance(
                account.getBalance()
        );

        response.setStatus(
                account.getStatus()
        );

        response.setCreatedAt(
                account.getCreatedAt()
        );

        return response;
    }
}