package com.bank.dto.response;


public class LoginResponse {


    private String message;

    private Long userId;

    private String role;
    private Long customerId;



    public Long getCustomerId() {
		return customerId;
	}



	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}



	public LoginResponse() {

    }



    public LoginResponse(String message, Long userId, String role) {

        this.message = message;
        this.userId = userId;
        this.role = role;

    }



    public String getMessage() {
        return message;
    }


    public void setMessage(String message) {
        this.message = message;
    }



    public Long getUserId() {
        return userId;
    }


    public void setUserId(Long userId) {
        this.userId = userId;
    }



    public String getRole() {
        return role;
    }


    public void setRole(String role) {
        this.role = role;
    }

}