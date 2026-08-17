package com.bank.dto.request;

import java.time.LocalDate;


import org.springframework.web.multipart.MultipartFile;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class CustomerRegistrationRequest {

	@Override
	public String toString() {
		return "CustomerRegistrationRequest [email=" + email + ", password=" + password + ", fullName=" + fullName
				+ ", dob=" + dob + ", gender=" + gender + ", mobile=" + mobile + ", address=" + address + ", city="
				+ city + ", state=" + state + ", pinCode=" + pinCode + ", aadhaarNo=" + aadhaarNo + ", aadhaarImage="
				+ aadhaarImage + ", panNo=" + panNo + ", panImage=" + panImage + ", accountType=" + accountType
				+ ", getAadhaarImage()=" + getAadhaarImage() + ", getPanImage()=" + getPanImage() + ", getEmail()="
				+ getEmail() + ", getPassword()=" + getPassword() + ", getFullName()=" + getFullName() + ", getDob()="
				+ getDob() + ", getGender()=" + getGender() + ", getMobile()=" + getMobile() + ", getAddress()="
				+ getAddress() + ", getCity()=" + getCity() + ", getState()=" + getState() + ", getPinCode()="
				+ getPinCode() + ", getAadhaarNo()=" + getAadhaarNo() + ", getPanNo()=" + getPanNo()
				+ ", getAccountType()=" + getAccountType() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode()
				+ ", toString()=" + super.toString() + "]";
	}

	@NotBlank(message = "Email is required")
	@Email(message = "Please enter a valid email address")
	private String email;

	@NotBlank(message = "Password is required")
	@Size(min = 8, message = "Password must contain at least 8 characters")
	private String password;

	@NotBlank(message = "Full name is required")
	@Size(min = 3, max = 100, message = "Full name must be between 3 and 100 characters")
	private String fullName;

	@NotNull(message = "Date of birth is required")
	@Past(message = "Date of birth must be in the past")
	private LocalDate dob;

	@NotBlank(message = "Gender is required")
	private String gender;

	@NotBlank(message = "Mobile number is required")
	@Pattern(
	    regexp = "^[6-9][0-9]{9}$",
	    message = "Mobile number must be a valid 10-digit number"
	)
	private String mobile;

	@NotBlank(message = "Address is required")
	private String address;

	@NotBlank(message = "City is required")
	private String city;

	@NotBlank(message = "State is required")
	private String state;

	@NotBlank(message = "PIN code is required")
	@Pattern(
	    regexp = "^[1-9][0-9]{5}$",
	    message = "PIN code must be a valid 6-digit number"
	)
	private String pinCode;

	@NotBlank(message = "Aadhaar number is required")
	@Pattern(
	    regexp = "^[0-9]{12}$",
	    message = "Aadhaar number must contain exactly 12 digits"
	)
	private String aadhaarNo;

	@NotBlank(message = "PAN number is required")
	@Pattern(
	    regexp = "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
	    message = "PAN number must be in valid format"
	)
	private String panNo;

	@NotBlank(message = "Account type is required")
	private String accountType;
	@NotNull(message = "Aadhaar image is required")
	private MultipartFile aadhaarImage;

	@NotNull(message = "PAN image is required")
	private MultipartFile panImage;

	public MultipartFile getAadhaarImage() {
		return aadhaarImage;
	}

	public void setAadhaarImage(MultipartFile aadhaarImage) {
		this.aadhaarImage = aadhaarImage;
	}

	public MultipartFile getPanImage() {
		return panImage;
	}

	public void setPanImage(MultipartFile panImage) {
		this.panImage = panImage;
	}

	

	

	public CustomerRegistrationRequest() {
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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
}