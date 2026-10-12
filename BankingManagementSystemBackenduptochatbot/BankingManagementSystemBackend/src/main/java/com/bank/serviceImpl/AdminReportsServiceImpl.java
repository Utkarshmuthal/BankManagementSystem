package com.bank.serviceImpl;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.springframework.stereotype.Service;

import com.bank.dto.response.AdminReportsResponse;
import com.bank.repository.AdminReportsRepository;
import com.bank.service.AdminReportsService;

@Service
public class AdminReportsServiceImpl
        implements AdminReportsService {

    private final AdminReportsRepository repository;


    public AdminReportsServiceImpl(
            AdminReportsRepository repository) {

        this.repository = repository;
    }


    @Override
    public AdminReportsResponse getAdminReports(
            LocalDate fromDate,
            LocalDate toDate) {

        AdminReportsResponse response =
                new AdminReportsResponse();


        // =====================================================
        // DATE
        // =====================================================

        response.setFromDate(fromDate);
        response.setToDate(toDate);


        // =====================================================
        // TOP CARDS
        // =====================================================

        response.setTotalCustomers(
                repository.getTotalCustomers()
        );

        response.setTotalEmployees(
                repository.getTotalEmployees()
        );

        response.setTotalAccounts(
                repository.getTotalAccounts(
                        fromDate,
                        toDate
                )
        );

        response.setTotalTransactions(
                repository.getTotalTransactions(
                        fromDate,
                        toDate
                )
        );

        response.setTotalLoans(
                repository.getTotalLoans(
                        fromDate,
                        toDate
                )
        );


        // =====================================================
        // TRANSACTION SUMMARY
        // =====================================================

        response.setDepositCount(
                repository.getTransactionCount(
                        "DEPOSIT",
                        fromDate,
                        toDate
                )
        );

        response.setWithdrawalCount(
                repository.getTransactionCount(
                        "WITHDRAW",
                        fromDate,
                        toDate
                )
        );

        response.setTransferCount(
                repository.getTransactionCount(
                        "TRANSFER",
                        fromDate,
                        toDate
                )
        );


        response.setDepositAmount(
                repository.getTransactionAmount(
                        "DEPOSIT",
                        fromDate,
                        toDate
                )
        );

        response.setWithdrawalAmount(
                repository.getTransactionAmount(
                        "WITHDRAW",
                        fromDate,
                        toDate
                )
        );

        response.setTransferAmount(
                repository.getTransactionAmount(
                        "TRANSFER",
                        fromDate,
                        toDate
                )
        );


        // =====================================================
        // LOAN SUMMARY
        // =====================================================

        response.setTotalLoanApplications(
                repository.getTotalLoans(
                        fromDate,
                        toDate
                )
        );

        response.setApprovedLoans(
                repository.getLoanCount(
                        "APPROVED",
                        fromDate,
                        toDate
                )
        );

        response.setPendingLoans(
                repository.getLoanCount(
                        "PENDING",
                        fromDate,
                        toDate
                )
        );

        response.setRejectedLoans(
                repository.getLoanCount(
                        "REJECTED",
                        fromDate,
                        toDate
                )
        );


        response.setTotalLoanApplicationsAmount(
                repository.getTotalLoanApplicationsAmount(
                        fromDate,
                        toDate
                )
        );

        response.setApprovedLoanAmount(
                repository.getLoanAmount(
                        "APPROVED",
                        fromDate,
                        toDate
                )
        );

        response.setPendingLoanAmount(
                repository.getLoanAmount(
                        "PENDING",
                        fromDate,
                        toDate
                )
        );

        response.setRejectedLoanAmount(
                repository.getLoanAmount(
                        "REJECTED",
                        fromDate,
                        toDate
                )
        );


        // =====================================================
        // EMPLOYEE SUMMARY
        // =====================================================

        response.setActiveEmployees(
                repository.getEmployeeCountByStatus(
                        "ACTIVE"
                )
        );

        response.setInactiveEmployees(
                repository.getEmployeeCountByStatus(
                        "INACTIVE"
                )
        );

        response.setOnLeaveEmployees(
                repository.getEmployeeCountByStatus(
                        "ON_LEAVE"
                )
        );


        // =====================================================
        // ACCOUNT DISTRIBUTION
        // =====================================================

        response.setAccountTypeDistribution(
                repository.getAccountTypeDistribution()
        );


        // =====================================================
        // TRANSACTION CHART
        // =====================================================

        response.setMonthlyTransactionTrend(
                repository.getMonthlyTransactionTrend(
                        fromDate,
                        toDate
                )
        );


        // =====================================================
        // LOAN CHART
        // =====================================================

        response.setLoanApplicationTrend(
                repository.getLoanApplicationTrend(
                        fromDate,
                        toDate
                )
        );


        // =====================================================
        // BOTTOM CARDS
        // =====================================================

        response.setTotalDepositedAmount(
                repository.getTransactionAmount(
                        "DEPOSIT",
                        fromDate,
                        toDate
                )
        );

        response.setTotalWithdrawnAmount(
                repository.getTransactionAmount(
                        "WITHDRAW",
                        fromDate,
                        toDate
                )
        );

        response.setTotalTransferredAmount(
                repository.getTransactionAmount(
                        "TRANSFER",
                        fromDate,
                        toDate
                )
        );

        response.setTotalLoanDisbursed(
                repository.getLoanDisbursedAmount(
                        fromDate,
                        toDate
                )
        );

        response.setTotalInterestCollected(
                repository.getInterestCollected(
                        fromDate,
                        toDate
                )
        );


        return response;
    }
}