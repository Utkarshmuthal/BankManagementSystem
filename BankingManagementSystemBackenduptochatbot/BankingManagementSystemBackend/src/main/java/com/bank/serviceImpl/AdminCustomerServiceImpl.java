package com.bank.serviceImpl;

import com.bank.dto.response.AdminCustomerResponse;
import com.bank.repository.AdminCustomerRepository;
import com.bank.service.AdminCustomerService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminCustomerServiceImpl implements AdminCustomerService {

    private final AdminCustomerRepository adminCustomerRepository;

    public AdminCustomerServiceImpl(
            AdminCustomerRepository adminCustomerRepository) {
        this.adminCustomerRepository = adminCustomerRepository;
    }

    @Override
    public List<AdminCustomerResponse> getAllCustomers() {

        return adminCustomerRepository.findAllCustomers();
    }

    @Override
    public AdminCustomerResponse getCustomerById(Long customerId) {

        return adminCustomerRepository.findCustomerById(customerId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Customer not found with ID: " + customerId
                        )
                );
    }

    @Override
    public void deleteCustomerById(Long customerId) {

        boolean deleted =
                adminCustomerRepository.deleteCustomerById(customerId);

        if (!deleted) {
            throw new RuntimeException(
                    "Customer not found with ID: " + customerId
            );
        }
    }
}