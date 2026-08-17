<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Dashboard | Bank Management System</title>

    <!-- Font Awesome (icons) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <!-- Single stylesheet for sidebar + navbar + dashboard -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/empDashboard.css">
</head>
<body>

<div class="layout">

    <jsp:include page="sidebar.jsp" />

    <div class="main-content">

        <jsp:include page="navbar.jsp" />

        <main class="content-area">

            <!-- ===== Welcome Banner ===== -->
            <section class="welcome-banner">
                <div class="avatar-circle lg">RS</div>
                <div class="banner-text">
                    <h2>Good Morning, <span id="bannerEmployeeName">Employee</span>!</h2>
                    <p>Manage customer banking operations efficiently.</p>
                    <div class="banner-meta">
                        <span><i class="fa-regular fa-calendar"></i><span id="bannerDate">06 August 2026, Wednesday</span></span>
                        <span><i class="fa-regular fa-clock"></i><span id="bannerTime">02:30 PM</span></span>
                    </div>
                </div>
                <i class="fa-solid fa-building-columns banner-illustration"></i>
            </section>

            <!-- ===== Stat Cards ===== -->
            <section class="stats-grid" id="statsGrid">

                <div class="stat-card">
                    <div class="stat-icon icon-purple"><i class="fa-solid fa-user-plus"></i></div>
                    <div class="stat-body">
                        <span class="stat-label">Pending Registration Requests</span>
                        <span class="stat-value" id="pendingRegistrations">0</span>
                        <span class="stat-trend up" id="pendingRegistrationsTrend">&#8593; 12% from yesterday</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon icon-green"><i class="fa-solid fa-users"></i></div>
                    <div class="stat-body">
                        <span class="stat-label">Total Customers</span>
                        <span class="stat-value" id="totalCustomers">0</span>
                        <span class="stat-trend up" id="totalCustomersTrend">&#8593; 8% from last month</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon icon-blue"><i class="fa-solid fa-credit-card"></i></div>
                    <div class="stat-body">
                        <span class="stat-label">Active Accounts</span>
                        <span class="stat-value" id="activeAccounts">0</span>
                        <span class="stat-trend up" id="activeAccountsTrend">&#8593; 6% from last month</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon icon-orange"><i class="fa-solid fa-right-left"></i></div>
                    <div class="stat-body">
                        <span class="stat-label">Today's Transactions</span>
                        <span class="stat-value" id="todaysTransactions">0</span>
                        <span class="stat-trend up" id="todaysTransactionsTrend">&#8593; 15% from yesterday</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon icon-red"><i class="fa-solid fa-sack-dollar"></i></div>
                    <div class="stat-body">
                        <span class="stat-label">Pending Loan Requests</span>
                        <span class="stat-value" id="pendingLoans">0</span>
                        <span class="stat-trend down" id="pendingLoansTrend">&#8595; 5% from yesterday</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon icon-green"><i class="fa-solid fa-arrow-down"></i></div>
                    <div class="stat-body">
                        <span class="stat-label">Today's Deposits</span>
                        <span class="stat-value" id="todaysDeposits">&#8377;0</span>
                        <span class="stat-trend up" id="todaysDepositsTrend">&#8593; 10% from yesterday</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon icon-yellow"><i class="fa-solid fa-arrow-up"></i></div>
                    <div class="stat-body">
                        <span class="stat-label">Today's Withdrawals</span>
                        <span class="stat-value" id="todaysWithdrawals">&#8377;0</span>
                        <span class="stat-trend down" id="todaysWithdrawalsTrend">&#8595; 3% from yesterday</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon icon-purple"><i class="fa-solid fa-file-lines"></i></div>
                    <div class="stat-body">
                        <span class="stat-label">Reports Generated</span>
                        <span class="stat-value" id="reportsGenerated">0</span>
                        <span class="stat-trend up" id="reportsGeneratedTrend">&#8593; 20% from yesterday</span>
                    </div>
                </div>

            </section>

            <!-- ===== Bottom Row: Table + Quick Actions ===== -->
            <section class="bottom-grid">

                <div class="panel table-panel">
                    <div class="panel-header">
                        <h3>Recent Registration Requests</h3>
                        <a href="${pageContext.request.contextPath}/employee/registrationRequest.jsp" class="view-all-link">View All <i class="fa-solid fa-chevron-right"></i></a>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Mobile Number</th>
                                <th>Email</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="recentRegistrationsBody"></tbody>                    </table>
                        </div>

                <div class="panel quick-actions-panel">
                    <h3>Quick Actions</h3>
                    <div class="quick-actions-grid">
                        <a href="${pageContext.request.contextPath}/employee/registrationRequest.jsp" class="quick-action qa-blue">
                            <i class="fa-solid fa-user-plus"></i><span>Registration Request</span>
                        </a>
                        <a href="${pageContext.request.contextPath}/employee/customers.jsp" class="quick-action qa-green">
                            <i class="fa-solid fa-users"></i><span>Customers</span>
                        </a>
                        <a href="${pageContext.request.contextPath}/employee/accounts.jsp" class="quick-action qa-purple">
                            <i class="fa-solid fa-credit-card"></i><span>Accounts</span>
                        </a>
                        <a href="${pageContext.request.contextPath}/employee/transactions.jsp" class="quick-action qa-orange">
                            <i class="fa-solid fa-right-left"></i><span>Transactions</span>
                        </a>
                        <a href="${pageContext.request.contextPath}/employee/loans.jsp" class="quick-action qa-red">
                            <i class="fa-solid fa-hand-holding-dollar"></i><span>Loans</span>
                        </a>
                        <a href="${pageContext.request.contextPath}/employee/reports.jsp" class="quick-action qa-indigo">
                            <i class="fa-solid fa-chart-column"></i><span>Reports</span>
                        </a>
                    </div>
                </div>

            </section>

        </main>
    </div>
</div>

<script src="${pageContext.request.contextPath}/assets/js/empDashboard.js"></script>
</body>
</html>