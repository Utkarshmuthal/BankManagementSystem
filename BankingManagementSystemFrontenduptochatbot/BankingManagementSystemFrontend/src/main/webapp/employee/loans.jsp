<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PrimeBank | Loan Management</title>

    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/assets/css/empDashboard.css">

    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/assets/css/employeeLoan.css?v=<%= System.currentTimeMillis() %>">
</head>

<body>

<div class="layout">

    <!-- EXISTING EMPLOYEE SIDEBAR -->
    <jsp:include page="sidebar.jsp" />

    <div class="main-content">

        <!-- EXISTING EMPLOYEE NAVBAR -->
        <jsp:include page="navbar.jsp">
            <jsp:param name="pageTitle" value="Loan Management" />
        </jsp:include>

        <main class="employee-loan-page">

            <section class="employee-loan-hero">
                <div class="hero-copy">
                    <div class="employee-loan-label">
                        <i class="fa-solid fa-building-columns"></i>
                        PRIMEBANK • CREDIT OPERATIONS
                    </div>
                    <h1>Loan Applications</h1>
                    <p>Review customer applications, complete loan assessment and make approval decisions.</p>
                </div>

                <button class="employee-refresh-btn" type="button" onclick="loadLoans()">
                    <i class="fa-solid fa-arrows-rotate"></i>
                    Refresh Applications
                </button>
            </section>

            <section class="employee-loan-stats">
                <div class="employee-stat-card">
                    <div class="employee-stat-icon blue"><i class="fa-solid fa-file-invoice-dollar"></i></div>
                    <div><span>Total Applications</span><strong id="totalLoans">0</strong></div>
                </div>
                <div class="employee-stat-card">
                    <div class="employee-stat-icon orange"><i class="fa-solid fa-hourglass-half"></i></div>
                    <div><span>Pending Review</span><strong id="pendingLoans">0</strong></div>
                </div>
                <div class="employee-stat-card">
                    <div class="employee-stat-icon green"><i class="fa-solid fa-circle-check"></i></div>
                    <div><span>Approved</span><strong id="approvedLoans">0</strong></div>
                </div>
                <div class="employee-stat-card">
                    <div class="employee-stat-icon purple"><i class="fa-solid fa-money-check-dollar"></i></div>
                    <div><span>Active</span><strong id="activeLoans">0</strong></div>
                </div>
                <div class="employee-stat-card">
                    <div class="employee-stat-icon red"><i class="fa-solid fa-circle-xmark"></i></div>
                    <div><span>Rejected</span><strong id="rejectedLoans">0</strong></div>
                </div>
            </section>

            <section class="employee-loan-toolbar">
                <div class="loan-filter-buttons">
                    <button class="filter-btn active" type="button" onclick="filterLoans('ALL', this)">
                        All
                    </button>
                    <button class="filter-btn" type="button" onclick="filterLoans('PENDING', this)">
                        Pending
                    </button>
                    <button class="filter-btn" type="button" onclick="filterLoans('APPROVED', this)">
                        Approved / Active
                    </button>
                    <button class="filter-btn" type="button" onclick="filterLoans('REJECTED', this)">
                        Rejected
                    </button>
                </div>

                <div class="loan-search">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input id="loanSearch"
                           type="search"
                           placeholder="Search loan ID, customer ID or type..."
                           oninput="searchLoans()">
                </div>
            </section>

            <div id="loanMessage" class="employee-loan-message"></div>

            <section class="employee-loan-card">
                <div class="employee-loan-card-header">
                    <div>
                        <h2><i class="fa-solid fa-clipboard-check"></i> Customer Loan Applications</h2>
                        <p>Open an application to review financial eligibility and assessment.</p>
                    </div>
                    <span class="live-indicator"><i class="fa-solid fa-circle"></i> Live data</span>
                </div>

                <div class="employee-table-wrapper">
                    <table class="employee-loan-table">
                        <thead>
                        <tr>
                            <th>Loan ID</th>
                            <th>Customer</th>
                            <th>Loan Type</th>
                            <th>Requested Amount</th>
                            <th>Tenure</th>
                            <th>Purpose</th>
                            <th>Application Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody id="loanTableBody">
                        <tr>
                            <td colspan="9" class="loading-row">
                                <i class="fa-solid fa-spinner fa-spin"></i>
                                Loading loan applications...
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    </div>
</div>

