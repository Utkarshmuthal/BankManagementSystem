package com.bank.repositoryImpl;

import com.bank.entity.LoanEmi;
import com.bank.repository.LoanEmiRepository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LoanEmiRepositoryImpl implements LoanEmiRepository {

    private final JdbcTemplate jdbcTemplate;

    public LoanEmiRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public LoanEmi save(LoanEmi emi) {

        String sql = """
                INSERT INTO loan_emi (
                    loan_id,
                    emi_number,
                    due_date,
                    emi_amount,
                    principal_amount,
                    interest_amount,
                    paid_amount,
                    payment_date,
                    status
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                RETURNING emi_id
                """;

        Long emiId = jdbcTemplate.queryForObject(
                sql,
                Long.class,
                emi.getLoanId(),
                emi.getEmiNumber(),
                emi.getDueDate(),
                emi.getEmiAmount(),
                emi.getPrincipalAmount(),
                emi.getInterestAmount(),
                emi.getPaidAmount(),
                emi.getPaymentDate(),
                emi.getStatus()
        );

        emi.setEmiId(emiId);

        return emi;
    }

    @Override
    public List<LoanEmi> findByLoanId(Long loanId) {

        String sql = """
                SELECT
                    emi_id,
                    loan_id,
                    emi_number,
                    due_date,
                    emi_amount,
                    principal_amount,
                    interest_amount,
                    paid_amount,
                    payment_date,
                    status
                FROM loan_emi
                WHERE loan_id = ?
                ORDER BY emi_number
                """;

        return jdbcTemplate.query(
                sql,
                this::mapLoanEmi,
                loanId
        );
    }

    @Override
    public LoanEmi findById(Long emiId) {

        String sql = """
                SELECT
                    emi_id,
                    loan_id,
                    emi_number,
                    due_date,
                    emi_amount,
                    principal_amount,
                    interest_amount,
                    paid_amount,
                    payment_date,
                    status
                FROM loan_emi
                WHERE emi_id = ?
                """;

        List<LoanEmi> result = jdbcTemplate.query(
                sql,
                this::mapLoanEmi,
                emiId
        );

        return result.isEmpty() ? null : result.get(0);
    }

    @Override
    public void update(LoanEmi emi) {

        String sql = """
                UPDATE loan_emi
                SET
                    paid_amount = ?,
                    payment_date = ?,
                    status = ?
                WHERE emi_id = ?
                """;

        jdbcTemplate.update(
                sql,
                emi.getPaidAmount(),
                emi.getPaymentDate(),
                emi.getStatus(),
                emi.getEmiId()
        );
    }

    private LoanEmi mapLoanEmi(
            java.sql.ResultSet rs,
            int rowNum) throws java.sql.SQLException {

        LoanEmi emi = new LoanEmi();

        emi.setEmiId(rs.getLong("emi_id"));
        emi.setLoanId(rs.getLong("loan_id"));
        emi.setEmiNumber(rs.getInt("emi_number"));

        if (rs.getDate("due_date") != null) {
            emi.setDueDate(
                    rs.getDate("due_date").toLocalDate()
            );
        }

        emi.setEmiAmount(
                rs.getBigDecimal("emi_amount")
        );

        emi.setPrincipalAmount(
                rs.getBigDecimal("principal_amount")
        );

        emi.setInterestAmount(
                rs.getBigDecimal("interest_amount")
        );

        emi.setPaidAmount(
                rs.getBigDecimal("paid_amount")
        );

        if (rs.getDate("payment_date") != null) {
            emi.setPaymentDate(
                    rs.getDate("payment_date").toLocalDate()
            );
        }

        emi.setStatus(
                rs.getString("status")
        );

        return emi;
    }
}