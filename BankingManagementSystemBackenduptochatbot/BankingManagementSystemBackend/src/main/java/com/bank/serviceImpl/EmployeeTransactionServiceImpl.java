package com.bank.serviceImpl;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bank.dto.request.EmployeeTransactionRequest;
import com.bank.dto.response.EmployeeTransactionResponse;
import com.bank.repository.EmployeeTransactionRepository;
import com.bank.service.EmployeeTransactionService;

@Service
public class EmployeeTransactionServiceImpl
        implements EmployeeTransactionService {

    private final EmployeeTransactionRepository repository;

    public EmployeeTransactionServiceImpl(
            EmployeeTransactionRepository repository) {

        this.repository = repository;
    }


    // =========================================================
    // DEPOSIT
    // =========================================================

    @Override
    @Transactional
    public EmployeeTransactionResponse deposit(
            EmployeeTransactionRequest request) {

        String accountNumber =
                request.getAccountNumber();

        BigDecimal amount =
                request.getAmount();


        // -----------------------------
        // VALIDATION
        // -----------------------------

        if (accountNumber == null ||
                accountNumber.trim().isEmpty()) {

            throw new RuntimeException(
                    "Account number is required");
        }

        if (amount == null ||
                amount.compareTo(BigDecimal.ZERO) <= 0) {

            throw new RuntimeException(
                    "Deposit amount must be greater than zero");
        }


        // -----------------------------
        // ACCOUNT CHECK
        // -----------------------------

        if (!repository.accountExists(accountNumber)) {

            throw new RuntimeException(
                    "Account not found or inactive");
        }


        // -----------------------------
        // CURRENT BALANCE
        // -----------------------------

        BigDecimal currentBalance =
                repository.getBalance(accountNumber);


        BigDecimal newBalance =
                currentBalance.add(amount);


        // -----------------------------
        // UPDATE ACCOUNT
        // -----------------------------

        repository.updateBalance(
                accountNumber,
                newBalance
        );


        // -----------------------------
        // SAVE TRANSACTION
        // -----------------------------

        repository.insertTransaction(
                accountNumber,
                null,
                null,
                "DEPOSIT",
                amount,
                request.getDescription(),
                "SUCCESS"
        );


        return repository.getAccountDetails(
                accountNumber
        );
    }


    // =========================================================
    // WITHDRAW
    // =========================================================

    @Override
    @Transactional
    public EmployeeTransactionResponse withdraw(
            EmployeeTransactionRequest request) {

        String accountNumber =
                request.getAccountNumber();

        BigDecimal amount =
                request.getAmount();


        // -----------------------------
        // VALIDATION
        // -----------------------------

        if (accountNumber == null ||
                accountNumber.trim().isEmpty()) {

            throw new RuntimeException(
                    "Account number is required");
        }

        if (amount == null ||
                amount.compareTo(BigDecimal.ZERO) <= 0) {

            throw new RuntimeException(
                    "Withdraw amount must be greater than zero");
        }


        // -----------------------------
        // ACCOUNT CHECK
        // -----------------------------

        if (!repository.accountExists(accountNumber)) {

            throw new RuntimeException(
                    "Account not found or inactive");
        }


        // -----------------------------
        // CURRENT BALANCE
        // -----------------------------

        BigDecimal currentBalance =
                repository.getBalance(accountNumber);


        // -----------------------------
        // BALANCE CHECK
        // -----------------------------

        if (currentBalance.compareTo(amount) < 0) {

            throw new RuntimeException(
                    "Insufficient balance");
        }


        BigDecimal newBalance =
                currentBalance.subtract(amount);


        // -----------------------------
        // UPDATE BALANCE
        // -----------------------------

        repository.updateBalance(
                accountNumber,
                newBalance
        );


        // -----------------------------
        // SAVE TRANSACTION
        // -----------------------------

        repository.insertTransaction(
                accountNumber,
                null,
                null,
                "WITHDRAW",
                amount,
                request.getDescription(),
                "SUCCESS"
        );


        return repository.getAccountDetails(
                accountNumber
        );
    }


    // =========================================================
    // TRANSFER
    // =========================================================

    @Override
    @Transactional
    public EmployeeTransactionResponse transfer(
            EmployeeTransactionRequest request) {

        String fromAccount =
                request.getFromAccount();

        String toAccount =
                request.getToAccount();

        BigDecimal amount =
                request.getAmount();


        // -----------------------------
        // VALIDATION
        // -----------------------------

        if (fromAccount == null ||
                fromAccount.trim().isEmpty()) {

            throw new RuntimeException(
                    "Sender account number is required");
        }

        if (toAccount == null ||
                toAccount.trim().isEmpty()) {

            throw new RuntimeException(
                    "Receiver account number is required");
        }

        if (fromAccount.equals(toAccount)) {

            throw new RuntimeException(
                    "Sender and receiver account cannot be same");
        }

        if (amount == null ||
                amount.compareTo(BigDecimal.ZERO) <= 0) {

            throw new RuntimeException(
                    "Transfer amount must be greater than zero");
        }


        // -----------------------------
        // ACCOUNT CHECK
        // -----------------------------

        if (!repository.accountExists(fromAccount)) {

            throw new RuntimeException(
                    "Sender account not found");
        }

        if (!repository.accountExists(toAccount)) {

            throw new RuntimeException(
                    "Receiver account not found");
        }


        // -----------------------------
        // GET BALANCES
        // -----------------------------

        BigDecimal senderBalance =
                repository.getBalance(fromAccount);

        BigDecimal receiverBalance =
                repository.getBalance(toAccount);


        // -----------------------------
        // CHECK BALANCE
        // -----------------------------

        if (senderBalance.compareTo(amount) < 0) {

            throw new RuntimeException(
                    "Insufficient balance in sender account");
        }


        // -----------------------------
        // CALCULATE BALANCE
        // -----------------------------

        BigDecimal newSenderBalance =
                senderBalance.subtract(amount);

        BigDecimal newReceiverBalance =
                receiverBalance.add(amount);


        // -----------------------------
        // UPDATE SENDER
        // -----------------------------

        repository.updateBalance(
                fromAccount,
                newSenderBalance
        );


        // -----------------------------
        // UPDATE RECEIVER
        // -----------------------------

        repository.updateBalance(
                toAccount,
                newReceiverBalance
        );


        // -----------------------------
        // SAVE TRANSACTION
        // -----------------------------

        repository.insertTransaction(
                fromAccount,
                fromAccount,
                toAccount,
                "TRANSFER",
                amount,
                request.getDescription(),
                "SUCCESS"
        );


        return repository.getAccountDetails(
                fromAccount
        );
    }


    // =========================================================
    // ACCOUNT DETAILS
    // =========================================================

    @Override
    public EmployeeTransactionResponse getAccountDetails(
            String accountNumber) {

        if (!repository.accountExists(accountNumber)) {

            throw new RuntimeException(
                    "Account not found or inactive");
        }

        return repository.getAccountDetails(
                accountNumber
        );
    }


    // =========================================================
    // ALL TRANSACTIONS
    // =========================================================

    @Override
    public List<EmployeeTransactionResponse> getAllTransactions(
            int page,
            int size) {

        int offset = page * size;

        return repository.getAllTransactions(
                offset,
                size
        );
    }

    // =========================================================
    // PARTICULAR ACCOUNT HISTORY
    // =========================================================

    @Override
    public List<EmployeeTransactionResponse> getTransactionsByAccount(
            String accountNumber,
            int page,
            int size) {

        int offset = page * size;

        return repository.getTransactionsByAccount(
                accountNumber,
                offset,
                size
        );
    }
    }