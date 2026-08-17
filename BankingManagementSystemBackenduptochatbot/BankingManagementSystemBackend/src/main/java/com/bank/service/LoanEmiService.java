package com.bank.service;

import com.bank.entity.LoanEmi;

import java.math.BigDecimal;
import java.util.List;

public interface LoanEmiService {

    List<LoanEmi> getEmisByLoanId(Long loanId);

    LoanEmi getEmiById(Long emiId);

    LoanEmi payEmi(Long emiId, BigDecimal paidAmount);

    void generateEmiSchedule(
            Long loanId,
            BigDecimal principal,
            BigDecimal annualInterestRate,
            Integer tenureMonths,
            BigDecimal emiAmount,
            java.time.LocalDate startDate
    );
}