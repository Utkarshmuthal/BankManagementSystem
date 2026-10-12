<script>
    if (!sessionStorage.getItem("userId")) {
        window.location.href = "../login.jsp";
    }
</script>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Bank Management System</title>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet">

    <!-- FontAwesome Icons -->
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Custom CSS -->
    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/assets/css/admindashboard.css">
</head>

<body>

    <div class="app-container">

        <!-- INCLUDE REUSABLE SIDEBAR WITH 'dashboard' ACTIVE PARAMETER -->
        <jsp:include page="sidebar.jsp">
            <jsp:param name="activePage" value="dashboard" />
        </jsp:include>

        <!-- MAIN WRAPPER -->
        <div class="main-wrapper">

            <!-- INCLUDE REUSABLE NAVBAR -->
            <jsp:include page="navbar.jsp">
                <jsp:param name="pageTitle" value="Dashboard" />
                <jsp:param name="showSearch" value="false" />
            </jsp:include>

            <!-- PAGE CONTENT CONTAINER -->
            <main class="content-container">

                <!-- WELCOME HERO BANNER -->
                <div class="welcome-banner">

                    <div class="banner-left">

                        <div class="shield-badge">
                            <i class="fa-solid fa-shield-halved"></i>
                        </div>

                        <div class="banner-content">
                            <h2>Good Morning, Admin!</h2>
                            <p>Here's what's happening with your bank today.</p>

                            <div class="banner-badge">
                                <i class="fa-regular fa-calendar"></i>
                                <span>04 August 2025, Monday | 09:30 AM</span>
                            </div>
                        </div>

                    </div>

                    <div class="banner-illustration">
                        <div class="tree left-tree"></div>

                        <div class="bank-building">
                            <div class="pediment">BANK</div>

                            <div class="columns">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                            <div class="base"></div>
                        </div>

                        <div class="tree right-tree"></div>
                    </div>

                </div>


                <!-- METRICS GRID - ROW 1 -->
                <div class="stats-grid">

                    <!-- TOTAL CUSTOMERS -->
                    <div class="stat-card">

                        <div class="stat-icon-wrapper icon-blue">
                            <i class="fa-solid fa-users"></i>
                        </div>

                        <div class="stat-info">
                            <h4>Total Customers</h4>

                            <div class="stat-number" id="totalCustomers">0</div>

                            <div class="stat-trend trend-up">
                                <i class="fa-solid fa-arrow-up"></i>
                                12.5%
                                <small>vs last month</small>
                            </div>
                        </div>

                    </div>


                    <!-- TOTAL EMPLOYEES -->
                    <div class="stat-card">

                        <div class="stat-icon-wrapper icon-green">
                            <i class="fa-solid fa-user"></i>
                        </div>

                        <div class="stat-info">
                            <h4>Total Employees</h4>

                            <div class="stat-number" id="totalEmployees">0</div>

                            <div class="stat-trend trend-up">
                                <i class="fa-solid fa-arrow-up"></i>
                                5.3%
                                <small>vs last month</small>
                            </div>
                        </div>

                    </div>


                    <!-- TOTAL ACCOUNTS -->
                    <div class="stat-card">

                        <div class="stat-icon-wrapper icon-purple">
                            <i class="fa-solid fa-wallet"></i>
                        </div>

                        <div class="stat-info">
                            <h4>Total Accounts</h4>

                            <div class="stat-number" id="totalAccounts">0</div>

                            <div class="stat-trend trend-up">
                                <i class="fa-solid fa-arrow-up"></i>
                                8.7%
                                <small>vs last month</small>
                            </div>
                        </div>

                    </div>


                    <!-- LOANS -->
                    <div class="stat-card">

                        <div class="stat-icon-wrapper icon-orange">
                            <i class="fa-solid fa-briefcase"></i>
                        </div>

                        <div class="stat-info">
                            <h4>Loans</h4>

                            <div class="stat-number" id="totalLoans">0</div>

                            <div class="stat-trend trend-up">
                                <i class="fa-solid fa-arrow-up"></i>
                                3.2%
                                <small>vs last month</small>
                            </div>
                        </div>

                    </div>

                </div>


                <!-- METRICS GRID - ROW 2 -->
                <div class="stats-grid">

                    <!-- PENDING KYC -->
                    <div class="stat-card">

                        <div class="stat-icon-wrapper icon-yellow">
                            <i class="fa-solid fa-id-card"></i>
                        </div>

                        <div class="stat-info">
                            <h4>Pending KYC</h4>

                            <div class="stat-number" id="pendingKyc">0</div>

                            <div class="stat-trend trend-down">
                                <i class="fa-solid fa-arrow-down"></i>
                                4.5%
                                <small>vs yesterday</small>
                            </div>
                        </div>

                    </div>


                    <!-- TODAY'S DEPOSITS -->
                    <div class="stat-card">

                        <div class="stat-icon-wrapper icon-green-light">
                            <i class="fa-solid fa-circle-arrow-down"></i>
                        </div>

                        <div class="stat-info">
                            <h4>Today's Deposits</h4>

                            <div class="stat-number" id="todayDeposits">₹0</div>

                            <div class="stat-trend trend-up">
                                <i class="fa-solid fa-arrow-up"></i>
                                15.8%
                                <small>vs yesterday</small>
                            </div>
                        </div>

                    </div>


                    <!-- TODAY'S WITHDRAWALS -->
                    <div class="stat-card">

                        <div class="stat-icon-wrapper icon-red-light">
                            <i class="fa-solid fa-circle-arrow-up"></i>
                        </div>

                        <div class="stat-info">
                            <h4>Today's Withdrawals</h4>

                            <div class="stat-number" id="todayWithdrawals">₹0</div>

                            <div class="stat-trend trend-down">
                                <i class="fa-solid fa-arrow-down"></i>
                                6.2%
                                <small>vs yesterday</small>
                            </div>
                        </div>

                    </div>


                    <!-- TOTAL TRANSACTIONS -->
                    <div class="stat-card">

                        <div class="stat-icon-wrapper icon-blue-light">
                            <i class="fa-solid fa-right-left"></i>
                        </div>

                        <div class="stat-info">
                            <h4>Total Transactions</h4>

                            <div class="stat-number" id="totalTransactions">0</div>

                            <div class="stat-trend trend-up">
                                <i class="fa-solid fa-arrow-up"></i>
                                7.6%
                                <small>vs yesterday</small>
                            </div>
                        </div>

                    </div>

                </div>


                <!-- SYSTEM OVERVIEW SECTION -->
                <div class="system-overview-card">

                    <div class="overview-header">
                        <i class="fa-solid fa-chart-line"></i>
                        <h3>System Overview</h3>
                    </div>

                    <div class="overview-content">

                        <div class="overview-left">

                            <div class="status-icon-check">
                                <i class="fa-solid fa-check"></i>
                            </div>

                            <div class="status-details">
                                <strong>All systems are running smoothly.</strong>
                                <span>Last updated: Today, 09:30 AM</span>
                            </div>

                        </div>


                        <div class="overview-right">

                            <div class="system-status-item">
                                <i class="fa-solid fa-server"></i>

                                <div>
                                    <small>Server Status</small>
                                    <strong class="status-text-green">Operational</strong>
                                </div>
                            </div>


                            <div class="system-status-item">
                                <i class="fa-solid fa-database"></i>

                                <div>
                                    <small>Database</small>
                                    <strong class="status-text-green">Secure</strong>
                                </div>
                            </div>


                            <div class="system-status-item">
                                <i class="fa-solid fa-cloud-arrow-up"></i>

                                <div>
                                    <small>Backup</small>
                                    <strong class="status-text-green">Up to date</strong>
                                </div>
                            </div>


                            <div class="system-status-item">
                                <i class="fa-solid fa-shield"></i>

                                <div>
                                    <small>Security</small>
                                    <strong class="status-text-green">Active</strong>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>

    </div>


    <!-- Existing dashboard JavaScript -->
    <script src="${pageContext.request.contextPath}/assets/js/admindashboard.js"></script>

    <!-- New JavaScript only for dashboard API data -->
    <script src="${pageContext.request.contextPath}/assets/js/adminDashboardData.js"></script>

</body>
</html>
