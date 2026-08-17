package com.bank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bank.dto.ApiResponse;
import com.bank.dto.request.EmployeeProfileUpdateRequest;
import com.bank.dto.response.EmployeeProfileResponse;
import com.bank.service.EmployeeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin(origins = "http://localhost:8085")
public class EmployeeProfileController {

    @Autowired
    private EmployeeService employeeService;


    // =========================================================
    // GET EMPLOYEE PROFILE
    // =========================================================

    @GetMapping("/profile/{employeeId}")
    public ApiResponse<EmployeeProfileResponse> getEmployeeProfile(
            @PathVariable Long employeeId) {

        return employeeService.getEmployeeProfile(employeeId);
    }


    // =========================================================
    // UPDATE EMPLOYEE PROFILE
    // =========================================================

    @PutMapping("/profile/{employeeId}")
    public ApiResponse<EmployeeProfileResponse> updateEmployeeProfile(
            @PathVariable Long employeeId,
            @Valid @RequestBody EmployeeProfileUpdateRequest request) {

        return employeeService.updateEmployeeProfile(
                employeeId,
                request
        );
    }


    // =========================================================
    // UPLOAD EMPLOYEE PROFILE PHOTO
    // =========================================================

    @PostMapping("/profile/{employeeId}/photo")
    public ApiResponse<String> uploadEmployeeProfilePhoto(
            @PathVariable Long employeeId,
            @RequestParam("profileImage") MultipartFile file) {

        return employeeService.uploadEmployeeProfilePhoto(
                employeeId,
                file
        );
    }
}