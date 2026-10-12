package com.bank.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bank.dto.response.AdminAccountResponse;
import com.bank.service.AdminAccountService;

@RestController
@RequestMapping("/api/admin/accounts")
//@RequestMapping("/admin/accounts")
public class AdminAccountController {

    @Autowired
    private AdminAccountService adminAccountService;


    // ============================================================
    // GET ALL ACCOUNTS
    // ============================================================

    @GetMapping
    public ResponseEntity<List<AdminAccountResponse>> getAllAccounts() {

        List<AdminAccountResponse> accounts =
                adminAccountService.getAllAccounts();

        return ResponseEntity.ok(accounts);
    }


    // ============================================================
    // GET ACCOUNT BY ID
    // ============================================================

    @GetMapping("/{id}")
    public ResponseEntity<?> getAccountById(
            @PathVariable("id") Long accountId) {

        AdminAccountResponse account =
                adminAccountService.getAccountById(accountId);

        if (account == null) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Account not found with ID: " + accountId);
        }

        return ResponseEntity.ok(account);
    }
}