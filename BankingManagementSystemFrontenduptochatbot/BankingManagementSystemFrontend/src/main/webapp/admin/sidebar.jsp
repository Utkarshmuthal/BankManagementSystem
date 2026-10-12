<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
    String activePage = request.getParameter("activePage");
    if(activePage == null){
        activePage = "dashboard";
    }
%>

<aside class="sidebar">

    <!-- =========================
            LOGO
    ========================== -->

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

        <!-- =========================
                MENU
        ========================== -->

        <nav class="sidebar-menu">

            <a href="${pageContext.request.contextPath}/admin/dashboard.jsp"
               class="menu-item <%= "dashboard".equals(activePage) ? "active" : "" %>">

                <i class="fa-solid fa-house"></i>
                <span>Dashboard</span>

            </a>

            <a href="${pageContext.request.contextPath}/admin/customers.jsp"
               class="menu-item <%= "customers".equals(activePage) ? "active" : "" %>">

                <i class="fa-solid fa-users"></i>
                <span>Customers</span>

            </a>

            <a href="${pageContext.request.contextPath}/admin/employees.jsp"
               class="menu-item <%= "employees".equals(activePage) ? "active" : "" %>">

                <i class="fa-solid fa-user-group"></i>
                <span>Employees</span>

            </a>

            <a href="${pageContext.request.contextPath}/admin/accounts.jsp"
               class="menu-item <%= "accounts".equals(activePage) ? "active" : "" %>">

                <i class="fa-solid fa-credit-card"></i>
                <span>Accounts</span>

            </a>

            <a href="${pageContext.request.contextPath}/admin/loans.jsp"
               class="menu-item <%= "loans".equals(activePage) ? "active" : "" %>">

                <i class="fa-solid fa-sack-dollar"></i>
                <span>Loans</span>

            </a>

            <a href="${pageContext.request.contextPath}/admin/transaction.jsp"
               class="menu-item <%= "transactions".equals(activePage) ? "active" : "" %>">

                <i class="fa-solid fa-arrow-right-arrow-left"></i>
                <span>Transactions</span>

            </a>

            <a href="${pageContext.request.contextPath}/admin/report.jsp"
               class="menu-item <%= "reports".equals(activePage) ? "active" : "" %>">

                <i class="fa-solid fa-chart-pie"></i>
                <span>Reports</span>

            </a>

            <a href="${pageContext.request.contextPath}/admin/setting.jsp"
               class="menu-item <%= "settings".equals(activePage) ? "active" : "" %>">

                <i class="fa-solid fa-gear"></i>
                <span>Settings</span>

            </a>

           

        </nav>

    </div>

    <!-- =========================
            FOOTER
    ========================== -->

    <div class="sidebar-footer">

        <button class="logout-pill" id="logoutBtn">

            <i class="fa-solid fa-power-off"></i>

            <span>Logout</span>

        </button>

    </div>

</aside>