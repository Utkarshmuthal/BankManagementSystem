<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>

<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Transaction History | Bank Management System</title>


    <!-- Font Awesome -->

    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">


    <!-- Customer Transaction History CSS -->

    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/assets/css/customerTransactionHistory.css">
          <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/customerDashboard.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/customerNavbar.css">


</head>


<body>


<div class="layout">


    <!-- ================= SIDEBAR ================= -->

    <jsp:include page="sidebar.jsp" />


    <!-- ================= MAIN CONTENT ================= -->

    <div class="main-content">


        <!-- ================= NAVBAR ================= -->

        <jsp:include page="navbar.jsp">

            <jsp:param name="pageTitle"
                       value="Transaction History" />

        </jsp:include>



        <!-- ================= PAGE CONTENT ================= -->

        <main class="content-area">


            <!-- =====================================================
                 PAGE BANNER
            ====================================================== -->

            <section class="transaction-banner">


                <div class="banner-left">

                    <h2>
                        Transaction History
                    </h2>

                    <p>
                        View and track all transactions made on your account.
                    </p>


                    <div class="account-info-badge">

                        <i class="fa-solid fa-building-columns"></i>

                        <span>
                            Account:
                        </span>

                        <strong id="accountNumber">
                            6247691173
                        </strong>

                    </div>

                </div>


                <div class="banner-right">

                    <i class="fa-solid fa-receipt"></i>

                </div>


            </section>



            <!-- =====================================================
                 ACCOUNT SUMMARY
            ====================================================== -->

            <section class="transaction-summary">


                <!-- Available Balance -->

                <div class="summary-card">

                    <div class="summary-icon blue">

                        <i class="fa-solid fa-wallet"></i>

                    </div>


                    <div class="summary-content">

                        <span>
                            Available Balance
                        </span>

                        <strong id="availableBalance">
                            ₹6,19,000.00
                        </strong>

                    </div>

                </div>



                <!-- Total Transactions -->

                <div class="summary-card">

                    <div class="summary-icon purple">

                        <i class="fa-solid fa-receipt"></i>

                    </div>


                    <div class="summary-content">

                        <span>
                            Total Transactions
                        </span>

                        <strong id="totalTransactions">
                            128
                        </strong>

                    </div>

                </div>



                <!-- Total Deposits -->

                <div class="summary-card">

                    <div class="summary-icon green">

                        <i class="fa-solid fa-arrow-down"></i>

                    </div>


                    <div class="summary-content">

                        <span>
                            Total Deposits
                        </span>

                        <strong id="totalDeposits">
                            ₹75,000.00
                        </strong>

                    </div>

                </div>



                <!-- Total Withdrawals -->

                <div class="summary-card">

                    <div class="summary-icon orange">

                        <i class="fa-solid fa-arrow-up"></i>

                    </div>


                    <div class="summary-content">

                        <span>
                            Total Withdrawals
                        </span>

                        <strong id="totalWithdrawals">
                            ₹20,000.00
                        </strong>

                    </div>

                </div>


            </section>



            <!-- =====================================================
                 TRANSACTION HISTORY CARD
            ====================================================== -->

            <section class="transaction-card">


                <!-- ================= HEADER ================= -->

                <div class="transaction-header">


                    <div class="header-left">

                        <div class="header-icon">

                            <i class="fa-solid fa-clock-rotate-left"></i>

                        </div>


                        <div>

                            <h3>
                                All Transactions
                            </h3>

                            <p>
                                Your complete account transaction history
                            </p>

                        </div>

                    </div>



                    <!-- Download Statement -->

                    <button
                        type="button"
                        class="download-btn"
                        id="downloadStatementBtn"
                        onclick="downloadStatement()">

                        <i class="fa-solid fa-download"></i>

                        Download Statement

                    </button>


                </div>



                <!-- =====================================================
                     FILTER SECTION
                ====================================================== -->

                <div class="filter-section">


                    <!-- From Date -->

                    <div class="filter-group">

                        <label for="fromDate">
                            From Date
                        </label>


                        <div class="input-box">

                            <i class="fa-regular fa-calendar"></i>

                            <input
                                type="date"
                                id="fromDate">

                        </div>

                    </div>



                    <!-- To Date -->

                    <div class="filter-group">

                        <label for="toDate">
                            To Date
                        </label>


                        <div class="input-box">

                            <i class="fa-regular fa-calendar"></i>

                            <input
                                type="date"
                                id="toDate">

                        </div>

                    </div>



                    <!-- Transaction Type -->

                    <div class="filter-group">

                        <label for="transactionType">
                            Transaction Type
                        </label>


                        <div class="input-box">

                            <i class="fa-solid fa-filter"></i>

                            <select id="transactionType">

                                <option value="ALL">
                                    All Transactions
                                </option>

                                <option value="DEPOSIT">
                                    Deposit
                                </option>

                                <option value="WITHDRAW">
                                    Withdrawal
                                </option>

                                <option value="TRANSFER">
                                    Transfer
                                </option>

                                <option value="INTEREST">
                                    Interest
                                </option>

                            </select>

                        </div>

                    </div>



                    <!-- Search -->

                    <div class="filter-group search-group">

                        <label for="transactionSearch">
                            Search
                        </label>


                        <div class="input-box">

                            <i class="fa-solid fa-magnifying-glass"></i>

                            <input
                                type="text"
                                id="transactionSearch"
                                placeholder="Search transaction...">

                        </div>

                    </div>



                    <!-- Apply -->

                    <button
                        type="button"
                        class="apply-btn"
                        onclick="applyFilters()">

                        <i class="fa-solid fa-filter"></i>

                        Apply

                    </button>



                    <!-- Reset -->

                    <button
                        type="button"
                        class="reset-btn"
                        onclick="resetFilters()">

                        <i class="fa-solid fa-rotate-left"></i>

                        Reset

                    </button>


                </div>



                <!-- =====================================================
                     TRANSACTION TABLE
                ====================================================== -->

                <div class="table-wrapper">


                    <table class="transaction-table">


                        <thead>

                            <tr>

                                <th>
                                    Date & Time
                                </th>

                                <th>
                                    Type
                                </th>

                                <th>
                                    Description
                                </th>

                                <th>
                                    Reference ID
                                </th>

                                <th>
                                    Amount
                                </th>

                                <th>
                                    Balance
                                </th>

                                <th>
                                    Status
                                </th>

                            </tr>

                        </thead>



                        <tbody id="transactionTableBody">

                            <!--
                                Transactions will be inserted
                                by customerTransactionHistory.js
                            -->

                        </tbody>


                    </table>



                    <!-- ================= EMPTY STATE ================= -->

                    <div
                        id="emptyTransactionState"
                        class="empty-state"
                        style="display: none;">

                        <i class="fa-solid fa-receipt"></i>

                        <h3>
                            No Transactions Found
                        </h3>

                        <p>
                            No transactions match your selected filters.
                        </p>

                    </div>


                </div>



                <!-- =====================================================
                     PAGINATION
                ====================================================== -->

                <div class="pagination-section">


                    <div class="transaction-count">

                        Showing

                        <strong id="showingCount">
                            0
                        </strong>

                        transactions

                    </div>



                    <div class="pagination">


                        <button
                            type="button"
                            id="previousBtn"
                            onclick="previousPage()">

                            <i class="fa-solid fa-chevron-left"></i>

                        </button>



                        <span
                            class="page-number active"
                            id="currentPage">

                            1

                        </span>



                        <button
                            type="button"
                            id="nextBtn"
                            onclick="nextPage()">

                            <i class="fa-solid fa-chevron-right"></i>

                        </button>


                    </div>


                </div>


            </section>



            <!-- =====================================================
                 INFORMATION NOTICE
            ====================================================== -->

            <section class="info-banner">


                <div class="info-banner-icon">

                    <i class="fa-solid fa-circle-info"></i>

                </div>


                <div class="info-banner-text">

                    <strong>
                        Transaction Information
                    </strong>

                    <span>
                        Deposits and withdrawals are processed by authorized
                        branch employees. You can view all completed
                        transactions here.
                    </span>

                </div>


            </section>


        </main>


    </div>


</div>



<!-- =========================================================
     JAVASCRIPT
========================================================= -->

<script
    src="${pageContext.request.contextPath}/assets/js/customerTransactionHistory.js">
    
</script>

<script src="${pageContext.request.contextPath}/assets/js/customerDashboard.js"></script>

</body>

</html>