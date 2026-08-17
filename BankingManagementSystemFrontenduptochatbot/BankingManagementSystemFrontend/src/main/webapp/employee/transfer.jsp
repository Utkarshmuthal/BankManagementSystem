<%@ page language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Transfer - Banking Management System</title>


    <!-- Transfer CSS -->
    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/assets/css/transfer.css">


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
             TRANSFER PAGE
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
                        class="transaction-tab transfer-tab active"
                        onclick="openTransaction('transfer')">

                        <i class="fa-solid fa-right-left"></i>

                        <span>Transfer</span>

                    </button>


                    <!-- Transaction History -->

                    <button
                        type="button"
                        class="transaction-tab history-tab"
                        onclick="openTransaction('history')">

                        <i class="fa-regular fa-rectangle-list"></i>

                        <span>Transaction History</span>

                    </button>

                </div>


                <!-- =================================================
                     TRANSFER CONTENT
                     ================================================= -->

                <div class="transfer-content">


                    <!-- =================================================
                         LEFT SIDE - TRANSFER FORM
                         ================================================= -->

                    <div class="transfer-form-section">


                        <h2>
                            Transfer Amount
                        </h2>


                        <!-- From Account -->

                        <div class="form-row">

                            <label for="fromAccountNumber">
                                From Account Number
                            </label>

                            <input
                                type="text"
                                id="fromAccountNumber"
                                name="fromAccountNumber"
                                placeholder="Enter sender account number"
                                autocomplete="off">

                        </div>


                        <!-- To Account -->

                        <div class="form-row">

                            <label for="toAccountNumber">
                                To Account Number
                            </label>

                            <input
                                type="text"
                                id="toAccountNumber"
                                name="toAccountNumber"
                                placeholder="Enter receiver account number"
                                autocomplete="off">

                        </div>


                        <!-- Transfer Amount -->

                        <div class="form-row">

                            <label for="transferAmount">
                                Transfer Amount
                            </label>

                            <input
                                type="number"
                                id="transferAmount"
                                name="transferAmount"
                                placeholder="Enter transfer amount"
                                min="1"
                                step="0.01"
                                autocomplete="off">

                        </div>


                        <!-- Description -->

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


                        <!-- Transaction Date -->

                        <div class="form-row">

                            <label for="transactionDate">
                                Transaction Date
                            </label>

                            <input
                                type="date"
                                id="transactionDate"
                                name="transactionDate">

                        </div>


                        <!-- Transfer Button -->

                        <div class="button-row">

                            <button
                                type="button"
                                class="transfer-button"
                                onclick="transferAmount()">

                                <i class="fa-solid fa-right-left"></i>

                                <span>
                                    Transfer Amount
                                </span>

                            </button>

                        </div>

                    </div>


                    <!-- =================================================
                         DIVIDER
                         ================================================= -->

                    <div class="vertical-divider"></div>


                    <!-- =================================================
                         RIGHT SIDE - ACCOUNT DETAILS
                         ================================================= -->

                    <div class="account-section">


                        <h2>
                            Sender Account Details
                        </h2>


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
                                    id="currentBalance"
                                    class="balance">

                                    ₹0.00

                                </strong>

                            </div>


                            <!-- Available Balance -->

                            <div class="account-detail-row last">

                                <span>
                                    Available Balance
                                </span>

                                <strong
                                    id="availableBalance"
                                    class="balance">

                                    ₹0.00

                                </strong>

                            </div>


                        </div>

                    </div>

                </div>

            </div>

        </section>

    </main>

</div>


<!-- =========================================================
     TRANSFER JS
     ========================================================= -->

<script
    src="${pageContext.request.contextPath}/assets/js/transfer.js">
</script>


</body>

</html>