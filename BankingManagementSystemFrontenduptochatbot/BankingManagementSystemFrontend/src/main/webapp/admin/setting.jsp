<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Settings - Admin</title>

    <!-- Font Awesome -->
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

    <!-- Settings CSS -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/setting.css">
</head>

<body>

    <!-- Sidebar -->
<jsp:include page="sidebar.jsp">
    <jsp:param name="activePage" value="settings" />
</jsp:include>
    <!-- Main Area -->
    <div class="main-area">

        <!-- Navbar -->
        <jsp:include page="navbar.jsp" />

        <!-- Page Content -->
        <main class="settings-container">

            <!-- ================= ADMIN PROFILE ================= -->
            <section class="settings-card">

                <div class="section-title">
                    <div class="section-icon">
                        <i class="fa-solid fa-user"></i>
                    </div>

                    <h2>Admin Profile</h2>
                </div>

                <div class="form-row">

                    <div class="form-group">
                        <label for="fullName">Full Name</label>
                        <input type="text"
                               id="fullName"
                               value="Administrator">
                    </div>

                    <div class="form-group">
                        <label for="adminEmail">Email</label>
                        <input type="email"
                               id="adminEmail"
                               value="admin@bank.com">
                    </div>

                    <div class="form-group">
                        <label for="phoneNumber">Phone Number</label>
                        <input type="text"
                               id="phoneNumber"
                               value="9876543210"
                               maxlength="10">
                    </div>

                </div>

                <div class="button-area">
                    <button type="button"
                            class="primary-btn"
                            onclick="saveAdminProfile()">
                        <i class="fa-regular fa-floppy-disk"></i>
                        Save Changes
                    </button>
                </div>

            </section>


            <!-- ================= CHANGE PASSWORD ================= -->
            <section class="settings-card">

                <div class="section-title">
                    <div class="section-icon">
                        <i class="fa-solid fa-lock"></i>
                    </div>

                    <h2>Change Password</h2>
                </div>

                <div class="form-row">

                    <div class="form-group">
                        <label for="currentPassword">
                            Current Password
                        </label>

                        <input type="password"
                               id="currentPassword"
                               placeholder="Enter current password">
                    </div>

                    <div class="form-group">
                        <label for="newPassword">
                            New Password
                        </label>

                        <input type="password"
                               id="newPassword"
                               placeholder="Enter new password">
                    </div>

                    <div class="form-group">
                        <label for="confirmPassword">
                            Confirm Password
                        </label>

                        <input type="password"
                               id="confirmPassword"
                               placeholder="Confirm new password">
                    </div>

                </div>

                <div class="button-area">
                    <button type="button"
                            class="primary-btn"
                            onclick="updatePassword()">

                        <i class="fa-solid fa-lock"></i>
                        Update Password

                    </button>
                </div>

            </section>


            <!-- ================= BANK INFORMATION ================= -->
            <section class="settings-card">

                <div class="section-title">
                    <div class="section-icon">
                        <i class="fa-solid fa-building-columns"></i>
                    </div>

                    <h2>Bank Information</h2>
                </div>

                <div class="form-row">

                    <div class="form-group">
                        <label for="bankName">Bank Name</label>

                        <input type="text"
                               id="bankName"
                               value="XYZ Bank">
                    </div>

                    <div class="form-group">
                        <label for="branchName">Branch Name</label>

                        <input type="text"
                               id="branchName"
                               value="Main Branch">
                    </div>

                    <div class="form-group">
                        <label for="ifscCode">IFSC Code</label>

                        <input type="text"
                               id="ifscCode"
                               value="XYZB0001234">
                    </div>

                </div>


                <div class="form-row bank-second-row">

                    <div class="form-group address-group">
                        <label for="bankAddress">Address</label>

                        <input type="text"
                               id="bankAddress"
                               value="123, MG Road, Pune, Maharashtra - 411001">
                    </div>

                    <div class="form-group">
                        <label for="contactNumber">
                            Contact Number
                        </label>

                        <input type="text"
                               id="contactNumber"
                               value="020-12345678">
                    </div>

                    <div class="form-group">
                        <label for="bankEmail">Email</label>

                        <input type="email"
                               id="bankEmail"
                               value="info@xyzbank.com">
                    </div>

                </div>

                <div class="button-area">

                    <button type="button"
                            class="primary-btn"
                            onclick="saveBankInformation()">

                        <i class="fa-regular fa-floppy-disk"></i>
                        Save Changes

                    </button>

                </div>

            </section>


            <!-- ================= NOTIFICATION SETTINGS ================= -->
            <section class="settings-card notification-card">

                <div class="section-title">

                    <div class="section-icon">
                        <i class="fa-solid fa-bell"></i>
                    </div>

                    <h2>Notification Settings</h2>

                </div>


                <div class="notification-grid">

                    <!-- Customer Registration -->
                    <div class="notification-item">

                        <label class="checkbox-container">

                            <input type="checkbox"
                                   id="customerAlerts"
                                   checked>

                            <span class="custom-checkbox"></span>

                            <span class="notification-heading">
                                Customer Registration Alerts
                            </span>

                        </label>

                        <p>
                            Receive notifications for new customer
                            registrations
                        </p>

                    </div>


                    <!-- Loan -->
                    <div class="notification-item">

                        <label class="checkbox-container">

                            <input type="checkbox"
                                   id="loanAlerts"
                                   checked>

                            <span class="custom-checkbox"></span>

                            <span class="notification-heading">
                                Loan Application Alerts
                            </span>

                        </label>

                        <p>
                            Receive notifications for new loan applications
                        </p>

                    </div>


                    <!-- Transaction -->
                    <div class="notification-item">

                        <label class="checkbox-container">

                            <input type="checkbox"
                                   id="transactionAlerts"
                                   checked>

                            <span class="custom-checkbox"></span>

                            <span class="notification-heading">
                                Transaction Alerts
                            </span>

                        </label>

                        <p>
                            Receive notifications for large transactions
                        </p>

                    </div>

                </div>


                <div class="button-area">

                    <button type="button"
                            class="primary-btn"
                            onclick="saveNotificationSettings()">

                        <i class="fa-regular fa-floppy-disk"></i>
                        Save Settings

                    </button>

                </div>

            </section>


            <!-- Footer -->
            <footer class="settings-footer">
                © 2026 XYZ Bank. All rights reserved.
            </footer>

        </main>

    </div>


<!-- ================= EMAIL UPDATE POPUP ================= -->

<div id="emailUpdateModal" class="email-modal-overlay">

    <div class="email-modal">

        <button type="button"
                class="email-modal-close"
                onclick="closeEmailUpdatePopup()">
            &times;
        </button>

        <h2>Update your email?</h2>

        <p>
            Your email address will be updated for your
            administrator account.
        </p>

        <div class="email-modal-buttons">

            <button type="button"
                    class="email-cancel-btn"
                    onclick="closeEmailUpdatePopup()">
                Not now
            </button>

            <button type="button"
                    class="email-update-btn"
                    onclick="confirmEmailUpdate()">
                Update
            </button>

        </div>

    </div>
</div>
    <!-- Settings JS -->
    
    <script src="${pageContext.request.contextPath}/assets/js/admindashboard.js"></script>
    <script src="${pageContext.request.contextPath}/assets/js/setting.js"></script>


</body>
</html>