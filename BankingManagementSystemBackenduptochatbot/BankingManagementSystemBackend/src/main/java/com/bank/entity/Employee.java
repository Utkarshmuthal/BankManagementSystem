package com.bank.entity;

public class Employee {

    private Long employeeId;

    // Foreign key from users table
    private Long userId;

    private String firstName;

    private String lastName;

    private String mobile;

    private String designation;

    private Double salary;

    private String branch;
    
    private String profileImage;

    public String getProfileImage() {
		return profileImage;
	}

	public void setProfileImage(String profileImage) {
		this.profileImage = profileImage;
	}

	// Default Constructor
    public Employee() {

    }

    // Parameterized Constructor
    public Employee(Long employeeId, Long userId, String firstName,
                    String lastName, String mobile, String designation,
                    Double salary, String branch) {

        this.employeeId = employeeId;
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.mobile = mobile;
        this.designation = designation;
        this.salary = salary;
        this.branch = branch;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }
}