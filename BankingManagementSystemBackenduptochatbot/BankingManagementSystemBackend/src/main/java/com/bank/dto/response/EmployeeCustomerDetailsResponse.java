package com.bank.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class EmployeeCustomerDetailsResponse {

    // =====================================================
    // CUSTOMER INFORMATION
    // =====================================================

    private Long customerId;

    private Long userId;

    private String fullName;

    private LocalDate dob;

    private String gender;

    private String mobile;

    private String email;

    private String address;

    private String city;

    private String state;

    private String pinCode;


    // =====================================================
    // KYC INFORMATION
    // =====================================================

    private String aadhaarNo;

    private String panNo;

    private String aadhaarImage;

    private String panImage;


    // =====================================================
    // CUSTOMER APPROVAL
    // =====================================================

    private String approvalStatus;


    // =====================================================
    // ACCOUNT INFORMATION
    // =====================================================

    private String accountNumber;

    private String accountType;

    private BigDecimal balance;

    private String accountStatus;

    private LocalDateTime accountOpenedOn;

    private String ifscCode;

    private String branchName;


    // =====================================================
    // REGISTRATION INFORMATION
    // =====================================================

    private LocalDateTime registrationDate;

    private LocalDateTime approvalDate;

    private String approvedBy;


    // =====================================================
    // GETTERS / SETTERS
    // =====================================================

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }


    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }


    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }


    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }


    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }


    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }


    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }


    public String getPinCode() {
        return pinCode;
    }

    public void setPinCode(String pinCode) {
        this.pinCode = pinCode;
    }


    public String getAadhaarNo() {
        return aadhaarNo;
    }

    public void setAadhaarNo(String aadhaarNo) {
        this.aadhaarNo = aadhaarNo;
    }


    public String getPanNo() {
        return panNo;
    }

    public void setPanNo(String panNo) {
        this.panNo = panNo;
    }


    public String getAadhaarImage() {
        return aadhaarImage;
    }

    public void setAadhaarImage(String aadhaarImage) {
        this.aadhaarImage = aadhaarImage;
    }


    public String getPanImage() {
        return panImage;
    }

    public void setPanImage(String panImage) {
        this.panImage = panImage;
    }


    public String getApprovalStatus() {
        return approvalStatus;
    }

    public void setApprovalStatus(String approvalStatus) {
        this.approvalStatus = approvalStatus;
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


    public LocalDateTime getAccountOpenedOn() {
        return accountOpenedOn;
    }

    public void setAccountOpenedOn(LocalDateTime accountOpenedOn) {
        this.accountOpenedOn = accountOpenedOn;
    }


    public String getIfscCode() {
        return ifscCode;
    }

    public void setIfscCode(String ifscCode) {
        this.ifscCode = ifscCode;
    }


    public String getBranchName() {
        return branchName;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }


    public LocalDateTime getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(LocalDateTime registrationDate) {
        this.registrationDate = registrationDate;
    }


    public LocalDateTime getApprovalDate() {
        return approvalDate;
    }

    public void setApprovalDate(LocalDateTime approvalDate) {
        this.approvalDate = approvalDate;
    }


    public String getApprovedBy() {
        return approvedBy;
    }

    public void setApprovedBy(String approvedBy) {
        this.approvedBy = approvedBy;
    }
}