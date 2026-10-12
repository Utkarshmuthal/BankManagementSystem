<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Manage Customers</title>

    <!-- Font Awesome -->
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

    <!-- Customer CSS -->
    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/assets/css/customer-management.css">

</head>

<body>

<div class="app-container">


    <!-- =====================================================
                         SIDEBAR
    ====================================================== -->

    <aside class="sidebar">

        <!-- LOGO -->

        <div class="sidebar-top">

            <div class="sidebar-brand">

                <div class="brand-icon">
                    <i class="fa-solid fa-building-columns"></i>
                </div>

                <div class="brand-text">

                    <h3>BANK</h3>

                    <p>MANAGEMENT SYSTEM</p>

                </div>

            </div>


            <!-- MENU -->

            <nav class="sidebar-menu">

                <a href="${pageContext.request.contextPath}/admin/dashboard.jsp"
                   class="menu-item">

                    <i class="fa-solid fa-house"></i>

                    <span>Dashboard</span>

                </a>


                <a href="${pageContext.request.contextPath}/admin/customers.jsp"
                   class="menu-item active">

                    <i class="fa-solid fa-users"></i>

                    <span>Customers</span>

                </a>


                <a href="${pageContext.request.contextPath}/admin/employees.jsp"
                   class="menu-item">

                    <i class="fa-solid fa-user-group"></i>

                    <span>Employees</span>

                </a>


                <a href="${pageContext.request.contextPath}/admin/accounts.jsp"
                   class="menu-item">

                    <i class="fa-solid fa-credit-card"></i>

                    <span>Accounts</span>

                </a>


                <a href="${pageContext.request.contextPath}/admin/loans.jsp"
                   class="menu-item">

                    <i class="fa-solid fa-sack-dollar"></i>

                    <span>Loans</span>

                </a>


                <a href="${pageContext.request.contextPath}/admin/transactions.jsp"
                   class="menu-item">

                    <i class="fa-solid fa-arrow-right-arrow-left"></i>

                    <span>Transactions</span>

                </a>


                <a href="${pageContext.request.contextPath}/admin/reports.jsp"
                   class="menu-item">

                    <i class="fa-solid fa-chart-pie"></i>

                    <span>Reports</span>

                </a>


                <a href="${pageContext.request.contextPath}/admin/settings.jsp"
                   class="menu-item">

                    <i class="fa-solid fa-gear"></i>

                    <span>Settings</span>

                </a>



            </nav>

        </div>


        <!-- LOGOUT -->

        <div class="sidebar-footer">

            <button type="button"
                    class="logout-pill"
                    id="logoutBtn">

                <i class="fa-solid fa-power-off"></i>

                <span>Logout</span>

            </button>

        </div>

    </aside>



    <!-- =====================================================
                         MAIN AREA
    ====================================================== -->

    <main class="main-area">


        <!-- =================================================
                           NAVBAR
        ================================================== -->

        <header class="topbar">


            <!-- LEFT -->

            <div class="topbar-left">

                <button type="button"
                        class="toggle-menu-btn"
                        id="sidebarToggle">

                    <i class="fa-solid fa-bars"></i>

                </button>


                <h2 class="page-title">
                    Customers
                </h2>

            </div>



            <!-- RIGHT -->

            <div class="topbar-right">


                <!-- Notification -->

                <button type="button"
                        class="icon-badge-btn">

                    <i class="fa-regular fa-bell"></i>

                    <span class="badge">
                        3
                    </span>

                </button>



                <!-- Admin -->

                <div class="user-profile-menu">

                    <div class="user-avatar">

                        <img
                            src="${pageContext.request.contextPath}/assets/images/admin.png"
                            alt="Admin"
                            onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">

                        <i class="fa-solid fa-user-tie"
                           style="display:none;"></i>

                    </div>


                    <div class="user-details">

                        <span class="user-name">
                            Administrator
                        </span>

                        <span class="user-role">
                            Super Administrator
                        </span>

                    </div>


                    <i class="fa-solid fa-chevron-down dropdown-icon"></i>

                </div>

            </div>

        </header>



        <!-- =================================================
                       PAGE CONTENT
        ================================================== -->

        <section class="content-area">


            <!-- PAGE HEADER -->

            <div class="page-heading">

                <div>

                    <h1>
                        Manage Customers
                    </h1>

                    <p>
                        View, search and manage all bank customers.
                    </p>

                </div>


                <div class="breadcrumb">

                    <span>
                        Dashboard
                    </span>

                    <i class="fa-solid fa-chevron-right"></i>

                    <strong>
                        Customers
                    </strong>

                </div>

            </div>



            <!-- =================================================
                           STAT CARDS
            ================================================== -->

            <div class="stats-grid">


                <!-- TOTAL -->

                <div class="stat-card">

                    <div class="stat-icon blue">

                        <i class="fa-solid fa-users"></i>

                    </div>


                    <div class="stat-info">

                        <span>
                            Total Customers
                        </span>

                        <strong id="totalCustomers">
                            0
                        </strong>

                        <small>
                            Registered Customers
                        </small>

                    </div>

                </div>



                <!-- ACTIVE -->

                <div class="stat-card">

                    <div class="stat-icon green">

                        <i class="fa-solid fa-user-check"></i>

                    </div>


                    <div class="stat-info">

                        <span>
                            Active Customers
                        </span>

                        <strong id="activeCustomers">
                            0
                        </strong>

                        <small>
                            Currently Active
                        </small>

                    </div>

                </div>



                <!-- INACTIVE -->

                <div class="stat-card">

                    <div class="stat-icon orange">

                        <i class="fa-solid fa-user-slash"></i>

                    </div>


                    <div class="stat-info">

                        <span>
                            Inactive Customers
                        </span>

                        <strong id="inactiveCustomers">
                            0
                        </strong>

                        <small>
                            Inactive Accounts
                        </small>

                    </div>

                </div>



                <!-- NEW -->

                <div class="stat-card">

                    <div class="stat-icon purple">

                        <i class="fa-solid fa-user-plus"></i>

                    </div>


                    <div class="stat-info">

                        <span>
                            New This Month
                        </span>

                        <strong id="newCustomers">
                            0
                        </strong>

                        <small>
                            New Registrations
                        </small>

                    </div>

                </div>

            </div>



            <!-- =================================================
                         SEARCH SECTION
            ================================================== -->

            <div class="filter-section">


                <!-- SEARCH -->

                <div class="search-box">

                    <i class="fa-solid fa-magnifying-glass"></i>

                    <input
                        type="text"
                        id="customerSearchInput"
                        placeholder="Search by Customer ID, Name, Email or Mobile...">

                </div>



                <!-- STATUS -->

                <select id="statusFilter"
                        class="status-select">

                    <option value="ALL">
                        All Status
                    </option>

                    <option value="APPROVED">
                        Approved
                    </option>

                    <option value="PENDING">
                        Pending
                    </option>

                    <option value="REJECTED">
                        Rejected
                    </option>

                    <option value="INACTIVE">
                        Inactive
                    </option>

                </select>



                <!-- REFRESH -->

                <button type="button"
                        id="refreshBtn"
                        class="refresh-btn">

                    <i class="fa-solid fa-rotate"></i>

                    Refresh

                </button>

            </div>



            <!-- =================================================
                         CUSTOMER TABLE
            ================================================== -->

            <div class="table-card">

                <div class="table-wrapper">

                    <table class="customer-table">

                        <thead>

                        <tr>

                            <th>#</th>

                            <th>
                                Customer ID
                            </th>

                            <th>
                                Full Name
                            </th>

                            <th>
                                Email
                            </th>

                            <th>
                                Mobile
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Applied At
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                        </thead>


                        <tbody id="customerTableBody">

                        <!-- JavaScript inserts customers here -->

                        </tbody>

                    </table>

                </div>


                <!-- EMPTY -->

                <div id="emptyState"
                     class="empty-state"
                     style="display:none;">

                    <i class="fa-solid fa-users-slash"></i>

                    <h3>
                        No Customers Found
                    </h3>

                    <p>
                        No customer records match your search.
                    </p>

                </div>

            </div>

        </section>

    </main>

