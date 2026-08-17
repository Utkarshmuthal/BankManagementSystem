package com.bank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import com.bank.dto.ApiResponse;
import com.bank.dto.request.CustomerRegistrationRequest;
import com.bank.service.CustomerProfileService;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private CustomerProfileService customerService;

    @PostMapping(
            value = "/register",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ApiResponse<String> registerCustomer(
            @Valid @ModelAttribute CustomerRegistrationRequest request) {

        return customerService.registerCustomer(request);
    }
}