<%@ page contentType="text/html;charset=UTF-8" %>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Employee Profile | Bank Management System</title>


    <!-- =====================================================
         COMMON EMPLOYEE CSS
         Sidebar + Navbar + Layout + Dashboard styles
         ===================================================== -->
         <!-- Font Awesome Icons -->
<link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/assets/css/empDashboard.css">


    <!-- =====================================================
         PROFILE PAGE CSS
         Profile-specific styles only
         ===================================================== -->

    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/assets/css/employee-profile.css">

</head>


<body>


<!-- =========================================================
     MAIN EMPLOYEE LAYOUT

     IMPORTANT:
     empdashboard.css expects sidebar and main-content
     inside .layout
     ========================================================= -->

<div class="layout">


    <!-- =====================================================
         COMMON SIDEBAR
         ===================================================== -->

    <jsp:include page="sidebar.jsp" />


    <!-- =====================================================
         MAIN CONTENT AREA
         ===================================================== -->

    <div class="main-content">


        <!-- =================================================
             COMMON NAVBAR
             ================================================= -->

        <jsp:include page="navbar.jsp" />


        <!-- =================================================
             PROFILE PAGE CONTENT
             ================================================= -->

        <main class="employee-profile-page">


            <!-- =================================================
                 PAGE HEADER
                 ================================================= -->

            <div class="profile-page-header">

                <div>

                    <h1>My Profile</h1>

                    <p>
                        Manage your personal and employee information
                    </p>

                </div>


                <div class="profile-breadcrumb">

                    <span>Dashboard</span>

                    <span>›</span>

                    <strong>Profile</strong>

                </div>

            </div>



            <!-- =================================================
                 PROFILE HEADER CARD
                 ================================================= -->

            <section class="profile-header-card">


                <!-- PROFILE PHOTO -->

                <div class="profile-photo-section">

                    <div class="profile-photo-wrapper">

                        <img id="profileImage"
                             src="${pageContext.request.contextPath}/assets/images/default-profile.png"
                             alt="Employee Profile Photo">

                    </div>


                    <button type="button"
                            class="change-photo-btn"
                            id="changePhotoBtn">

                        <span>📷</span>

                        Change Photo

                    </button>

                </div>



                <!-- PROFILE BASIC INFORMATION -->

                <div class="profile-basic-info">

                    <h2 id="employeeFullName">
                        Loading...
                    </h2>


                    <span class="employee-id">

                        Employee ID:

                        <strong id="employeeId">-</strong>

                    </span>


                    <div class="profile-basic-row">

                        <span>💼</span>

                        <span id="employeeDesignation">
                            Loading...
                        </span>

                    </div>


                    <div class="profile-basic-row">

                        <span>📍</span>

                        <span id="employeeBranch">
                            Loading...
                        </span>

                    </div>


                    <div class="profile-basic-row">

                        <span class="active-dot"></span>

                        <span id="employeeStatus">
                            Loading...
                        </span>

                    </div>

                </div>

            </section>



            <!-- =================================================
                 PROFILE INFORMATION GRID
                 ================================================= -->

            <div class="profile-grid">


                <!-- =================================================
                     PERSONAL INFORMATION
                     ================================================= -->

                <section class="profile-card">


                    <div class="profile-card-header">


                        <div class="card-title-area">

                            <div class="card-icon blue">
                                👤
                            </div>

                            <div>

                                <h3>
                                    Personal Information
                                </h3>

                                <p>
                                    Your personal details
                                </p>

                            </div>

                        </div>


                        <button type="button"
                                class="edit-btn"
                                id="editProfileBtn">

                            ✎ Edit Profile

                        </button>

                    </div>



                    <div class="profile-details">


                        <div class="detail-item">

                            <span class="detail-label">
                                First Name
                            </span>

                            <span class="detail-value"
                                  id="firstName">
                                -
                            </span>

                        </div>


                        <div class="detail-item">

                            <span class="detail-label">
                                Last Name
                            </span>

                            <span class="detail-value"
                                  id="lastName">
                                -
                            </span>

                        </div>


                        <div class="detail-item">

                            <span class="detail-label">
                                Mobile Number
                            </span>

                            <span class="detail-value"
                                  id="mobile">
                                -
                            </span>

                        </div>


                        <div class="detail-item">

                            <span class="detail-label">
                                Email
                            </span>

                            <span class="detail-value"
                                  id="email">
                                -
                            </span>

                        </div>


                    </div>

                </section>



                <!-- =================================================
                     EMPLOYMENT INFORMATION
                     ================================================= -->

                <section class="profile-card">


                    <div class="profile-card-header">


                        <div class="card-title-area">

                            <div class="card-icon green">
                                💼
                            </div>

                            <div>

                                <h3>
                                    Employment Details
                                </h3>

                                <p>
                                    Your official employment information
                                </p>

                            </div>

                        </div>

                    </div>



                    <div class="profile-details">


                        <div class="detail-item">

                            <span class="detail-label">
                                Employee ID
                            </span>

                            <span class="detail-value"
                                  id="employmentEmployeeId">
                                -
                            </span>

                        </div>


                        <div class="detail-item">

                            <span class="detail-label">
                                Designation
                            </span>

                            <span class="detail-value"
                                  id="designation">
                                -
                            </span>

                        </div>


                        <div class="detail-item">

                            <span class="detail-label">
                                Branch
                            </span>

                            <span class="detail-value"
                                  id="branch">
                                -
                            </span>

                        </div>


                        <div class="detail-item">

                            <span class="detail-label">
                                Salary
                            </span>

                            <span class="detail-value"
                                  id="salary">
                                -
                            </span>

                        </div>


                    </div>

                </section>



                <!-- =================================================
                     ACCOUNT INFORMATION
                     ================================================= -->

                <section class="profile-card">


                    <div class="profile-card-header">


                        <div class="card-title-area">

                            <div class="card-icon purple">
                                🔐
                            </div>

                            <div>

                                <h3>
                                    Account Information
                                </h3>

                                <p>
                                    Your system account information
                                </p>

                            </div>

                        </div>

                    </div>



                    <div class="profile-details">


                        <div class="detail-item">

                            <span class="detail-label">
                                User ID
                            </span>

                            <span class="detail-value"
                                  id="userId">
                                -
                            </span>

                        </div>


                        <div class="detail-item">

                            <span class="detail-label">
                                Email
                            </span>

                            <span class="detail-value"
                                  id="accountEmail">
                                -
                            </span>

                        </div>


                        <div class="detail-item">

                            <span class="detail-label">
                                Role
                            </span>

                            <span class="detail-value"
                                  id="role">
                                -
                            </span>

                        </div>


                        <div class="detail-item">

                            <span class="detail-label">
                                Account Status
                            </span>

                            <span class="detail-value status-active"
                                  id="accountStatus">
                                -
                            </span>

                        </div>


                    </div>

                </section>


            </div>


        </main>


    </div>