</div>



<!-- =========================================================
                    CUSTOMER DETAILS MODAL
========================================================== -->

<div id="customerDetailsModal"
     class="modal-overlay">


    <div class="customer-modal">


        <!-- HEADER -->

        <div class="modal-header">

            <div>

                <h3>

                    <i class="fa-solid fa-user"></i>

                    Customer Details

                </h3>

                <p>
                    Complete customer information
                </p>

            </div>


            <button type="button"
                    id="closeCustomerModal"
                    class="modal-close-btn">

                <i class="fa-solid fa-xmark"></i>

            </button>

        </div>



        <!-- BODY -->

        <div class="modal-body">

            <div class="details-grid">


                <div class="detail-item">

                    <span>
                        Customer ID
                    </span>

                    <strong id="viewCustomerId">
                        -
                    </strong>

                </div>


                <div class="detail-item">

                    <span>
                        User ID
                    </span>

                    <strong id="viewCustomerUserId">
                        -
                    </strong>

                </div>


                <div class="detail-item">

                    <span>
                        Full Name
                    </span>

                    <strong id="viewCustomerName">
                        -
                    </strong>

                </div>


                <div class="detail-item">

                    <span>
                        Email
                    </span>

                    <strong id="viewCustomerEmail">
                        -
                    </strong>

                </div>


                <div class="detail-item">

                    <span>
                        Mobile Number
                    </span>

                    <strong id="viewCustomerMobile">
                        -
                    </strong>

                </div>


                <div class="detail-item">

                    <span>
                        Date of Birth
                    </span>

                    <strong id="viewCustomerDob">
                        -
                    </strong>

                </div>


                <div class="detail-item">

                    <span>
                        Gender
                    </span>

                    <strong id="viewCustomerGender">
                        -
                    </strong>

                </div>


                <div class="detail-item full-width">

                    <span>
                        Address
                    </span>

                    <strong id="viewCustomerAddress">
                        -
                    </strong>

                </div>


                <div class="detail-item">

                    <span>
                        City
                    </span>

                    <strong id="viewCustomerCity">
                        -
                    </strong>

                </div>


                <div class="detail-item">

                    <span>
                        State
                    </span>

                    <strong id="viewCustomerState">
                        -
                    </strong>

                </div>


                <div class="detail-item">

                    <span>
                        PIN Code
                    </span>

                    <strong id="viewCustomerPinCode">
                        -
                    </strong>

                </div>


                <div class="detail-item">

                    <span>
                        Aadhaar Number
                    </span>

                    <strong id="viewCustomerAadhaar">
                        -
                    </strong>

                </div>


                <div class="detail-item">

                    <span>
                        PAN Number
                    </span>

                    <strong id="viewCustomerPan">
                        -
                    </strong>

                </div>


                <div class="detail-item">

                    <span>
                        Preferred Account
                    </span>

                    <strong id="viewCustomerAccountType">
                        -
                    </strong>

                </div>


                <div class="detail-item">

                    <span>
                        Approval Status
                    </span>

                    <strong id="viewCustomerStatus">
                        -
                    </strong>

                </div>


                <div class="detail-item">

                    <span>
                        Applied At
                    </span>

                    <strong id="viewCustomerAppliedAt">
                        -
                    </strong>

                </div>


                <div class="detail-item">

                    <span>
                        Application Date
                    </span>

                    <strong id="viewCustomerDate">
                        -
                    </strong>

                </div>

            </div>

        </div>



        <!-- FOOTER -->

        <div class="modal-footer">

            <button type="button"
                    id="closeCustomerModalBottom"
                    class="cancel-btn">

                Close

            </button>

        </div>

    </div>

