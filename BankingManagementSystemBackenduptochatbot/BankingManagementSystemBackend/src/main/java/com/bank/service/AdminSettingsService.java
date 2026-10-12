package com.bank.service;

import com.bank.dto.request.AdminChangePasswordRequest;
import com.bank.dto.request.AdminProfileUpdateRequest;

public interface AdminSettingsService {

    String updateAdminEmail(
            Long userId,
            AdminProfileUpdateRequest request
    );

    String changeAdminPassword(
            Long userId,
            AdminChangePasswordRequest request
    );
}