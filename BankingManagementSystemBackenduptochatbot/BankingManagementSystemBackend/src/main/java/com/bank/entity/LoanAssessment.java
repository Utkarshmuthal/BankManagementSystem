package com.bank.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class LoanAssessment {

    private Long assessmentId;
    private Long loanId;

    private BigDecimal monthlyIncome;
    private BigDecimal monthlyExpenses;
    private BigDecimal existingEmi;
    private BigDecimal proposedEmi;
    private BigDecimal debtToIncome;

    private Integer employmentMonths;

    private String backgroundCheck;
    private String repaymentCapacity;

    private Integer riskScore;
    private String riskCategory;

    private String assessmentStatus;
    private String remarks;
    private String repaymentSource;

    private Long assessedBy;
    private LocalDateTime assessmentDate;
    


    public Long getAssessmentId() {
        return assessmentId;
    }

    public void setAssessmentId(Long assessmentId) {
        this.assessmentId = assessmentId;
    }


    public Long getLoanId() {
        return loanId;
    }

    public void setLoanId(Long loanId) {
        this.loanId = loanId;
    }


    public BigDecimal getMonthlyIncome() {
        return monthlyIncome;
    }

    public void setMonthlyIncome(BigDecimal monthlyIncome) {
        this.monthlyIncome = monthlyIncome;
    }


    public BigDecimal getMonthlyExpenses() {
        return monthlyExpenses;
    }

    public void setMonthlyExpenses(BigDecimal monthlyExpenses) {
        this.monthlyExpenses = monthlyExpenses;
    }


    public BigDecimal getExistingEmi() {
        return existingEmi;
    }

    public void setExistingEmi(BigDecimal existingEmi) {
        this.existingEmi = existingEmi;
    }


    public BigDecimal getProposedEmi() {
        return proposedEmi;
    }

    public void setProposedEmi(BigDecimal proposedEmi) {
        this.proposedEmi = proposedEmi;
    }


    public BigDecimal getDebtToIncome() {
        return debtToIncome;
    }

    public void setDebtToIncome(BigDecimal debtToIncome) {
        this.debtToIncome = debtToIncome;
    }


    public Integer getEmploymentMonths() {
        return employmentMonths;
    }

    public void setEmploymentMonths(Integer employmentMonths) {
        this.employmentMonths = employmentMonths;
    }


    public String getBackgroundCheck() {
        return backgroundCheck;
    }

    public void setBackgroundCheck(String backgroundCheck) {
        this.backgroundCheck = backgroundCheck;
    }


    public String getRepaymentCapacity() {
        return repaymentCapacity;
    }

    public void setRepaymentCapacity(String repaymentCapacity) {
        this.repaymentCapacity = repaymentCapacity;
    }


    public Integer getRiskScore() {
        return riskScore;
    }

    public void setRiskScore(Integer riskScore) {
        this.riskScore = riskScore;
    }


    public String getRiskCategory() {
        return riskCategory;
    }

    public void setRiskCategory(String riskCategory) {
        this.riskCategory = riskCategory;
    }


    public String getAssessmentStatus() {
        return assessmentStatus;
    }

    public void setAssessmentStatus(String assessmentStatus) {
        this.assessmentStatus = assessmentStatus;
    }


    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }


    public Long getAssessedBy() {
        return assessedBy;
    }

    public void setAssessedBy(Long assessedBy) {
        this.assessedBy = assessedBy;
    }
    public LocalDateTime getAssessmentDate() {
        return assessmentDate;
    }

    public void setAssessmentDate(LocalDateTime assessmentDate) {
        this.assessmentDate = assessmentDate;
    }
    public String getRepaymentSource() {
        return repaymentSource;
    }

    public void setRepaymentSource(String repaymentSource) {
        this.repaymentSource = repaymentSource;
    }
}