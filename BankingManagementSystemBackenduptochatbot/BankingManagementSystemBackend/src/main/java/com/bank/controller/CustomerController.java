package com.bank.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import com.bank.dto.ApiResponse;
import com.bank.dto.request.CustomerRegistrationRequest;
import com.bank.repository.CustomerProfileRepository;
import com.bank.repository.UserRepository;
import com.bank.service.CustomerProfileService;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private CustomerProfileService customerService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerProfileRepository customerProfileRepository;


    // =========================================================
    // CUSTOMER REGISTRATION
    // =========================================================

    @PostMapping(
            value = "/register",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ApiResponse<String> registerCustomer(
            @Valid @ModelAttribute CustomerRegistrationRequest request) {

        return customerService.registerCustomer(request);
    }


    // =========================================================
    // LIVE DUPLICATE CHECK
    // =========================================================

    @PostMapping("/check-duplicate")
    public Map<String, Object> checkDuplicate(
            @RequestBody Map<String, String> request) {

        String field = request.get("field");
        String value = request.get("value");

        Map<String, Object> response =
                new HashMap<>();

        boolean exists = false;
        String message = "";


        if (field == null ||
            value == null ||
            value.trim().isEmpty()) {

            response.put("exists", false);
            response.put("message", "");

            return response;
        }


        value = value.trim();


        // =====================================================
        // EMAIL
        // =====================================================

        if ("email".equals(field)) {

            exists = userRepository.existsByEmail(value);

            if (exists) {
                message = "Email already exists.";
            }
        }


        // =====================================================
        // MOBILE
        // =====================================================

        else if ("mobile".equals(field)) {

            exists =
                    customerProfileRepository
                            .existsByMobile(value);

            if (exists) {
                message =
                        "Mobile number already exists.";
            }
        }


        // =====================================================
        // AADHAAR
        // =====================================================

        else if ("aadhaarNo".equals(field)) {

            exists =
                    customerProfileRepository
                            .existsByAadhaar(value);

            if (exists) {
                message =
                        "Aadhaar number already exists.";
            }
        }


        // =====================================================
        // PAN
        // =====================================================

        else if ("panNo".equals(field)) {

            exists =
                    customerProfileRepository
                            .existsByPan(value);

            if (exists) {
                message =
                        "PAN number already exists.";
            }
        }


        response.put("exists", exists);
        response.put("message", message);

        return response;
    }
}