package com.bank.exception;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(LoanApplicationException.class)
    public ResponseEntity<?> handleLoanApplicationException(
            LoanApplicationException ex) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of(
                        "status", 400,
                        "error", "Loan Application Not Allowed",
                        "message", ex.getMessage()
                ));
    }
}