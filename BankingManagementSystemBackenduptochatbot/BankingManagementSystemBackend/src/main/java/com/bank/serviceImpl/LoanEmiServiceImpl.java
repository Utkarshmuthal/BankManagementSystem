package com.bank.serviceImpl;
import com.bank.entity.Account;
import com.bank.entity.Loan;
import com.bank.entity.LoanEmi;
import com.bank.repository.AccountRepository;
import com.bank.repository.EmployeeTransactionRepository;
import com.bank.repository.LoanRepository;
import com.bank.repository.LoanEmiRepository;
import com.bank.service.LoanEmiService;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;

@Service
public class LoanEmiServiceImpl implements LoanEmiService {

	private final LoanEmiRepository loanEmiRepository;
	private final LoanRepository loanRepository;
	private final AccountRepository accountRepository;
	private final EmployeeTransactionRepository transactionRepository;

	public LoanEmiServiceImpl(
	        LoanEmiRepository loanEmiRepository,
	        LoanRepository loanRepository,
	        AccountRepository accountRepository,
	        EmployeeTransactionRepository transactionRepository) {

	    this.loanEmiRepository = loanEmiRepository;
	    this.loanRepository = loanRepository;
	    this.accountRepository = accountRepository;
	    this.transactionRepository = transactionRepository;
	}

    @Override
    public List<LoanEmi> getEmisByLoanId(Long loanId) {

        return loanEmiRepository.findByLoanId(loanId);
    }

    @Override
    public LoanEmi getEmiById(Long emiId) {

        LoanEmi emi = loanEmiRepository.findById(emiId);

        if (emi == null) {
            throw new RuntimeException(
                    "EMI not found with ID: " + emiId
            );
        }

        return emi;
    }

    @Override
    @Transactional
    public LoanEmi payEmi(
            Long emiId,
            BigDecimal paidAmount) {

        LoanEmi emi =
                loanEmiRepository.findById(emiId);

        if (emi == null) {
            throw new RuntimeException(
                    "EMI not found"
            );
        }

        if ("PAID".equalsIgnoreCase(
                emi.getStatus())) {

            throw new RuntimeException(
                    "EMI is already paid"
            );
        }

        if (paidAmount == null
                || paidAmount.compareTo(
                        BigDecimal.ZERO) <= 0) {

            throw new RuntimeException(
                    "Payment amount must be greater than zero"
            );
        }

        if (paidAmount.compareTo(
                emi.getEmiAmount()) != 0) {

            throw new RuntimeException(
                    "Payment amount must be exactly "
                            + emi.getEmiAmount()
            );
        }

        // -------------------------------------------------
        // Debit the linked account before marking EMI paid
        // -------------------------------------------------

        Loan loan =
                loanRepository.findById(emi.getLoanId());

        if (loan == null) {
            throw new RuntimeException(
                    "Loan not found for this EMI"
            );
        }

        Account customerAccount =
                accountRepository.findByCustomerId(
                        loan.getCustomerId()
                );

        if (customerAccount == null) {
            throw new RuntimeException(
                    "Customer does not have an active account "
                            + "to pay this EMI from"
            );
        }

        BigDecimal currentBalance =
                transactionRepository.getBalance(
                        customerAccount.getAccountNumber()
                );

        if (currentBalance.compareTo(paidAmount) < 0) {
            throw new RuntimeException(
                    "Insufficient balance to pay this EMI"
            );
        }

        transactionRepository.updateBalance(
                customerAccount.getAccountNumber(),
                currentBalance.subtract(paidAmount)
        );

        transactionRepository.insertTransaction(
                customerAccount.getAccountNumber(),
                null,
                null,
                "EMI_PAYMENT",
                paidAmount,
                "EMI #" + emi.getEmiNumber()
                        + " for Loan #" + loan.getLoanId(),
                "SUCCESS"
        );

        // Mark EMI as paid
        emi.setPaidAmount(paidAmount);
        emi.setPaymentDate(LocalDate.now());
        emi.setStatus("PAID");

        loanEmiRepository.update(emi);

        // -------------------------------------------------
        // Check all EMIs
        // -------------------------------------------------

        List<LoanEmi> allEmis =
                loanEmiRepository.findByLoanId(
                        emi.getLoanId()
                );

        boolean allPaid =
                allEmis.stream()
                        .allMatch(e ->
                                "PAID".equalsIgnoreCase(
                                        e.getStatus()
                                )
                        );

        // -------------------------------------------------
        // Close loan when all EMIs are paid
        // -------------------------------------------------

        if (allPaid) {

            loan.setStatus("CLOSED");

            loanRepository.update(loan);
        }

        return emi;
    }
    @Override
    public void generateEmiSchedule(
            Long loanId,
            BigDecimal principal,
            BigDecimal annualInterestRate,
            Integer tenureMonths,
            BigDecimal emiAmount,
            LocalDate startDate) {

        BigDecimal monthlyRate =
                annualInterestRate.divide(
                        BigDecimal.valueOf(1200),
                        10,
                        RoundingMode.HALF_UP
                );

        BigDecimal outstandingPrincipal = principal;

        for (int month = 1; month <= tenureMonths; month++) {

            BigDecimal interestAmount =
                    outstandingPrincipal
                            .multiply(monthlyRate)
                            .setScale(
                                    2,
                                    RoundingMode.HALF_UP
                            );

            BigDecimal principalAmount =
                    emiAmount
                            .subtract(interestAmount)
                            .setScale(
                                    2,
                                    RoundingMode.HALF_UP
                            );

            if (principalAmount.compareTo(
                    outstandingPrincipal) > 0) {

                principalAmount = outstandingPrincipal;
            }

            BigDecimal actualEmi =
                    principalAmount
                            .add(interestAmount)
                            .setScale(
                                    2,
                                    RoundingMode.HALF_UP
                            );

            LoanEmi emi = new LoanEmi();

            emi.setLoanId(loanId);
            emi.setEmiNumber(month);

            emi.setDueDate(
                    startDate.plusMonths(month)
            );

            emi.setEmiAmount(actualEmi);
            emi.setPrincipalAmount(principalAmount);
            emi.setInterestAmount(interestAmount);

            emi.setPaidAmount(BigDecimal.ZERO);
            emi.setPaymentDate(null);
            emi.setStatus("PENDING");

            loanEmiRepository.save(emi);

            outstandingPrincipal =
                    outstandingPrincipal
                            .subtract(principalAmount)
                            .setScale(
                                    2,
                                    RoundingMode.HALF_UP
                            );

            if (outstandingPrincipal.compareTo(
                    BigDecimal.ZERO) <= 0) {

                break;
            }
        }
    }
}