package com.bank.dto.request;

public class EmployeeProfileUpdateRequest {

    private String firstName;

    private String lastName;

    private String mobile;


    // Default Constructor
    public EmployeeProfileUpdateRequest() {

    }


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }


    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }
}