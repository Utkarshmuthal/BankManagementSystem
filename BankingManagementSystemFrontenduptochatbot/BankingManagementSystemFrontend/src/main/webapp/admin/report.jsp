<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
        content="width=device-width, initial-scale=1.0">

    <title>Reports - Admin</title>

    <!-- Font Awesome -->
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

    <!-- Report CSS -->
    <link rel="stylesheet"
        href="${pageContext.request.contextPath}/assets/css/adminreport.css">

</head>

<body>

<div class="admin-layout">


    <!-- =====================================================
         SIDEBAR
         ===================================================== -->

    <aside class="sidebar">

        <!-- BRAND -->
        <div class="sidebar-brand">

            <div class="brand-icon">
                <i class="fa-solid fa-building-columns"></i>
            </div>

            <div class="brand-text">

                <h2>BANK</h2>

                <span>MANAGEMENT SYSTEM</span>

            </div>

        </div>


        <!-- MENU -->
        <nav class="sidebar-menu">

            <a href="dashboard.jsp"
               class="menu-item">

                <i class="fa-solid fa-house"></i>

                <span>Dashboard</span>

            </a>


            <a href="customers.jsp"
               class="menu-item">

                <i class="fa-solid fa-users"></i>

                <span>Customers</span>

            </a>


            <a href="employees.jsp"
               class="menu-item">

                <i class="fa-solid fa-user-group"></i>

                <span>Employees</span>

            </a>


            <a href="accounts.jsp"
               class="menu-item">

                <i class="fa-solid fa-credit-card"></i>

                <span>Accounts</span>

            </a>


            <a href="loan.jsp"
               class="menu-item">

                <i class="fa-solid fa-sack-dollar"></i>

                <span>Loans</span>

            </a>


            <a href="transaction.jsp"
               class="menu-item">

                <i class="fa-solid fa-arrow-right-arrow-left"></i>

                <span>Transactions</span>

            </a>


            <!-- ACTIVE REPORT -->
            <a href="report.jsp"
               class="menu-item active">

                <i class="fa-solid fa-chart-pie"></i>

                <span>Reports</span>

            </a>


            <a href="setting.jsp"
               class="menu-item">

                <i class="fa-solid fa-gear"></i>

                <span>Settings</span>

            </a>

        </nav>


        <!-- LOGOUT -->
        <div class="sidebar-footer">

            <button class="logout-btn"
                    onclick="logout()">

                <i class="fa-solid fa-right-from-bracket"></i>

                <span>Logout</span>

            </button>

        </div>

    </aside>



    <!-- =====================================================
         MAIN CONTENT
         ===================================================== -->

    <main class="main-content">


        <!-- =================================================
             NAVBAR
             ================================================= -->

        <header class="topbar">

            <div class="topbar-left">

                <button class="menu-toggle"
                        onclick="toggleSidebar()">

                    <i class="fa-solid fa-bars"></i>

                </button>

                <h1>Reports</h1>

            </div>


            <div class="topbar-right">


                <!-- Notification -->
                <button class="notification-btn">

                    <i class="fa-regular fa-bell"></i>

                    <span class="notification-count">
                        3
                    </span>

                </button>


                <!-- User -->
                <div class="admin-user">

                    <div class="admin-avatar">

                        <i class="fa-solid fa-user-tie"></i>

                    </div>

                    <div class="admin-info">

                        <strong>Administrator</strong>

                        <small>Super Administrator</small>

                    </div>

                    <i class="fa-solid fa-chevron-down arrow"></i>

                </div>

            </div>

        </header>



        <!-- =================================================
             PAGE CONTENT
             ================================================= -->

        <section class="report-page">


            <!-- =================================================
                 FILTER
                 ================================================= -->

            <div class="filter-card">

                <div class="filter-item">

                    <label>Select Date Range</label>

                    <select id="dateRange"
                            onchange="changeDateRange()">

                        <option value="thisMonth">
                            This Month
                        </option>

                        <option value="lastMonth">
                            Last Month
                        </option>

                        <option value="last3Months">
                            Last 3 Months
                        </option>

                        <option value="thisYear">
                            This Year
                        </option>

                    </select>

                </div>


                <div class="filter-item">

                    <label>From Date</label>

                    <div class="date-input">

                        <i class="fa-regular fa-calendar"></i>

                        <input type="date"
                               id="fromDate">

                    </div>

                </div>


                <div class="filter-item">

                    <label>To Date</label>

                    <div class="date-input">

                        <i class="fa-regular fa-calendar"></i>

                        <input type="date"
                               id="toDate">

                    </div>

                </div>


                <button class="generate-btn"
                        onclick="generateReport()">

                    <i class="fa-solid fa-chart-column"></i>

                    Generate Report

                </button>

            </div>



            <!-- =================================================
                 STAT CARDS
                 ================================================= -->

            <div class="stats-grid">


                <!-- CUSTOMER -->
                <div class="stat-card">

                    <div class="stat-icon customer-icon">

                        <i class="fa-solid fa-users"></i>

                    </div>

                    <div class="stat-content">

                        <span>Total Customers</span>

                        <strong id="totalCustomers">
                            1,250
                        </strong>

                        <small class="growth">
                            <i class="fa-solid fa-arrow-up"></i>
                            12.5% vs last month
                        </small>

                    </div>

                </div>


                <!-- EMPLOYEE -->
                <div class="stat-card">

                    <div class="stat-icon employee-icon">

                        <i class="fa-solid fa-user-group"></i>

                    </div>

                    <div class="stat-content">

                        <span>Total Employees</span>

                        <strong id="totalEmployees">
                            25
                        </strong>

                        <small class="growth">
                            <i class="fa-solid fa-arrow-up"></i>
                            4.2% vs last month
                        </small>

                    </div>

                </div>


                <!-- ACCOUNT -->
                <div class="stat-card">

                    <div class="stat-icon account-icon">

                        <i class="fa-solid fa-building-columns"></i>

                    </div>

                    <div class="stat-content">

                        <span>Total Accounts</span>

                        <strong id="totalAccounts">
                            3,560
                        </strong>

                        <small class="growth">
                            <i class="fa-solid fa-arrow-up"></i>
                            8.7% vs last month
                        </small>

                    </div>

                </div>


                <!-- TRANSACTION -->
                <div class="stat-card">

                    <div class="stat-icon transaction-icon">

                        <i class="fa-solid fa-arrow-right-arrow-left"></i>

                    </div>

                    <div class="stat-content">

                        <span>Total Transactions</span>

                        <strong id="totalTransactions">
                            1,780
                        </strong>

                        <small class="growth">
                            <i class="fa-solid fa-arrow-up"></i>
                            7.6% vs last month
                        </small>

                    </div>

                </div>


                <!-- LOAN -->
                <div class="stat-card">

                    <div class="stat-icon loan-icon">

                        <i class="fa-solid fa-sack-dollar"></i>

                    </div>

                    <div class="stat-content">

                        <span>Total Loans</span>

                        <strong id="totalLoans">
                            320
                        </strong>

                        <small class="growth">
                            <i class="fa-solid fa-arrow-up"></i>
                            3.2% vs last month
                        </small>

                    </div>

                </div>

            </div>



            <!-- =================================================
                 SUMMARY SECTION
                 ================================================= -->

            <div class="summary-grid">


                <!-- TRANSACTION SUMMARY -->

                <div class="panel-card">

                    <h2>Transaction Summary</h2>

                    <div class="table-container">

                        <table>

                            <thead>

                                <tr>

                                    <th>Type</th>

                                    <th>Count</th>

                                    <th>Amount (₹)</th>

                                </tr>

                            </thead>

                            <tbody>

                                <tr>

                                    <td class="deposit">
                                        <i class="fa-solid fa-arrow-down"></i>
                                        Deposits
                                    </td>

                                    <td>8</td>

                                    <td>24,18,900.00</td>

                                </tr>

                                <tr>

                                    <td class="withdraw">
                                        <i class="fa-solid fa-arrow-up"></i>
                                        Withdrawals
                                    </td>

                                    <td>4</td>

                                    <td>71,050.00</td>

                                </tr>

                                <tr>

                                    <td class="transfer">
                                        <i class="fa-solid fa-arrow-right-arrow-left"></i>
                                        Transfers
                                    </td>

                                    <td>4</td>

                                    <td>4,30,500.00</td>

                                </tr>

                                <tr class="total-row">

                                    <td>Total</td>

                                    <td>16</td>

                                    <td>29,20,450.00</td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>



                <!-- LOAN SUMMARY -->

                <div class="panel-card">

                    <h2>Loan Summary</h2>

                    <div class="table-container">

                        <table>

                            <thead>

                                <tr>

                                    <th>Status</th>

                                    <th>Count</th>

                                    <th>Amount (₹)</th>

                                </tr>

                            </thead>

                            <tbody>

                                <tr>

                                    <td>Total Loan Applications</td>

                                    <td>320</td>

                                    <td>12,45,00,000.00</td>

                                </tr>

                                <tr>

                                    <td class="approved">

                                        <i class="fa-solid fa-arrow-down"></i>

                                        Approved Loans

                                    </td>

                                    <td>210</td>

                                    <td>8,75,00,000.00</td>

                                </tr>

                                <tr>

                                    <td class="pending">

                                        <i class="fa-solid fa-clock"></i>

                                        Pending Loans

                                    </td>

                                    <td>70</td>

                                    <td>2,65,00,000.00</td>

                                </tr>

                                <tr>

                                    <td class="rejected">

                                        <i class="fa-solid fa-circle-xmark"></i>

                                        Rejected Loans

                                    </td>

                                    <td>40</td>

                                    <td>1,05,00,000.00</td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>



                <!-- EMPLOYEE SUMMARY -->

                <div class="panel-card">

                    <h2>Employee Summary</h2>

                    <div class="table-container">

                        <table>

                            <thead>

                                <tr>

                                    <th>Category</th>

                                    <th>Count</th>

                                </tr>

                            </thead>

                            <tbody>

                                <tr>

                                    <td>Total Employees</td>

                                    <td>25</td>

                                </tr>

                                <tr>

                                    <td class="approved">

                                        <i class="fa-solid fa-arrow-down"></i>

                                        Active Employees

                                    </td>

                                    <td>21</td>

                                </tr>

                                <tr>

                                    <td class="pending">

                                        <i class="fa-solid fa-clock"></i>

                                        Inactive Employees

                                    </td>

                                    <td>2</td>

                                </tr>

                                <tr>

                                    <td class="leave">

                                        <i class="fa-solid fa-circle-info"></i>

                                        On Leave

                                    </td>

                                    <td>2</td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>



            <!-- =================================================
                 CHART SECTION
                 ================================================= -->

            <div class="charts-grid">


                <!-- MONTHLY TRANSACTION -->

                <div class="chart-card">

                    <h2>Monthly Transaction Trend</h2>

                    <div class="chart-legend">

                        <span>
                            <b class="dot deposit-dot"></b>
                            Deposits
                        </span>

                        <span>
                            <b class="dot withdraw-dot"></b>
                            Withdrawals
                        </span>

                        <span>
                            <b class="dot transfer-dot"></b>
                            Transfers
                        </span>

                    </div>

                    <div class="chart-area">

                        <canvas id="transactionChart"></canvas>

                    </div>

                </div>



                <!-- LOAN TREND -->

                <div class="chart-card">

                    <h2>Loan Applications Trend</h2>

                    <div class="chart-area">

                        <canvas id="loanChart"></canvas>

                    </div>

                </div>



                <!-- ACCOUNT DISTRIBUTION -->

                <div class="chart-card account-distribution">

                    <h2>Account Type Distribution</h2>

                    <div class="donut-wrapper">

                        <div class="donut-chart">

                            <div class="donut-center">
                                <strong>3,560</strong>
                                <span>Accounts</span>
                            </div>

                        </div>

                        <div class="donut-legend">

                            <div>
                                <b class="blue-dot"></b>
                                Savings Account
                                <span>45%</span>
                            </div>

                            <div>
                                <b class="green-dot"></b>
                                Current Account
                                <span>30%</span>
                            </div>

                            <div>
                                <b class="orange-dot"></b>
                                Fixed Deposit
                                <span>15%</span>
                            </div>

                            <div>
                                <b class="purple-dot"></b>
                                Loan Account
                                <span>10%</span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>



            <!-- =================================================
                 AMOUNT CARDS
                 ================================================= -->

            <div class="amount-grid">


                <div class="amount-card">

                    <div class="amount-icon deposit-money">

                        ₹

                    </div>

                    <div>

                        <span>Total Deposited Amount</span>

                        <strong>
                            ₹24,18,900.00
                        </strong>

                        <small>
                            All Deposits
                        </small>

                    </div>

                </div>



                <div class="amount-card">

                    <div class="amount-icon withdraw-money">

                        ₹

                    </div>

                    <div>

                        <span>Total Withdrawn Amount</span>

                        <strong>
                            ₹71,050.00
                        </strong>

                        <small>
                            All Withdrawals
                        </small>

                    </div>

                </div>



                <div class="amount-card">

                    <div class="amount-icon transfer-money">

                        ₹

                    </div>

                    <div>

                        <span>Total Transferred Amount</span>

                        <strong>
                            ₹4,30,500.00
                        </strong>

                        <small>
                            All Transfers
                        </small>

                    </div>

                </div>



                <div class="amount-card">

                    <div class="amount-icon loan-money">

                        ₹

                    </div>

                    <div>

                        <span>Total Loan Disbursed</span>

                        <strong>
                            ₹8,75,00,000.00
                        </strong>

                        <small>
                            Disbursed Amount
                        </small>

                    </div>

                </div>



                <div class="amount-card">

                    <div class="amount-icon interest-money">

                        ₹

                    </div>

                    <div>

                        <span>Total Interest Collected</span>

                        <strong>
                            ₹35,60,000.00
                        </strong>

                        <small>
                            All Loan Interest
                        </small>

                    </div>

                </div>

            </div>



            <!-- =================================================
                 INFORMATION
                 ================================================= -->

            <div class="report-info">

                <i class="fa-solid fa-circle-info"></i>

                <span>
                    All reports are based on the selected date range.
                    Data is updated in real-time.
                </span>

                <button onclick="exportReport()">

                    <i class="fa-solid fa-download"></i>

                    Export Report

                </button>

            </div>


        </section>

    </main>

</div>

<!-- Chart.js Library -->

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js"></script>

<script
    src="${pageContext.request.contextPath}/assets/js/adminreport.js">
</script>




<!-- Report JS -->


</body>

</html>