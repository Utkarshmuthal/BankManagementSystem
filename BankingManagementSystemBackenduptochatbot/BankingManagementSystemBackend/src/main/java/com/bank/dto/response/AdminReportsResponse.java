package com.bank.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public class AdminReportsResponse {

    private LocalDate fromDate;
    private LocalDate toDate;

    // ============================
    // TOP CARDS
    // ============================

    private int totalCustomers;
    private int totalEmployees;
    private int totalAccounts;
    private int totalTransactions;
    private int totalLoans;

    // ============================
    // TRANSACTION SUMMARY
    // ============================

    private int depositCount;
    private int withdrawalCount;
    private int transferCount;

    private BigDecimal depositAmount;
    private BigDecimal withdrawalAmount;
    private BigDecimal transferAmount;

    // ============================
    // LOAN SUMMARY
    // ============================

    private int totalLoanApplications;
    private int approvedLoans;
    private int pendingLoans;
    private int rejectedLoans;

    private BigDecimal totalLoanApplicationsAmount;
    private BigDecimal approvedLoanAmount;
    private BigDecimal pendingLoanAmount;
    private BigDecimal rejectedLoanAmount;

    // ============================
    // EMPLOYEE SUMMARY
    // ============================

    private int activeEmployees;
    private int inactiveEmployees;
    private int onLeaveEmployees;

    // ============================
    // ACCOUNT DISTRIBUTION
    // ============================

    private List<Map<String, Object>> accountTypeDistribution;

    // ============================
    // MONTHLY TRANSACTION TREND
    // ============================

    private List<Map<String, Object>> monthlyTransactionTrend;

    // ============================
    // LOAN APPLICATION TREND
    // ============================

    private List<Map<String, Object>> loanApplicationTrend;

    // ============================
    // BOTTOM AMOUNTS
    // ============================

    private BigDecimal totalDepositedAmount;
    private BigDecimal totalWithdrawnAmount;
    private BigDecimal totalTransferredAmount;
    private BigDecimal totalLoanDisbursed;
    private BigDecimal totalInterestCollected;


    public AdminReportsResponse() {
    }


    public LocalDate getFromDate() {
        return fromDate;
    }

    public void setFromDate(LocalDate fromDate) {
        this.fromDate = fromDate;
    }


    public LocalDate getToDate() {
        return toDate;
    }

    public void setToDate(LocalDate toDate) {
        this.toDate = toDate;
    }


    public int getTotalCustomers() {
        return totalCustomers;
    }

    public void setTotalCustomers(int totalCustomers) {
        this.totalCustomers = totalCustomers;
    }


    public int getTotalEmployees() {
        return totalEmployees;
    }

    public void setTotalEmployees(int totalEmployees) {
        this.totalEmployees = totalEmployees;
    }


    public int getTotalAccounts() {
        return totalAccounts;
    }

    public void setTotalAccounts(int totalAccounts) {
        this.totalAccounts = totalAccounts;
    }


    public int getTotalTransactions() {
        return totalTransactions;
    }

    public void setTotalTransactions(int totalTransactions) {
        this.totalTransactions = totalTransactions;
    }


    public int getTotalLoans() {
        return totalLoans;
    }

    public void setTotalLoans(int totalLoans) {
        this.totalLoans = totalLoans;
    }


    public int getDepositCount() {
        return depositCount;
    }

    public void setDepositCount(int depositCount) {
        this.depositCount = depositCount;
    }


    public int getWithdrawalCount() {
        return withdrawalCount;
    }

    public void setWithdrawalCount(int withdrawalCount) {
        this.withdrawalCount = withdrawalCount;
    }


    public int getTransferCount() {
        return transferCount;
    }

    public void setTransferCount(int transferCount) {
        this.transferCount = transferCount;
    }


    public BigDecimal getDepositAmount() {
        return depositAmount;
    }

    public void setDepositAmount(BigDecimal depositAmount) {
        this.depositAmount = depositAmount;
    }


    public BigDecimal getWithdrawalAmount() {
        return withdrawalAmount;
    }

    public void setWithdrawalAmount(BigDecimal withdrawalAmount) {
        this.withdrawalAmount = withdrawalAmount;
    }


    public BigDecimal getTransferAmount() {
        return transferAmount;
    }

    public void setTransferAmount(BigDecimal transferAmount) {
        this.transferAmount = transferAmount;
    }


    public int getTotalLoanApplications() {
        return totalLoanApplications;
    }

    public void setTotalLoanApplications(int totalLoanApplications) {
        this.totalLoanApplications = totalLoanApplications;
    }


    public int getApprovedLoans() {
        return approvedLoans;
    }

    public void setApprovedLoans(int approvedLoans) {
        this.approvedLoans = approvedLoans;
    }


    public int getPendingLoans() {
        return pendingLoans;
    }

    public void setPendingLoans(int pendingLoans) {
        this.pendingLoans = pendingLoans;
    }


    public int getRejectedLoans() {
        return rejectedLoans;
    }

    public void setRejectedLoans(int rejectedLoans) {
        this.rejectedLoans = rejectedLoans;
    }


    public BigDecimal getTotalLoanApplicationsAmount() {
        return totalLoanApplicationsAmount;
    }

    public void setTotalLoanApplicationsAmount(
            BigDecimal totalLoanApplicationsAmount) {
        this.totalLoanApplicationsAmount =
                totalLoanApplicationsAmount;
    }


    public BigDecimal getApprovedLoanAmount() {
        return approvedLoanAmount;
    }

    public void setApprovedLoanAmount(BigDecimal approvedLoanAmount) {
        this.approvedLoanAmount = approvedLoanAmount;
    }


    public BigDecimal getPendingLoanAmount() {
        return pendingLoanAmount;
    }

    public void setPendingLoanAmount(BigDecimal pendingLoanAmount) {
        this.pendingLoanAmount = pendingLoanAmount;
    }


    public BigDecimal getRejectedLoanAmount() {
        return rejectedLoanAmount;
    }

    public void setRejectedLoanAmount(BigDecimal rejectedLoanAmount) {
        this.rejectedLoanAmount = rejectedLoanAmount;
    }


    public int getActiveEmployees() {
        return activeEmployees;
    }

    public void setActiveEmployees(int activeEmployees) {
        this.activeEmployees = activeEmployees;
    }


    public int getInactiveEmployees() {
        return inactiveEmployees;
    }

    public void setInactiveEmployees(int inactiveEmployees) {
        this.inactiveEmployees = inactiveEmployees;
    }


    public int getOnLeaveEmployees() {
        return onLeaveEmployees;
    }

    public void setOnLeaveEmployees(int onLeaveEmployees) {
        this.onLeaveEmployees = onLeaveEmployees;
    }


    public List<Map<String, Object>> getAccountTypeDistribution() {
        return accountTypeDistribution;
    }

    public void setAccountTypeDistribution(
            List<Map<String, Object>> accountTypeDistribution) {
        this.accountTypeDistribution =
                accountTypeDistribution;
    }


    public List<Map<String, Object>> getMonthlyTransactionTrend() {
        return monthlyTransactionTrend;
    }

    public void setMonthlyTransactionTrend(
            List<Map<String, Object>> monthlyTransactionTrend) {
        this.monthlyTransactionTrend =
                monthlyTransactionTrend;
    }


    public List<Map<String, Object>> getLoanApplicationTrend() {
        return loanApplicationTrend;
    }

    public void setLoanApplicationTrend(
            List<Map<String, Object>> loanApplicationTrend) {
        this.loanApplicationTrend =
                loanApplicationTrend;
    }


    public BigDecimal getTotalDepositedAmount() {
        return totalDepositedAmount;
    }

    public void setTotalDepositedAmount(
            BigDecimal totalDepositedAmount) {
        this.totalDepositedAmount =
                totalDepositedAmount;
    }


    public BigDecimal getTotalWithdrawnAmount() {
        return totalWithdrawnAmount;
    }

    public void setTotalWithdrawnAmount(
            BigDecimal totalWithdrawnAmount) {
        this.totalWithdrawnAmount =
                totalWithdrawnAmount;
    }


    public BigDecimal getTotalTransferredAmount() {
        return totalTransferredAmount;
    }

    public void setTotalTransferredAmount(
            BigDecimal totalTransferredAmount) {
        this.totalTransferredAmount =
                totalTransferredAmount;
    }


    public BigDecimal getTotalLoanDisbursed() {
        return totalLoanDisbursed;
    }

    public void setTotalLoanDisbursed(
            BigDecimal totalLoanDisbursed) {
        this.totalLoanDisbursed =
                totalLoanDisbursed;
    }


    public BigDecimal getTotalInterestCollected() {
        return totalInterestCollected;
    }

    public void setTotalInterestCollected(
            BigDecimal totalInterestCollected) {
        this.totalInterestCollected =
                totalInterestCollected;
    }
}