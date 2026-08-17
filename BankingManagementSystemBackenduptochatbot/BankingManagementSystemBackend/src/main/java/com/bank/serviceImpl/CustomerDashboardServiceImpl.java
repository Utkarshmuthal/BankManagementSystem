package com.bank.serviceImpl;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.bank.dto.request.UpdateCustomerProfileRequest;
import com.bank.dto.response.CustomerDashboardResponse;
import com.bank.dto.response.MyAccountResponse;
import com.bank.dto.response.CustomerProfileResponse;
import com.bank.entity.CustomerProfile;
import com.bank.repository.CustomerDashboardRepository;
import com.bank.service.CustomerDashboardService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CustomerDashboardServiceImpl implements CustomerDashboardService {

    @Autowired
    private CustomerDashboardRepository customerDashboardRepository;


    @Override
    public CustomerDashboardResponse getDashboard(Long customerId) {

        return customerDashboardRepository.getDashboard(customerId);
    }


    @Override
    public MyAccountResponse getMyAccount(Long customerId) {

        return customerDashboardRepository.getMyAccount(customerId);
    }


    @Override
    public CustomerProfileResponse getProfile(Long customerId) {

        CustomerProfile profile =
                customerDashboardRepository.getProfile(customerId);

        if (profile == null) {
            return null;
        }

        CustomerProfileResponse response =
                new CustomerProfileResponse();

        response.setCustomerId(profile.getCustomerId());
        response.setUserId(profile.getUserId());

        response.setEmail(profile.getEmail());
        response.setFullName(profile.getFullName());

        response.setDob(profile.getDob());
        response.setGender(profile.getGender());

        response.setMobile(profile.getMobile());

        response.setAddress(profile.getAddress());
        response.setCity(profile.getCity());
        response.setState(profile.getState());
        response.setPinCode(profile.getPinCode());

        // Mask sensitive information
        response.setAadhaarNo(
                maskAadhaar(profile.getAadhaarNo())
        );

        response.setPanNo(
                maskPan(profile.getPanNo())
        );

        response.setAccountType(
                profile.getAccountType()
        );

        response.setApprovalStatus(
                profile.getApprovalStatus()
        );
        response.setProfileImage(
                profile.getProfileImage()
        );
        return response;
    }


    private String maskAadhaar(String aadhaar) {

        if (aadhaar == null || aadhaar.length() < 4) {
            return aadhaar;
        }

        return "XXXX XXXX " +
                aadhaar.substring(aadhaar.length() - 4);
    }


    private String maskPan(String pan) {

        if (pan == null || pan.length() < 4) {
            return pan;
        }

        return "XXXXX" +
                pan.substring(pan.length() - 4);
    }


    @Override
    public boolean updateProfile(
            Long customerId,
            UpdateCustomerProfileRequest request) {

        int rowsUpdated =
                customerDashboardRepository.updateProfile(
                        customerId,
                        request
                );

        return rowsUpdated > 0;
    }


    @Override
    public String uploadProfilePhoto(
            Long customerId,
            MultipartFile file) {

        try {

            // ==========================================
            // 1. Check whether file exists
            // ==========================================

            if (file == null || file.isEmpty()) {
                return null;
            }


            // ==========================================
            // 2. Validate file type
            // ==========================================

            String contentType = file.getContentType();

            if (contentType == null ||
                    (!contentType.equals("image/jpeg") &&
                     !contentType.equals("image/png") &&
                     !contentType.equals("image/jpg"))) {

                return null;
            }

            // ==========================================
            // 3. Validate file size
            // Maximum 5 MB
            // ==========================================

            if (file.getSize() > 5 * 1024 * 1024) {
                return null;
            }


            // ==========================================
            // 4. Create upload directory
            // ==========================================

            Path uploadDirectory =
                    Paths.get("uploads/profile");

            Files.createDirectories(uploadDirectory);


            // ==========================================
            // 5. Get file extension
            // ==========================================

            String originalFileName =
                    file.getOriginalFilename();

            String extension = "";

            if (originalFileName != null &&
                    originalFileName.contains(".")) {

                extension =
                        originalFileName.substring(
                                originalFileName.lastIndexOf(".")
                        );
            }


            // ==========================================
            // 6. Generate unique filename
            // ==========================================

            String fileName =
                    "profile_" +
                    UUID.randomUUID() +
                    extension;


            // ==========================================
            // 7. Create complete file path
            // ==========================================

            Path filePath =
                    uploadDirectory.resolve(fileName);


            // ==========================================
            // 8. Save image to server
            // ==========================================

            Files.copy(
                    file.getInputStream(),
                    filePath
            );


            // ==========================================
            // 9. Path that will be stored in database
            // ==========================================

            String imagePath =
                    "/uploads/profile/" + fileName;


            // ==========================================
            // 10. Update database
            // ==========================================

            int updated =
                    customerDashboardRepository
                            .updateProfileImage(
                                    customerId,
                                    imagePath
                            );


            // ==========================================
            // 11. Check database update
            // ==========================================

            if (updated == 0) {

                // Database update failed.
                // Remove the uploaded file.

                Files.deleteIfExists(filePath);

                return null;
            }


            // ==========================================
            // 12. Return image path
            // ==========================================

            return imagePath;

        } catch (IOException e) {

            e.printStackTrace();

            return null;
        }
    }
}