package com.bank.dto.request;

import jakarta.validation.constraints.NotBlank;

public class UpdateEmployeeStatusRequest {

    @NotBlank(message = "Status is required")
    private String status;

    public UpdateEmployeeStatusRequest() {
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}