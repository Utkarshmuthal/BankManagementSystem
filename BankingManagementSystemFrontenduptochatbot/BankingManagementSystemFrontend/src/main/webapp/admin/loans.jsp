<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loan Management - Bank Management System</title>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Custom CSS: base admin layout, then loan-page-specific extras -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/admindashboard.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/adminLoan.css?v=<%= System.currentTimeMillis() %>">
</head>
<body>

    <div class="app-container">

        <!-- INCLUDE REUSABLE SIDEBAR WITH 'loans' ACTIVE PARAMETER -->
        <jsp:include page="sidebar.jsp">
            <jsp:param name="activePage" value="loans" />
        </jsp:include>

        <!-- MAIN WRAPPER -->
        <div class="main-wrapper">

            <!-- INCLUDE REUSABLE NAVBAR -->
            <jsp:include page="navbar.jsp">
                <jsp:param name="pageTitle" value="Loan Management" />
                <jsp:param name="showSearch" value="false" />
            </jsp:include>

            <!-- PAGE CONTENT CONTAINER -->
            <main class="content-container">

                <!-- LOAN STATS CARDS GRID -->
                <div class="loan-stats-grid">

                    <div class="stat-card">
                        <div class="stat-icon-wrapper" style="background:#1877f2; color:#ffffff; font-size: 22px;">
                            <i class="fa-solid fa-file-invoice-dollar"></i>
                        </div>
                        <div class="stat-info">
                            <h4>Total Applications</h4>
                            <div class="stat-number" id="stat-total-loans">0</div>
                            <div class="stat-subtext">All loan records</div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon-wrapper" style="background:#f59e0b; color:#ffffff; font-size: 22px;">
                            <i class="fa-solid fa-hourglass-half"></i>
                        </div>
                        <div class="stat-info">
                            <h4>Pending Review</h4>
                            <div class="stat-number" id="stat-pending-loans">0</div>
                            <div class="stat-subtext">Awaiting employee decision</div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon-wrapper" style="background:#10b981; color:#ffffff; font-size: 22px;">
                            <i class="fa-solid fa-money-check-dollar"></i>
                        </div>
                        <div class="stat-info">
                            <h4>Active Loans</h4>
                            <div class="stat-number" id="stat-active-loans">0</div>
                            <div class="stat-subtext">Approved &amp; running</div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon-wrapper" style="background:#ef4444; color:#ffffff; font-size: 22px;">
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                        <div class="stat-info">
                            <h4>Rejected</h4>
                            <div class="stat-number" id="stat-rejected-loans">0</div>
                            <div class="stat-subtext">Declined applications</div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon-wrapper" style="background:#8b5cf6; color:#ffffff; font-size: 22px;">
                            <i class="fa-solid fa-sack-dollar"></i>
                        </div>
                        <div class="stat-info">
                            <h4>Total Disbursed</h4>
                            <div class="stat-number" id="stat-disbursed-amount">₹0</div>
                            <div class="stat-subtext">Sum of approved amounts</div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon-wrapper" style="background:#3b82f6; color:#ffffff; font-size: 22px;">
                            <i class="fa-solid fa-scale-balanced"></i>
                        </div>
                        <div class="stat-info">
                            <h4>Total Outstanding</h4>
                            <div class="stat-number" id="stat-outstanding-amount">₹0</div>
                            <div class="stat-subtext">Payable minus paid EMIs</div>
                        </div>
                    </div>

                </div>

                <!-- LOANS TABLE CARD -->
                <div class="table-card">
                    <div class="table-header-tools">
                        <h3 class="table-title">Loan Applications</h3>

                        <div class="tools-right">
                            <div class="loan-filter-row">
                                <div class="search-bar" style="width:220px;">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                    <input type="text" id="loanSearchInput"
                                           placeholder="Search loan ID, customer ID..."
                                           onkeyup="filterLoansTable()">
                                </div>

                                <select id="loanStatusFilter" onchange="filterLoansTable()">
                                    <option value="">All Status</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="APPROVED">Approved</option>
                                    <option value="ACTIVE">Active</option>
                                    <option value="REJECTED">Rejected</option>
                                    <option value="CLOSED">Closed</option>
                                    <option value="OVERDUE">Overdue</option>
                                </select>

                                <select id="loanTypeFilter" onchange="filterLoansTable()">
                                    <option value="">All Types</option>
                                    <option value="PERSONAL">Personal</option>
                                    <option value="HOME">Home</option>
                                    <option value="EDUCATION">Education</option>
                                    <option value="CAR">Car</option>
                                    <option value="BUSINESS">Business</option>
                                </select>
                            </div>

                            <button class="btn-filter" onclick="fetchAllLoans()">
                                <i class="fa-solid fa-rotate"></i> Refresh
                            </button>
                        </div>
                    </div>

                    <!-- DATA TABLE -->
                    <div class="data-table-wrapper">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Loan ID</th>
                                    <th>Customer ID</th>
                                    <th>Type</th>
                                    <th>Requested</th>
                                    <th>Approved</th>
                                    <th>Interest</th>
                                    <th>EMI</th>
                                    <th>Applied On</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="loan-table-body">
                                <tr>
                                    <td colspan="10" style="text-align: center; padding: 24px; color: #64748b;">
                                        <i class="fa-solid fa-spinner fa-spin"></i> Loading loan applications...
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="table-footer">
                        <span id="loan-showing-count">Showing 0 loans</span>
                    </div>
                </div>

            </main>
        </div>
    </div>

    <!-- ==================== LOAN DETAILS (READ-ONLY) MODAL ==================== -->
    <div id="loan-detail-modal" class="modal-overlay">
        <div class="modal-card loan-modal-card">
            <div class="modal-header">
                <h3 id="loan-modal-title"><i class="fa-solid fa-file-invoice-dollar"></i> Loan Details</h3>
                <button type="button" class="modal-close-btn" onclick="closeLoanDetailModal()">&times;</button>
            </div>

            <div class="modal-body">

                <div class="loan-detail-section">
                    <h4><i class="fa-solid fa-circle-info"></i> Application</h4>
                    <div class="loan-detail-grid" id="loan-detail-application"></div>
                </div>

                <div class="loan-detail-section">
                    <h4><i class="fa-solid fa-chart-line"></i> Assessment Summary</h4>
                    <div id="loan-detail-assessment"></div>
                </div>

                <div class="loan-detail-section">
                    <h4><i class="fa-solid fa-calendar-check"></i> EMI Schedule</h4>
                    <div id="loan-detail-emi"></div>
                </div>

            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeLoanDetailModal()">Close</button>
            </div>
        </div>
    </div>

    <!-- Loan-page-specific JS (does not touch admindashboard.js) -->
    <script src="${pageContext.request.contextPath}/assets/js/adminLoan.js?v=<%= System.currentTimeMillis() %>"></script>
    <script src="${pageContext.request.contextPath}/assets/js/admindashboard.js"></script>
</body>
</html>
