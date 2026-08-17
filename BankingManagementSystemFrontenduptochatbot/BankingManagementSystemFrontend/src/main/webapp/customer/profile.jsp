<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Profile | Bank Management System</title>

    <!-- Existing Customer Dashboard CSS -->
    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/assets/css/customerDashboard.css">

    <!-- Profile CSS -->
    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/assets/css/customer-profile.css">
          
           <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/customerNavbar.css">

    <!-- Font Awesome -->
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
          
         

</head>

<body>

<div class="app-container">

    <!-- =====================================================
         SIDEBAR
         ===================================================== -->

    <jsp:include page="sidebar.jsp">
        <jsp:param name="activePage" value="profile" />
    </jsp:include>


    <!-- =====================================================
         MAIN CONTENT
         ===================================================== -->

    <div class="main-content">

        <!-- NAVBAR -->

        <jsp:include page="navbar.jsp" />


        <!-- =================================================
             PROFILE PAGE
             ================================================= -->

        <main class="profile-page">


            <!-- =================================================
                 PAGE HEADER
                 ================================================= -->

            <div class="profile-page-header">

                <div>

                    <h1>Profile</h1>

                    <p>
                        Manage your personal information and profile details.
                    </p>

                </div>


                <button
                    type="button"
                    class="edit-profile-main-btn"
                    id="openEditProfileBtn">

                    <i class="fa-solid fa-pen"></i>

                    Edit Profile

                </button>

            </div>



            <!-- =================================================
                 PROFILE HEADER CARD
                 ================================================= -->

            <section class="profile-header-card">


                <div class="profile-header-left">


                    <!-- Profile Photo -->

                    <div class="profile-photo-wrapper">

                        <img
                            id="profileImage"
                            class="profile-photo"
                            src="${pageContext.request.contextPath}/customer/assets/images/default-profile.png"
                            alt="Profile Photo">


                        <button
                            type="button"
                            class="profile-camera-btn"
                            id="changePhotoBtn"
                            title="Change Profile Photo">

                            <i class="fa-solid fa-camera"></i>

                        </button>


                        <input
                            type="file"
                            id="profileImageInput"
                            accept="image/png,image/jpeg,image/jpg"
                            hidden>

                    </div>



                    <!-- Profile Information -->

                    <div class="profile-header-info">

                        <h2 id="profileFullName">
                            Monika Bhujbal
                        </h2>

                        <p id="profileEmail">
                            monikabhujbal2004@gmail.com
                        </p>


                        <div class="customer-id-row">

                            <span>
                                Customer ID
                            </span>

                            <strong id="profileCustomerId">
                                4
                            </strong>

                        </div>


                        <div class="active-customer-badge">

                            <span class="active-dot"></span>

                            Active Customer

                        </div>

                    </div>

                </div>


            </section>



            <!-- =================================================
                 INFORMATION GRID
                 ================================================= -->

            <div class="profile-information-grid">


                <!-- =================================================
                     PERSONAL INFORMATION
                     ================================================= -->

                <section class="profile-card">


                    <div class="profile-card-header">

                        <div class="profile-title-wrapper">

                            <div class="profile-card-icon blue-icon">

                                <i class="fa-solid fa-user"></i>

                            </div>


                            <div>

                                <h2>
                                    Personal Information
                                </h2>

                                <p>
                                    Your basic personal details
                                </p>

                            </div>

                        </div>

                    </div>



                    <div class="profile-details">


                        <!-- Full Name -->

                        <div class="profile-detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-user"></i>

                                <span>
                                    Full Name
                                </span>

                            </div>


                            <strong
                                class="detail-value"
                                id="fullName">

                                Monika Bhujbal

                            </strong>

                        </div>



                        <!-- Email -->

                        <div class="profile-detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-envelope"></i>

                                <span>
                                    Email Address
                                </span>

                            </div>


                            <strong
                                class="detail-value"
                                id="email">

                                monikabhujbal2004@gmail.com

                            </strong>

                        </div>



                        <!-- Mobile -->

                        <div class="profile-detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-phone"></i>

                                <span>
                                    Mobile Number
                                </span>

                            </div>


                            <strong
                                class="detail-value"
                                id="mobile">

                                8830931294

                            </strong>

                        </div>



                        <!-- DOB -->

                        <div class="profile-detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-calendar"></i>

                                <span>
                                    Date of Birth
                                </span>

                            </div>


                            <strong
                                class="detail-value"
                                id="dob">

                                05 August 2004

                            </strong>

                        </div>



                        <!-- Gender -->

                        <div class="profile-detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-venus-mars"></i>

                                <span>
                                    Gender
                                </span>

                            </div>


                            <strong
                                class="detail-value"
                                id="gender">

                                Female

                            </strong>

                        </div>

                    </div>

                </section>



                <!-- =================================================
                     KYC INFORMATION
                     ================================================= -->

                <section class="profile-card">


                    <div class="profile-card-header">

                        <div class="profile-title-wrapper">

                            <div class="profile-card-icon green-icon">

                                <i class="fa-solid fa-shield-halved"></i>

                            </div>


                            <div>

                                <h2>
                                    KYC Information
                                </h2>

                                <p>
                                    Your verification details
                                </p>

                            </div>

                        </div>

                    </div>



                    <div class="profile-details">


                        <!-- Aadhaar -->

                        <div class="profile-detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-id-card"></i>

                                <span>
                                    Aadhaar Number
                                </span>

                            </div>


                            <strong
                                class="detail-value"
                                id="aadhaarNumber">

                                526398281870

                            </strong>

                        </div>



                        <!-- PAN -->

                        <div class="profile-detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-address-card"></i>

                                <span>
                                    PAN Number
                                </span>

                            </div>


                            <strong
                                class="detail-value"
                                id="panNumber">

                                FFSPB1269G

                            </strong>

                        </div>



                        <!-- KYC Status -->

                        <div class="profile-detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-circle-check"></i>

                                <span>
                                    KYC Status
                                </span>

                            </div>


                            <span
                                class="kyc-approved"
                                id="kycStatus">

                                <i class="fa-solid fa-check"></i>

                                APPROVED

                            </span>

                        </div>

                    </div>

                </section>



                <!-- =================================================
                     ADDRESS INFORMATION
                     ================================================= -->

                <section class="profile-card">


                    <div class="profile-card-header">

                        <div class="profile-title-wrapper">

                            <div class="profile-card-icon purple-icon">

                                <i class="fa-solid fa-location-dot"></i>

                            </div>


                            <div>

                                <h2>
                                    Address Information
                                </h2>

                                <p>
                                    Your residential address
                                </p>

                            </div>

                        </div>

                    </div>



                    <div class="profile-details">


                        <!-- Address -->

                        <div class="profile-detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-house"></i>

                                <span>
                                    Address
                                </span>

                            </div>


                            <strong
                                class="detail-value"
                                id="address">

                                shantinagar colony

                            </strong>

                        </div>



                        <!-- City -->

                        <div class="profile-detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-city"></i>

                                <span>
                                    City
                                </span>

                            </div>


                            <strong
                                class="detail-value"
                                id="city">

                                kannad

                            </strong>

                        </div>



                        <!-- State -->

                        <div class="profile-detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-map"></i>

                                <span>
                                    State
                                </span>

                            </div>


                            <strong
                                class="detail-value"
                                id="state">

                                Maharashtra

                            </strong>

                        </div>



                        <!-- PIN -->

                        <div class="profile-detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-location-crosshairs"></i>

                                <span>
                                    PIN Code
                                </span>

                            </div>


                            <strong
                                class="detail-value"
                                id="pinCode">

                                431103

                            </strong>

                        </div>

                    </div>

                </section>



                <!-- =================================================
                     ACCOUNT INFORMATION
                     ================================================= -->

                <section class="profile-card">


                    <div class="profile-card-header">

                        <div class="profile-title-wrapper">

                            <div class="profile-card-icon orange-icon">

                                <i class="fa-solid fa-building-columns"></i>

                            </div>


                            <div>

                                <h2>
                                    Account Information
                                </h2>

                                <p>
                                    Your banking account
                                </p>

                            </div>

                        </div>

                    </div>



                    <div class="profile-details">


                        <div class="profile-detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-credit-card"></i>

                                <span>
                                    Account Number
                                </span>

                            </div>


                            <strong class="detail-value">
                                9091945426
                            </strong>

                        </div>



                        <div class="profile-detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-building-columns"></i>

                                <span>
                                    Account Type
                                </span>

                            </div>


                            <strong class="detail-value">
                                Savings
                            </strong>

                        </div>



                        <div class="profile-detail-row">

                            <div class="detail-label">

                                <i class="fa-solid fa-circle-check"></i>

                                <span>
                                    Account Status
                                </span>

                            </div>


                            <span class="account-active">

                                <i class="fa-solid fa-circle"></i>

                                ACTIVE

                            </span>

                        </div>

                    </div>

                </section>

            </div>



        </main>

    </div>

