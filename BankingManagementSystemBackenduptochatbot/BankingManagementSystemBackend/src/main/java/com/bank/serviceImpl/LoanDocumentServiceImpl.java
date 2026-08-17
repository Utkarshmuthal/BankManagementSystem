package com.bank.serviceImpl;

import com.bank.entity.LoanDocument;
import com.bank.repository.LoanDocumentRepository;
import com.bank.service.LoanDocumentService;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class LoanDocumentServiceImpl
        implements LoanDocumentService {

    private final LoanDocumentRepository documentRepository;

    public LoanDocumentServiceImpl(
            LoanDocumentRepository documentRepository) {

        this.documentRepository =
                documentRepository;
    }

    @Override
    public LoanDocument uploadDocument(
            Long loanId,
            String documentType,
            MultipartFile file) {

        if (loanId == null) {
            throw new RuntimeException(
                    "Loan ID is required"
            );
        }

        if (documentType == null
                || documentType.trim().isEmpty()) {

            throw new RuntimeException(
                    "Document type is required"
            );
        }

        if (file == null || file.isEmpty()) {

            throw new RuntimeException(
                    "Please select a document"
            );
        }

        String originalName =
                Paths.get(
                        file.getOriginalFilename()
                )
                .getFileName()
                .toString();

        String fileName =
                System.currentTimeMillis()
                + "_"
                + originalName;

        try {

            String uploadDir =
                    System.getProperty("user.dir")
                    + "/uploads/loans/"
                    + loanId;

            Path folder =
                    Paths.get(uploadDir);

            Files.createDirectories(folder);

            Path filePath =
                    folder.resolve(fileName);

            file.transferTo(
                    filePath.toFile()
            );

            LoanDocument document =
                    new LoanDocument();

            document.setLoanId(loanId);

            document.setDocumentType(
                    documentType.toUpperCase()
            );

            document.setFileName(
                    fileName
            );

            /*
             * This is intentionally a relative path.
             * Your existing WebConfig maps /uploads/**
             * to the uploads folder.
             */
            document.setFilePath(
                    "uploads/loans/"
                    + loanId
                    + "/"
                    + fileName
            );

            document.setVerificationStatus(
                    "PENDING"
            );

            document.setRemarks(null);

            return documentRepository.save(
                    document
            );

        } catch (IOException e) {

            throw new RuntimeException(
                    "Document upload failed: "
                    + e.getMessage()
            );
        }
    }

    @Override
    public List<LoanDocument> getDocumentsByLoan(
            Long loanId) {

        return documentRepository
                .findByLoanId(loanId);
    }

    @Override
    public LoanDocument getDocumentById(
            Long documentId) {

        LoanDocument document =
                documentRepository
                        .findById(documentId);

        if (document == null) {

            throw new RuntimeException(
                    "Document not found with ID: "
                    + documentId
            );
        }

        return document;
    }

    @Override
    public void verifyDocument(
            Long documentId,
            Long verifiedBy,
            String remarks) {

        getDocumentById(documentId);

        documentRepository.verify(
                documentId,
                verifiedBy,
                remarks
        );
    }

    @Override
    public void rejectDocument(
            Long documentId,
            Long verifiedBy,
            String remarks) {

        if (remarks == null
                || remarks.trim().isEmpty()) {

            throw new RuntimeException(
                    "Rejection remarks are required"
            );
        }

        getDocumentById(documentId);

        documentRepository.reject(
                documentId,
                verifiedBy,
                remarks
        );
    }
}