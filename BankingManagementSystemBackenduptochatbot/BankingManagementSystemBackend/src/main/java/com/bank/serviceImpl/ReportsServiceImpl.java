package com.bank.serviceImpl;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.dto.request.ReportsRequest;
import com.bank.dto.response.ReportsResponse;
import com.bank.repository.ReportsRepository;
import com.bank.service.ReportsService;

@Service
public class ReportsServiceImpl implements ReportsService {

    @Autowired
    private ReportsRepository reportsRepository;


    @Override
    public ReportsResponse getReports(
            ReportsRequest request) {

        ReportsResponse response =
                new ReportsResponse();


        // =====================================================
        // DATE RANGE
        // =====================================================

        response.setFromDate(
                request.getFromDate()
        );

        response.setToDate(
                request.getToDate()
        );


        // =====================================================
        // TRANSACTION SUMMARY
        // =====================================================

        response.setTotalTransactions(
                reportsRepository.getTotalTransactions(
                        request.getFromDate(),
                        request.getToDate()
                )
        );


        response.setTotalDeposits(
                reportsRepository.getTransactionCount(
                        "DEPOSIT",
                        request.getFromDate(),
                        request.getToDate()
                )
        );


        response.setTotalWithdrawals(
                reportsRepository.getTransactionCount(
                        "WITHDRAW",
                        request.getFromDate(),
                        request.getToDate()
                )
        );


        response.setTotalTransfers(
                reportsRepository.getTransactionCount(
                        "TRANSFER",
                        request.getFromDate(),
                        request.getToDate()
                )
        );


        // =====================================================
        // AMOUNT SUMMARY
        // =====================================================

        BigDecimal depositedAmount =
                reportsRepository.getTransactionAmount(
                        "DEPOSIT",
                        request.getFromDate(),
                        request.getToDate()
                );

        response.setTotalDepositedAmount(
                depositedAmount != null
                        ? depositedAmount
                        : BigDecimal.ZERO
        );


        BigDecimal withdrawnAmount =
                reportsRepository.getTransactionAmount(
                        "WITHDRAW",
                        request.getFromDate(),
                        request.getToDate()
                );

        response.setTotalWithdrawnAmount(
                withdrawnAmount != null
                        ? withdrawnAmount
                        : BigDecimal.ZERO
        );


        BigDecimal transferredAmount =
                reportsRepository.getTransactionAmount(
                        "TRANSFER",
                        request.getFromDate(),
                        request.getToDate()
                );

        response.setTotalTransferredAmount(
                transferredAmount != null
                        ? transferredAmount
                        : BigDecimal.ZERO
        );


        // =====================================================
        // CUSTOMER SUMMARY
        // =====================================================

        response.setTotalCustomers(
                reportsRepository.getTotalCustomers()
        );


        response.setApprovedCustomers(
                reportsRepository.getCustomerCount(
                        "APPROVED"
                )
        );


        response.setPendingCustomers(
                reportsRepository.getCustomerCount(
                        "PENDING"
                )
        );


        response.setRejectedCustomers(
                reportsRepository.getCustomerCount(
                        "REJECTED"
                )
        );


        // =====================================================
        // ACCOUNT SUMMARY
        // =====================================================

        response.setTotalAccounts(
                reportsRepository.getTotalAccounts()
        );


        response.setSavingsAccounts(
                reportsRepository.getAccountTypeCount(
                        "SAVINGS"
                )
        );


        response.setCurrentAccounts(
                reportsRepository.getAccountTypeCount(
                        "CURRENT"
                )
        );


        // =====================================================
        // RECENT ACTIVITY
        // =====================================================

        response.setRecentActivity(
                reportsRepository.getRecentActivity(
                        request.getFromDate(),
                        request.getToDate()
                )
        );


        // =====================================================
        // MONTHLY / DAILY CHART
        // =====================================================

        response.setMonthlyChart(
                reportsRepository.getMonthlyChart(
                        request.getFromDate(),
                        request.getToDate()
                )
        );


        return response;
    }
}