</div>



<!-- =========================================================
                     DELETE MODAL
========================================================== -->

<div id="deleteCustomerModal"
     class="modal-overlay">


    <div class="delete-modal">


        <!-- HEADER -->

        <div class="delete-modal-header">

            <div class="delete-icon">

                <i class="fa-solid fa-trash"></i>

            </div>


            <button type="button"
                    id="closeDeleteModal"
                    class="modal-close-btn">

                <i class="fa-solid fa-xmark"></i>

            </button>

        </div>



        <!-- BODY -->

        <div class="delete-modal-body">

            <h3>
                Delete Customer
            </h3>

            <p>
                Are you sure you want to delete this customer?
            </p>

            <div class="delete-customer-name">

                <span>
                    Customer:
                </span>

                <strong id="deleteCustomerName">
                    -
                </strong>

            </div>

            <small>
                This action cannot be undone.
            </small>

        </div>



        <!-- FOOTER -->

        <div class="delete-modal-footer">

            <button type="button"
                    id="cancelDeleteBtn"
                    class="cancel-btn">

                Cancel

            </button>


            <button type="button"
                    id="confirmDeleteBtn"
                    class="delete-confirm-btn">

                <i class="fa-solid fa-trash"></i>

                Delete Customer

            </button>

        </div>

    </div>

</div>



<!-- =========================================================
                         JAVASCRIPT
========================================================== -->

<script src="${pageContext.request.contextPath}/assets/js/customer-management.js"></script>


</body>

</html>