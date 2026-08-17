package com.bank.serviceImpl;

import java.util.ArrayList;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.bank.dto.request.EmployeeProfileUpdateRequest;
import com.bank.dto.response.EmployeeProfileResponse;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.bank.dto.ApiResponse;
import com.bank.dto.request.CreateEmployeeRequest;
import com.bank.dto.request.EmployeeProfileUpdateRequest;
import com.bank.dto.request.UpdateEmployeeRequest;
import com.bank.dto.request.UpdateEmployeeStatusRequest;
import com.bank.dto.response.EmployeeProfileResponse;
import com.bank.dto.response.EmployeeResponse;
import com.bank.entity.Employee;
import com.bank.entity.User;
import com.bank.repository.EmployeeRepository;
import com.bank.repository.UserRepository;
import com.bank.service.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeRepository employeeRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

   
    // Replace ONLY this method
    @Override
    public ApiResponse<EmployeeResponse> createEmployee(CreateEmployeeRequest request) {

        // Check if email already exists
        User existingUser = null;

        try {
            existingUser = userRepository.findByEmail(request.getEmail());
        } catch (Exception e) {
            // Email not found, continue
        }

        if (existingUser != null) {

            return new ApiResponse<>(
                    false,
                    400,
                    "Employee email already exists.",
                    null);
        }

        // Create User
        User user = new User();

        user.setEmail(request.getEmail());
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );
        user.setRole("EMPLOYEE");
        user.setStatus("ACTIVE");

        // Save user and get generated user id
        Long userId = userRepository.save(user);

        // Create Employee
        Employee employee = new Employee();

        employee.setUserId(userId);
        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setMobile(request.getMobile());
        employee.setDesignation(request.getDesignation());
        employee.setSalary(request.getSalary());
        employee.setBranch(request.getBranch());

        // Save employee details
        employeeRepository.save(employee);

        // Prepare Response
        EmployeeResponse response = new EmployeeResponse();

        response.setUserId(userId);
        response.setFirstName(employee.getFirstName());
        response.setLastName(employee.getLastName());
        response.setEmail(user.getEmail());
        response.setMobile(employee.getMobile());
        response.setDesignation(employee.getDesignation());
        response.setSalary(employee.getSalary());
        response.setBranch(employee.getBranch());
        response.setRole(user.getRole());
        response.setStatus(user.getStatus());

        return new ApiResponse<>(
                true,
                201,
                "Employee Created Successfully",
                response);
    }
    @Override
    public ApiResponse<EmployeeResponse> updateEmployee(
            Long employeeId,
            UpdateEmployeeRequest request) {

        Employee employee = employeeRepository.findById(employeeId);

        if (employee == null) {
            return new ApiResponse<>(false,404,"Employee Not Found",null);
        }

        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setMobile(request.getMobile());
        employee.setDesignation(request.getDesignation());
        employee.setSalary(request.getSalary());
        employee.setBranch(request.getBranch());

        employeeRepository.update(employee);

        userRepository.updateEmail(employee.getUserId(), request.getEmail());

        EmployeeResponse response = employeeRepository.getEmployeeById(employeeId);

        return new ApiResponse<>(
                true,
                200,
                "Employee Updated Successfully",
                response);
    }
    @Override
    public ApiResponse<String> deleteEmployee(Long employeeId) {

        Employee employee = employeeRepository.findById(employeeId);

        if (employee == null) {

            return new ApiResponse<>(
                    false,
                    404,
                    "Employee Not Found",
                    null);
        }

        // Delete employee record first
        employeeRepository.delete(employeeId);

        // Delete login record
        userRepository.delete(employee.getUserId());

        return new ApiResponse<>(
                true,
                200,
                "Employee Deleted Successfully",
                "Success");
    }
    @Override
    public ApiResponse<EmployeeResponse> getEmployeeById(Long employeeId) {

        EmployeeResponse employee =
                employeeRepository.getEmployeeById(employeeId);

        return new ApiResponse<>(
                true,
                200,
                "Employee Found Successfully",
                employee);

    }
    @Override
    public ApiResponse<List<EmployeeResponse>> getAllEmployees() {

        List<EmployeeResponse> employees = employeeRepository.getAllEmployees();

        return new ApiResponse<>(
                true,
                200,
                "Employee List Retrieved Successfully",
                employees);
    }
    @Override
    public ApiResponse<String> updateEmployeeStatus(
            Long employeeId,
            UpdateEmployeeStatusRequest request) {

        Employee employee = employeeRepository.findById(employeeId);

        if (employee == null) {

            return new ApiResponse<>(
                    false,
                    404,
                    "Employee Not Found",
                    null);
        }

        userRepository.updateStatus(
                employee.getUserId(),
                request.getStatus());

        return new ApiResponse<>(
                true,
                200,
                "Employee Status Updated Successfully",
                request.getStatus());

    }
    @Override
    public ApiResponse<EmployeeProfileResponse> getEmployeeProfile(
            Long employeeId) {

        EmployeeProfileResponse employeeProfile =
                employeeRepository.getEmployeeProfile(employeeId);

        if (employeeProfile == null) {

            return new ApiResponse<>(
                    false,
                    404,
                    "Employee Profile Not Found",
                    null
            );
        }

        return new ApiResponse<>(
                true,
                200,
                "Employee Profile Retrieved Successfully",
                employeeProfile
        );
    }
    @Override
    public ApiResponse<EmployeeProfileResponse> updateEmployeeProfile(
            Long employeeId,
            EmployeeProfileUpdateRequest request) {

        Employee employee =
                employeeRepository.findById(employeeId);

        if (employee == null) {

            return new ApiResponse<>(
                    false,
                    404,
                    "Employee Not Found",
                    null
            );
        }


        // ==========================================
        // Validate request
        // ==========================================

        if (request == null) {

            return new ApiResponse<>(
                    false,
                    400,
                    "Profile update data is required",
                    null
            );
        }


        if (request.getFirstName() == null ||
                request.getFirstName().trim().isEmpty()) {

            return new ApiResponse<>(
                    false,
                    400,
                    "First name is required",
                    null
            );
        }


        if (request.getLastName() == null ||
                request.getLastName().trim().isEmpty()) {

            return new ApiResponse<>(
                    false,
                    400,
                    "Last name is required",
                    null
            );
        }


        if (request.getMobile() == null ||
                request.getMobile().trim().isEmpty()) {

            return new ApiResponse<>(
                    false,
                    400,
                    "Mobile number is required",
                    null
            );
        }


        // ==========================================
        // Update employee
        // ==========================================

        int updatedRows =
                employeeRepository.updateEmployeeProfile(
                        employeeId,
                        request
                );


        if (updatedRows == 0) {

            return new ApiResponse<>(
                    false,
                    404,
                    "Employee Profile Could Not Be Updated",
                    null
            );
        }


        // ==========================================
        // Get updated profile
        // ==========================================

        EmployeeProfileResponse updatedProfile =
                employeeRepository.getEmployeeProfile(
                        employeeId
                );


        return new ApiResponse<>(
                true,
                200,
                "Employee Profile Updated Successfully",
                updatedProfile
        );
    }
    @Override
    public ApiResponse<String> uploadEmployeeProfilePhoto(
            Long employeeId,
            MultipartFile file) {

        // ==========================================
        // Check employee
        // ==========================================

        Employee employee =
                employeeRepository.findById(employeeId);

        if (employee == null) {

            return new ApiResponse<>(
                    false,
                    404,
                    "Employee Not Found",
                    null
            );
        }


        // ==========================================
        // Check file
        // ==========================================

        if (file == null || file.isEmpty()) {

            return new ApiResponse<>(
                    false,
                    400,
                    "Please select a profile image",
                    null
            );
        }


        // ==========================================
        // Validate file type
        // ==========================================

        String contentType =
                file.getContentType();

        if (contentType == null ||
                !(contentType.equalsIgnoreCase("image/jpeg")
                        || contentType.equalsIgnoreCase("image/jpg")
                        || contentType.equalsIgnoreCase("image/png"))) {

            return new ApiResponse<>(
                    false,
                    400,
                    "Only JPG, JPEG and PNG images are allowed",
                    null
            );
        }


        // ==========================================
        // Validate file size
        // Maximum = 5 MB
        // ==========================================

        long maxSize =
                5 * 1024 * 1024;

        if (file.getSize() > maxSize) {

            return new ApiResponse<>(
                    false,
                    400,
                    "Profile image must be less than 5 MB",
                    null
            );
        }


        try {

            // ==========================================
            // Create upload directory
            // ==========================================

            Path uploadDirectory =
                    Paths.get("uploads/profile");

            if (!Files.exists(uploadDirectory)) {

                Files.createDirectories(
                        uploadDirectory
                );
            }


            // ==========================================
            // Get original extension
            // ==========================================

            String originalFileName =
                    file.getOriginalFilename();

            String extension = ".jpg";

            if (originalFileName != null &&
                    originalFileName.contains(".")) {

                extension =
                        originalFileName.substring(
                                originalFileName.lastIndexOf(".")
                        );
            }


            // ==========================================
            // Generate unique file name
            // ==========================================

            String fileName =
                    "employee_profile_"
                            + UUID.randomUUID()
                            + extension;


            // ==========================================
            // Create complete file path
            // ==========================================

            Path filePath =
                    uploadDirectory.resolve(fileName);


            // ==========================================
            // Save file
            // ==========================================

            Files.copy(
                    file.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING
            );


            // ==========================================
            // Path stored in database
            // ==========================================

            String imagePath =
                    "/uploads/profile/" + fileName;


            // ==========================================
            // Update database
            // ==========================================

            int updatedRows =
                    employeeRepository.updateEmployeeProfileImage(
                            employeeId,
                            imagePath
                    );


            if (updatedRows == 0) {

                // Delete uploaded file if DB update fails
                Files.deleteIfExists(filePath);

                return new ApiResponse<>(
                        false,
                        500,
                        "Unable to update profile image",
                        null
                );
            }


            // ==========================================
            // Success
            // ==========================================

            return new ApiResponse<>(
                    true,
                    200,
                    "Profile photo updated successfully",
                    imagePath
            );

        }
        catch (IOException e) {

            return new ApiResponse<>(
                    false,
                    500,
                    "Unable to save profile image",
                    null
            );
        }
    }
}