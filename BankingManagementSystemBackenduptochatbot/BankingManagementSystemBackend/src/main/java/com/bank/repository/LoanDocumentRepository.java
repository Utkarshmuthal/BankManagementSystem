package com.bank.repository;

import com.bank.entity.LoanDocument;

import java.util.List;

public interface LoanDocumentRepository {

    LoanDocument save(LoanDocument document);

    LoanDocument findById(Long documentId);

    List<LoanDocument> findByLoanId(Long loanId);

    void verify(
            Long documentId,
            Long verifiedBy,
            String remarks
    );

    void reject(
            Long documentId,
            Long verifiedBy,
            String remarks
    );
}