package com.bank.dto.request;

import java.time.LocalDate;

public class ReportsRequest {

    private LocalDate fromDate;

    private LocalDate toDate;


    public ReportsRequest() {
    }


    public LocalDate getFromDate() {
        return fromDate;
    }


    public void setFromDate(LocalDate fromDate) {
        this.fromDate = fromDate;
    }


    public LocalDate getToDate() {
        return toDate;
    }


    public void setToDate(LocalDate toDate) {
        this.toDate = toDate;
    }
}