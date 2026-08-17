<%@ page language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Transaction History - Banking Management System</title>


    <!-- Transaction History CSS -->
    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/assets/css/transaction-history.css">


    <!-- Font Awesome -->
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

</head>


<body>

<div class="layout">


    <!-- =====================================================
         SIDEBAR
         ===================================================== -->

    <jsp:include page="sidebar.jsp"/>


    <!-- =====================================================
         MAIN CONTENT
         ===================================================== -->

    <main class="main-content">


        <!-- =================================================
             NAVBAR
             ================================================= -->

        <jsp:include page="navbar.jsp"/>


        <!-- =================================================
             TRANSACTION HISTORY PAGE
             ================================================= -->

        <section class="transaction-page">


            <!-- Page Title -->

            <h1 class="transaction-page-title">
                Transactions
            </h1>


            <!-- =================================================
                 TRANSACTION CONTAINER
                 ================================================= -->

            <div class="transaction-container">


                <!-- =================================================
                     TRANSACTION TABS
                     ================================================= -->

                <div class="transaction-tabs">


                    <!-- Deposit -->

                    <button
                        type="button"
                        class="transaction-tab deposit-tab"
                        onclick="openTransaction('deposit')">

                        <i class="fa-solid fa-arrow-down"></i>

                        <span>Deposit</span>

                    </button>


                    <!-- Withdraw -->

                    <button
                        type="button"
                        class="transaction-tab withdraw-tab"
                        onclick="openTransaction('withdraw')">

                        <i class="fa-solid fa-arrow-up"></i>

                        <span>Withdraw</span>

                    </button>


                    <!-- Transfer -->

                    <button
                        type="button"
                        class="transaction-tab transfer-tab"
                        onclick="openTransaction('transfer')">

                        <i class="fa-solid fa-right-left"></i>

                        <span>Transfer</span>

                    </button>


                    <!-- Transaction History -->

                    <button
                        type="button"
                        class="transaction-tab history-tab active"
                        onclick="openTransaction('history')">

                        <i class="fa-regular fa-rectangle-list"></i>

                        <span>Transaction History</span>

                    </button>

                </div>


                <!-- =================================================
                     HISTORY CONTENT
                     ================================================= -->

                <div class="history-content">


                    <!-- =================================================
                         SEARCH SECTION
                         ================================================= -->

                    <div class="history-search-section">


                        <div class="history-heading">

                            <h2>
                                Transaction History
                            </h2>

                            <p>
                                View all customer transactions or search by account number.
                            </p>

                        </div>


                        <!-- Search -->

                        <div class="history-search-box">

                            <label for="accountNumber">
                                Account Number
                            </label>

                            <input
                                type="text"
                                id="accountNumber"
                                name="accountNumber"
                                placeholder="Enter account number"
                                autocomplete="off">


                            <button
                                type="button"
                                class="search-button"
                                onclick="searchCustomerTransactions()">

                                <i class="fa-solid fa-magnifying-glass"></i>

                                Search

                            </button>


                            <button
                                type="button"
                                class="all-button"
                                onclick="loadAllTransactions()">

                                <i class="fa-solid fa-list"></i>

                                All Transactions

                            </button>

                        </div>

                    </div>


                    <!-- =================================================
                         CUSTOMER INFORMATION
                         ================================================= -->

                    <div
                        class="customer-history-card"
                        id="customerHistoryCard">


                        <div class="customer-history-title">

                            <i class="fa-solid fa-user"></i>

                            <span>
                                Customer Information
                            </span>

                        </div>


                        <div class="customer-history-details">


                            <div class="customer-info-item">

                                <span>
                                    Customer Name
                                </span>

                                <strong id="historyCustomerName">
                                    -
                                </strong>

                            </div>


                            <div class="customer-info-item">

                                <span>
                                    Account Number
                                </span>

                                <strong id="historyAccountNumber">
                                    -
                                </strong>

                            </div>


                            <div class="customer-info-item">

                                <span>
                                    Account Type
                                </span>

                                <strong id="historyAccountType">
                                    -
                                </strong>

                            </div>


                            <div class="customer-info-item">

                                <span>
                                    Current Balance
                                </span>

                                <strong
                                    id="historyBalance"
                                    class="balance">
                                    ₹0.00
                                </strong>

                            </div>

                        </div>

                    </div>


                    <!-- =================================================
                         MESSAGE
                         ================================================= -->

                    <div
                        id="historyMessage"
                        class="history-message"
                        style="display:none;">
                    </div>


                    <!-- =================================================
                         TABLE SECTION
                         ================================================= -->

                    <div class="history-table-section">


                        <div class="history-table-header">

                            <div>

                                <h2>
                                    Transactions
                                </h2>

                                <span id="transactionCount">
                                    0 transactions
                                </span>

                            </div>

                        </div>


                        <!-- Table -->

                        <div class="table-wrapper">

                            <table class="transaction-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Transaction ID
                                        </th>

                                        <th>
                                            Date
                                        </th>

                                        <th>
                                            Type
                                        </th>
                                        <th>
                                            Account Number
                                        </th>

                                        <th>
                                            From Account
                                        </th>

                                        <th>
                                            To Account
                                        </th>

                                        <th>
                                            Amount
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Description
                                        </th>

                                    </tr>

                                </thead>


                                <tbody id="transactionTableBody">


                                    <!-- JS will insert rows -->


                                    <tr class="empty-row">

                                        <td colspan="8">

                                            <div class="empty-state">

                                                <i class="fa-regular fa-rectangle-list"></i>

                                                <p>
                                                    No transactions found.
                                                </p>

                                                <span>
                                                    Search an account or view all transactions.
                                                </span>

                                            </div>

                                        </td>

                                    </tr>


                                </tbody>

                            </table>

                        </div>

                    </div>


                </div>

            </div>

        </section>

<!-- =========================================================
     PAGINATION
     ========================================================= -->
<!-- =========================================================
     PAGINATION
     ========================================================= -->

<!-- =========================================================
     PAGINATION
     ========================================================= -->
<div class="pagination" id="pagination">

    <button
        type="button"
        id="previousPage"
        onclick="changePage(currentPage - 1)">

        <i class="fa-solid fa-chevron-left"></i>
        Previous

    </button>


    <span id="pageInfo">
        Page 1 of 1
    </span>


    <button
        type="button"
        id="nextPage"
        onclick="changePage(currentPage + 1)">

        Next
        <i class="fa-solid fa-chevron-right"></i>

    </button>

</div>
  </main>

</div>


<!-- =========================================================
     TRANSACTION HISTORY JS
     ========================================================= -->

<script
    src="${pageContext.request.contextPath}/assets/js/transaction-history.js">
</script>


</body>

</html>