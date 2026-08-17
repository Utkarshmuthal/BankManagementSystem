package com.bank.service;

import com.bank.dto.request.ReportsRequest;
import com.bank.dto.response.ReportsResponse;

public interface ReportsService {

    ReportsResponse getReports(
            ReportsRequest request
    );
}