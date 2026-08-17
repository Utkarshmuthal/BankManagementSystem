package com.bank.repository;

import java.util.List;
import com.bank.dto.request.EmployeeProfileUpdateRequest;
import com.bank.dto.response.EmployeeProfileResponse;

import com.bank.dto.response.EmployeeResponse;
import com.bank.entity.Employee;

public interface EmployeeRepository {

    void save(Employee employee);

    void update(Employee employee);

    void delete(Long employeeId);

    Employee findById(Long employeeId);

    List<Employee> findAll();

    // Add this
    List<EmployeeResponse> getAllEmployees();
    
    EmployeeResponse getEmployeeById(Long employeeId);
    
    EmployeeProfileResponse getEmployeeProfile(Long employeeId);

    int updateEmployeeProfile(
            Long employeeId,
            EmployeeProfileUpdateRequest request
    );

    int updateEmployeeProfileImage(
            Long employeeId,
            String profileImage
    );

}