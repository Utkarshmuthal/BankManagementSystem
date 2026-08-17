package com.bank.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public class ReportsResponse {

    private LocalDate fromDate;

    private LocalDate toDate;


    // =====================================================
    // TRANSACTION SUMMARY
    // =====================================================

    private int totalTransactions;

    private int totalDeposits;

    private int totalWithdrawals;

    private int totalTransfers;


    // =====================================================
    // AMOUNT SUMMARY
    // =====================================================

    private BigDecimal totalDepositedAmount;

    private BigDecimal totalWithdrawnAmount;

    private BigDecimal totalTransferredAmount;


    // =====================================================
    // CUSTOMER SUMMARY
    // =====================================================

    private int totalCustomers;

    private int approvedCustomers;

    private int pendingCustomers;

    private int rejectedCustomers;


    // =====================================================
    // ACCOUNT SUMMARY
    // =====================================================

    private int totalAccounts;

    private int savingsAccounts;

    private int currentAccounts;


    // =====================================================
    // RECENT ACTIVITY
    // =====================================================

    private List<Map<String, Object>> recentActivity;


    // =====================================================
    // MONTHLY TRANSACTION CHART
    // =====================================================

    private List<Map<String, Object>> monthlyChart;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public ReportsResponse() {
    }


    // =====================================================
    // GETTERS AND SETTERS
    // =====================================================

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


    public int getTotalTransactions() {
        return totalTransactions;
    }


    public void setTotalTransactions(int totalTransactions) {
        this.totalTransactions = totalTransactions;
    }


    public int getTotalDeposits() {
        return totalDeposits;
    }


    public void setTotalDeposits(int totalDeposits) {
        this.totalDeposits = totalDeposits;
    }


    public int getTotalWithdrawals() {
        return totalWithdrawals;
    }


    public void setTotalWithdrawals(int totalWithdrawals) {
        this.totalWithdrawals = totalWithdrawals;
    }


    public int getTotalTransfers() {
        return totalTransfers;
    }


    public void setTotalTransfers(int totalTransfers) {
        this.totalTransfers = totalTransfers;
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


    public int getTotalCustomers() {
        return totalCustomers;
    }


    public void setTotalCustomers(int totalCustomers) {
        this.totalCustomers = totalCustomers;
    }


    public int getApprovedCustomers() {
        return approvedCustomers;
    }


    public void setApprovedCustomers(int approvedCustomers) {
        this.approvedCustomers =
                approvedCustomers;
    }


    public int getPendingCustomers() {
        return pendingCustomers;
    }


    public void setPendingCustomers(int pendingCustomers) {
        this.pendingCustomers =
                pendingCustomers;
    }


    public int getRejectedCustomers() {
        return rejectedCustomers;
    }


    public void setRejectedCustomers(int rejectedCustomers) {
        this.rejectedCustomers =
                rejectedCustomers;
    }


    public int getTotalAccounts() {
        return totalAccounts;
    }


    public void setTotalAccounts(int totalAccounts) {
        this.totalAccounts =
                totalAccounts;
    }


    public int getSavingsAccounts() {
        return savingsAccounts;
    }


    public void setSavingsAccounts(int savingsAccounts) {
        this.savingsAccounts =
                savingsAccounts;
    }


    public int getCurrentAccounts() {
        return currentAccounts;
    }


    public void setCurrentAccounts(int currentAccounts) {
        this.currentAccounts =
                currentAccounts;
    }


    public List<Map<String, Object>> getRecentActivity() {
        return recentActivity;
    }


    public void setRecentActivity(
            List<Map<String, Object>> recentActivity) {

        this.recentActivity =
                recentActivity;
    }


    public List<Map<String, Object>> getMonthlyChart() {
        return monthlyChart;
    }


    public void setMonthlyChart(
            List<Map<String, Object>> monthlyChart) {

        this.monthlyChart =
                monthlyChart;
    }
}