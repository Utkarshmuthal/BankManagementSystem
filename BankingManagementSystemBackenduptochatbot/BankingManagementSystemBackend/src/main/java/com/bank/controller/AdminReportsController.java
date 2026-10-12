package com.bank.controller;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bank.dto.response.AdminReportsResponse;
import com.bank.service.AdminReportsService;

@RestController
@RequestMapping("/api/admin/reports")
@CrossOrigin(
        origins = "http://localhost:8989",
        allowCredentials = "true"
)
public class AdminReportsController {

    private final AdminReportsService adminReportsService;


    public AdminReportsController(
            AdminReportsService adminReportsService) {

        this.adminReportsService =
                adminReportsService;
    }


    @GetMapping
    public AdminReportsResponse getAdminReports(

            @RequestParam("fromDate")
            @DateTimeFormat(
                    iso = DateTimeFormat.ISO.DATE
            )
            LocalDate fromDate,

            @RequestParam("toDate")
            @DateTimeFormat(
                    iso = DateTimeFormat.ISO.DATE
            )
            LocalDate toDate
    ) {

        return adminReportsService.getAdminReports(
                fromDate,
                toDate
        );
    }
}