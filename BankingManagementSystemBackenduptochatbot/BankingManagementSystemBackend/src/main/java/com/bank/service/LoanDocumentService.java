package com.bank.service;

import com.bank.entity.LoanDocument;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface LoanDocumentService {

    LoanDocument uploadDocument(
            Long loanId,
            String documentType,
            MultipartFile file
    );

    List<LoanDocument> getDocumentsByLoan(
            Long loanId
    );

    LoanDocument getDocumentById(
            Long documentId
    );

    void verifyDocument(
            Long documentId,
            Long verifiedBy,
            String remarks
    );

    void rejectDocument(
            Long documentId,
            Long verifiedBy,
            String remarks
    );
}