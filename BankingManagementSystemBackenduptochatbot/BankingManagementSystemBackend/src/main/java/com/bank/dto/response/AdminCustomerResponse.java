package com.bank.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class AdminCustomerResponse {

    private Long customerId;
    private Long userId;
    private String email;
    private String fullName;
    private LocalDate dob;
    private String gender;
    private String mobileNumber;
    private String address;
    private String city;
    private String state;
    private String pinCode;
    private String aadhaarNumber;
    private String panNumber;
    private String preferredAccountType;
    private String approvalStatus;
    private String aadhaarImage;
    private String panImage;
    private LocalDateTime appliedAt;

    public AdminCustomerResponse() {
    }

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
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

    public String getAadhaarNumber() {
        return aadhaarNumber;
    }

    public void setAadhaarNumber(String aadhaarNumber) {
        this.aadhaarNumber = aadhaarNumber;
    }

    public String getPanNumber() {
        return panNumber;
    }

    public void setPanNumber(String panNumber) {
        this.panNumber = panNumber;
    }

    public String getPreferredAccountType() {
        return preferredAccountType;
    }

    public void setPreferredAccountType(String preferredAccountType) {
        this.preferredAccountType = preferredAccountType;
    }

    public String getApprovalStatus() {
        return approvalStatus;
    }

    public void setApprovalStatus(String approvalStatus) {
        this.approvalStatus = approvalStatus;
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

    public LocalDateTime getAppliedAt() {
        return appliedAt;
    }

    public void setAppliedAt(LocalDateTime appliedAt) {
        this.appliedAt = appliedAt;
    }
}