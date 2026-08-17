package com.bank.exception;

public class LoanApplicationException extends RuntimeException {

    public LoanApplicationException(String message) {
        super(message);
    }
}