<!-- REVIEW MODAL -->
<div id="loanReviewModal" class="employee-modal" aria-hidden="true">
    <div class="employee-modal-content">

        <div class="employee-modal-header">
            <div>
                <span>PRIMEBANK • LOAN REVIEW</span>
                <h2 id="modalLoanTitle">Loan Review</h2>
                <p>Verify application information and complete the assessment before approval.</p>
            </div>
            <button class="modal-close" type="button" onclick="closeLoanModal()" aria-label="Close">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>

        <section class="review-section">
            <h3><i class="fa-solid fa-file-lines"></i> Application Details</h3>
            <div id="loanDetails" class="review-grid"></div>
        </section>

        <section class="review-section">
            <h3><i class="fa-solid fa-folder-open"></i> Uploaded Documents</h3>
            <div id="employeeDocumentsList" class="employee-documents-list"></div>
        </section>

        <section class="review-section">
            <h3><i class="fa-solid fa-calendar-check"></i> EMI Schedule</h3>
            <div id="employeeEmiSchedule"></div>
        </section>

        <section class="review-section assessment-section">
            <div class="assessment-heading">
                <div>
                    <h3><i class="fa-solid fa-chart-line"></i> Loan Assessment</h3>
                    <p>Enter or update assessment information. Risk score/category are calculated by the backend.</p>
                </div>
                <span id="assessmentModeBadge" class="assessment-badge">Not loaded</span>
            </div>

            <div id="assessmentMessage" class="assessment-message"></div>

            <form id="assessmentForm" class="assessment-form">

                <div class="assessment-grid">

                    <div class="field">
                        <label for="monthlyIncome">Monthly Income <b>*</b></label>
                        <input id="monthlyIncome" type="number" min="0" step="0.01" required>
                    </div>

                    <div class="field">
                        <label for="monthlyExpenses">Monthly Expenses</label>
                        <input id="monthlyExpenses" type="number" min="0" step="0.01">
                    </div>

                    <div class="field">
                        <label for="existingEmi">Existing Monthly EMI</label>
                        <input id="existingEmi" type="number" min="0" step="0.01">
                    </div>

                    <div class="field">
                        <label for="proposedEmi">Proposed EMI</label>
                        <input id="proposedEmi" type="number" min="0" step="0.01">
                    </div>

                    <div class="field">
                        <label for="employmentMonths">Employment Duration (Months)</label>
                        <input id="employmentMonths" type="number" min="0" step="1">
                    </div>

                    <div class="field">
                        <label for="repaymentSource">Repayment Source</label>
                        <select id="repaymentSource">
                            <option value="">Select source</option>
                            <option value="SALARY">Salary</option>
                            <option value="BUSINESS_INCOME">Business Income</option>
                            <option value="RENTAL_INCOME">Rental Income</option>
                            <option value="FAMILY_SUPPORT">Family Support</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>

                    <div class="field">
                        <label for="repaymentCapacity">Repayment Capacity <b>*</b></label>
                        <select id="repaymentCapacity" required>
                            <option value="">Select capacity</option>
                            <option value="STRONG">Strong</option>
                            <option value="GOOD">Good</option>
                            <option value="WEAK">Weak</option>
                            <option value="POOR">Poor</option>
                        </select>
                    </div>

                    <div class="field">
                        <label for="backgroundCheck">Background / Document Verification <b>*</b></label>
                        <select id="backgroundCheck" required>
                            <option value="">Select verification status</option>
                            <option value="VERIFIED">Verified</option>
                            <option value="PENDING">Pending</option>
                            <option value="REJECTED">Rejected</option>
                        </select>
                        <small class="field-hint">Auto-filled from the Uploaded Documents section below -- override here if needed.</small>
                    </div>

                    <div class="field field-wide">
                        <label for="remarks">Assessment Remarks</label>
                        <textarea id="remarks" rows="3" placeholder="Enter verification notes or assessment remarks..."></textarea>
                    </div>
                </div>

                <div class="assessment-result">
                    <div>
                        <span>Debt To Income</span>
                        <strong id="assessmentDti">—</strong>
                    </div>
                    <div>
                        <span>Risk Score</span>
                        <strong id="assessmentRiskScore">—</strong>
                    </div>
                    <div>
                        <span>Risk Category</span>
                        <strong id="assessmentRiskCategory">—</strong>
                    </div>
                    <div>
                        <span>Status</span>
                        <strong id="assessmentStatus">—</strong>
                    </div>
                </div>

                <div class="assessment-actions">
                    <button type="button" class="secondary-btn" onclick="saveAssessment()">
                        <i class="fa-solid fa-floppy-disk"></i> Save Assessment
                    </button>
                </div>
            </form>
        </section>

        <section id="decisionSection" class="decision-section">
            <div>
                <h3><i class="fa-solid fa-gavel"></i> Final Decision</h3>
                <p>Approval requires an assessment, VERIFIED background/document check, acceptable risk and repayment capacity.</p>
            </div>

            <div class="interest-field">
                <label for="interestRate">Interest Rate (%)</label>
                <input id="interestRate" type="number" min="0.01" max="100" step="0.01" placeholder="e.g. 8.50">
            </div>
        </section>

        <div id="loanActionButtons" class="employee-modal-actions"></div>
    </div>
</div>

<script src="${pageContext.request.contextPath}/assets/js/loanEmp.js?v=<%= System.currentTimeMillis() %>"></script>
</body>
</html>
