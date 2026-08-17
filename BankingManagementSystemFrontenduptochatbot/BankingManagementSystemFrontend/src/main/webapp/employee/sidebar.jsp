<%@ page contentType="text/html;charset=UTF-8" %>
<%
    // Used to highlight the active sidebar link.
    // Compares against the current servlet path, e.g. "/employee/dashboard.jsp"
    String currentPage = request.getServletPath();
    if (currentPage == null) currentPage = "";
%>
<!-- ================= SIDEBAR ================= -->
<aside class="sidebar" id="sidebar">
    <div class="sidebar-brand">
        <i class="fa-solid fa-building-columns brand-icon"></i>
        <div class="brand-text">
            <span class="brand-title">BANK</span>
            <span class="brand-subtitle">MANAGEMENT SYSTEM</span>
        </div>
    </div>

    <nav class="sidebar-nav">
        <a href="${pageContext.request.contextPath}/employee/dashboard.jsp"
           class="nav-link <%= currentPage.contains("dashboard.jsp") ? "active" : "" %>">
            <i class="fa-solid fa-house"></i><span>Dashboard</span>
        </a>
<a href="${pageContext.request.contextPath}/employee/registrationRequest.jsp"
   class="nav-link <%= (currentPage.contains("registrationRequest.jsp") || currentPage.contains("customerDetails.jsp")) ? "active" : "" %>">
    <i class="fa-solid fa-user-plus"></i>
    <span>Registration Request</span>
</a>        <a href="${pageContext.request.contextPath}/employee/customers.jsp"
           class="nav-link <%= currentPage.contains("customers.jsp") ? "active" : "" %>">
            <i class="fa-solid fa-users"></i><span>Customers</span>
        </a>
        <a href="${pageContext.request.contextPath}/employee/deposite.jsp"
           class="nav-link <%= currentPage.contains("deposite.jsp") ? "active" : "" %>">
            <i class="fa-solid fa-right-left"></i><span>Transactions</span>
        </a>
        <a href="${pageContext.request.contextPath}/employee/loans.jsp"
           class="nav-link <%= currentPage.contains("loans.jsp") ? "active" : "" %>">
            <i class="fa-solid fa-hand-holding-dollar"></i><span>Loans</span>
        </a>
        <a href="${pageContext.request.contextPath}/employee/reports.jsp"
           class="nav-link <%= currentPage.contains("reports.jsp") ? "active" : "" %>">
            <i class="fa-solid fa-chart-column"></i><span>Reports</span>
        </a>
        <a href="${pageContext.request.contextPath}/employee/profile.jsp"
           class="nav-link <%= currentPage.contains("profile.jsp") ? "active" : "" %>">
            <i class="fa-solid fa-user"></i><span>Profile</span>
        </a>
    </nav>

    <div class="sidebar-footer">
        <a href="${pageContext.request.contextPath}/logout" class="nav-link logout-link">
            <i class="fa-solid fa-right-from-bracket"></i><span>Logout</span>
        </a>
    </div>
</aside>
<!-- ================= END SIDEBAR ================= -->