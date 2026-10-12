package com.bank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.dto.ApiResponse;
import com.bank.dto.response.AdminDashboardResponse;
import com.bank.service.AdminDashboardService;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {


    @Autowired
    private AdminDashboardService adminDashboardService;


    @GetMapping
    public ResponseEntity<ApiResponse<AdminDashboardResponse>>
            getDashboardData() {


        AdminDashboardResponse dashboard =
                adminDashboardService.getDashboardData();


        ApiResponse<AdminDashboardResponse> response =
                new ApiResponse<>(
                        true,
                        HttpStatus.OK.value(),
                        "Dashboard data retrieved successfully",
                        dashboard
                );


        return ResponseEntity.ok(response);
    }
}