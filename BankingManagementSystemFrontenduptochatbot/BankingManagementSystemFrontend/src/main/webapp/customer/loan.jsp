<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>PrimeBank | Loans</title>

    <!-- Font Awesome -->
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <!-- Existing PrimeBank Dashboard Theme -->
    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/assets/css/customerDashboard.css">

    <!-- Customer Loan Module -->
    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/assets/css/loanModule.css">
          
          <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/customerNavbar.css">

</head>
<body>

<div class="layout">

    <!-- Existing PrimeBank customer sidebar -->
    <jsp:include page="sidebar.jsp" />

    <div class="main-content">

        <!-- Existing PrimeBank customer navbar -->
        <jsp:include page="navbar.jsp">
            <jsp:param name="pageTitle" value="Loans" />
        </jsp:include>

        <main class="content-area">

            <!-- =================================================
                 PRIMEBANK LOAN HERO
            ================================================== -->
            <section class="loan-hero">

                <div class="loan-hero-content">

                    <div class="loan-hero-icon">
                        <i class="fa-solid fa-hand-holding-dollar"></i>
                    </div>

                    <div>
                        <span class="loan-eyebrow">
                            PRIMEBANK LOAN SERVICES
                        </span>

                        <h1>
                            Your Loan, Your Way
                        </h1>

                        <p>
                            Apply for a loan, track your application,
                            review eligibility, manage documents and
                            keep up with your EMI schedule in one place.
                        </p>
                    </div>

                </div>

                <button type="button"
                        class="loan-apply-btn"
                        onclick="openLoanModal()">

                    <i class="fa-solid fa-plus"></i>
                    Apply for Loan

                </button>

            </section>


            <!-- =================================================
                 INFORMATION STRIP
            ================================================== -->
            <section class="loan-info-strip">

                <div class="loan-info-item">

                    <div class="loan-info-icon">
                        <i class="fa-solid fa-shield-halved"></i>
                    </div>

                    <div>
                        <strong>Secure Banking</strong>
                        <span>Your application stays protected.</span>
                    </div>

                </div>


                <div class="loan-info-item">

                    <div class="loan-info-icon">
                        <i class="fa-solid fa-chart-line"></i>
                    </div>

                    <div>
                        <strong>Eligibility Assessment</strong>
                        <span>Financial details support your assessment.</span>
                    </div>

                </div>


                <div class="loan-info-item">

                    <div class="loan-info-icon">
                        <i class="fa-solid fa-calendar-check"></i>
                    </div>

                    <div>
                        <strong>EMI Tracking</strong>
                        <span>View and pay your scheduled EMIs.</span>
                    </div>

                </div>

            </section>


            <!-- =================================================
                 SUMMARY
            ================================================== -->
            <section class="loan-summary-grid">

                <div class="stat-card loan-stat-card">

                    <div class="stat-icon icon-blue">
                        <i class="fa-solid fa-file-invoice-dollar"></i>
                    </div>

                    <div class="stat-body">
                        <span class="stat-label">Total Loans</span>
                        <span class="stat-value" id="totalLoans">0</span>
                    </div>

                </div>


                <div class="stat-card loan-stat-card">

                    <div class="stat-icon icon-green">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>

                    <div class="stat-body">
                        <span class="stat-label">Approved / Active</span>
                        <span class="stat-value approved" id="approvedLoans">0</span>
                    </div>

                </div>


                <div class="stat-card loan-stat-card">

                    <div class="stat-icon icon-orange">
                        <i class="fa-solid fa-hourglass-half"></i>
                    </div>

                    <div class="stat-body">
                        <span class="stat-label">Pending</span>
                        <span class="stat-value pending" id="pendingLoans">0</span>
                    </div>

                </div>


                <div class="stat-card loan-stat-card">

                    <div class="stat-icon icon-red">
                        <i class="fa-solid fa-circle-xmark"></i>
                    </div>

                    <div class="stat-body">
                        <span class="stat-label">Rejected</span>
                        <span class="stat-value rejected" id="rejectedLoans">0</span>
                    </div>

                </div>

            </section>


            <!-- =================================================
                 MY LOANS
            ================================================== -->
            <section class="panel loan-panel">

                <div class="section-header loan-section-header">

                    <div class="section-title-row">

                        <div class="section-title-icon">
                            <i class="fa-solid fa-list-check"></i>
                        </div>

                        <div>
                            <h3>My Loans</h3>

                            <p class="loan-section-description">
                                Track your applications, approvals and repayments.
                            </p>
                        </div>

                    </div>


                    <button type="button"
                            class="refresh-btn"
                            onclick="loadLoans()">

                        <i class="fa-solid fa-arrows-rotate"></i>
                        Refresh

                    </button>

                </div>


                <div class="table-wrapper">

                    <table class="loan-table">

                        <thead>

                        <tr>
                            <th>Loan ID</th>
                            <th>Loan Type</th>
                            <th>Requested</th>
                            <th>Approved</th>
                            <th>Interest</th>
                            <th>Tenure</th>
                            <th>EMI</th>
                            <th>Status</th>
                            <th>Applied On</th>
                            <th>Action</th>
                        </tr>

                        </thead>


                        <tbody id="loanTableBody">

                        <tr>
                            <td colspan="10" class="loading">
                                <i class="fa-solid fa-spinner fa-spin"></i>
                                Loading your PrimeBank loans...
                            </td>
                        </tr>

                        </tbody>

                    </table>

                </div>

            </section>


            <!-- =================================================
                 HELP
            ================================================== -->
            <section class="loan-help-card">

                <div class="loan-help-icon">
                    <i class="fa-solid fa-circle-info"></i>
                </div>

                <div>
                    <h3>Need help with your loan?</h3>

                    <p>
                        Open any loan to view its assessment,
                        EMI schedule and submitted documents.
                    </p>
                </div>

            </section>

        </main>

    </div>

