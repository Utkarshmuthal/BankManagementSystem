<%@ page language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
        content="width=device-width, initial-scale=1.0">

    <title>Customers</title>


    <!-- Customer Page CSS -->
    <link rel="stylesheet"
        href="${pageContext.request.contextPath}/assets/css/CustomerField.css">


    <!-- Font Awesome -->
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

</head>


<body>


<!-- =========================================================
     MAIN APPLICATION LAYOUT
========================================================= -->

<div class="layout">


    <!-- =====================================================
         SIDEBAR
    ====================================================== -->

    <jsp:include page="sidebar.jsp"/>



    <!-- =====================================================
         MAIN CONTENT AREA
    ====================================================== -->

    <div class="main-content">


        <!-- =================================================
             NAVBAR
        ================================================== -->

        <jsp:include page="navbar.jsp"/>



        <!-- =================================================
             CUSTOMER PAGE CONTENT
        ================================================== -->

        <main class="customer-page">


            <!-- =================================================
                 PAGE HEADER
            ================================================== -->

            <section class="page-header">

                <div>

                    <h1>Customers</h1>

                    <p>
                        View and manage all customer and account information.
                    </p>

                </div>

            </section>



            <!-- =================================================
                 SUMMARY CARDS
            ================================================== -->

            <section class="summary-cards">


                <!-- TOTAL CUSTOMERS -->

                <div class="summary-card">

                    <div class="summary-icon blue-icon">

                        <i class="fa-solid fa-users"></i>

                    </div>


                    <div class="summary-content">

                        <span class="summary-title">
                            Total Customers
                        </span>

                        <strong id="totalCustomers">
                            0
                        </strong>

                        <small>
                            All Approved Customers
                        </small>

                    </div>

                </div>



                <!-- ACTIVE ACCOUNTS -->

                <div class="summary-card">

                    <div class="summary-icon green-icon">

                        <i class="fa-solid fa-wallet"></i>

                    </div>


                    <div class="summary-content">

                        <span class="summary-title">
                            Active Accounts
                        </span>

                        <strong id="activeAccounts">
                            0
                        </strong>

                        <small>
                            Active Accounts
                        </small>

                    </div>

                </div>



                <!-- SAVINGS ACCOUNTS -->

                <div class="summary-card">

                    <div class="summary-icon purple-icon">

                        <i class="fa-solid fa-piggy-bank"></i>

                    </div>


                    <div class="summary-content">

                        <span class="summary-title">
                            Savings Accounts
                        </span>

                        <strong id="savingsAccounts">
                            0
                        </strong>

                        <small>
                            Savings Accounts
                        </small>

                    </div>

                </div>



                <!-- CURRENT ACCOUNTS -->

                <div class="summary-card">

                    <div class="summary-icon orange-icon">

                        <i class="fa-solid fa-building-columns"></i>

                    </div>


                    <div class="summary-content">

                        <span class="summary-title">
                            Current Accounts
                        </span>

                        <strong id="currentAccounts">
                            0
                        </strong>

                        <small>
                            Current Accounts
                        </small>

                    </div>

                </div>


            </section>



            <!-- =================================================
                 SEARCH / FILTER SECTION
            ================================================== -->

            <section class="filter-section">


                <!-- SEARCH INPUT -->

                <div class="search-box">

                    <input
                        type="text"
                        id="searchKeyword"
                        placeholder="Search by name, mobile or email...">


                    <button
                        type="button"
                        id="searchBtn"
                        class="search-icon-btn">

                        <i class="fa-solid fa-magnifying-glass"></i>

                    </button>

                </div>



                <!-- ACCOUNT TYPE -->

                <select id="accountTypeFilter">

                    <option value="ALL">
                        All Account Types
                    </option>

                    <option value="SAVINGS">
                        Savings
                    </option>

                    <option value="CURRENT">
                        Current
                    </option>

                </select>



                <!-- ACCOUNT STATUS -->

                <select id="accountStatusFilter">

                    <option value="ALL">
                        All Status
                    </option>

                    <option value="ACTIVE">
                        Active
                    </option>

                    <option value="INACTIVE">
                        InActive
                    </option>

                </select>



                <!-- SEARCH BUTTON -->

                <button
                    type="button"
                    id="searchButton"
                    class="search-btn">

                    <i class="fa-solid fa-magnifying-glass"></i>

                    Search

                </button>



                <!-- RESET BUTTON -->

                <button
                    type="button"
                    id="resetBtn"
                    class="reset-btn">

                    <i class="fa-solid fa-rotate-left"></i>

                    Reset

                </button>


            </section>



            <!-- =================================================
                 CUSTOMER TABLE
            ================================================== -->

            <section class="table-card">


                <div class="table-wrapper">


                    <table class="customer-table">


                        <thead>

                            <tr>

                                <th>Customer ID</th>

                                <th>Customer Name</th>

                                <th>Mobile</th>

                                <th>Email</th>

                                <th>Account No.</th>

                                <th>Account Type</th>

                                <th>Balance</th>

                                <th>Status</th>

                                <th>Action</th>

                            </tr>

                        </thead>



                        <tbody id="customerTableBody">


                            <tr>

                                <td
                                    colspan="9"
                                    class="loading-cell">

                                    Loading customers...

                                </td>

                            </tr>


                        </tbody>


                    </table>


                </div>



                <!-- =================================================
                     PAGINATION
                ================================================== -->

                <div class="pagination-section">


                    <div
                        class="pagination-info"
                        id="paginationInfo">

                        Showing 0 customers

                    </div>



                    <div class="pagination-buttons">


                        <button
                            type="button"
                            id="prevBtn"
                            class="page-btn">

                            Previous

                        </button>



                        <span
                            id="pageNo"
                            class="page-number active">

                            1

                        </span>



                        <button
                            type="button"
                            id="nextBtn"
                            class="page-btn">

                            Next

                        </button>


                    </div>


                </div>


            </section>


        </main>


    </div>


</div>



<!-- =========================================================
     CUSTOMER JS
========================================================= -->

<script
    src="${pageContext.request.contextPath}/assets/js/CustomerField.js">
</script>


</body>

</html>