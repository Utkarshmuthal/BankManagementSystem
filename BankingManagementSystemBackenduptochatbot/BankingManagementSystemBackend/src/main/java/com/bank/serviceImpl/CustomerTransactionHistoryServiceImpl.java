package com.bank.serviceImpl;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.bank.dto.response.CustomerTransactionHistoryResponse;
import com.bank.repository.CustomerTransactionHistoryRepository;
import com.bank.service.CustomerTransactionHistoryService;

@Service
public class CustomerTransactionHistoryServiceImpl
        implements CustomerTransactionHistoryService {

    private final CustomerTransactionHistoryRepository repository;

    public CustomerTransactionHistoryServiceImpl(
            CustomerTransactionHistoryRepository repository) {

        this.repository = repository;
    }


    // =========================================================
    // GET TRANSACTION HISTORY
    // =========================================================

    @Override
    public List<CustomerTransactionHistoryResponse> getTransactions(
            String accountNumber,
            LocalDate fromDate,
            LocalDate toDate,
            String transactionType,
            String search,
            int page,
            int size) {

        // -----------------------------------------------------
        // Validate page
        // -----------------------------------------------------

        if (page < 0) {
            page = 0;
        }


        // -----------------------------------------------------
        // Validate size
        // -----------------------------------------------------

        if (size <= 0) {
            size = 8;
        }


        // -----------------------------------------------------
        // Calculate offset
        // -----------------------------------------------------

        int offset = page * size;


        // -----------------------------------------------------
        // Get transactions
        // -----------------------------------------------------

        return repository.getTransactions(
                accountNumber,
                fromDate,
                toDate,
                transactionType,
                search,
                offset,
                size
        );
    }


    // =========================================================
    // GET TOTAL TRANSACTION COUNT
    // =========================================================

    @Override
    public int getTransactionCount(
            String accountNumber,
            LocalDate fromDate,
            LocalDate toDate,
            String transactionType,
            String search) {

        return repository.getTransactionCount(
                accountNumber,
                fromDate,
                toDate,
                transactionType,
                search
        );
    }


    // =========================================================
    // GET TOTAL DEPOSITS
    // =========================================================

    @Override
    public BigDecimal getTotalDeposits(
            String accountNumber,
            LocalDate fromDate,
            LocalDate toDate) {

        return repository.getTotalDeposits(
                accountNumber,
                fromDate,
                toDate
        );
    }


    // =========================================================
    // GET TOTAL WITHDRAWALS
    // =========================================================

    @Override
    public BigDecimal getTotalWithdrawals(
            String accountNumber,
            LocalDate fromDate,
            LocalDate toDate) {

        return repository.getTotalWithdrawals(
                accountNumber,
                fromDate,
                toDate
        );
    }


    // =========================================================
    // GET CURRENT BALANCE
    // =========================================================

    @Override
    public BigDecimal getCurrentBalance(
            String accountNumber) {

        return repository.getCurrentBalance(
                accountNumber
        );
    }
}