<%@ page language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Withdraw - Banking Management System</title>


    <!-- Withdraw CSS -->
    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/assets/css/withdraw.css">


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
             WITHDRAW PAGE
             ================================================= -->

        <section class="transaction-page">


            <!-- =================================================
                 PAGE TITLE
                 ================================================= -->

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


                    <!-- =================================================
                         DEPOSIT
                         ================================================= -->

                    <button
                        type="button"
                        class="transaction-tab deposit-tab"
                        onclick="openTransaction('deposit')">

                        <i class="fa-solid fa-arrow-down"></i>

                        <span>
                            Deposit
                        </span>

                    </button>


                    <!-- =================================================
                         WITHDRAW
                         ================================================= -->

                    <button
                        type="button"
                        class="transaction-tab withdraw-tab active"
                        onclick="openTransaction('withdraw')">

                        <i class="fa-solid fa-arrow-up"></i>

                        <span>
                            Withdraw
                        </span>

                    </button>


                    <!-- =================================================
                         TRANSFER
                         ================================================= -->

                    <button
                        type="button"
                        class="transaction-tab transfer-tab"
                        onclick="openTransaction('transfer')">

                        <i class="fa-solid fa-right-left"></i>

                        <span>
                            Transfer
                        </span>

                    </button>


                    <!-- =================================================
                         TRANSACTION HISTORY
                         ================================================= -->

                    <button
                        type="button"
                        class="transaction-tab history-tab"
                        onclick="openTransaction('history')">

                        <i class="fa-regular fa-rectangle-list"></i>

                        <span>
                            Transaction History
                        </span>

                    </button>


                </div>


                <!-- =================================================
                     WITHDRAW CONTENT
                     ================================================= -->

                <div class="withdraw-content">


                    <!-- =================================================
                         LEFT SIDE
                         WITHDRAW FORM
                         ================================================= -->

                    <div class="withdraw-form-section">


                        <h2>
                            Withdraw Amount
                        </h2>


                        <!-- =================================================
                             ACCOUNT NUMBER
                             ================================================= -->

                        <div class="form-row">

                            <label for="accountNumber">
                                Account Number
                            </label>

                            <input
                                type="text"
                                id="accountNumber"
                                name="accountNumber"
                                placeholder="Enter account number"
                                autocomplete="off">

                        </div>


                        <!-- =================================================
                             WITHDRAW AMOUNT
                             ================================================= -->

                        <div class="form-row">

                            <label for="withdrawAmount">
                                Withdraw Amount
                            </label>

                            <input
                                type="number"
                                id="withdrawAmount"
                                name="withdrawAmount"
                                placeholder="Enter withdraw amount"
                                min="1"
                                step="0.01">

                        </div>


                        <!-- =================================================
                             DESCRIPTION
                             ================================================= -->

                        <div class="form-row">

                            <label for="description">
                                Description (Optional)
                            </label>

                            <input
                                type="text"
                                id="description"
                                name="description"
                                placeholder="Enter description">

                        </div>


                        <!-- =================================================
                             TRANSACTION DATE
                             ================================================= -->

                        <div class="form-row">

                            <label for="transactionDate">
                                Transaction Date
                            </label>

                            <input
                                type="date"
                                id="transactionDate"
                                name="transactionDate">

                        </div>


                        <!-- =================================================
                             WITHDRAW BUTTON
                             ================================================= -->

                        <div class="button-row">

                            <button
                                type="button"
                                class="withdraw-button"
                                onclick="withdrawAmount()">

                                <i class="fa-solid fa-arrow-up"></i>

                                <span>
                                    Withdraw Amount
                                </span>

                            </button>

                        </div>


                    </div>


                    <!-- =================================================
                         DIVIDER
                         ================================================= -->

                    <div class="vertical-divider"></div>


                    <!-- =================================================
                         RIGHT SIDE
                         ACCOUNT DETAILS
                         ================================================= -->

                    <div class="account-section">


                        <h2>
                            Account Details
                        </h2>


                        <div class="account-details-card">


                            <!-- =================================================
                                 CUSTOMER NAME
                                 ================================================= -->

                            <div class="account-detail-row">

                                <span>
                                    Customer Name
                                </span>

                                <strong id="customerName">
                                    -
                                </strong>

                            </div>


                            <!-- =================================================
                                 ACCOUNT NUMBER
                                 ================================================= -->

                            <div class="account-detail-row">

                                <span>
                                    Account Number
                                </span>

                                <strong id="displayAccountNumber">
                                    -
                                </strong>

                            </div>


                            <!-- =================================================
                                 ACCOUNT TYPE
                                 ================================================= -->

                            <div class="account-detail-row">

                                <span>
                                    Account Type
                                </span>

                                <strong id="accountType">
                                    -
                                </strong>

                            </div>


                            <!-- =================================================
                                 CURRENT BALANCE
                                 ================================================= -->

                            <div class="account-detail-row">

                                <span>
                                    Current Balance
                                </span>

                                <strong
                                    id="currentBalance"
                                    class="balance">

                                    ₹0.00

                                </strong>

                            </div>


                            <!-- =================================================
                                 AVAILABLE BALANCE
                                 ================================================= -->

                            <div class="account-detail-row">

                                <span>
                                    Available Balance
                                </span>

                                <strong
                                    id="availableBalance"
                                    class="balance">

                                    ₹0.00

                                </strong>

                            </div>


                            <!-- =================================================
                                 MINIMUM BALANCE
                                 ================================================= -->


                        </div>


                    </div>


                </div>


                <!-- =================================================
                     WARNING NOTE
                     ================================================= -->

            </div>


        </section>


    </main>


</div>


<!-- =========================================================
     WITHDRAW JS
     ========================================================= -->

<script
    src="${pageContext.request.contextPath}/assets/js/withdraw.js">
</script>


</body>

</html>