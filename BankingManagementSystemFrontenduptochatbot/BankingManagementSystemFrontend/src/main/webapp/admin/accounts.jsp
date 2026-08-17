<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Accounts Management - Bank Management System</title>

    <!-- Font Awesome -->
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

    <!-- Accounts CSS -->
    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/assets/css/accounts.css">

</head>


<body>


<!-- =========================================================
     SIDEBAR
     DO NOT CHANGE sidebar.jsp
     ========================================================= -->

<jsp:include page="sidebar.jsp">

    <jsp:param
            name="activePage"
            value="accounts"/>

</jsp:include>



<!-- =========================================================
     MAIN CONTENT
     ========================================================= -->

<main class="main-content">


    <!-- =====================================================
         NAVBAR
         DO NOT WRAP navbar.jsp IN ANOTHER HEADER
         ===================================================== -->

    <jsp:include page="navbar.jsp">

        <jsp:param
                name="pageTitle"
                value="Accounts Management"/>

        <jsp:param
                name="showSearch"
                value="false"/>

    </jsp:include>



    <!-- =====================================================
         PAGE CONTENT
         ===================================================== -->

    <section class="page-content">


        <!-- =================================================
             PAGE HEADING
             ================================================= -->

        <div class="page-heading">

            <h1>Manage Accounts</h1>

            <p>
                View, search and manage all bank accounts.
            </p>

        </div>



        <!-- =================================================
             STATISTICS
             ================================================= -->

        <div class="stats-grid">


            <!-- TOTAL -->

            <div class="stat-card">

                <div class="stat-icon blue">

                    <i class="fa-solid fa-credit-card"></i>

                </div>

                <div class="stat-info">

                    <span>Total Accounts</span>

                    <h3 id="totalAccounts">120</h3>

                    <small>All bank accounts</small>

                </div>

            </div>



            <!-- ACTIVE -->

            <div class="stat-card">

                <div class="stat-icon green">

                    <i class="fa-solid fa-circle-check"></i>

                </div>

                <div class="stat-info">

                    <span>Active Accounts</span>

                    <h3 id="activeAccounts">98</h3>

                    <small>Currently active</small>

                </div>

            </div>



            <!-- INACTIVE -->

            <div class="stat-card">

                <div class="stat-icon orange">

                    <i class="fa-solid fa-circle-xmark"></i>

                </div>

                <div class="stat-info">

                    <span>Inactive Accounts</span>

                    <h3 id="inactiveAccounts">22</h3>

                    <small>Currently inactive</small>

                </div>

            </div>



            <!-- NEW THIS MONTH -->

            <div class="stat-card">

                <div class="stat-icon purple">

                    <i class="fa-solid fa-calendar-plus"></i>

                </div>

                <div class="stat-info">

                    <span>New Accounts This Month</span>

                    <h3 id="newAccounts">15</h3>

                    <small>Created this month</small>

                </div>

            </div>


        </div>



        <!-- =================================================
             ACCOUNTS LIST
             ================================================= -->

        <div class="accounts-card">


            <!-- CARD HEADER -->

            <div class="accounts-card-header">


                <div class="accounts-title">

                    <h2>Accounts List</h2>

                    <p>
                        Manage registered bank accounts
                    </p>

                </div>



                <!-- FILTERS -->

                <div class="filter-area">


                    <!-- SEARCH -->

                    <div class="account-search">

                        <i class="fa-solid fa-magnifying-glass"></i>

                        <input
                                type="text"
                                id="accountSearch"
                                placeholder="Search by Account Number or Customer ID...">

                    </div>



                    <!-- TYPE -->

                    <select
                            id="accountTypeFilter"
                            class="filter-select">

                        <option value="">
                            All Types
                        </option>

                        <option value="Savings">
                            Savings
                        </option>

                        <option value="Current">
                            Current
                        </option>

                    </select>



                    <!-- STATUS -->

                    <select
                            id="statusFilter"
                            class="filter-select">

                        <option value="">
                            All Status
                        </option>

                        <option value="ACTIVE">
                            ACTIVE
                        </option>

                        <option value="INACTIVE">
                            INACTIVE
                        </option>

                    </select>



                    <!-- REFRESH -->

                    <button
                            type="button"
                            id="refreshBtn"
                            class="refresh-btn">

                        <i class="fa-solid fa-rotate"></i>

                        Refresh

                    </button>


                </div>


            </div>



            <!-- =================================================
                 TABLE
                 ================================================= -->

            <div class="table-container">

                <table class="accounts-table">


                    <thead>

                    <tr>

                        <th>#</th>

                        <th>Account Number</th>

                        <th>Customer ID</th>

                        <th>Account Type</th>

                        <th>Balance</th>

                        <th>Status</th>

                        <th>Created At</th>

                        <th>Action</th>

                    </tr>

                    </thead>


                    <tbody id="accountsTableBody">

                    </tbody>


                </table>

            </div>



            <!-- =================================================
                 EMPTY STATE
                 ================================================= -->

            <div
                    id="emptyState"
                    class="empty-state"
                    style="display:none;">

                <div class="empty-icon">

                    <i class="fa-solid fa-credit-card"></i>

                </div>

                <h3>No Accounts Found</h3>

                <p>
                    No accounts match your search or filters.
                </p>

            </div>



            <!-- =================================================
                 FOOTER
                 ================================================= -->

            <div class="accounts-footer">

                <span id="accountCount">
                    Showing 0 accounts
                </span>

            </div>


        </div>


    </section>


</main>



<!-- =========================================================
     ACCOUNT DETAILS MODAL
     ========================================================= -->

<div
        class="modal-overlay"
        id="accountModal"
        style="display:none;">


    <div class="account-modal">


        <!-- MODAL HEADER -->

        <div class="modal-header">

            <div>

                <h2>Account Details</h2>

                <p>
                    Complete account information
                </p>

            </div>


            <button
                    type="button"
                    id="modalClose"
                    class="modal-close">

                <i class="fa-solid fa-xmark"></i>

            </button>

        </div>



        <!-- MODAL BODY -->

        <div class="modal-body">


            <div class="detail-item">

                <span>Account ID</span>

                <strong id="detailAccountId">—</strong>

            </div>


            <div class="detail-item">

                <span>Account Number</span>

                <strong id="detailAccountNumber">—</strong>

            </div>


            <div class="detail-item">

                <span>Customer ID</span>

                <strong id="detailCustomerId">—</strong>

            </div>


            <div class="detail-item">

                <span>Account Type</span>

                <strong id="detailAccountType">—</strong>

            </div>


            <div class="detail-item">

                <span>Balance</span>

                <strong id="detailBalance">—</strong>

            </div>


            <div class="detail-item">

                <span>Status</span>

                <strong id="detailStatus">—</strong>

            </div>


            <div class="detail-item">

                <span>Created At</span>

                <strong id="detailCreatedAt">—</strong>

            </div>


        </div>



        <!-- MODAL FOOTER -->

        <div class="modal-footer">

            <button
                    type="button"
                    id="closeModalBtn"
                    class="close-modal-btn">

                Close

            </button>

        </div>


    </div>

</div>



<!-- =========================================================
     JAVASCRIPT
     ========================================================= -->

<script
        src="${pageContext.request.contextPath}/assets/js/accounts.js">
</script>


</body>

</html>