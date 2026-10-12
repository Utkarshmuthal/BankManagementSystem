package com.bank.repository;

import java.util.List;

import com.bank.entity.Account;

public interface AccountRepository {

    int save(Account account);

    boolean existsByCustomerId(Long customerId);

    List<Account> findAll();

    Account findById(Long accountId);

    /**
     * Returns the customer's active account to use for loan
     * disbursement / EMI debits. If a customer has more than one
     * active account, the most recently created one is returned.
     * Returns null if the customer has no active account.
     */
    Account findByCustomerId(Long customerId);
}