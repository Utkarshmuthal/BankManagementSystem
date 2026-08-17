package com.bank.dto.response;

public class EmployeeCustomerResponse {

    private int pending;
    private int approved;
    private int rejected;
    private int total;

    public EmployeeCustomerResponse() {
    }

    public int getPending() {
        return pending;
    }

    public void setPending(int pending) {
        this.pending = pending;
    }

    public int getApproved() {
        return approved;
    }

    public void setApproved(int approved) {
        this.approved = approved;
    }

    public int getRejected() {
        return rejected;
    }

    public void setRejected(int rejected) {
        this.rejected = rejected;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }
}