</div>



<!-- =============================================================
     EDIT PROFILE POPUP
     ============================================================= -->

<div class="profile-modal"
     id="editProfileModal">


    <div class="profile-modal-overlay"
         id="modalOverlay">
    </div>


    <div class="profile-modal-panel">


        <!-- =================================================
             MODAL HEADER
             ================================================= -->

        <div class="modal-header">

            <div>

                <h2>
                    Edit Profile
                </h2>

                <p>
                    Update your personal and address information.
                </p>

            </div>


            <button
                type="button"
                class="modal-close-btn"
                id="closeEditProfileBtn">

                <i class="fa-solid fa-xmark"></i>

            </button>

        </div>



        <!-- =================================================
             MODAL BODY
             ================================================= -->

        <div class="modal-body">


            <form id="editProfileForm">


                <!-- =================================================
                     PERSONAL INFORMATION
                     ================================================= -->

                <div class="edit-section">


                    <div class="edit-section-heading">

                        <i class="fa-solid fa-user"></i>

                        <span>
                            Personal Information
                        </span>

                    </div>



                    <div class="edit-form-grid">


                        <!-- Full Name -->

                        <div class="form-group">

                            <label for="editFullName">
                                Full Name
                            </label>

                            <div class="input-container">

                                <i class="fa-solid fa-user"></i>

                                <input
                                    type="text"
                                    id="editFullName"
                                    name="fullName"
                                    placeholder="Enter full name">

                            </div>

                        </div>



                        <!-- Email -->

                        <div class="form-group">

                            <label for="editEmail">
                                Email Address
                            </label>

                            <div class="input-container">

                                <i class="fa-solid fa-envelope"></i>

                                <input
                                    type="email"
                                    id="editEmail"
                                    name="email"
                                    placeholder="Enter email">

                            </div>

                        </div>



                        <!-- Mobile -->

                        <div class="form-group">

                            <label for="editMobile">
                                Mobile Number
                            </label>

                            <div class="input-container">

                                <i class="fa-solid fa-phone"></i>

                                <input
                                    type="tel"
                                    id="editMobile"
                                    name="mobileNumber"
                                    maxlength="10"
                                    placeholder="Enter mobile number">

                            </div>

                        </div>



                        <!-- DOB -->

                        <div class="form-group">

                            <label for="editDob">
                                Date of Birth
                            </label>

                            <div class="input-container">

                                <i class="fa-solid fa-calendar"></i>

                                <input
                                    type="date"
                                    id="editDob"
                                    name="dob">

                            </div>

                        </div>



                        <!-- Gender -->

                        <div class="form-group full-width">

                            <label for="editGender">
                                Gender
                            </label>

                            <div class="input-container">

                                <i class="fa-solid fa-venus-mars"></i>

                                <select
                                    id="editGender"
                                    name="gender">

                                    <option value="">
                                        Select Gender
                                    </option>

                                    <option value="Female">
                                        Female
                                    </option>

                                    <option value="Male">
                                        Male
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>

                </div>



                <!-- =================================================
                     ADDRESS INFORMATION
                     ================================================= -->

                <div class="edit-section">


                    <div class="edit-section-heading">

                        <i class="fa-solid fa-location-dot"></i>

                        <span>
                            Address Information
                        </span>

                    </div>



                    <div class="edit-form-grid">


                        <!-- Address -->

                        <div class="form-group full-width">

                            <label for="editAddress">
                                Address
                            </label>

                            <div class="input-container">

                                <i class="fa-solid fa-house"></i>

                                <input
                                    type="text"
                                    id="editAddress"
                                    name="address"
                                    placeholder="Enter address">

                            </div>

                        </div>



                        <!-- City -->

                        <div class="form-group">

                            <label for="editCity">
                                City
                            </label>

                            <div class="input-container">

                                <i class="fa-solid fa-city"></i>

                                <input
                                    type="text"
                                    id="editCity"
                                    name="city"
                                    placeholder="Enter city">

                            </div>

                        </div>



                        <!-- State -->

                        <div class="form-group">

                            <label for="editState">
                                State
                            </label>

                            <div class="input-container">

                                <i class="fa-solid fa-map"></i>

                                <input
                                    type="text"
                                    id="editState"
                                    name="state"
                                    placeholder="Enter state">

                            </div>

                        </div>



                        <!-- PIN -->

                        <div class="form-group">

                            <label for="editPinCode">
                                PIN Code
                            </label>

                            <div class="input-container">

                                <i class="fa-solid fa-location-crosshairs"></i>

                                <input
                                    type="text"
                                    id="editPinCode"
                                    name="pinCode"
                                    maxlength="6"
                                    placeholder="Enter PIN code">

                            </div>

                        </div>

                    </div>

                </div>



                <!-- =================================================
                     KYC NOTICE
                     ================================================= -->

                <div class="kyc-edit-notice">

                    <div class="kyc-notice-icon">

                        <i class="fa-solid fa-shield-halved"></i>

                    </div>


                    <div>

                        <strong>
                            KYC information cannot be edited
                        </strong>

                        <p>
                            Aadhaar, PAN and KYC status are verified
                            banking information and cannot be changed.
                        </p>

                    </div>

                </div>


            </form>

        </div>



        <!-- =================================================
             MODAL FOOTER
             ================================================= -->

        <div class="modal-footer">


            <button
                type="button"
                class="cancel-btn"
                id="cancelEditProfileBtn">

                Cancel

            </button>


            <button
                type="button"
                class="save-profile-btn"
                id="saveProfileBtn">

                <i class="fa-solid fa-check"></i>

                Save Changes

            </button>

        </div>

    </div>

</div>



<!-- =============================================================
     PROFILE JAVASCRIPT
     ============================================================= -->

<script
    src="${pageContext.request.contextPath}/assets/js/customer-profile.js">
</script>


</body>
</html>