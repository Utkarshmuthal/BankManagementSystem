package com.bank.repositoryImpl;

import com.bank.entity.Loan;
import com.bank.entity.LoanAssessment;
import com.bank.repository.LoanRepository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LoanRepositoryImpl implements LoanRepository {

    private final JdbcTemplate jdbcTemplate;

    public LoanRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // =========================================================
    // LOAN
    // =========================================================

    @Override
    public Loan save(Loan loan) {

        String sql = """
                INSERT INTO loans (
                    customer_id,
                    loan_type,
                    requested_amount,
                    approved_amount,
                    interest_rate,
                    tenure_months,
                    emi_amount,
                    purpose,
                    application_date,
                    approval_date,
                    loan_start_date,
                    loan_end_date,
                    total_interest,
                    total_payable,
                    status,
                    rejection_reason
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                RETURNING loan_id
                """;

        Long loanId = jdbcTemplate.queryForObject(
                sql,
                Long.class,
                loan.getCustomerId(),
                loan.getLoanType(),
                loan.getRequestedAmount(),
                loan.getApprovedAmount(),
                loan.getInterestRate(),
                loan.getTenureMonths(),
                loan.getEmiAmount(),
                loan.getPurpose(),
                loan.getApplicationDate(),
                loan.getApprovalDate(),
                loan.getLoanStartDate(),
                loan.getLoanEndDate(),
                loan.getTotalInterest(),
                loan.getTotalPayable(),
                loan.getStatus(),
                loan.getRejectionReason()
        );

        loan.setLoanId(loanId);

        return loan;
    }


    @Override
    public Loan findById(Long loanId) {

        String sql = """
                SELECT
                    loan_id,
                    customer_id,
                    loan_type,
                    requested_amount,
                    approved_amount,
                    interest_rate,
                    tenure_months,
                    emi_amount,
                    purpose,
                    application_date,
                    approval_date,
                    loan_start_date,
                    loan_end_date,
                    total_interest,
                    total_payable,
                    status,
                    rejection_reason
                FROM loans
                WHERE loan_id = ?
                """;

        List<Loan> loans = jdbcTemplate.query(
                sql,
                this::mapLoan,
                loanId
        );

        return loans.isEmpty() ? null : loans.get(0);
    }


    @Override
    public List<Loan> findAll() {

        String sql = """
                SELECT
                    loan_id,
                    customer_id,
                    loan_type,
                    requested_amount,
                    approved_amount,
                    interest_rate,
                    tenure_months,
                    emi_amount,
                    purpose,
                    application_date,
                    approval_date,
                    loan_start_date,
                    loan_end_date,
                    total_interest,
                    total_payable,
                    status,
                    rejection_reason
                FROM loans
                ORDER BY loan_id DESC
                """;

        return jdbcTemplate.query(
                sql,
                this::mapLoan
        );
    }


    @Override
    public List<Loan> findByCustomerId(Long customerId) {

        String sql = """
                SELECT
                    loan_id,
                    customer_id,
                    loan_type,
                    requested_amount,
                    approved_amount,
                    interest_rate,
                    tenure_months,
                    emi_amount,
                    purpose,
                    application_date,
                    approval_date,
                    loan_start_date,
                    loan_end_date,
                    total_interest,
                    total_payable,
                    status,
                    rejection_reason
                FROM loans
                WHERE customer_id = ?
                ORDER BY loan_id DESC
                """;

        return jdbcTemplate.query(
                sql,
                this::mapLoan,
                customerId
        );
    }


    @Override
    public List<Loan> findByStatus(String status) {

        String sql = """
                SELECT
                    loan_id,
                    customer_id,
                    loan_type,
                    requested_amount,
                    approved_amount,
                    interest_rate,
                    tenure_months,
                    emi_amount,
                    purpose,
                    application_date,
                    approval_date,
                    loan_start_date,
                    loan_end_date,
                    total_interest,
                    total_payable,
                    status,
                    rejection_reason
                FROM loans
                WHERE status = ?
                ORDER BY loan_id DESC
                """;

        return jdbcTemplate.query(
                sql,
                this::mapLoan,
                status
        );
    }


    @Override
    public void update(Loan loan) {

        String sql = """
                UPDATE loans
                SET
                    approved_amount = ?,
                    interest_rate = ?,
                    tenure_months = ?,
                    emi_amount = ?,
                    approval_date = ?,
                    loan_start_date = ?,
                    loan_end_date = ?,
                    total_interest = ?,
                    total_payable = ?,
                    status = ?,
                    rejection_reason = ?
                WHERE loan_id = ?
                """;

        jdbcTemplate.update(
                sql,
                loan.getApprovedAmount(),
                loan.getInterestRate(),
                loan.getTenureMonths(),
                loan.getEmiAmount(),
                loan.getApprovalDate(),
                loan.getLoanStartDate(),
                loan.getLoanEndDate(),
                loan.getTotalInterest(),
                loan.getTotalPayable(),
                loan.getStatus(),
                loan.getRejectionReason(),
                loan.getLoanId()
        );
    }


    // =========================================================
    // LOAN ASSESSMENT
    // =========================================================

    @Override
    public LoanAssessment findAssessmentByLoanId(Long loanId) {

        String sql = """
                SELECT
                    assessment_id,
                    loan_id,
                    monthly_income,
                    monthly_expenses,
                    existing_emi,
                    proposed_emi,
                    debt_to_income,
                    employment_months,
                    background_check,
                    repayment_capacity,
                    repayment_source,
                    risk_score,
                    risk_category,
                    assessment_status,
                    remarks,
                    assessed_by,
                    assessment_date
                FROM loan_assessment
                WHERE loan_id = ?
                """;

        List<LoanAssessment> assessments = jdbcTemplate.query(
                sql,
                this::mapLoanAssessment,
                loanId
        );

        return assessments.isEmpty()
                ? null
                : assessments.get(0);
    }


    @Override
    public void saveAssessment(LoanAssessment assessment) {

        String sql = """
                INSERT INTO loan_assessment (
                    loan_id,
                    monthly_income,
                    monthly_expenses,
                    existing_emi,
                    proposed_emi,
                    debt_to_income,
                    employment_months,
                    background_check,
                    repayment_capacity,
                    repayment_source,
                    risk_score,
                    risk_category,
                    assessment_status,
                    remarks,
                    assessed_by,
                    assessment_date
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
                RETURNING assessment_id
                """;

        Long assessmentId = jdbcTemplate.queryForObject(
                sql,
                Long.class,
                assessment.getLoanId(),
                assessment.getMonthlyIncome(),
                assessment.getMonthlyExpenses(),
                assessment.getExistingEmi(),
                assessment.getProposedEmi(),
                assessment.getDebtToIncome(),
                assessment.getEmploymentMonths(),
                assessment.getBackgroundCheck(),
                assessment.getRepaymentCapacity(),
                assessment.getRepaymentSource(),
                assessment.getRiskScore(),
                assessment.getRiskCategory(),
                assessment.getAssessmentStatus(),
                assessment.getRemarks(),
                assessment.getAssessedBy(),
                assessment.getAssessmentDate()
        );

        assessment.setAssessmentId(assessmentId);
    }


    @Override
    public void updateAssessment(LoanAssessment assessment) {

        String sql = """
                UPDATE loan_assessment
                SET
                    monthly_income = ?,
                    monthly_expenses = ?,
                    existing_emi = ?,
                    proposed_emi = ?,
                    debt_to_income = ?,
                    employment_months = ?,
                    background_check = ?,
                    repayment_capacity = ?,
                    repayment_source = ?,
                    risk_score = ?,
                    risk_category = ?,
                    assessment_status = ?,
                    remarks = ?,
                    assessed_by = ?,
                    assessment_date = ?
                WHERE assessment_id = ?
                """;

        jdbcTemplate.update(
                sql,
                assessment.getMonthlyIncome(),
                assessment.getMonthlyExpenses(),
                assessment.getExistingEmi(),
                assessment.getProposedEmi(),
                assessment.getDebtToIncome(),
                assessment.getEmploymentMonths(),
                assessment.getBackgroundCheck(),
                assessment.getRepaymentCapacity(),
                assessment.getRepaymentSource(),
                assessment.getRiskScore(),
                assessment.getRiskCategory(),
                assessment.getAssessmentStatus(),
                assessment.getRemarks(),
                assessment.getAssessedBy(),
                assessment.getAssessmentDate(),
                assessment.getAssessmentId()
        );
    }


    // =========================================================
    // LOAN MAPPER
    // =========================================================

    private Loan mapLoan(
            java.sql.ResultSet rs,
            int rowNum) throws java.sql.SQLException {

        Loan loan = new Loan();

        loan.setLoanId(
                rs.getLong("loan_id")
        );

        loan.setCustomerId(
                rs.getLong("customer_id")
        );

        loan.setLoanType(
                rs.getString("loan_type")
        );

        loan.setRequestedAmount(
                rs.getBigDecimal("requested_amount")
        );

        loan.setApprovedAmount(
                rs.getBigDecimal("approved_amount")
        );

        loan.setInterestRate(
                rs.getBigDecimal("interest_rate")
        );

        loan.setTenureMonths(
                rs.getObject(
                        "tenure_months",
                        Integer.class
                )
        );

        loan.setEmiAmount(
                rs.getBigDecimal("emi_amount")
        );

        loan.setPurpose(
                rs.getString("purpose")
        );


        if (rs.getTimestamp("application_date") != null) {

            loan.setApplicationDate(
                    rs.getTimestamp("application_date")
                            .toLocalDateTime()
            );
        }


        if (rs.getTimestamp("approval_date") != null) {

            loan.setApprovalDate(
                    rs.getTimestamp("approval_date")
                            .toLocalDateTime()
            );
        }


        if (rs.getDate("loan_start_date") != null) {

            loan.setLoanStartDate(
                    rs.getDate("loan_start_date")
                            .toLocalDate()
            );
        }


        if (rs.getDate("loan_end_date") != null) {

            loan.setLoanEndDate(
                    rs.getDate("loan_end_date")
                            .toLocalDate()
            );
        }


        loan.setTotalInterest(
                rs.getBigDecimal("total_interest")
        );

        loan.setTotalPayable(
                rs.getBigDecimal("total_payable")
        );

        loan.setStatus(
                rs.getString("status")
        );

        loan.setRejectionReason(
                rs.getString("rejection_reason")
        );

        return loan;
    }


    // =========================================================
    // LOAN ASSESSMENT MAPPER
    // =========================================================

    private LoanAssessment mapLoanAssessment(
            java.sql.ResultSet rs,
            int rowNum) throws java.sql.SQLException {

        LoanAssessment assessment =
                new LoanAssessment();


        assessment.setAssessmentId(
                rs.getLong("assessment_id")
        );


        assessment.setLoanId(
                rs.getLong("loan_id")
        );


        assessment.setMonthlyIncome(
                rs.getBigDecimal("monthly_income")
        );


        assessment.setMonthlyExpenses(
                rs.getBigDecimal("monthly_expenses")
        );


        assessment.setExistingEmi(
                rs.getBigDecimal("existing_emi")
        );


        assessment.setProposedEmi(
                rs.getBigDecimal("proposed_emi")
        );


        assessment.setDebtToIncome(
                rs.getBigDecimal("debt_to_income")
        );


        assessment.setEmploymentMonths(
                rs.getObject(
                        "employment_months",
                        Integer.class
                )
        );


        assessment.setBackgroundCheck(
                rs.getString("background_check")
        );


        assessment.setRepaymentCapacity(
                rs.getString("repayment_capacity")
        );
        
        assessment.setRepaymentSource(
                rs.getString("repayment_source")
        );


        assessment.setRiskScore(
                rs.getObject(
                        "risk_score",
                        Integer.class
                )
        );


        assessment.setRiskCategory(
                rs.getString("risk_category")
        );


        assessment.setAssessmentStatus(
                rs.getString("assessment_status")
        );


        assessment.setRemarks(
                rs.getString("remarks")
        );


        assessment.setAssessedBy(
                rs.getObject(
                        "assessed_by",
                        Long.class
                )
        );


        if (rs.getTimestamp("assessment_date") != null) {

            assessment.setAssessmentDate(
                    rs.getTimestamp("assessment_date")
                            .toLocalDateTime()
            );
        }


        return assessment;
    }
}