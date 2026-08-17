package com.bank.repository;

import java.util.List;

import com.bank.entity.Account;

public interface AccountRepository {

    int save(Account account);

    boolean existsByCustomerId(Long customerId);

    List<Account> findAll();

    Account findById(Long accountId);
}