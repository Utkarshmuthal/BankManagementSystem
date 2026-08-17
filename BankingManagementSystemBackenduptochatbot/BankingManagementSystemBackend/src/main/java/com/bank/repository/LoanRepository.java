package com.bank.repository;

import com.bank.entity.Loan;
import com.bank.entity.LoanAssessment;

import java.util.List;

public interface LoanRepository {

    Loan save(Loan loan);

    Loan findById(Long loanId);

    List<Loan> findAll();

    List<Loan> findByCustomerId(Long customerId);

    List<Loan> findByStatus(String status);

    void update(Loan loan);

    // ==============================
    // LOAN ASSESSMENT
    // ==============================

    LoanAssessment findAssessmentByLoanId(Long loanId);

    void saveAssessment(LoanAssessment assessment);

    void updateAssessment(LoanAssessment assessment);
}