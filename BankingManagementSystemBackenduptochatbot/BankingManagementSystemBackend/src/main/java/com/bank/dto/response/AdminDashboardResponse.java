package com.bank.dto.response;

import java.math.BigDecimal;

public class AdminDashboardResponse {

    private int totalCustomers;
    private int totalEmployees;
    private int totalAccounts;
    private int totalLoans;
    private int pendingKyc;

    private BigDecimal todayDeposits;
    private BigDecimal todayWithdrawals;

    private int totalTransactions;


    public AdminDashboardResponse() {
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


    public int getTotalLoans() {
        return totalLoans;
    }

    public void setTotalLoans(int totalLoans) {
        this.totalLoans = totalLoans;
    }


    public int getPendingKyc() {
        return pendingKyc;
    }

    public void setPendingKyc(int pendingKyc) {
        this.pendingKyc = pendingKyc;
    }


    public BigDecimal getTodayDeposits() {
        return todayDeposits;
    }

    public void setTodayDeposits(BigDecimal todayDeposits) {
        this.todayDeposits = todayDeposits;
    }


    public BigDecimal getTodayWithdrawals() {
        return todayWithdrawals;
    }

    public void setTodayWithdrawals(BigDecimal todayWithdrawals) {
        this.todayWithdrawals = todayWithdrawals;
    }


    public int getTotalTransactions() {
        return totalTransactions;
    }

    public void setTotalTransactions(int totalTransactions) {
        this.totalTransactions = totalTransactions;
    }
}