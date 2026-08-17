<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Registration Requests</title>


    <!-- =========================================
         COMMON / SIDEBAR CSS
    ========================================== -->


    <!-- =========================================
         REGISTRATION REQUEST CSS
    ========================================== -->

    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/assets/css/registrationRequest.css">


    <!-- =========================================
         FONT AWESOME
    ========================================== -->

    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

</head>


<body>


    <!-- =========================================
         SIDEBAR
    ========================================== -->

    <jsp:include page="sidebar.jsp"/>


    <!-- =========================================
         MAIN CONTENT
    ========================================== -->

    <div class="main-content">


        <!-- =====================================
             NAVBAR
        ====================================== -->

        <jsp:include page="navbar.jsp"/>


        <!-- =====================================
             PAGE CONTENT
        ====================================== -->

        <main class="content-area">


            <div class="request-container">


                <!-- =================================
                     HEADER
                ================================== -->

                <div class="page-header">

                    <h2>
                        Registration Requests
                    </h2>

                    <p>
                        Manage and review customer registration requests
                    </p>

                </div>


                <!-- =================================
                     DASHBOARD CARDS
                ================================== -->

                <div class="dashboard-cards">


                    <!-- Pending -->

                    <div class="dashboard-card">

                        <div class="card-icon blue">

                            <i class="fa-solid fa-file-circle-plus"></i>

                        </div>

                        <div class="card-info">

                            <h3 id="pendingCount">
                                0
                            </h3>

                            <p>
                                Pending Requests
                            </p>

                        </div>

                    </div>


                    <!-- Approved -->

                    <div class="dashboard-card">

                        <div class="card-icon green">

                            <i class="fa-solid fa-circle-check"></i>

                        </div>

                        <div class="card-info">

                            <h3 id="approvedCount">
                                0
                            </h3>

                            <p>
                                Approved Requests
                            </p>

                        </div>

                    </div>


                    <!-- Rejected -->

                    <div class="dashboard-card">

                        <div class="card-icon red">

                            <i class="fa-solid fa-circle-xmark"></i>

                        </div>

                        <div class="card-info">

                            <h3 id="rejectedCount">
                                0
                            </h3>

                            <p>
                                Rejected Requests
                            </p>

                        </div>

                    </div>


                    <!-- Total -->

                    <div class="dashboard-card">

                        <div class="card-icon orange">

                            <i class="fa-solid fa-users"></i>

                        </div>

                        <div class="card-info">

                            <h3 id="totalCount">
                                0
                            </h3>

                            <p>
                                Total Requests
                            </p>

                        </div>

                    </div>

                </div>


                <!-- =================================
                     SEARCH SECTION
                ================================== -->

                <div class="search-section">


                    <input
                        type="text"
                        id="searchKeyword"
                        placeholder="Search customer...">


                    <select id="statusFilter">

                        <option value="ALL">
                            All
                        </option>

                        <option value="PENDING_APPROVAL">
                            Pending
                        </option>

                        <option value="APPROVED">
                            Approved
                        </option>

                        <option value="REJECTED">
                            Rejected
                        </option>

                    </select>


                    <button
                        type="button"
                        id="searchBtn">

                        <i class="fa-solid fa-magnifying-glass"></i>

                        Search

                    </button>


                    <button
                        type="button"
                        id="resetBtn">

                        <i class="fa-solid fa-rotate-left"></i>

                        Reset

                    </button>

                </div>


                <!-- =================================
                     TABLE
                ================================== -->

                <div class="table-container">

                    <table>

                        <thead>

                            <tr>

                                <th>
                                    #
                                </th>

                                <th>
                                    Name
                                </th>

                                <th>
                                    Email
                                </th>

                                <th>
                                    Mobile
                                </th>

                                <th>
                                    Account Type
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody id="requestTableBody">

                        </tbody>

                    </table>

                </div>


                <!-- =================================
                     PAGINATION
                ================================== -->

                <div class="pagination">


                    <button
                        type="button"
                        id="prevBtn">

                        <i class="fa-solid fa-chevron-left"></i>

                        Previous

                    </button>


                    <span id="pageNo">
                        1
                    </span>


                    <button
                        type="button"
                        id="nextBtn">

                        Next

                        <i class="fa-solid fa-chevron-right"></i>

                    </button>

                </div>


            </div>

        </main>

    </div>


    <!-- =========================================
         REGISTRATION REQUEST JS
    ========================================== -->

    <script
        src="${pageContext.request.contextPath}/assets/js/registrationRequest.js?v=4">
    </script>


</body>

</html>