</div>


<!-- =====================================================
     APPLY LOAN MODAL
===================================================== -->

<div id="loanModal" class="modal">

    <div class="modal-content loan-application-modal">

        <div class="loan-modal-header">

            <div>
                <span class="loan-modal-label">
                    PRIMEBANK LOAN APPLICATION
                </span>

                <h2>Apply for a Loan</h2>

                <p>
                    Complete the details below to submit your application.
                </p>
            </div>

            <button type="button"
                    class="close-btn"
                    onclick="closeLoanModal()">

                <i class="fa-solid fa-xmark"></i>

            </button>

        </div>


        <form id="loanForm"
              onsubmit="applyLoan(event)">

            <!-- Loan details -->

            <div class="loan-form-section">

                <div class="loan-form-section-title">

                    <span class="form-section-number">01</span>

                    <div>
                        <strong>Loan Details</strong>
                        <small>Choose the loan you need.</small>
                    </div>

                </div>


                <div class="form-group">

                    <label for="loanType">
                        Loan Type
                    </label>

                    <select id="loanType"
                            required
                            onchange="toggleIncomeRequirement()">

                        <option value="">
                            Select Loan Type
                        </option>

                        <option value="PERSONAL">
                            Personal Loan
                        </option>

                        <option value="HOME">
                            Home Loan
                        </option>

                        <option value="EDUCATION">
                            Education Loan
                        </option>

                    </select>

                </div>


                <div class="form-row">

                    <div class="form-group">

                        <label for="requestedAmount">
                            Requested Amount
                        </label>

                        <div class="loan-input-wrapper">

                            <span class="currency-symbol">₹</span>

                            <input type="number"
                                   id="requestedAmount"
                                   min="1000"
                                   step="0.01"
                                   placeholder="Enter amount"
                                   required>

                        </div>

                    </div>


                    <div class="form-group">

                        <label for="tenureMonths">
                            Tenure
                        </label>

                        <select id="tenureMonths"
                                required>

                            <option value="">
                                Select tenure
                            </option>

                            <option value="12">12 Months</option>
                            <option value="24">24 Months</option>
                            <option value="36">36 Months</option>
                            <option value="48">48 Months</option>
                            <option value="60">60 Months</option>
                            <option value="84">84 Months</option>
                            <option value="120">120 Months</option>

                        </select>

                    </div>

                </div>


                <div class="form-group">

                    <label for="purpose">
                        Purpose of Loan
                    </label>

                    <textarea id="purpose"
                              rows="3"
                              maxlength="500"
                              placeholder="Example: home renovation, higher education..."
                              required></textarea>

                </div>

            </div>


            <!-- Financial details -->

            <div class="loan-form-section">

                <div class="loan-form-section-title">

                    <span class="form-section-number">02</span>

                    <div>
                        <strong>Financial Details</strong>
                        <small>Used for your eligibility assessment.</small>
                    </div>

                </div>


                <div class="form-row">

                    <div class="form-group">

                        <label id="monthlyIncomeLabel"
                               for="monthlyIncome">

                            Monthly Income *

                        </label>

                        <div class="loan-input-wrapper">

                            <span class="currency-symbol">₹</span>

                            <input type="number"
                                   id="monthlyIncome"
                                   min="0"
                                   step="0.01"
                                   placeholder="Enter monthly income"
                                   required>

                        </div>

                        <small id="incomeHint"
                               class="field-hint">

                            Monthly income is used in the assessment.

                        </small>

                    </div>


                    <div class="form-group">

                        <label for="monthlyExpenses">
                            Monthly Expenses
                        </label>

                        <div class="loan-input-wrapper">

                            <span class="currency-symbol">₹</span>

                            <input type="number"
                                   id="monthlyExpenses"
                                   min="0"
                                   step="0.01"
                                   placeholder="Enter expenses">

                        </div>

                    </div>

                </div>


                <div class="form-row">

                    <div class="form-group">

                        <label for="existingEmi">
                            Existing Monthly EMI
                        </label>

                        <div class="loan-input-wrapper">

                            <span class="currency-symbol">₹</span>

                            <input type="number"
                                   id="existingEmi"
                                   min="0"
                                   step="0.01"
                                   placeholder="0 if none">

                        </div>

                    </div>


                    <div class="form-group">

                        <label for="employmentMonths">
                            Employment Duration
                        </label>

                        <div class="loan-input-wrapper">

                            <input type="number"
                                   id="employmentMonths"
                                   min="0"
                                   step="1"
                                   placeholder="Example: 24">

                            <span class="input-suffix">Months</span>

                        </div>

                    </div>

                </div>


                <div class="form-group">

                    <label for="repaymentSource">
                        Primary Repayment Source
                    </label>

                    <select id="repaymentSource">

                        <option value="">
                            Select source
                        </option>

                        <option value="SALARY">Salary</option>
                        <option value="BUSINESS_INCOME">Business Income</option>
                        <option value="RENTAL_INCOME">Rental Income</option>
                        <option value="FAMILY_SUPPORT">Family Support</option>
                        <option value="OTHER">Other</option>

                    </select>

                </div>

            </div>


            <div id="formMessage"
                 class="form-message">
            </div>


            <div class="modal-actions">

                <button type="button"
                        class="cancel-btn"
                        onclick="closeLoanModal()">

                    Cancel

                </button>


                <button type="submit"
                        class="primary-btn"
                        id="applyBtn">

                    <i class="fa-solid fa-paper-plane"></i>
                    Submit Application

                </button>

            </div>

        </form>

    </div>

</div>


<!-- =====================================================
     LOAN DETAILS MODAL
===================================================== -->

<div id="detailsModal" class="modal">

    <div class="modal-content details-content">

        <div class="loan-modal-header">

            <div>
                <span class="loan-modal-label">
                    PRIMEBANK LOAN DETAILS
                </span>

                <h2>Your Loan</h2>

                <p>
                    Review assessment, EMI schedule and documents.
                </p>
            </div>

            <button type="button"
                    class="close-btn"
                    onclick="closeDetailsModal()">

                <i class="fa-solid fa-xmark"></i>

            </button>

        </div>


        <div id="loanDetails"></div>

    </div>

</div>


<script>
    window.PRIMEBANK_API_BASE =
        "http://localhost:8082/api";

    window.PRIMEBANK_SERVER_URL =
        "http://localhost:8082";
</script>

<script src="${pageContext.request.contextPath}/assets/js/customerDashboard.js"></script>

<script src="${pageContext.request.contextPath}/assets/js/loanCustomer.js"></script>

</body>
</html>
