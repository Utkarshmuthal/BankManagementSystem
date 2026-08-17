<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Management - Bank Management System</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/admindashboard.css">
</head>
<body>

    <div class="app-container">
        
        <!-- INCLUDE REUSABLE SIDEBAR WITH 'employees' ACTIVE PARAMETER -->
        <jsp:include page="sidebar.jsp">
            <jsp:param name="activePage" value="employees" />
        </jsp:include>

        <!-- MAIN WRAPPER -->
        <div class="main-wrapper">
            
            <!-- INCLUDE REUSABLE NAVBAR WITH SEARCH BAR ENABLED -->
            <jsp:include page="navbar.jsp">
                <jsp:param name="pageTitle" value="Employee Management" />
                <jsp:param name="showSearch" value="true" />
            </jsp:include>

            <!-- PAGE CONTENT CONTAINER -->
            <main class="content-container">
                
                <!-- EMPLOYEE STATS CARDS GRID -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon-wrapper" style="background:#1877f2; color:#ffffff; font-size: 24px;">
                            <i class="fa-solid fa-users-gear"></i>
                        </div>
                        <div class="stat-info">
                            <h4>Total Employees</h4>
                            <div class="stat-number" id="stat-total-employees">0</div>
                            <div class="stat-subtext">Total Registered</div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon-wrapper" style="background:#10b981; color:#ffffff; font-size: 24px;">
                            <i class="fa-solid fa-user-check"></i>
                        </div>
                        <div class="stat-info">
                            <h4>Active Employees</h4>
                            <div class="stat-number" id="stat-active-employees">0</div>
                            <div class="stat-subtext">Currently Active</div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon-wrapper" style="background:#f97316; color:#ffffff; font-size: 24px;">
                            <i class="fa-solid fa-user-xmark"></i>
                        </div>
                        <div class="stat-info">
                            <h4>Inactive Employees</h4>
                            <div class="stat-number" id="stat-inactive-employees">0</div>
                            <div class="stat-subtext">Inactive Staff</div>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon-wrapper" style="background:#8b5cf6; color:#ffffff; font-size: 24px;">
                            <i class="fa-solid fa-code-branch"></i>
                        </div>
                        <div class="stat-info">
                            <h4>Total Branches</h4>
                            <div class="stat-number" id="stat-total-branches">0</div>
                            <div class="stat-subtext">Bank Branches</div>
                        </div>
                    </div>
                </div>

                <!-- EMPLOYEES TABLE CARD -->
                <div class="table-card">
                    <div class="table-header-tools">
                        <h3 class="table-title">Employees List</h3>
                        
                        <div class="tools-right">
                            <div class="search-bar" style="width:240px;">
                                <i class="fa-solid fa-magnifying-glass"></i>
                                <input type="text" placeholder="Search employee..." onkeyup="filterEmployeesTable(this.value)">
                            </div>
                            <button class="btn-filter" onclick="fetchEmployees()">
                                <i class="fa-solid fa-rotate"></i> Refresh
                            </button>
                            <button class="btn-add" onclick="openAddEmployeeModal()">
                                <i class="fa-solid fa-plus"></i> Add Employee
                            </button>
                        </div>
                    </div>

                    <!-- DATA TABLE -->
                    <div class="data-table-wrapper">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Employee Code</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Designation</th>
                                    <th>Branch</th>
                                    <th>Salary</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="employee-table-body">
                                <tr>
                                    <td colspan="10" style="text-align: center; padding: 24px; color: #64748b;">
                                        <i class="fa-solid fa-spinner fa-spin"></i> Loading data from REST API...
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="table-footer">
                        <span id="showing-count">Showing 0 Employees</span>
                    </div>
                </div>

            </main>
        </div>
    </div>

    <!-- ==================== ADD / EDIT EMPLOYEE POPUP FORM MODAL ==================== -->
    <div id="employee-modal" class="modal-overlay">
        <div class="modal-card">
            <div class="modal-header">
                <h3 id="modal-title"><i class="fa-solid fa-user-plus"></i> Add New Employee</h3>
                <button type="button" class="modal-close-btn" onclick="closeEmployeeModal()">&times;</button>
            </div>

            <form id="employee-form" onsubmit="handleSaveEmployee(event)">
                <div class="modal-body">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="firstName">First Name <span class="text-danger">*</span></label>
                            <input type="text" id="firstName" placeholder="Rahul" required>
                        </div>
                        <div class="form-group">
                            <label for="lastName">Last Name <span class="text-danger">*</span></label>
                            <input type="text" id="lastName" placeholder="Sharma" required>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="email">Email Address <span class="text-danger">*</span></label>
                            <input type="email" id="email" placeholder="rahul@gmail.com" required>
                        </div>
                        <div class="form-group" id="password-group">
                            <label for="password">Password <span class="text-danger">*</span></label>
                            <input type="password" id="password" placeholder="••••••••" required>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="mobile">Mobile Number <span class="text-danger">*</span></label>
                            <input type="tel" id="mobile" placeholder="9876543210" required pattern="[0-9]{10}">
                        </div>
                        <div class="form-group">
                            <label for="designation">Designation <span class="text-danger">*</span></label>
                            <select id="designation" required>
                                <option value="">Select Designation</option>
                                <option value="Branch Manager">Branch Manager</option>
                                <option value="Senior Officer">Senior Officer</option>
                                <option value="Accountant">Accountant</option>
                                <option value="Cashier">Cashier</option>
                                <option value="Teller">Teller</option>
                                <option value="Loan Officer">Loan Officer</option>
                                <option value="Customer Support">Customer Support</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="salary">Salary (₹) <span class="text-danger">*</span></label>
                            <input type="number" id="salary" placeholder="25000" min="0" step="500" required>
                        </div>
                        <div class="form-group">
                            <label for="branch">Branch Name <span class="text-danger">*</span></label>
                            <select id="branch" required>
                                <option value="">Select Branch</option>
                                <option value="Pune">Pune Branch</option>
                                <option value="Mumbai">Mumbai Branch</option>
                                <option value="Nashik">Nashik Branch</option>
                                <option value="Aurangabad">Aurangabad Branch</option>
                                <option value="Nagpur">Nagpur Branch</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="closeEmployeeModal()">Cancel</button>
                    <button type="submit" id="btn-save-employee" class="btn btn-primary">
                        <i class="fa-solid fa-check"></i> Save Employee
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Custom JS -->
    <script src="${pageContext.request.contextPath}/assets/js/admindashboard.js"></script>
</body>
</html>