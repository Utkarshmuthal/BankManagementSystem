package com.bank.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bank.dto.ApiResponse;
import com.bank.dto.response.EmployeeCustomerDetailsResponse;
import com.bank.dto.response.EmployeeCustomerInfoResponse;
import com.bank.service.EmployeeCustomerService;

@RestController
@RequestMapping("/api/employee/customers")
//@RequestMapping("/employee/customers")
public class EmployeeCustomerController {


    @Autowired
    private EmployeeCustomerService employeeCustomerService;


    // =====================================================
    // APPROVED CUSTOMERS WITH PAGINATION
    // =====================================================

    @GetMapping
    public ApiResponse<List<EmployeeCustomerInfoResponse>> getCustomers(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "6")
            int size) {


        List<EmployeeCustomerInfoResponse> customers =
                employeeCustomerService.getApprovedCustomers(
                        page,
                        size
                );


        ApiResponse<List<EmployeeCustomerInfoResponse>> response =
                new ApiResponse<>();


        response.setStatus(true);
        response.setCode(200);
        response.setMessage(
                "Approved customers fetched successfully"
        );
        response.setData(customers);


        return response;
    }


    // =====================================================
    // CUSTOMER COUNT
    // =====================================================

    @GetMapping("/count")
    public ApiResponse<Map<String, Integer>> getCustomerCount() {


        int count =
                employeeCustomerService
                        .getApprovedCustomerCount();


        Map<String, Integer> data =
                new HashMap<>();


        data.put(
                "approvedCustomers",
                count
        );


        ApiResponse<Map<String, Integer>> response =
                new ApiResponse<>();


        response.setStatus(true);
        response.setCode(200);
        response.setMessage(
                "Approved customer count fetched successfully"
        );
        response.setData(data);


        return response;
    }
    @GetMapping("/{customerId}")
    public ApiResponse<EmployeeCustomerDetailsResponse> getCustomerDetails(
            @PathVariable Long customerId) {

        EmployeeCustomerDetailsResponse customer =
                employeeCustomerService
                        .getCustomerDetails(customerId);


        ApiResponse<EmployeeCustomerDetailsResponse> response =
                new ApiResponse<>();


        response.setStatus(true);
        response.setCode(200);
        response.setMessage(
                "Customer details fetched successfully"
        );
        response.setData(customer);


        return response;
    }
    @PutMapping("/{customerId}/toggle-status")
    public ApiResponse<String> toggleAccountStatus(
            @PathVariable Long customerId) {

        String result =
                employeeCustomerService.toggleAccountStatus(customerId);

        ApiResponse<String> response =
                new ApiResponse<>();


        if ("ACCOUNT_NOT_FOUND".equals(result)) {

            response.setStatus(false);
            response.setCode(404);
            response.setMessage(
                    "Account not found for this customer."
            );
            response.setData(null);

            return response;
        }


        if ("UPDATE_FAILED".equals(result)) {

            response.setStatus(false);
            response.setCode(500);
            response.setMessage(
                    "Unable to update account status."
            );
            response.setData(null);

            return response;
        }


        // ACTIVE or INACTIVE

        response.setStatus(true);
        response.setCode(200);
        response.setMessage(
                "Account status updated successfully."
        );
        response.setData(result);

        return response;
    }
  }