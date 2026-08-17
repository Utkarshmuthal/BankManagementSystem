package com.bank.service;

import java.util.List;

import com.bank.dto.response.AdminCustomerResponse;

public interface AdminCustomerService {
	 List<AdminCustomerResponse> getAllCustomers();

	    AdminCustomerResponse getCustomerById(Long customerId);

	    void deleteCustomerById(Long customerId);

}
