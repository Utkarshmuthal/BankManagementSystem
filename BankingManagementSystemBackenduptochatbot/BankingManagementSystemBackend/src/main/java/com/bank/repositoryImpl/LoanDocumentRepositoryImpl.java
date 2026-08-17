package com.bank.repositoryImpl;

import com.bank.entity.LoanDocument;
import com.bank.repository.LoanDocumentRepository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public class LoanDocumentRepositoryImpl
        implements LoanDocumentRepository {

    private final JdbcTemplate jdbcTemplate;

    public LoanDocumentRepositoryImpl(
            JdbcTemplate jdbcTemplate) {

        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public LoanDocument save(LoanDocument document) {

        String sql = """
                INSERT INTO loan_documents (
                    loan_id,
                    document_type,
                    file_name,
                    file_path,
                    verification_status,
                    remarks
                )
                VALUES (?, ?, ?, ?, ?, ?)
                RETURNING document_id
                """;

        Long documentId =
                jdbcTemplate.queryForObject(
                        sql,
                        Long.class,
                        document.getLoanId(),
                        document.getDocumentType(),
                        document.getFileName(),
                        document.getFilePath(),
                        document.getVerificationStatus(),
                        document.getRemarks()
                );

        document.setDocumentId(documentId);

        return document;
    }

    @Override
    public LoanDocument findById(Long documentId) {

        String sql = """
                SELECT
                    document_id,
                    loan_id,
                    document_type,
                    file_name,
                    file_path,
                    verification_status,
                    remarks,
                    verified_by,
                    verified_at
                FROM loan_documents
                WHERE document_id = ?
                """;

        List<LoanDocument> documents =
                jdbcTemplate.query(
                        sql,
                        this::mapDocument,
                        documentId
                );

        return documents.isEmpty()
                ? null
                : documents.get(0);
    }

    @Override
    public List<LoanDocument> findByLoanId(Long loanId) {

        String sql = """
                SELECT
                    document_id,
                    loan_id,
                    document_type,
                    file_name,
                    file_path,
                    verification_status,
                    remarks,
                    verified_by,
                    verified_at
                FROM loan_documents
                WHERE loan_id = ?
                ORDER BY document_id
                """;

        return jdbcTemplate.query(
                sql,
                this::mapDocument,
                loanId
        );
    }

    @Override
    public void verify(
            Long documentId,
            Long verifiedBy,
            String remarks) {

        String sql = """
                UPDATE loan_documents
                SET
                    verification_status = 'VERIFIED',
                    remarks = ?,
                    verified_by = ?,
                    verified_at = ?
                WHERE document_id = ?
                """;

        jdbcTemplate.update(
                sql,
                remarks,
                verifiedBy,
                LocalDateTime.now(),
                documentId
        );
    }

    @Override
    public void reject(
            Long documentId,
            Long verifiedBy,
            String remarks) {

        String sql = """
                UPDATE loan_documents
                SET
                    verification_status = 'REJECTED',
                    remarks = ?,
                    verified_by = ?,
                    verified_at = ?
                WHERE document_id = ?
                """;

        jdbcTemplate.update(
                sql,
                remarks,
                verifiedBy,
                LocalDateTime.now(),
                documentId
        );
    }

    private LoanDocument mapDocument(
            java.sql.ResultSet rs,
            int rowNum)
            throws java.sql.SQLException {

        LoanDocument document =
                new LoanDocument();

        document.setDocumentId(
                rs.getLong("document_id")
        );

        document.setLoanId(
                rs.getLong("loan_id")
        );

        document.setDocumentType(
                rs.getString("document_type")
        );

        document.setFileName(
                rs.getString("file_name")
        );

        document.setFilePath(
                rs.getString("file_path")
        );

        document.setVerificationStatus(
                rs.getString("verification_status")
        );

        document.setRemarks(
                rs.getString("remarks")
        );

        Long verifiedBy =
                rs.getObject(
                        "verified_by",
                        Long.class
                );

        document.setVerifiedBy(verifiedBy);

        if (rs.getTimestamp("verified_at") != null) {

            document.setVerifiedAt(
                    rs.getTimestamp("verified_at")
                            .toLocalDateTime()
            );
        }

        return document;
    }
}