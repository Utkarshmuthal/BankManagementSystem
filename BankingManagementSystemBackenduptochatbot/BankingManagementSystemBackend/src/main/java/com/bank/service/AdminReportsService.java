package com.bank.service;

import java.time.LocalDate;

import com.bank.dto.response.AdminReportsResponse;

public interface AdminReportsService {

    AdminReportsResponse getAdminReports(
            LocalDate fromDate,
            LocalDate toDate
    );
}