package com.bank.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bank.dto.request.ReportsRequest;
import com.bank.dto.response.ReportsResponse;
import com.bank.service.ReportsService;

@RestController
@RequestMapping("/api/employee/reports")
//@RequestMapping("/employee/reports")
public class ReportsController {

    @Autowired
    private ReportsService reportsService;


    @GetMapping
    public ReportsResponse getReports(

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

        // Create request DTO
        ReportsRequest request =
                new ReportsRequest();

        // Set dates
        request.setFromDate(fromDate);
        request.setToDate(toDate);

        // Send request DTO to service
        return reportsService.getReports(request);
    }
}