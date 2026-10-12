package com.bank.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/test")
    //@GetMapping("/test")
    public String test() {
        return "Banking Management System Backend Running Successfully";
    }
}