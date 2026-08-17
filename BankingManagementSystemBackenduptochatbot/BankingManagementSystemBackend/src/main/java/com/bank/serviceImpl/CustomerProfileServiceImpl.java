package com.bank.serviceImpl;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bank.dto.ApiResponse;
import com.bank.dto.request.CustomerRegistrationRequest;
import com.bank.dto.response.CustomerDetailsResponse;
import com.bank.dto.response.CustomerResponse;
import com.bank.dto.response.EmployeeCustomerResponse;
import com.bank.entity.Account;
import com.bank.entity.CustomerProfile;
import com.bank.entity.User;
import com.bank.repository.AccountRepository;
import com.bank.repository.CustomerProfileRepository;
import com.bank.repository.UserRepository;
import com.bank.service.CustomerProfileService;

@Service
public class CustomerProfileServiceImpl implements CustomerProfileService {

    @Autowired
    private CustomerProfileRepository customerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Override
    @Transactional
    public ApiResponse<String> registerCustomer(CustomerRegistrationRequest request) {

        User user = new User();

        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole("CUSTOMER");
        user.setStatus("PENDING");

        Long userId = userRepository.registerCustomerUser(user);

        String uploadDir = System.getProperty("user.dir") + "/uploads";

        String aadhaarFileName = null;
        String panFileName = null;

        try {

            if (request.getAadhaarImage() != null
                    && !request.getAadhaarImage().isEmpty()) {

                aadhaarFileName =
                        System.currentTimeMillis()
                        + "_"
                        + request.getAadhaarImage().getOriginalFilename();

                Path aadhaarFolder =
                        Paths.get(uploadDir, "aadhaar");

                Files.createDirectories(aadhaarFolder);

                Path aadhaarPath =
                        aadhaarFolder.resolve(aadhaarFileName);

                request.getAadhaarImage()
                       .transferTo(aadhaarPath.toFile());
            }

            if (request.getPanImage() != null
                    && !request.getPanImage().isEmpty()) {

                panFileName =
                        System.currentTimeMillis()
                        + "_"
                        + request.getPanImage().getOriginalFilename();

                Path panFolder =
                        Paths.get(uploadDir, "pan");

                Files.createDirectories(panFolder);

                Path panPath =
                        panFolder.resolve(panFileName);

                request.getPanImage()
                       .transferTo(panPath.toFile());
            }

        } catch (IOException e) {

            throw new RuntimeException(
                    "File upload failed : " + e.getMessage());
        }

        CustomerProfile customer = new CustomerProfile();

        customer.setUserId(userId);
        customer.setFullName(request.getFullName());
        customer.setDob(request.getDob());
        customer.setGender(request.getGender());
        customer.setMobile(request.getMobile());
        customer.setAddress(request.getAddress());
        customer.setCity(request.getCity());
        customer.setState(request.getState());
        customer.setPinCode(request.getPinCode());

        customer.setAadhaarNo(request.getAadhaarNo());
        customer.setPanNo(request.getPanNo());

        customer.setAadhaarImage(aadhaarFileName);
        customer.setPanImage(panFileName);

        customer.setAccountType(request.getAccountType());

        customer.setApprovalStatus("PENDING_APPROVAL");
        customer.setEmail(request.getEmail());

        customerRepository.saveCustomer(customer);

        return new ApiResponse<>(
                true,
                200,
                "Registration submitted successfully. Your account is under verification.",
                null);
    }

    @Override
    public ApiResponse<List<CustomerResponse>> getPendingCustomers() {

        List<CustomerResponse> customers =
                customerRepository.getPendingCustomers();

        return new ApiResponse<>(
                true,
                200,
                "Pending customers fetched successfully.",
                customers);
    }

    @Override
    public ApiResponse<List<CustomerResponse>> getPendingCustomers(
            int page,
            int size) {

        List<CustomerResponse> customers =
                customerRepository.getPendingCustomers(page, size);

        return new ApiResponse<>(
                true,
                200,
                "Pending customers fetched successfully.",
                customers);
    }

