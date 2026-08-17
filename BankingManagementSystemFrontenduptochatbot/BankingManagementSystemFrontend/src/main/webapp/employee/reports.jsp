<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Reports - Banking Management System</title>

    <!-- Font Awesome -->
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

    <!-- Reports CSS -->
    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/assets/css/reports.css">

</head>

<body>

<div class="layout">

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

                <h2 class="brand-title">
                    BANK
                </h2>

                <p class="brand-subtitle">
                    MANAGEMENT SYSTEM
                </p>

            </div>

        </div>


        <!-- NAVIGATION -->

        <nav class="sidebar-nav">

            <a href="dashboard.jsp"
               class="nav-link">

                <i class="fa-solid fa-house"></i>

                <span>
                    Dashboard
                </span>

            </a>


            <a href="registration-request.jsp"
               class="nav-link">

                <i class="fa-solid fa-user-plus"></i>

                <span>
                    Registration Request
                </span>

            </a>


            <a href="customers.jsp"
               class="nav-link">

                <i class="fa-solid fa-users"></i>

                <span>
                    Customers
                </span>

            </a>


            <a href="accounts.jsp"
               class="nav-link">

                <i class="fa-solid fa-credit-card"></i>

                <span>
                    Accounts
                </span>

            </a>


            <a href="transaction-history.jsp"
               class="nav-link">

                <i class="fa-solid fa-right-left"></i>

                <span>
                    Transactions
                </span>

            </a>


            <a href="loans.jsp"
               class="nav-link">

                <i class="fa-solid fa-hand-holding-dollar"></i>

                <span>
                    Loans
                </span>

            </a>


            <!-- ACTIVE REPORT -->

            <a href="reports.jsp"
               class="nav-link active">

                <i class="fa-solid fa-chart-column"></i>

                <span>
                    Reports
                </span>

            </a>


            <a href="profile.jsp"
               class="nav-link">

                <i class="fa-solid fa-user"></i>

                <span>
                    Profile
                </span>

            </a>

        </nav>


        <!-- LOGOUT -->

        <div class="sidebar-footer">

            <a href="${pageContext.request.contextPath}/logout"
               class="nav-link logout-link">

                <i class="fa-solid fa-right-from-bracket"></i>

                <span>
                    Logout
                </span>

            </a>

        </div>

    </aside>


    <!-- =====================================================
         MAIN CONTENT
         ===================================================== -->

    <main class="main-content">


        <!-- =================================================
             TOPBAR
             ================================================= -->

        <header class="topbar">

            <div class="topbar-left">

                <button class="icon-btn">

                    <i class="fa-solid fa-bars"></i>

                </button>

                <h1 class="page-title">
                    Reports
                </h1>

            </div>


            <div class="topbar-right">

                <button class="icon-btn notification-btn">

                    <i class="fa-regular fa-bell"></i>

                    <span class="badge">
                        3
                    </span>

                </button>


                <div class="profile-chip">

                    <div class="avatar-circle">
                        E
                    </div>

                    <div class="profile-text">

                        <span class="profile-name">
                            Employee
                        </span>

                        <span class="profile-role">
                            Bank Employee
                        </span>

                    </div>

                </div>

            </div>

        </header>


        <!-- =================================================
             REPORT PAGE
             ================================================= -->

        <section class="report-page">


            <!-- PAGE HEADING -->

            <div class="report-heading">

                <h1>
                    Reports
                </h1>

                <div class="breadcrumb">

                    <span>
                        Dashboard
                    </span>

                    <i class="fa-solid fa-chevron-right"></i>

                    <span class="current">
                        Reports
                    </span>

                </div>

            </div>


            <!-- =================================================
                 DATE FILTER
                 ================================================= -->

            <div class="filter-card">

                <div class="filter-group">

                    <label>
                        Select Date Range
                    </label>

                    <div class="input-wrapper">

                        <i class="fa-regular fa-calendar"></i>

                        <select id="dateRange">

                            <option value="today">
                                Today
                            </option>

                            <option value="week">
                                This Week
                            </option>

                            <option value="month"
                                    selected>
                                This Month
                            </option>

                            <option value="year">
                                This Year
                            </option>

                            <option value="custom">
                                Custom Range
                            </option>

                        </select>

                    </div>

                </div>


                <div class="filter-group">

                    <label>
                        From Date
                    </label>

                    <div class="input-wrapper">

                        <i class="fa-regular fa-calendar"></i>

                        <input type="date"
                               id="fromDate">

                    </div>

                </div>


                <div class="filter-group">

                    <label>
                        To Date
                    </label>

                    <div class="input-wrapper">

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
                 TRANSACTION SUMMARY
                 ================================================= -->

            <div class="section-card">

                <div class="section-title">

                    <h2>
                        Transaction Summary
                    </h2>

                </div>


                <div class="summary-grid">


                    <!-- TOTAL TRANSACTIONS -->

                    <div class="summary-box blue-box">

                        <div class="summary-icon blue-icon">

                            <i class="fa-solid fa-right-left"></i>

                        </div>

                        <div class="summary-info">

                            <span>
                                Total Transactions
                            </span>

                            <strong id="totalTransactions">
                                125
                            </strong>

                            <small>
                                All Transactions
                            </small>

                        </div>

                    </div>


                    <!-- DEPOSIT -->

                    <div class="summary-box green-box">

                        <div class="summary-icon green-icon">

                            <i class="fa-solid fa-arrow-down"></i>

                        </div>

                        <div class="summary-info">

                            <span>
                                Total Deposits
                            </span>

                            <strong id="totalDeposits">
                                60
                            </strong>

                            <small>
                                Successful Deposits
                            </small>

                        </div>

                    </div>


                    <!-- WITHDRAW -->

                    <div class="summary-box red-box">

                        <div class="summary-icon red-icon">

                            <i class="fa-solid fa-arrow-up"></i>

                        </div>

                        <div class="summary-info">

                            <span>
                                Total Withdrawals
                            </span>

                            <strong id="totalWithdrawals">
                                35
                            </strong>

                            <small>
                                Successful Withdrawals
                            </small>

                        </div>

                    </div>


                    <!-- TRANSFER -->

                    <div class="summary-box purple-box">

                        <div class="summary-icon purple-icon">

                            <i class="fa-solid fa-right-left"></i>

                        </div>

                        <div class="summary-info">

                            <span>
                                Total Transfers
                            </span>

                            <strong id="totalTransfers">
                                30
                            </strong>

                            <small>
                                Fund Transfers
                            </small>

                        </div>

                    </div>

                </div>

            </div>


            <!-- =================================================
                 AMOUNT SUMMARY
                 ================================================= -->

            <div class="section-card">

                <div class="section-title">

                    <h2>
                        Amount Summary
                    </h2>

                </div>


                <div class="amount-grid">


                    <!-- DEPOSIT AMOUNT -->

                    <div class="amount-card deposit-amount">

                        <div class="amount-icon">
                            ₹
                        </div>

                        <div>

                            <span>
                                Total Deposited Amount
                            </span>

                            <strong id="depositAmount">
                                ₹2,50,000.00
                            </strong>

                            <small>
                                All Deposits
                            </small>

                        </div>

                    </div>


                    <!-- WITHDRAW AMOUNT -->

                    <div class="amount-card withdraw-amount">

                        <div class="amount-icon">
                            ₹
                        </div>

                        <div>

                            <span>
                                Total Withdrawn Amount
                            </span>

                            <strong id="withdrawAmount">
                                ₹1,20,000.00
                            </strong>

                            <small>
                                All Withdrawals
                            </small>

                        </div>

                    </div>


                    <!-- TRANSFER AMOUNT -->

                    <div class="amount-card transfer-amount">

                        <div class="amount-icon">
                            ₹
                        </div>

                        <div>

                            <span>
                                Total Transferred Amount
                            </span>

                            <strong id="transferAmount">
                                ₹85,000.00
                            </strong>

                            <small>
                                All Transfers
                            </small>

                        </div>

                    </div>

                </div>

            </div>


            <!-- =================================================
                 CUSTOMER + ACCOUNT SUMMARY
                 ================================================= -->

            <div class="two-column-grid">


                <!-- CUSTOMER SUMMARY -->

                <div class="section-card">

                    <div class="section-title">

                        <h2>
                            Customer Summary
                        </h2>

                    </div>


                    <div class="mini-summary-grid">


                        <div class="mini-box">

                            <div class="mini-icon blue-mini">
                                <i class="fa-solid fa-users"></i>
                            </div>

                            <span>
                                Total Customers
                            </span>

                            <strong id="totalCustomers">
                                150
                            </strong>

                            <small>
                                All Customers
                            </small>

                        </div>


                        <div class="mini-box">

                            <div class="mini-icon green-mini">
                                <i class="fa-solid fa-circle-check"></i>
                            </div>

                            <span>
                                Approved Customers
                            </span>

                            <strong id="approvedCustomers">
                                120
                            </strong>

                            <small>
                                Approved
                            </small>

                        </div>


                        <div class="mini-box">

                            <div class="mini-icon orange-mini">
                                <i class="fa-solid fa-clock"></i>
                            </div>

                            <span>
                                Pending Customers
                            </span>

                            <strong id="pendingCustomers">
                                20
                            </strong>

                            <small>
                                Pending
                            </small>

                        </div>


                        <div class="mini-box">

                            <div class="mini-icon red-mini">
                                <i class="fa-solid fa-circle-xmark"></i>
                            </div>

                            <span>
                                Rejected Customers
                            </span>

                            <strong id="rejectedCustomers">
                                10
                            </strong>

                            <small>
                                Rejected
                            </small>

                        </div>

                    </div>

                </div>


                <!-- ACCOUNT SUMMARY -->

                <div class="section-card">

                    <div class="section-title">

                        <h2>
                            Account Summary
                        </h2>

                    </div>


                    <div class="account-summary">


                        <div class="account-box">

                            <div class="account-icon blue-account">
                                <i class="fa-solid fa-building-columns"></i>
                            </div>

                            <span>
                                Total Accounts
                            </span>

                            <strong id="totalAccounts">
                                180
                            </strong>

                            <small>
                                All Accounts
                            </small>

                        </div>


                        <div class="account-box">

                            <div class="account-icon green-account">
                                <i class="fa-solid fa-credit-card"></i>
                            </div>

                            <span>
                                Savings Accounts
                            </span>

                            <strong id="savingsAccounts">
                                140
                            </strong>

                            <small>
                                Savings Accounts
                            </small>

                        </div>


                        <div class="account-box">

                            <div class="account-icon purple-account">
                                <i class="fa-solid fa-wallet"></i>
                            </div>

                            <span>
                                Current Accounts
                            </span>

                            <strong id="currentAccounts">
                                40
                            </strong>

                            <small>
                                Current Accounts
                            </small>

                        </div>

                    </div>

                </div>

            </div>


            <!-- =================================================
                 RECENT ACTIVITY + CHART
                 ================================================= -->

            <div class="bottom-grid">


                <!-- RECENT ACTIVITY -->

                <div class="section-card">

                    <div class="section-title">

                        <h2>
                            Recent Activity Overview
                        </h2>

                    </div>


                    <div class="activity-table-wrapper">

                        <table class="activity-table">

                            <thead>

                                <tr>

                                    <th>
                                        Activity Type
                                    </th>

                                    <th>
                                        Count
                                    </th>

                                    <th>
                                        Total Amount
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                <tr>

                                    <td>

                                        <span class="activity-type deposit-text">

                                            <i class="fa-solid fa-arrow-down"></i>

                                            Deposit

                                        </span>

                                    </td>

                                    <td id="activityDepositCount">
                                        60
                                    </td>

                                    <td id="activityDepositAmount">
                                        ₹2,50,000.00
                                    </td>

                                </tr>


                                <tr>

                                    <td>

                                        <span class="activity-type withdraw-text">

                                            <i class="fa-solid fa-arrow-up"></i>

                                            Withdraw

                                        </span>

                                    </td>

                                    <td id="activityWithdrawCount">
                                        35
                                    </td>

                                    <td id="activityWithdrawAmount">
                                        ₹1,20,000.00
                                    </td>

                                </tr>


                                <tr>

                                    <td>

                                        <span class="activity-type transfer-text">

                                            <i class="fa-solid fa-right-left"></i>

                                            Transfer

                                        </span>

                                    </td>

                                    <td id="activityTransferCount">
                                        30
                                    </td>

                                    <td id="activityTransferAmount">
                                        ₹85,000.00
                                    </td>

                                </tr>


                                <tr class="total-row">

                                    <td>
                                        Total
                                    </td>

                                    <td id="activityTotalCount">
                                        125
                                    </td>

                                    <td id="activityTotalAmount">
                                        ₹4,55,000.00
                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>


                <!-- MONTHLY CHART -->

                <div class="section-card">

                    <div class="section-title chart-title">

                        <h2>
                            Monthly Transaction Chart
                        </h2>

                        <div class="chart-legend">

                            <span>
                                <i class="legend-dot deposit-dot"></i>
                                Deposits
                            </span>

                            <span>
                                <i class="legend-dot withdraw-dot"></i>
                                Withdrawals
                            </span>

                            <span>
                                <i class="legend-dot transfer-dot"></i>
                                Transfers
                            </span>

                        </div>

                    </div>


                    <div class="chart-container">

                        <canvas id="transactionChart"></canvas>

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

            </div>


        </section>

    </main>

</div>


<!-- =========================================================
     JAVASCRIPT
     ========================================================= -->

<script src="${pageContext.request.contextPath}/assets/js/reports.js"></script>

</body>

</html>