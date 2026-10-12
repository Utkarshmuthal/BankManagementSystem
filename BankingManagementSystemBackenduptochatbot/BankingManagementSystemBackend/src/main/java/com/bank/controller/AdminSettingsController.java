package com.bank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bank.dto.ApiResponse;
import com.bank.dto.request.AdminChangePasswordRequest;
import com.bank.dto.request.AdminProfileUpdateRequest;
import com.bank.service.AdminSettingsService;

@RestController
@RequestMapping("/api/admin/settings")
@CrossOrigin(
    origins = {"http://localhost:8989"},
    allowCredentials = "true"
)
public class AdminSettingsController {


    @Autowired
    private AdminSettingsService adminSettingsService;


    // =====================================================
    // UPDATE ADMIN EMAIL
    // =====================================================

    @PutMapping("/profile/{userId}")
    public ApiResponse<String> updateAdminEmail(

            @PathVariable Long userId,

            @RequestBody AdminProfileUpdateRequest request) {


        String message =
                adminSettingsService.updateAdminEmail(
                        userId,
                        request
                );


        boolean success =
                "Email updated successfully"
                        .equals(message);


        return new ApiResponse<>(
                success,
                success ? 200 : 400,
                message,
                null
        );
    }


    // =====================================================
    // CHANGE ADMIN PASSWORD
    // =====================================================

    @PutMapping("/password/{userId}")
    public ApiResponse<String> changeAdminPassword(

            @PathVariable Long userId,

            @RequestBody AdminChangePasswordRequest request) {


        String message =
                adminSettingsService.changeAdminPassword(
                        userId,
                        request
                );


        boolean success =
                "Password changed successfully"
                        .equals(message);


        return new ApiResponse<>(
                success,
                success ? 200 : 400,
                message,
                null
        );
    }
}