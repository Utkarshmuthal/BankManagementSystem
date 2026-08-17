<%@ page language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
        content="width=device-width, initial-scale=1.0">

    <title>Customer Details</title>


    <!-- Customer Details CSS -->
    <link rel="stylesheet"
        href="${pageContext.request.contextPath}/assets/css/CustomerField-details.css">


    <!-- Font Awesome -->
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

</head>


<body>


<!-- =========================================================
     MAIN LAYOUT
========================================================= -->

<div class="layout">


    <!-- =====================================================
         SIDEBAR
    ====================================================== -->

    <jsp:include page="sidebar.jsp"/>


    <!-- =====================================================
         MAIN CONTENT
    ====================================================== -->

    <div class="main-content">


        <!-- =================================================
             NAVBAR
        ================================================== -->

        <jsp:include page="navbar.jsp"/>


        <!-- =================================================
             CUSTOMER DETAILS PAGE
        ================================================== -->

        <main class="customer-details-page">


            <!-- =================================================
                 PAGE HEADER
            ================================================== -->

            <section class="details-header">

                <div class="header-left">

                    <button
                        type="button"
                        class="back-btn"
                        onclick="goBack()">

                        <i class="fa-solid fa-arrow-left"></i>

                        Back to Customers

                    </button>


                    <div class="title-section">

                        <div class="title-icon">

                            <i class="fa-solid fa-user"></i>

                        </div>

                        <div>

                            <h1>Customer Details</h1>

                            <p>
                                View customer and account information
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            <!-- =================================================
                 LOADING
            ================================================== -->

            <div id="loading"
                 class="loading-container">

                <div class="loader"></div>

                <p>Loading customer details...</p>

            </div>


            <!-- =================================================
                 ERROR
            ================================================== -->

            <div id="errorMessage"
                 class="error-message"
                 style="display:none;">

            </div>


            <!-- =================================================
                 CUSTOMER DETAILS
            ================================================== -->

            <div id="customerDetails"
                 class="customer-details-grid"
                 style="display:none;">


                <!-- =================================================
                     CUSTOMER INFORMATION
                ================================================== -->

                <section class="details-card customer-card">


                    <div class="card-header">

                        <div class="card-header-icon customer-icon">

                            <i class="fa-solid fa-user"></i>

                        </div>

                        <div>

                            <h2>Customer Information</h2>

                            <span>
                                Personal information
                            </span>

                        </div>

                    </div>


                    <div class="details-content">


                        <!-- Customer ID -->

                        <div class="detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-id-card"></i>

                                <span>Customer ID</span>

                            </div>

                            <div class="detail-value"
                                 id="customerId">

                                -

                            </div>

                        </div>


                        <!-- Full Name -->

                        <div class="detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-user"></i>

                                <span>Full Name</span>

                            </div>

                            <div class="detail-value"
                                 id="fullName">

                                -

                            </div>

                        </div>


                        <!-- Date of Birth -->

                        <div class="detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-calendar"></i>

                                <span>Date of Birth</span>

                            </div>

                            <div class="detail-value"
                                 id="dob">

                                -

                            </div>

                        </div>


                        <!-- Gender -->

                        <div class="detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-venus-mars"></i>

                                <span>Gender</span>

                            </div>

                            <div class="detail-value"
                                 id="gender">

                                -

                            </div>

                        </div>


                        <!-- Mobile -->

                        <div class="detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-phone"></i>

                                <span>Mobile Number</span>

                            </div>

                            <div class="detail-value"
                                 id="mobile">

                                -

                            </div>

                        </div>


                        <!-- Email -->

                        <div class="detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-envelope"></i>

                                <span>Email Address</span>

                            </div>

                            <div class="detail-value"
                                 id="email">

                                -

                            </div>

                        </div>


                        <!-- Address -->

                        <div class="detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-location-dot"></i>

                                <span>Address</span>

                            </div>

                            <div class="detail-value"
                                 id="address">

                                -

                            </div>

                        </div>


                        <!-- City -->

                        <div class="detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-city"></i>

                                <span>City</span>

                            </div>

                            <div class="detail-value"
                                 id="city">

                                -

                            </div>

                        </div>


                        <!-- State -->

                        <div class="detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-map"></i>

                                <span>State</span>

                            </div>

                            <div class="detail-value"
                                 id="state">

                                -

                            </div>

                        </div>


                        <!-- PIN Code -->

                        <div class="detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-location-crosshairs"></i>

                                <span>PIN Code</span>

                            </div>

                            <div class="detail-value"
                                 id="pinCode">

                                -

                            </div>

                        </div>


                    </div>

                </section>



                <!-- =================================================
                     ACCOUNT INFORMATION
                ================================================== -->

                <section class="details-card account-card">


                    <div class="card-header">

                        <div class="card-header-icon account-icon">

                            <i class="fa-solid fa-building-columns"></i>

                        </div>

                        <div>

                            <h2>Account Information</h2>

                            <span>
                                Banking account information
                            </span>

                        </div>

                    </div>


                    <div class="details-content">


                        <!-- Account Number -->

                        <div class="detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-credit-card"></i>

                                <span>Account Number</span>

                            </div>

                            <div class="detail-value account-number"
                                 id="accountNumber">

                                -

                            </div>

                        </div>


                        <!-- Account Type -->

                        <div class="detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-wallet"></i>

                                <span>Account Type</span>

                            </div>

                            <div class="detail-value">

                                <span id="accountType"
                                      class="account-type-badge">

                                    -

                                </span>

                            </div>

                        </div>


                        <!-- Account Status -->

                        <div class="detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-circle-check"></i>

                                <span>Account Status</span>

                            </div>

                            <div class="detail-value">

                                <span id="accountStatus"
                                      class="status-badge">

                                    -

                                </span>

                            </div>

                        </div>


                        <!-- Opening Date -->

                        <div class="detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-calendar-days"></i>

                                <span>Opening Date</span>

                            </div>

                            <div class="detail-value"
                                 id="openingDate">

                                -

                            </div>

                        </div>


                        <!-- Balance -->

                        <div class="detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-indian-rupee-sign"></i>

                                <span>Account Balance</span>

                            </div>

                            <div class="detail-value balance-value"
                                 id="balance">

                                ₹ 0.00

                            </div>

                        </div>


                    </div>

                </section>



                <!-- =================================================
                     KYC INFORMATION
                ================================================== -->

                <section class="details-card kyc-card">


                    <div class="card-header">

                        <div class="card-header-icon kyc-icon">

                            <i class="fa-solid fa-shield-halved"></i>

                        </div>

                        <div>

                            <h2>KYC Information</h2>

                            <span>
                                Customer verification information
                            </span>

                        </div>

                    </div>


                    <div class="details-content kyc-content">


                        <!-- Aadhaar -->

                        <div class="detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-id-card"></i>

                                <span>Aadhaar Number</span>

                            </div>

                            <div class="detail-value"
                                 id="aadhaarNumber">

                                -

                            </div>

                        </div>


                        <!-- PAN -->

                        <div class="detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-address-card"></i>

                                <span>PAN Number</span>

                            </div>

                            <div class="detail-value"
                                 id="panNumber">

                                -

                            </div>

                        </div>


                        <!-- KYC Status -->

                        <div class="detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-shield-check"></i>

                                <span>KYC Status</span>

                            </div>

                            <div class="detail-value">

                                <span id="kycStatus"
                                      class="badge verified">

                                    Verified

                                </span>

                            </div>

                        </div>


                    </div>

                </section>



                <!-- =================================================
                     STATUS MESSAGE
                ================================================== -->

                <div class="status-message"
                     id="statusMessage">

                    <div class="status-message-icon">

                        <i class="fa-solid fa-circle-info"></i>

                    </div>

                    <span id="statusMessageText">

                        Customer account information.

                    </span>

                </div>


            </div>


        </main>

    </div>

</div>


<!-- =========================================================
     CONTEXT PATH
========================================================= -->

<script>

    const CONTEXT_PATH =
        "${pageContext.request.contextPath}";

</script>


<!-- =========================================================
     CUSTOMER DETAILS JS
========================================================= -->

<script
    src="${pageContext.request.contextPath}/assets/js/CustomerField-details.js">
</script>


</body>

</html>