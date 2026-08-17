package com.bank.dto.response;

import java.time.LocalDate;

public class CustomerProfileResponse {

    private Long customerId;
    private Long userId;

    private String email;
    private String fullName;
    private LocalDate dob;
    private String gender;
    private String mobile;

    private String address;
    private String city;
    private String state;
    private String pinCode;

    private String aadhaarNo;
    private String panNo;
    private String profileImage;
    public String getProfileImage() {
		return profileImage;
	}


	public void setProfileImage(String profileImage) {
		this.profileImage = profileImage;
	}

	private String accountType;
    private String approvalStatus;


    public CustomerProfileResponse() {
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


    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
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


    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }


    public String getApprovalStatus() {
        return approvalStatus;
    }

    public void setApprovalStatus(String approvalStatus) {
        this.approvalStatus = approvalStatus;
    }
}