</div>



<!-- =========================================================
     EDIT PROFILE MODAL
     ========================================================= -->

<div class="profile-modal-overlay"
     id="editProfileModal">


    <div class="profile-modal">


        <!-- MODAL HEADER -->

        <div class="modal-header">

            <div>

                <h2>
                    Edit Profile
                </h2>

                <p>
                    Update your personal information
                </p>

            </div>


            <button type="button"
                    class="modal-close"
                    id="closeEditModal">

                ×

            </button>

        </div>



        <!-- FORM -->

        <form id="editProfileForm">


            <!-- FIRST NAME -->

            <div class="form-group">

                <label for="editFirstName">
                    First Name
                </label>

                <input type="text"
                       id="editFirstName"
                       name="firstName"
                       maxlength="50"
                       required>

            </div>



            <!-- LAST NAME -->

            <div class="form-group">

                <label for="editLastName">
                    Last Name
                </label>

                <input type="text"
                       id="editLastName"
                       name="lastName"
                       maxlength="50"
                       required>

            </div>



            <!-- MOBILE -->

            <div class="form-group">

                <label for="editMobile">
                    Mobile Number
                </label>

                <input type="text"
                       id="editMobile"
                       name="mobile"
                       maxlength="15"
                       required>

            </div>



            <!-- SECURITY NOTE -->

            <div class="profile-security-note">

                <span>🔒</span>

                <p>
                    Branch, designation and salary
                    can only be changed by an administrator.
                </p>

            </div>



            <!-- ACTION BUTTONS -->

            <div class="modal-actions">

                <button type="button"
                        class="cancel-btn"
                        id="cancelEditBtn">

                    Cancel

                </button>


                <button type="submit"
                        class="save-btn"
                        id="saveProfileBtn">

                    Save Changes

                </button>

            </div>


        </form>


    </div>

</div>



<!-- =========================================================
     CHANGE PROFILE PHOTO MODAL
     ========================================================= -->

<div class="profile-modal-overlay"
     id="photoModal">


    <div class="profile-modal photo-modal">


        <!-- MODAL HEADER -->

        <div class="modal-header">

            <div>

                <h2>
                    Change Profile Photo
                </h2>

                <p>
                    Upload your new profile picture
                </p>

            </div>


            <button type="button"
                    class="modal-close"
                    id="closePhotoModal">

                ×

            </button>

        </div>



        <!-- PHOTO UPLOAD -->

        <div class="photo-upload-area">


            <div class="photo-preview-wrapper">

                <img id="photoPreview"
                     src="${pageContext.request.contextPath}/assets/images/default-profile.png"
                     alt="Photo Preview">

            </div>


            <label for="profilePhotoInput"
                   class="choose-photo-btn">

                📁 Choose Photo

            </label>


            <input type="file"
                   id="profilePhotoInput"
                   accept="image/png,image/jpeg,image/jpg"
                   hidden>


            <p class="photo-info">

                JPG, JPEG or PNG

                <br>

                Maximum size: 2 MB

            </p>


            <p id="photoError"
               class="photo-error">
            </p>


        </div>



        <!-- ACTION BUTTONS -->

        <div class="modal-actions">


            <button type="button"
                    class="cancel-btn"
                    id="cancelPhotoBtn">

                Cancel

            </button>


            <button type="button"
                    class="save-btn"
                    id="uploadPhotoBtn">

                Upload Photo

            </button>


        </div>


    </div>

</div>



<!-- =========================================================
     EMPLOYEE PROFILE JAVASCRIPT
     ========================================================= -->

<script src="${pageContext.request.contextPath}/assets/js/employee-profile.js"></script>


</body>

</html>