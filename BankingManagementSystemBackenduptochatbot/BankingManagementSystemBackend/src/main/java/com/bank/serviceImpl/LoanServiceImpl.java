package com.bank.serviceImpl;
import com.bank.exception.LoanApplicationException;
import com.bank.entity.Loan;
import com.bank.repository.LoanRepository;
import com.bank.service.LoanEmiService;
import com.bank.service.LoanService;
import com.bank.entity.LoanAssessment;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class LoanServiceImpl implements LoanService {

    private final LoanRepository loanRepository;
    private final LoanEmiService loanEmiService;

    public LoanServiceImpl(
            LoanRepository loanRepository,
            LoanEmiService loanEmiService) {

        this.loanRepository = loanRepository;
        this.loanEmiService = loanEmiService;
    }

    // =========================================================
    // APPLY FOR LOAN
    // =========================================================
    @Override
    public Loan applyLoan(Loan loan) {

        // Check customer's existing loans
        List<Loan> existingLoans =
                loanRepository.findByCustomerId(
                        loan.getCustomerId()
                );

        // Open loan statuses
        List<String> openStatuses = List.of(
                "PENDING",
                "APPROVED",
                "ACTIVE",
                "OVERDUE"
        );

        // Check whether customer already has an open loan
        for (Loan existingLoan : existingLoans) {

        	if (openStatuses.contains(
        	        existingLoan.getStatus()
        	)) {

        	    throw new LoanApplicationException(
        	            "Customer already has a " +
        	            existingLoan.getStatus().toLowerCase() +
        	            " loan. " +
        	            "Please complete or close the existing loan before applying again."
        	    );
        	}
        }

        // Create new loan
        loan.setApplicationDate(
                LocalDateTime.now()
        );

        loan.setStatus("PENDING");

        return loanRepository.save(loan);
    }
    // =========================================================
    // GET LOAN BY ID
    // =========================================================

    @Override
    public Loan getLoanById(Long loanId) {

        Loan loan = loanRepository.findById(loanId);

        if (loan == null) {
            throw new RuntimeException(
                    "Loan not found with ID: " + loanId
            );
        }

        return loan;
    }

    // =========================================================
    // GET ALL LOANS
    // =========================================================

    @Override
    public List<Loan> getAllLoans() {

        return loanRepository.findAll();
    }

    // =========================================================
    // GET LOANS BY CUSTOMER
    // =========================================================

    @Override
    public List<Loan> getLoansByCustomer(Long customerId) {

        return loanRepository.findByCustomerId(customerId);
    }

    // =========================================================
    // GET LOANS BY STATUS
    // =========================================================

    @Override
    public List<Loan> getLoansByStatus(String status) {

        return loanRepository.findByStatus(status);
    }
 // =========================================================
 // LOAN ASSESSMENT
 // =========================================================

 @Override
 public LoanAssessment getAssessment(Long loanId) {

     // Make sure the loan exists
     Loan loan = getLoanById(loanId);

     LoanAssessment assessment =
             loanRepository.findAssessmentByLoanId(loanId);

     if (assessment == null) {
         throw new RuntimeException(
                 "Assessment not found for loan ID: " + loanId
         );
     }

     return assessment;
 }


 @Override
 public LoanAssessment createAssessment(
         LoanAssessment assessment) {

     // -----------------------------------------------------
     // Make sure loan exists
     // -----------------------------------------------------

     Loan loan = getLoanById(
             assessment.getLoanId()
     );

     // -----------------------------------------------------
     // Don't allow duplicate assessment
     // -----------------------------------------------------

     LoanAssessment existing =
             loanRepository.findAssessmentByLoanId(
                     assessment.getLoanId()
             );

     if (existing != null) {
         throw new RuntimeException(
                 "Assessment already exists for loan ID: "
                         + assessment.getLoanId()
         );
     }

     // -----------------------------------------------------
     // Validate income
     // -----------------------------------------------------

  // -----------------------------------------------------
  // Loan type based income validation
  // -----------------------------------------------------

  String loanType = loan.getLoanType();

  if ("EDUCATION".equalsIgnoreCase(loanType)) {

      // Student's own income is not mandatory
      if (assessment.getMonthlyIncome() == null) {
          assessment.setMonthlyIncome(BigDecimal.ZERO);
      }

  } else {

      // Income is mandatory for other loan types
      if (assessment.getMonthlyIncome() == null
              || assessment.getMonthlyIncome()
                      .compareTo(BigDecimal.ZERO) <= 0) {

          throw new RuntimeException(
                  "Monthly income must be greater than zero for "
                          + loanType + " loan"
          );
      }
  }
     // -----------------------------------------------------
     // Default optional values
     // -----------------------------------------------------

     if (assessment.getExistingEmi() == null) {
         assessment.setExistingEmi(BigDecimal.ZERO);
     }

     if (assessment.getProposedEmi() == null) {
         assessment.setProposedEmi(BigDecimal.ZERO);
     }

     // -----------------------------------------------------
     // Calculate total EMI
     // -----------------------------------------------------

     BigDecimal totalEmi =
             assessment.getExistingEmi()
                     .add(assessment.getProposedEmi());

     // -----------------------------------------------------
     // Calculate DTI automatically
     //
     // DTI = (Existing EMI + Proposed EMI)
     //       / Monthly Income × 100
     // -----------------------------------------------------

     BigDecimal dti;

     if ("EDUCATION".equalsIgnoreCase(loanType)
             && assessment.getMonthlyIncome()
                     .compareTo(BigDecimal.ZERO) == 0) {

         // Student has no personal income.
         // DTI cannot be calculated using student's income.
         dti = BigDecimal.ZERO;

     } else {

         dti = totalEmi
                 .divide(
                         assessment.getMonthlyIncome(),
                         4,
                         RoundingMode.HALF_UP
                 )
                 .multiply(BigDecimal.valueOf(100))
                 .setScale(
                         2,
                         RoundingMode.HALF_UP
                 );
     }

     assessment.setDebtToIncome(dti);
     if ("EDUCATION".equalsIgnoreCase(loanType)
    	        && assessment.getMonthlyIncome()
    	                .compareTo(BigDecimal.ZERO) == 0) {

    	    assessment.setRepaymentCapacity("PENDING");
    	}

     // -----------------------------------------------------
     // Initial assessment status
     // -----------------------------------------------------

     if (assessment.getAssessmentStatus() == null) {
         assessment.setAssessmentStatus("PENDING");
     }

     // -----------------------------------------------------
     // Set assessment date automatically
     // -----------------------------------------------------

     assessment.setAssessmentDate(
             LocalDateTime.now()
     );

     // -----------------------------------------------------
     // Save assessment
     // -----------------------------------------------------

     loanRepository.saveAssessment(assessment);

     return assessment;
 }

 @Override
 public LoanAssessment updateAssessment(
         LoanAssessment assessment) {

     LoanAssessment existing =
             loanRepository.findAssessmentByLoanId(
                     assessment.getLoanId()
             );

     if (existing == null) {
         throw new RuntimeException(
                 "Assessment not found for loan ID: "
                         + assessment.getLoanId()
         );
     }

     assessment.setAssessmentId(
             existing.getAssessmentId()
     );

  // -----------------------------------------------------
  // Loan type based income validation
  // -----------------------------------------------------

  Loan loan = getLoanById(
          assessment.getLoanId()
  );

  String loanType = loan.getLoanType();

  if ("EDUCATION".equalsIgnoreCase(loanType)) {

      // Student's own income is not mandatory
      if (assessment.getMonthlyIncome() == null) {
          assessment.setMonthlyIncome(BigDecimal.ZERO);
      }

  } else {

      // Income is mandatory for other loan types
      if (assessment.getMonthlyIncome() == null
              || assessment.getMonthlyIncome()
                      .compareTo(BigDecimal.ZERO) <= 0) {

          throw new RuntimeException(
                  "Monthly income must be greater than zero for "
                          + loanType + " loan"
          );
      }
  }     // Default EMI values
     if (assessment.getExistingEmi() == null) {
         assessment.setExistingEmi(BigDecimal.ZERO);
     }

     if (assessment.getProposedEmi() == null) {
         assessment.setProposedEmi(BigDecimal.ZERO);
     }

     // Calculate total EMI
     BigDecimal totalEmi =
             assessment.getExistingEmi()
                     .add(assessment.getProposedEmi());

  // -----------------------------------------------------
  // Calculate DTI
  // -----------------------------------------------------

  BigDecimal dti;

  if ("EDUCATION".equalsIgnoreCase(loanType)
          && assessment.getMonthlyIncome()
                  .compareTo(BigDecimal.ZERO) == 0) {

      dti = BigDecimal.ZERO;

  } else {

      dti = totalEmi
              .divide(
                      assessment.getMonthlyIncome(),
                      4,
                      RoundingMode.HALF_UP
              )
              .multiply(BigDecimal.valueOf(100))
              .setScale(
                      2,
                      RoundingMode.HALF_UP
              );
  }

  assessment.setDebtToIncome(dti);


  // -----------------------------------------------------
  // Calculate repayment capacity
  // -----------------------------------------------------

  if ("EDUCATION".equalsIgnoreCase(loanType)
          && assessment.getMonthlyIncome()
                  .compareTo(BigDecimal.ZERO) == 0) {

      assessment.setRepaymentCapacity("PENDING");

  } else {

      BigDecimal remainingIncome =
              assessment.getMonthlyIncome()
                      .subtract(assessment.getMonthlyExpenses())
                      .subtract(assessment.getExistingEmi())
                      .subtract(assessment.getProposedEmi());

      if (remainingIncome.compareTo(BigDecimal.ZERO) <= 0) {

          assessment.setRepaymentCapacity("POOR");

      } else {

          BigDecimal incomeRatio =
                  remainingIncome
                          .divide(
                                  assessment.getMonthlyIncome(),
                                  4,
                                  RoundingMode.HALF_UP
                          )
                          .multiply(BigDecimal.valueOf(100));

          if (incomeRatio.compareTo(
                  BigDecimal.valueOf(40)) >= 0) {

              assessment.setRepaymentCapacity("STRONG");

          } else if (incomeRatio.compareTo(
                  BigDecimal.valueOf(20)) >= 0) {

              assessment.setRepaymentCapacity("GOOD");

          } else {

              assessment.setRepaymentCapacity("WEAK");
          }
      }
  }


  // -----------------------------------------------------
  // Education loan repayment source
  // -----------------------------------------------------

  if ("EDUCATION".equalsIgnoreCase(loanType)
          && assessment.getRepaymentSource() != null
          && !assessment.getRepaymentSource().trim().isEmpty()) {

      assessment.setRepaymentCapacity("GOOD");
  }
//-----------------------------------------------------
//Calculate Risk Score
//-----------------------------------------------------

int riskScore = 0;

//DTI score
if (dti.compareTo(BigDecimal.valueOf(30)) <= 0) {

   riskScore += 40;

} else if (dti.compareTo(BigDecimal.valueOf(40)) <= 0) {

   riskScore += 30;

} else if (dti.compareTo(BigDecimal.valueOf(50)) <= 0) {

   riskScore += 20;

} else {

   riskScore += 5;
}


//-----------------------------------------------------
//Repayment capacity score
//-----------------------------------------------------

switch (assessment.getRepaymentCapacity()) {

 case "STRONG":
     riskScore += 30;
     break;

 case "GOOD":
     riskScore += 20;
     break;

 case "WEAK":
     riskScore += 10;
     break;

 case "POOR":
     riskScore += 0;
     break;

 case "PENDING":
     // Repayment source is not verified yet
     riskScore += 0;
     break;

 default:
     riskScore += 0;
     break;
}
//Employment score
Integer employmentMonths =
       assessment.getEmploymentMonths();

if (employmentMonths != null) {

   if (employmentMonths >= 36) {

       riskScore += 20;

   } else if (employmentMonths >= 12) {

       riskScore += 15;

   } else {

       riskScore += 5;
   }
}
//-----------------------------------------------------
//Calculate Risk Category
//-----------------------------------------------------

if (riskScore >= 70) {

 assessment.setRiskCategory("LOW");

} else if (riskScore >= 50) {

 assessment.setRiskCategory("MEDIUM");

} else {

 assessment.setRiskCategory("HIGH");
}

//Set risk score
assessment.setRiskScore(riskScore);

     // Status
     if (assessment.getAssessmentStatus() == null) {
         assessment.setAssessmentStatus("PENDING");
     }

     // Assessment date
     assessment.setAssessmentDate(
             LocalDateTime.now()
     );

     // Save
     loanRepository.updateAssessment(assessment);

     return assessment;
 }
    // =========================================================
    // APPROVE LOAN
    // =========================================================

    @Override
    public Loan approveLoan(
            Long loanId,
            Double interestRate) {

        // Get loan
        Loan loan = getLoanById(loanId);
     // -----------------------------------------------------
     // Check loan assessment before approval
     // -----------------------------------------------------

     LoanAssessment assessment =
             loanRepository.findAssessmentByLoanId(loanId);

     if (assessment == null) {
         throw new RuntimeException(
                 "Loan assessment is required before approval"
         );
     }

     // Background/document verification
     if (!"VERIFIED".equalsIgnoreCase(
             assessment.getBackgroundCheck())) {

         throw new RuntimeException(
                 "Loan cannot be approved until background/document verification is VERIFIED"
         );
     }

  // -----------------------------------------------------
  // Education loan repayment verification
  // -----------------------------------------------------

  if ("EDUCATION".equalsIgnoreCase(loan.getLoanType())
          && "PENDING".equalsIgnoreCase(
                  assessment.getRepaymentCapacity())) {

      throw new RuntimeException(
              "Education loan requires repayment source verification before approval"
      );
  }

  // -----------------------------------------------------
  // High-risk loan
  // -----------------------------------------------------

  if ("HIGH".equalsIgnoreCase(
          assessment.getRiskCategory())) {

      throw new RuntimeException(
              "High-risk loan cannot be approved"
      );
  }

  // -----------------------------------------------------
  // Poor repayment capacity
  // -----------------------------------------------------

  if ("POOR".equalsIgnoreCase(
          assessment.getRepaymentCapacity())) {

      throw new RuntimeException(
              "Loan cannot be approved due to poor repayment capacity"
      );
  }
        // -----------------------------------------------------
        // Validate loan status
        // -----------------------------------------------------

        if ("REJECTED".equalsIgnoreCase(loan.getStatus())) {

            throw new RuntimeException(
                    "Rejected loan cannot be approved"
            );
        }

        if ("APPROVED".equalsIgnoreCase(loan.getStatus())
                || "ACTIVE".equalsIgnoreCase(loan.getStatus())) {

            throw new RuntimeException(
                    "Loan is already approved"
            );
        }

        // -----------------------------------------------------
        // Validate requested amount
        // -----------------------------------------------------

        if (loan.getRequestedAmount() == null
                || loan.getRequestedAmount()
                        .compareTo(BigDecimal.ZERO) <= 0) {

            throw new RuntimeException(
                    "Valid requested amount is required"
            );
        }
     // -----------------------------------------------------
     // Loan type eligibility
     // -----------------------------------------------------

     String loanType = loan.getLoanType();

     if (loanType == null || loanType.trim().isEmpty()) {
         throw new RuntimeException(
                 "Loan type is required"
         );
     }

     BigDecimal amount = loan.getRequestedAmount();

     if ("PERSONAL".equalsIgnoreCase(loanType)) {

         if (amount.compareTo(
                 BigDecimal.valueOf(1000000)) > 0) {

             throw new RuntimeException(
                     "Personal loan amount cannot exceed ₹10,00,000"
             );
         }

     } else if ("HOME".equalsIgnoreCase(loanType)) {

         if (amount.compareTo(
                 BigDecimal.valueOf(5000000)) > 0) {

             throw new RuntimeException(
                     "Home loan amount cannot exceed ₹50,00,000"
             );
         }

     } else if ("EDUCATION".equalsIgnoreCase(loanType)) {

         if (amount.compareTo(
                 BigDecimal.valueOf(3000000)) > 0) {

             throw new RuntimeException(
                     "Education loan amount cannot exceed ₹30,00,000"
             );
         }

     } else {

         throw new RuntimeException(
                 "Unsupported loan type: " + loanType
         );
     }

        // -----------------------------------------------------
        // Validate tenure
        // -----------------------------------------------------

        if (loan.getTenureMonths() == null
                || loan.getTenureMonths() <= 0) {

            throw new RuntimeException(
                    "Valid tenure is required"
            );
        }

        // -----------------------------------------------------
        // Validate interest rate
        // -----------------------------------------------------

        if (interestRate == null || interestRate < 0) {

            throw new RuntimeException(
                    "Valid interest rate is required"
            );
        }

        // -----------------------------------------------------
        // Loan values
        // -----------------------------------------------------

        BigDecimal principal =
                loan.getRequestedAmount();

        BigDecimal rate =
                BigDecimal.valueOf(interestRate);

        int tenure =
                loan.getTenureMonths();

        // -----------------------------------------------------
        // Calculate monthly interest rate
        //
        // Annual rate / 12 / 100
        // -----------------------------------------------------

        BigDecimal monthlyRate =
                rate.divide(
                        BigDecimal.valueOf(1200),
                        10,
                        RoundingMode.HALF_UP
                );

        // -----------------------------------------------------
        // Calculate EMI
        //
        // EMI = P × r × (1+r)^n
        //       ----------------
        //       (1+r)^n - 1
        // -----------------------------------------------------

        double p = principal.doubleValue();

        double r = monthlyRate.doubleValue();

        int n = tenure;

        double emi;

        if (r == 0) {

            emi = p / n;

        } else {

            emi =
                    (p * r * Math.pow(1 + r, n))
                    /
                    (Math.pow(1 + r, n) - 1);
        }

        BigDecimal emiAmount =
                BigDecimal.valueOf(emi)
                        .setScale(
                                2,
                                RoundingMode.HALF_UP
                        );

        // -----------------------------------------------------
        // Calculate total payable
        // -----------------------------------------------------

        BigDecimal totalPayable =
                emiAmount
                        .multiply(
                                BigDecimal.valueOf(tenure)
                        )
                        .setScale(
                                2,
                                RoundingMode.HALF_UP
                        );

        // -----------------------------------------------------
        // Calculate total interest
        // -----------------------------------------------------

        BigDecimal totalInterest =
                totalPayable
                        .subtract(principal)
                        .setScale(
                                2,
                                RoundingMode.HALF_UP
                        );

        // -----------------------------------------------------
        // Loan dates
        // -----------------------------------------------------

        LocalDate startDate =
                LocalDate.now();

        LocalDate endDate =
                startDate.plusMonths(tenure);

        // -----------------------------------------------------
        // Set approved loan information
        // -----------------------------------------------------

        loan.setApprovedAmount(principal);

        loan.setInterestRate(rate);

        loan.setEmiAmount(emiAmount);

        loan.setTotalInterest(totalInterest);

        loan.setTotalPayable(totalPayable);

        loan.setApprovalDate(
                LocalDateTime.now()
        );

        loan.setLoanStartDate(startDate);

        loan.setLoanEndDate(endDate);

        loan.setStatus("ACTIVE");

        loan.setRejectionReason(null);

        // -----------------------------------------------------
        // Save approved loan
        // -----------------------------------------------------

        loanRepository.update(loan);

        // -----------------------------------------------------
        // Generate EMI schedule
        // -----------------------------------------------------

        loanEmiService.generateEmiSchedule(
                loan.getLoanId(),
                loan.getApprovedAmount(),
                loan.getInterestRate(),
                loan.getTenureMonths(),
                loan.getEmiAmount(),
                loan.getLoanStartDate()
        );

        return loan;
    }

    // =========================================================
    // REJECT LOAN
    // =========================================================

    @Override
    public Loan rejectLoan(
            Long loanId,
            String rejectionReason) {

        // Get loan
        Loan loan = getLoanById(loanId);

        // -----------------------------------------------------
        // Validate status
        // -----------------------------------------------------

        if ("APPROVED".equalsIgnoreCase(loan.getStatus())
                || "ACTIVE".equalsIgnoreCase(loan.getStatus())) {

            throw new RuntimeException(
                    "Approved loan cannot be rejected"
            );
        }

        // -----------------------------------------------------
        // Validate rejection reason
        // -----------------------------------------------------

        if (rejectionReason == null
                || rejectionReason.trim().isEmpty()) {

            throw new RuntimeException(
                    "Rejection reason is required"
            );
        }

        // -----------------------------------------------------
        // Set rejection information
        // -----------------------------------------------------

        loan.setStatus("REJECTED");

        loan.setRejectionReason(
                rejectionReason
        );

        loan.setApprovalDate(null);

        // -----------------------------------------------------
        // Update database
        // -----------------------------------------------------

        loanRepository.update(loan);

        return loan;
    }
}