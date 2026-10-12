package com.bank.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.bank.dto.ApiResponse;
import com.bank.dto.request.UpdateCustomerProfileRequest;
import com.bank.dto.response.CustomerDashboardResponse;
import com.bank.dto.response.CustomerProfileResponse;
import com.bank.dto.response.MyAccountResponse;
import com.bank.service.CustomerDashboardService;

@RestController
@RequestMapping("/api/customer")
//@RequestMapping("/customer")
public class CustomerDashboardController {

    @Autowired
    private CustomerDashboardService customerDashboardService;

    @GetMapping("/dashboard/{customerId}")
    public ApiResponse<CustomerDashboardResponse> getDashboard(
            @PathVariable Long customerId) {

        CustomerDashboardResponse dashboard =
                customerDashboardService.getDashboard(customerId);

        return new ApiResponse<>(
                true,
                200,
                "Customer dashboard fetched successfully",
                dashboard
        );
    }
    @GetMapping("/my-account/{customerId}")
    public ApiResponse<MyAccountResponse> getMyAccount(
            @PathVariable Long customerId) {

        MyAccountResponse account =
                customerDashboardService.getMyAccount(customerId);

        return new ApiResponse<>(
                true,
                200,
                "My Account details fetched successfully",
                account
        );
    }
    @GetMapping("/profile/{customerId}")
    public ApiResponse<CustomerProfileResponse> getProfile(
            @PathVariable Long customerId) {

        CustomerProfileResponse profile =
                customerDashboardService.getProfile(customerId);

        if (profile == null) {

            return new ApiResponse<>(
                    false,
                    404,
                    "Customer profile not found",
                    null
            );
        }

        return new ApiResponse<>(
                true,
                200,
                "Customer profile fetched successfully",
                profile
        );
    }
    @PutMapping("/profile/{customerId}")
    public ApiResponse<Void> updateProfile(
            @PathVariable Long customerId,
            @RequestBody UpdateCustomerProfileRequest request) {

        boolean updated =
                customerDashboardService.updateProfile(
                        customerId,
                        request
                );

        if (!updated) {

            return new ApiResponse<>(
                    false,
                    404,
                    "Customer profile not found",
                    null
            );
        }

        return new ApiResponse<>(
                true,
                200,
                "Customer profile updated successfully",
                null
        );
    }
    @PostMapping("/profile/{customerId}/photo")
    public ApiResponse<String> uploadProfilePhoto(
            @PathVariable Long customerId,
            @RequestParam("profileImage") MultipartFile file) {

        String imagePath =
                customerDashboardService.uploadProfilePhoto(
                        customerId,
                        file
                );

        if (imagePath == null) {

            return new ApiResponse<>(
                    false,
                    400,
                    "Unable to upload profile photo",
                    null
            );
        }

        return new ApiResponse<>(
                true,
                200,
                "Profile photo updated successfully",
                imagePath
        );
    }
}