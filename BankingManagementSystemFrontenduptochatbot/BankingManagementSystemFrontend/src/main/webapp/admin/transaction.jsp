<%@ page language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
        content="width=device-width, initial-scale=1.0">

    <title>Transaction History - Admin</title>

    <!-- Font Awesome -->
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

    <!-- Transaction CSS -->
    <link rel="stylesheet"
        href="${pageContext.request.contextPath}/assets/css/admintransaction.css">

</head>


<body>

<div class="admin-layout">


    <!-- =====================================================
         SIDEBAR
         ===================================================== -->

    <jsp:include page="sidebar.jsp">

        <jsp:param
            name="activePage"
            value="transactions"/>

    </jsp:include>



    <!-- =====================================================
         MAIN CONTENT
         ===================================================== -->

    <main class="main-content">


        <!-- =================================================
             NAVBAR
             ================================================= -->

        <jsp:include page="navbar.jsp">

            <jsp:param
                name="pageTitle"
                value="Transaction History"/>

        </jsp:include>



        <!-- =================================================
             PAGE CONTENT
             ================================================= -->

        <section class="transaction-page">


            <!-- =================================================
                 SEARCH SECTION
                 ================================================= -->

            <div class="transaction-search-card">

                <h2>Search Transactions</h2>

                <div class="search-row">


                    <!-- Account Number -->

                    <div class="transaction-search-input">

                        <input
                            type="text"
                            id="accountNumberInput"
                            placeholder="Enter account number"
                            autocomplete="off">

                    </div>



                    <!-- Search Button -->

                    <button
                        type="button"
                        class="search-btn"
                        onclick="searchTransactions()">

                        <i class="fa-solid fa-magnifying-glass"></i>

                        <span>Search</span>

                    </button>



                    <!-- OR -->

                    <div class="or-section">

                        <span>OR</span>

                    </div>



                    <!-- All Transactions -->

                    <button
                        type="button"
                        class="all-transactions-btn"
                        onclick="loadAllTransactions()">

                        <i class="fa-solid fa-list"></i>

                        <span>All Transactions</span>

                    </button>

                </div>

            </div>



            <!-- =================================================
                 TOTAL TRANSACTIONS CARD
                 ================================================= -->

            <div class="total-transaction-card">

                <div class="total-transaction-icon">

                    <i class="fa-solid fa-list"></i>

                </div>


                <div class="total-transaction-content">

                    <span>Total Transactions</span>

                    <strong id="totalTransactions">
                        0
                    </strong>

                </div>

            </div>



            <!-- =================================================
                 TRANSACTION TABLE
                 ================================================= -->

            <div class="transactions-table-card">


                <div class="table-header">

                    <h2>All Transactions</h2>

                </div>



                <div class="table-wrapper">

                    <table class="transactions-table">


                        <!-- =================================================
                             TABLE HEADER
                             ================================================= -->

                        <thead>

                            <tr>

                                <!-- 1 -->
                                <th>Transaction ID</th>

                                <!-- 2 -->
                                <th>Date &amp; Time</th>

                                <!-- 3 -->
                                <th>Type</th>

                                <!-- 4 -->
                                <th>Account Number</th>

                                <!-- 5 -->
                                <th>From Account</th>

                                <!-- 7 -->
                                <th>Amount</th>

                                <!-- 8 -->
                                <th>Status</th>

                                <!-- 9 -->
                                <th>Description</th>

                            </tr>

                        </thead>



                        <!-- =================================================
                             TABLE BODY
                             ================================================= -->

                        <tbody id="transactionTableBody">

                            <!-- JavaScript will load transactions -->

                        </tbody>


                    </table>

                </div>



                <!-- =================================================
                     TABLE FOOTER
                     ================================================= -->

                <div class="table-footer">


                    <!-- Showing -->

                    <div
                        class="showing-text"
                        id="showingText">

                        Showing 0 to 0 of 0 transactions

                    </div>



                    <!-- RIGHT SIDE -->

                    <div class="footer-right">


                        <!-- Pagination -->

                        <div
                            class="pagination"
                            id="pagination">

                            <!-- JavaScript pagination -->

                        </div>




                    </div>

                </div>

            </div>


        </section>

    </main>

</div>



<!-- =====================================================
     TRANSACTION JS
     ===================================================== -->




<script src="${pageContext.request.contextPath}/assets/js/admintransaction.js"></script>


</body>

</html>