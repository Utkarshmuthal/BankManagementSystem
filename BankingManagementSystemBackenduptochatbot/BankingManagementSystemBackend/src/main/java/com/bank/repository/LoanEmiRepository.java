package com.bank.repository;

import com.bank.entity.LoanEmi;

import java.util.List;

public interface LoanEmiRepository {

    LoanEmi save(LoanEmi emi);

    List<LoanEmi> findByLoanId(Long loanId);

    LoanEmi findById(Long emiId);

    void update(LoanEmi emi);
}