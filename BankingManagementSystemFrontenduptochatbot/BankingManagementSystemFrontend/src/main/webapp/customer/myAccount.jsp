<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Account | Bank Management System</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/customerDashboard.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/customerNavbar.css">
</head>
<body>

<div class="layout">

    <jsp:include page="sidebar.jsp" />

    <div class="main-content">

        <jsp:include page="navbar.jsp">
            <jsp:param name="pageTitle" value="My Account" />
        </jsp:include>

        <main class="content-area">

            <!-- ===== Account Banner ===== -->
            <section class="account-banner">
                <div class="banner-left">
                    <h2>My Account Overview</h2>
                    <p>Here is your personal and account information.</p>
                </div>
                <div class="banner-right">
                    <img src="${pageContext.request.contextPath}/assets/images/bank-illustration.svg" alt="Bank illustration">
                </div>
            </section>

            <!-- ===== Personal Info + KYC/Account Info ===== -->
            <section class="account-grid">

                <!-- Personal Information -->
                <div class="info-card">
                    <div class="card-header">
                        <div class="card-icon blue"><i class="fa-solid fa-user"></i></div>
                        <h3>Personal Information</h3>
                    </div>
                    <div class="info-table">
                        <div class="info-row"><span>Customer ID</span><span id="customerId">--</span></div>
                        <div class="info-row"><span>Full Name</span><span id="fullName">--</span></div>
                        <div class="info-row"><span>Email Address</span><span id="email">--</span></div>
                        <div class="info-row"><span>Mobile Number</span><span id="mobileNumber">--</span></div>
                        <div class="info-row"><span>Date of Birth</span><span id="dob">--</span></div>
                        <div class="info-row"><span>Gender</span><span id="gender">--</span></div>
                        <div class="info-row"><span>Address</span><span id="address">--</span></div>
                        <div class="info-row"><span>City</span><span id="city">--</span></div>
                        <div class="info-row"><span>State</span><span id="state">--</span></div>
                        <div class="info-row"><span>PIN Code</span><span id="pinCode">--</span></div>
                    </div>
                </div>

                <!-- KYC + Account Information -->
                <div class="right-column">

                    <div class="info-card">
                        <div class="card-header">
                            <div class="card-icon green"><i class="fa-solid fa-shield-halved"></i></div>
                            <h3>KYC Information</h3>
                        </div>
                        <div class="info-table">
                            <div class="info-row"><span>Aadhaar Number</span><span id="aadhaarNumber">--</span></div>
                            <div class="info-row"><span>PAN Number</span><span id="panNumber">--</span></div>
                            <div class="info-row"><span>KYC Status</span><span class="status" id="kycStatus">--</span></div>
                        </div>
                    </div>

                    <div class="info-card mt-25">
                        <div class="card-header">
                            <div class="card-icon purple"><i class="fa-solid fa-building-columns"></i></div>
                            <h3>Account Information</h3>
                        </div>
                        <div class="info-table">
                            <div class="info-row"><span>Account Number</span><span id="accountNumber">--</span></div>
                            <div class="info-row"><span>Account Type</span><span id="accountType">--</span></div>
                            <div class="info-row"><span>Account Status</span><span class="status" id="accountStatus">--</span></div>
                        </div>
                    </div>

                </div>

            </section>

            <!-- ===== Balance + Summary ===== -->
            <section class="account-bottom-grid">

                <div class="balance-card">
                    <div class="card-header">
                        <div class="card-icon orange"><i class="fa-solid fa-wallet"></i></div>
                        <h3>Account Balance</h3>
                    </div>
                    <div class="balance-content">
                        <div>
                            <span class="balance-label">Available Balance</span>
                            <span id="balance">&#8377; 0.00</span>
                        </div>
                        <div class="balance-icon"><i class="fa-solid fa-sack-dollar"></i></div>
                    </div>
                </div>

                <div class="summary-card">
                    <div class="card-header">
                        <div class="card-icon blue"><i class="fa-solid fa-file-lines"></i></div>
                        <h3>Recent Account Summary</h3>
                    </div>
                    <div class="summary-list">
                        <div class="summary-item"><span>Customer ID</span><strong id="summaryCustomerId">--</strong></div>
                        <div class="summary-item"><span>Account Type</span><strong id="summaryAccountType">--</strong></div>
                        <div class="summary-item"><span>KYC Status</span><strong id="summaryKycStatus">--</strong></div>
                        <div class="summary-item"><span>Account Status</span><strong id="summaryAccountStatus">--</strong></div>
                    </div>
                </div>

            </section>

            <!-- ===== Footer Notice ===== -->
            <section class="info-banner">
                <div class="info-banner-icon"><i class="fa-solid fa-circle-info"></i></div>
                <div class="info-banner-text">
                    If you find any incorrect information, please contact your branch or support team.
                </div>
            </section>

        </main>
    </div>
</div>

<script src="${pageContext.request.contextPath}/assets/js/customerDashboard.js"></script>
</body>
</html>
