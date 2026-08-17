package com.bank.dto.response;

import java.math.BigDecimal;

public class CustomerDashboardResponse {

    private Long customerId;
    private String customerName;
    private String accountNumber;
    private String accountType;
    private BigDecimal balance;
    private String accountStatus;
    private String kycStatus;

    public CustomerDashboardResponse() {
    }

    public CustomerDashboardResponse(Long customerId, String customerName,
                                     String accountNumber, String accountType,
                                     BigDecimal balance,
                                     String accountStatus,
                                     String kycStatus) {

        this.customerId = customerId;
        this.customerName = customerName;
        this.accountNumber = accountNumber;
        this.accountType = accountType;
        this.balance = balance;
        this.accountStatus = accountStatus;
        this.kycStatus = kycStatus;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public String getAccountStatus() {
        return accountStatus;
    }

    public void setAccountStatus(String accountStatus) {
        this.accountStatus = accountStatus;
    }

    public String getKycStatus() {
        return kycStatus;
    }

    public void setKycStatus(String kycStatus) {
        this.kycStatus = kycStatus;
    }
}