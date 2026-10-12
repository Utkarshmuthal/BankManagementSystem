package com.bank.controller;

import com.bank.entity.LoanDocument;
import com.bank.service.LoanDocumentService;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/loan-documents")
//@RequestMapping("/loan-documents")
public class LoanDocumentController {

    private final LoanDocumentService documentService;

    public LoanDocumentController(
            LoanDocumentService documentService) {

        this.documentService =
                documentService;
    }

    // =====================================================
    // UPLOAD DOCUMENT
    // =====================================================

    @PostMapping(
            value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<LoanDocument> uploadDocument(

            @RequestParam Long loanId,

            @RequestParam String documentType,

            @RequestParam MultipartFile file) {

        LoanDocument document =
                documentService.uploadDocument(
                        loanId,
                        documentType,
                        file
                );

        return ResponseEntity.ok(document);
    }

    // =====================================================
    // GET DOCUMENTS FOR LOAN
    // =====================================================

    @GetMapping("/loan/{loanId}")
    public ResponseEntity<List<LoanDocument>>
    getDocumentsByLoan(
            @PathVariable Long loanId) {

        return ResponseEntity.ok(
                documentService
                        .getDocumentsByLoan(loanId)
        );
    }

    // =====================================================
    // GET DOCUMENT BY ID
    // =====================================================

    @GetMapping("/{documentId}")
    public ResponseEntity<LoanDocument>
    getDocument(
            @PathVariable Long documentId) {

        return ResponseEntity.ok(
                documentService
                        .getDocumentById(documentId)
        );
    }

    // =====================================================
    // VERIFY DOCUMENT
    // =====================================================

    @PutMapping("/{documentId}/verify")
    public ResponseEntity<String> verifyDocument(

            @PathVariable Long documentId,

            @RequestParam Long verifiedBy,

            @RequestParam(required = false)
            String remarks) {

        documentService.verifyDocument(
                documentId,
                verifiedBy,
                remarks
        );

        return ResponseEntity.ok(
                "Document verified successfully."
        );
    }

    // =====================================================
    // REJECT DOCUMENT
    // =====================================================

    @PutMapping("/{documentId}/reject")
    public ResponseEntity<String> rejectDocument(

            @PathVariable Long documentId,

            @RequestParam Long verifiedBy,

            @RequestParam String remarks) {

        documentService.rejectDocument(
                documentId,
                verifiedBy,
                remarks
        );

        return ResponseEntity.ok(
                "Document rejected successfully."
        );
    }
}