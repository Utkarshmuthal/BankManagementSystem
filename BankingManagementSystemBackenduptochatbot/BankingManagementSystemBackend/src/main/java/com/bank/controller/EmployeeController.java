package com.bank.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.dto.ApiResponse;
import com.bank.dto.request.CreateEmployeeRequest;
import com.bank.dto.request.UpdateEmployeeRequest;
import com.bank.dto.request.UpdateEmployeeStatusRequest;
import com.bank.dto.response.EmployeeResponse;
import com.bank.service.EmployeeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin")
//@RequestMapping("/admin")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;
    
    @PostMapping("/employees")
    public ApiResponse<EmployeeResponse> createEmployee(
            @Valid @RequestBody CreateEmployeeRequest request) {

        return employeeService.createEmployee(request);
    }

    @GetMapping("/employees")
    public ApiResponse<List<EmployeeResponse>> getAllEmployees() {

        return employeeService.getAllEmployees();

    }
    @GetMapping("/employees/{employeeId}")
    public ApiResponse<EmployeeResponse> getEmployeeById(
            @PathVariable Long employeeId) {

        return employeeService.getEmployeeById(employeeId);
    }
    @PutMapping("/employees/{employeeId}")
    public ApiResponse<EmployeeResponse> updateEmployee(
            @PathVariable Long employeeId,
            @Valid @RequestBody UpdateEmployeeRequest request) {

        return employeeService.updateEmployee(employeeId, request);
    }
    @DeleteMapping("/employees/{employeeId}")
    public ApiResponse<String> deleteEmployee(@PathVariable Long employeeId) {

        return employeeService.deleteEmployee(employeeId);

    }
    @PutMapping("/employees/{employeeId}/status")
    public ApiResponse<String> updateEmployeeStatus(
            @PathVariable Long employeeId,
            @Valid @RequestBody UpdateEmployeeStatusRequest request) {

        return employeeService.updateEmployeeStatus(employeeId, request);

    }
}