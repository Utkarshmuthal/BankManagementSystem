package com.bank.service;

import java.util.List;
import com.bank.dto.request.EmployeeProfileUpdateRequest;
import com.bank.dto.response.EmployeeProfileResponse;
import org.springframework.web.multipart.MultipartFile;

import com.bank.dto.ApiResponse;
import com.bank.dto.request.CreateEmployeeRequest;
import com.bank.dto.request.UpdateEmployeeRequest;
import com.bank.dto.request.UpdateEmployeeStatusRequest;
import com.bank.dto.response.EmployeeResponse;

public interface EmployeeService {

    ApiResponse<EmployeeResponse> createEmployee(CreateEmployeeRequest request);

    ApiResponse<EmployeeResponse> updateEmployee(Long employeeId,
            UpdateEmployeeRequest request);

    ApiResponse<String> deleteEmployee(Long employeeId);

    ApiResponse<EmployeeResponse> getEmployeeById(Long employeeId);

    ApiResponse<List<EmployeeResponse>> getAllEmployees();
    
    ApiResponse<String> updateEmployeeStatus(
            Long employeeId,
            UpdateEmployeeStatusRequest request);
    
    ApiResponse<EmployeeProfileResponse> getEmployeeProfile(
            Long employeeId
    );

    ApiResponse<EmployeeProfileResponse> updateEmployeeProfile(
            Long employeeId,
            EmployeeProfileUpdateRequest request
    );

    ApiResponse<String> uploadEmployeeProfilePhoto(
            Long employeeId,
            MultipartFile file
    );

}