    @Override
    public ApiResponse<CustomerDetailsResponse> getCustomerDetailsById(Long customerId){

        CustomerDetailsResponse customer =
                customerRepository.getCustomerDetailsById(customerId);

        if(customer==null){
            return new ApiResponse<>(
                    false,
                    404,
                    "Customer Not Found",
                    null);
        }

        return new ApiResponse<>(
                true,
                200,
                "Customer Details",
                customer);
        }    @Override
    @Transactional
    public ApiResponse<String> approveCustomer(Long customerId) {

        // Get customer details
        	CustomerDetailsResponse customer =
        	        customerRepository.getCustomerDetailsById(customerId);
        if (customer == null) {

            return new ApiResponse<>(
                    false,
                    404,
                    "Customer Not Found",
                    null);
        }

        // Check account already exists
        if (accountRepository.existsByCustomerId(customerId)) {

            return new ApiResponse<>(
                    false,
                    400,
                    "Customer account already exists.",
                    null);
        }

        // Get user id
        Long userId =
                customerRepository.getUserIdByCustomerId(customerId);

        // Update customer approval status
        customerRepository.updateApprovalStatus(
                customerId,
                "APPROVED");

        // Activate customer login
        userRepository.updateUserStatus(
                userId,
                "ACTIVE");

        // Create Bank Account
        Account account = new Account();

        account.setCustomerId(customerId);

        account.setAccountNumber(
                generateAccountNumber());

        account.setAccountType(
                customer.getAccountType());

        account.setBalance(BigDecimal.ZERO);

        account.setStatus("ACTIVE");

        accountRepository.save(account);

        return new ApiResponse<>(
                true,
                200,
                "Customer approved successfully. Bank account created.",
                null);
    }

    @Override
    @Transactional
    public ApiResponse<String> rejectCustomer(Long customerId) {

        Long userId =
                customerRepository.getUserIdByCustomerId(customerId);

        customerRepository.updateApprovalStatus(
                customerId,
                "REJECTED");

        userRepository.updateUserStatus(
                userId,
                "REJECTED");

        return new ApiResponse<>(
                true,
                200,
                "Customer rejected successfully.",
                null);
    }

    private String generateAccountNumber() {

        long random =
                (long) (Math.random() * 9000000000L)
                        + 1000000000L;

        return String.valueOf(random);
    }    @Override
    public ApiResponse<List<CustomerResponse>> getApprovedCustomers() {

        List<CustomerResponse> customers =
                customerRepository.getApprovedCustomers();

        return new ApiResponse<>(
                true,
                200,
                "Approved customers fetched successfully.",
                customers);
    }

    @Override
    public ApiResponse<List<CustomerResponse>> getRejectedCustomers() {

        List<CustomerResponse> customers =
                customerRepository.getRejectedCustomers();

        return new ApiResponse<>(
                true,
                200,
                "Rejected customers fetched successfully.",
                customers);
    }

    @Override
    public ApiResponse<List<CustomerResponse>> searchCustomers(
            String keyword,
            String status,
            int page,
            int size) {

        List<CustomerResponse> customers =
                customerRepository.searchCustomers(
                        keyword,
                        status,
                        page,
                        size);

        return new ApiResponse<>(
                true,
                200,
                "Customers fetched successfully.",
                customers);
    }
    @Override
    public ApiResponse<EmployeeCustomerResponse> getDashboardData() {

    	EmployeeCustomerResponse dashboard =
                new EmployeeCustomerResponse();

        dashboard.setTotal(
                customerRepository.getTotalCount());

        dashboard.setPending(
                customerRepository.getPendingCount());

        dashboard.setApproved(
                customerRepository.getApprovedCount());

        dashboard.setRejected(
                customerRepository.getRejectedCount());

        return new ApiResponse<>(
                true,
                200,
                "Dashboard data fetched successfully.",
                dashboard);
    }
    

}