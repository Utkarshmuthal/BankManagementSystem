<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Deposit - Banking Management System</title>

    <!-- Common CSS -->

    <!-- Deposit CSS -->
    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/assets/css/deposite.css">

    <!-- Icons -->
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
</head>

<body>

    <!-- SIDEBAR -->
    <jsp:include page="sidebar.jsp"/>

    <!-- MAIN AREA -->
    <div class="main-content">

        <!-- NAVBAR -->
        <jsp:include page="navbar.jsp"/>


        <!-- PAGE CONTENT -->
        <div class="transaction-page">

            <h1 class="page-title">Transactions</h1>


            <!-- TRANSACTION TABS -->
            <div class="transaction-container">

                <div class="transaction-tabs">

                    <!-- Deposit -->
                    <button class="transaction-tab active"
                            onclick="openTransaction('deposit')">

                        <i class="fa-solid fa-arrow-down"></i>

                        <span>Deposit</span>
                    </button>


                    <!-- Withdraw -->
                    <button class="transaction-tab"
                            onclick="openTransaction('withdraw')">

                        <i class="fa-solid fa-arrow-up"></i>

                        <span>Withdraw</span>
                    </button>


                    <!-- Transfer -->
                    <button class="transaction-tab"
                            onclick="openTransaction('transfer')">

                        <i class="fa-solid fa-arrow-right-arrow-left"></i>

                        <span>Transfer</span>
                    </button>


                    <!-- Transaction History -->
                    <button class="transaction-tab"
                            onclick="openTransaction('history')">

                        <i class="fa-regular fa-file-lines"></i>

                        <span>Transaction History</span>
                    </button>

                </div>


                <!-- =========================
                     DEPOSIT CONTENT
                ========================== -->

                <div class="deposit-content">


                    <!-- LEFT SECTION -->
                    <div class="deposit-form-section">

                        <h2>Deposit Amount</h2>


                        <!-- Account Number -->
<div class="form-row">

    <label>
        Account Number
    </label>

    <input
        type="text"
        id="accountNumber"
        placeholder="Enter account number"
        maxlength="20">

</div>
                        <!-- Deposit Amount -->
                        <div class="form-row">

                            <label>
                                Deposit Amount (₹)
                            </label>

                            <input
                                type="number"
                                id="depositAmount"
                                placeholder="Enter amount to deposit"
                                min="1"
                                step="0.01">

                        </div>


                        <!-- Description -->
                        <div class="form-row">

                            <label>
                                Description (Optional)
                            </label>

                            <input
                                type="text"
                                id="description"
                                placeholder="Enter description">

                        </div>


                        <!-- Transaction Date -->
                        <div class="form-row">

                            <label>
                                Transaction Date
                            </label>

                            <div class="date-input-wrapper">

                                <input
                                    type="date"
                                    id="transactionDate">

                            </div>

                        </div>


                        <!-- Deposit Button -->
                        <div class="button-row">

                            <button
                                type="button"
                                class="deposit-button"
                                onclick="depositAmount()">

                                <i class="fa-solid fa-indian-rupee-sign"></i>

                                Deposit Amount

                            </button>

                        </div>

                    </div>


                    <!-- VERTICAL LINE -->
                    <div class="vertical-divider"></div>


                    <!-- RIGHT SECTION -->
                    <div class="account-section">

                        <h2>Account Details</h2>


                        <div class="account-details-card">


                            <!-- Customer Name -->
                            <div class="account-detail-row">

                                <span>
                                    Customer Name
                                </span>

                                <strong id="customerName">
                                    -
                                </strong>

                            </div>


                            <!-- Account Number -->
                            <div class="account-detail-row">

                                <span>
                                    Account Number
                                </span>

                                <strong id="displayAccountNumber">
                                    -
                                </strong>

                            </div>


                            <!-- Account Type -->
                            <div class="account-detail-row">

                                <span>
                                    Account Type
                                </span>

                                <strong id="accountType">
                                    -
                                </strong>

                            </div>


                            <!-- Current Balance -->
                            <div class="account-detail-row">

                                <span>
                                    Current Balance
                                </span>

                                <strong
                                    class="balance"
                                    id="currentBalance">

                                    ₹0.00

                                </strong>

                            </div>


                            <!-- Available Balance -->
                            <div class="account-detail-row last">

                                <span>
                                    Available Balance
                                </span>

                                <strong
                                    class="balance"
                                    id="availableBalance">

                                    ₹0.00

                                </strong>

                            </div>

                        </div>

                    </div>

                </div>


                <!-- INFORMATION NOTE -->
                <div class="transaction-note">

                    <i class="fa-solid fa-circle-info"></i>

                    <span>
                        <b>Note:</b>
                        After deposit, the amount will be added to the
                        account and balance will be updated.
                    </span>

                </div>

            </div>

        </div>

    </div>


    <!-- Deposit JS -->
    <script
        src="${pageContext.request.contextPath}/assets/js/deposite.js">
    </script>

</body>
</html>