package com.bank.controller;

import com.bank.entity.Loan;
import com.bank.service.LoanService;
import com.bank.entity.LoanAssessment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loans")
//@RequestMapping("/loans")

public class LoanController {

    private final LoanService loanService;

    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    // Apply for a loan
    @PostMapping("/apply")
    public ResponseEntity<Loan> applyLoan(@RequestBody Loan loan) {

        Loan savedLoan = loanService.applyLoan(loan);

        return new ResponseEntity<>(savedLoan, HttpStatus.CREATED);
    }

    // Get loan by ID
    @GetMapping("/{loanId}")
    public ResponseEntity<Loan> getLoanById(
            @PathVariable Long loanId) {

        return ResponseEntity.ok(
                loanService.getLoanById(loanId)
        );
    }

    // Get all loans
    @GetMapping
    public ResponseEntity<List<Loan>> getAllLoans() {

        return ResponseEntity.ok(
                loanService.getAllLoans()
        );
    }

    // Get loans by customer
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Loan>> getLoansByCustomer(
            @PathVariable Long customerId) {

        return ResponseEntity.ok(
                loanService.getLoansByCustomer(customerId)
        );
    }

    // Get loans by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Loan>> getLoansByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                loanService.getLoansByStatus(status)
        );
    }

    // Approve loan
    @PutMapping("/{loanId}/approve")
    public ResponseEntity<Loan> approveLoan(
            @PathVariable Long loanId,
            @RequestParam Double interestRate) {

        Loan approvedLoan =
                loanService.approveLoan(loanId, interestRate);

        return ResponseEntity.ok(approvedLoan);
    }

    // Reject loan
    @PutMapping("/{loanId}/reject")
    public ResponseEntity<Loan> rejectLoan(
            @PathVariable Long loanId,
            @RequestParam String rejectionReason) {

        Loan rejectedLoan =
                loanService.rejectLoan(
                        loanId,
                        rejectionReason
                );

        return ResponseEntity.ok(rejectedLoan);
    }
 // =========================================================
 // LOAN ASSESSMENT
 // =========================================================

 @GetMapping("/{loanId}/assessment")
 public ResponseEntity<LoanAssessment> getAssessment(
         @PathVariable Long loanId) {

     LoanAssessment assessment =
             loanService.getAssessment(loanId);

     return ResponseEntity.ok(assessment);
 }


 @PostMapping("/{loanId}/assessment")
 public ResponseEntity<LoanAssessment> createAssessment(
         @PathVariable Long loanId,
         @RequestBody LoanAssessment assessment) {

     assessment.setLoanId(loanId);

     LoanAssessment savedAssessment =
             loanService.createAssessment(assessment);

     return new ResponseEntity<>(
             savedAssessment,
             HttpStatus.CREATED
     );
 }


 @PutMapping("/{loanId}/assessment")
 public ResponseEntity<LoanAssessment> updateAssessment(
         @PathVariable Long loanId,
         @RequestBody LoanAssessment assessment) {

     assessment.setLoanId(loanId);

     LoanAssessment updatedAssessment =
             loanService.updateAssessment(assessment);

     return ResponseEntity.ok(updatedAssessment);
 }
}