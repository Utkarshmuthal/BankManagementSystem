package com.bank.dto.response;

public class ApprovedAccountResponse {

	private String accountNumber;
	private Long customerId;
	private String customerName;
	private String accountType;
	private Double initialBalance;

	public ApprovedAccountResponse() {
	}

	public ApprovedAccountResponse(String accountNumber, Long customerId, String customerName, String accountType,
			Double initialBalance) {
		this.accountNumber = accountNumber;
		this.customerId = customerId;
		this.customerName = customerName;
		this.accountType = accountType;
		this.initialBalance = initialBalance;
	}

	// Getters and Setters
	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
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

	public void setCustomerName(String customerName) { this.customerName = customerName; }

public String getAccountType() { 
	return accountType;
}

}