<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard | Bank Management System</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/customerDashboard.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/customerNavbar.css">
</head>
<body>

<div class="layout">

    <jsp:include page="sidebar.jsp" />

    <div class="main-content">

        <jsp:include page="navbar.jsp" />

        <main class="content-area">

            <!-- ===== Welcome Banner ===== -->
            <section class="welcome-banner">
                <div class="avatar-circle-white">MB</div>
                <div class="banner-text">
                    <h2>Good Morning, <span id="bannerCustomerName">Monika</span>!</h2>
                    <p class="banner-sub">Welcome to Bank Management System</p>
                    <p class="banner-note">Your account is active and secure.</p>
                    <span class="banner-date-badge">
                        <i class="fa-regular fa-calendar"></i>
                        <span id="bannerDate">06 August 2026, Wednesday</span> | <span id="bannerTime">10:15 AM</span>
                    </span>
                </div>
                <svg class="banner-illustration" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2 2 7v2h20V7L12 2zM4 10v9H2v2h20v-2h-2v-9h-2v9h-3v-9h-2v9h-2v-9H9v9H6v-9H4z"/>
                </svg>
            </section>

            <!-- ===== Stat Cards ===== -->
            <section class="stats-grid" id="statsGrid">

                <div class="stat-card">
                    <div class="stat-icon icon-blue"><i class="fa-solid fa-wallet"></i></div>
                    <div class="stat-body">
                        <span class="stat-label">Available Balance</span>
                        <span class="stat-value" id="availableBalance">&#8377; 2,45,000.00</span>
                        <a href="#" class="stat-link" id="viewBalanceLink">View Balance</a>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon icon-green"><i class="fa-solid fa-id-card"></i></div>
                    <div class="stat-body">
                        <span class="stat-label">Account Number</span>
                        <span class="stat-value" id="accountNumber">XXXX XXXX 4567</span>
                        <span class="stat-note note-green" id="accountTypeNote">Savings Account</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon icon-purple"><i class="fa-solid fa-building-columns"></i></div>
                    <div class="stat-body">
                        <span class="stat-label">Account Type</span>
                        <span class="stat-value" id="accountType">Savings</span>
                        <span class="stat-note" id="branchName">Pune Branch</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon icon-teal"><i class="fa-solid fa-shield-halved"></i></div>
                    <div class="stat-body">
                        <span class="stat-label">KYC Status</span>
                        <span class="stat-value" id="kycStatus">Verified <i class="fa-solid fa-circle-check kyc-check"></i></span>
                        <span class="stat-note note-green" id="kycNote">Aadhaar &amp; PAN Verified</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon icon-orange"><i class="fa-solid fa-rupee-sign"></i></div>
                    <div class="stat-body">
                        <span class="stat-label">Last Login</span>
                        <span class="stat-value" id="lastLoginDate">06 Aug 2026</span>
                        <span class="stat-note" id="lastLoginTime">10:15 AM</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon icon-red"><i class="fa-solid fa-hand-holding-dollar"></i></div>
                    <div class="stat-body">
                        <span class="stat-label">Loan Status</span>
                        <span class="stat-value" id="loanStatus">No Active Loan</span>
                        <span class="stat-note note-red" id="loanNote">You are debt free!</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon icon-blue"><i class="fa-solid fa-right-left"></i></div>
                    <div class="stat-body">
                        <span class="stat-label">Total Transactions</span>
                        <span class="stat-value" id="totalTransactions">128</span>
                        <span class="stat-trend up" id="totalTransactionsTrend">&#8593; 12.4% vs last month</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon icon-yellow"><i class="fa-solid fa-star"></i></div>
                    <div class="stat-body">
                        <span class="stat-label">Reward Points</span>
                        <span class="stat-value" id="rewardPoints">850</span>
                        <a href="#" class="stat-link note-orange" id="viewRewardsLink">View Rewards</a>
                    </div>
                </div>

            </section>

            <!-- ===== Bottom Row: Table + Quick Actions ===== -->
            <section class="bottom-grid">

                <div class="panel table-panel">
                    <div class="panel-header">
                        <h3><i class="fa-solid fa-shield-halved panel-title-icon"></i> Recent Transactions</h3>
                        <a href="${pageContext.request.contextPath}/customer/transactionHistory.jsp" class="view-all-link">View All</a>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="recentTransactionsBody">
                            <tr>
                                <td>06 Aug 2026</td>
                                <td><span class="type-pill type-deposit">Deposit</span></td>
                                <td>Cash Deposit</td>
                                <td class="amount-positive">+ &#8377;20,000</td>
                                <td><span class="status-pill status-success">Success</span></td>
                            </tr>
                            <tr>
                                <td>05 Aug 2026</td>
                                <td><span class="type-pill type-withdraw">Withdraw</span></td>
                                <td>ATM Withdrawal</td>
                                <td class="amount-negative">- &#8377;5,000</td>
                                <td><span class="status-pill status-success">Success</span></td>
                            </tr>
                            <tr>
                                <td>04 Aug 2026</td>
                                <td><span class="type-pill type-transfer">Transfer</span></td>
                                <td>UPI Transfer to Raj</td>
                                <td class="amount-negative">- &#8377;15,000</td>
                                <td><span class="status-pill status-success">Success</span></td>
                            </tr>
                            <tr>
                                <td>03 Aug 2026</td>
                                <td><span class="type-pill type-deposit">Deposit</span></td>
                                <td>Salary Credit</td>
                                <td class="amount-positive">+ &#8377;30,000</td>
                                <td><span class="status-pill status-success">Success</span></td>
                            </tr>
                            <tr>
                                <td>02 Aug 2026</td>
                                <td><span class="type-pill type-withdraw">Withdraw</span></td>
                                <td>ATM Withdrawal</td>
                                <td class="amount-negative">- &#8377;3,000</td>
                                <td><span class="status-pill status-success">Success</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="panel quick-actions-panel">
                    <h3><i class="fa-solid fa-bolt panel-title-icon"></i> Quick Actions</h3>
                    <div class="quick-actions-grid">
                        <a href="${pageContext.request.contextPath}/customer/deposit.jsp" class="quick-action qa-blue">
                            <i class="fa-solid fa-arrow-down"></i><span>Deposit</span>
                        </a>
                        <a href="${pageContext.request.contextPath}/customer/withdraw.jsp" class="quick-action qa-red">
                            <i class="fa-solid fa-arrow-up"></i><span>Withdraw</span>
                        </a>
                        <a href="${pageContext.request.contextPath}/customer/fundTransfer.jsp" class="quick-action qa-green">
                            <i class="fa-solid fa-right-left"></i><span>Fund Transfer</span>
                        </a>
                        <a href="${pageContext.request.contextPath}/customer/miniStatement.jsp" class="quick-action qa-purple">
                            <i class="fa-solid fa-file-lines"></i><span>Mini Statement</span>
                        </a>
                        <a href="${pageContext.request.contextPath}/customer/loan.jsp" class="quick-action qa-orange">
                            <i class="fa-solid fa-hand-holding-dollar"></i><span>Loan</span>
                        </a>
                        <a href="${pageContext.request.contextPath}/customer/passbook.jsp" class="quick-action qa-blue">
                            <i class="fa-solid fa-book"></i><span>Passbook</span>
                        </a>
                        <a href="${pageContext.request.contextPath}/customer/downloadStatement.jsp" class="quick-action qa-yellow">
                            <i class="fa-solid fa-file-arrow-down"></i><span>Download Statement</span>
                        </a>
                        <a href="${pageContext.request.contextPath}/customer/profile.jsp" class="quick-action qa-indigo">
                            <i class="fa-solid fa-user"></i><span>Profile</span>
                        </a>
                    </div>
                </div>

            </section>

        </main>
    </div>
</div>

<script src="${pageContext.request.contextPath}/assets/js/customerDashboard.js"></script>
</body>
</html>
