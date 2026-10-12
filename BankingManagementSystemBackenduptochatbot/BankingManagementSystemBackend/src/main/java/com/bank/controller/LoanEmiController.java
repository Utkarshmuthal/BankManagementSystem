package com.bank.controller;

import com.bank.entity.LoanEmi;
import com.bank.service.LoanEmiService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/loan-emis")
//@RequestMapping("/loan-emis")


public class LoanEmiController {

    private final LoanEmiService loanEmiService;

    public LoanEmiController(LoanEmiService loanEmiService) {
        this.loanEmiService = loanEmiService;
    }

    // Get all EMIs for a loan
    @GetMapping("/loan/{loanId}")
    public ResponseEntity<List<LoanEmi>> getEmisByLoanId(
            @PathVariable Long loanId) {

        return ResponseEntity.ok(
                loanEmiService.getEmisByLoanId(loanId)
        );
    }

    // Get EMI by ID
    @GetMapping("/{emiId}")
    public ResponseEntity<LoanEmi> getEmiById(
            @PathVariable Long emiId) {

        return ResponseEntity.ok(
                loanEmiService.getEmiById(emiId)
        );
    }

    // Pay EMI
    @PutMapping("/{emiId}/pay")
    public ResponseEntity<LoanEmi> payEmi(
            @PathVariable Long emiId,
            @RequestParam BigDecimal paidAmount) {

        return ResponseEntity.ok(
                loanEmiService.payEmi(
                        emiId,
                        paidAmount
                )
        );
    }
}