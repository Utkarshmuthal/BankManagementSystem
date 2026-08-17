package com.bank.service;

import com.bank.entity.Loan;
import com.bank.entity.LoanAssessment;
import java.util.List;

public interface LoanService {

    Loan applyLoan(Loan loan);

    Loan getLoanById(Long loanId);

    List<Loan> getAllLoans();

    List<Loan> getLoansByCustomer(Long customerId);

    List<Loan> getLoansByStatus(String status);

    Loan approveLoan(Long loanId, Double interestRate);

    Loan rejectLoan(Long loanId, String rejectionReason);
    
    LoanAssessment getAssessment(Long loanId);

    LoanAssessment createAssessment(LoanAssessment assessment);

    LoanAssessment updateAssessment(LoanAssessment assessment);
}