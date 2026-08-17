package com.bank.repository;

import com.bank.dto.response.AdminCustomerResponse;

import java.util.List;
import java.util.Optional;

public interface AdminCustomerRepository {

    List<AdminCustomerResponse> findAllCustomers();

    Optional<AdminCustomerResponse> findCustomerById(Long customerId);

    boolean deleteCustomerById(Long customerId);
}