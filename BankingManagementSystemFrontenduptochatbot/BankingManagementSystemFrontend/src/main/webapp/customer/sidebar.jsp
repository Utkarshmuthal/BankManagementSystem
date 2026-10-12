<%@ page contentType="text/html;charset=UTF-8" %>
<%
    // Used to highlight the active sidebar link.
    String currentPage = request.getServletPath();
    if (currentPage == null) currentPage = "";
%>
<!-- ================= SIDEBAR ================= -->
<aside class="sidebar" id="sidebar">
    <div class="sidebar-brand">
        <svg class="brand-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2 2 7v2h20V7L12 2zM4 10v9H2v2h20v-2h-2v-9h-2v9h-3v-9h-2v9h-2v-9H9v9H6v-9H4z"/>
        </svg>
        <div class="brand-text">
            <span class="brand-title">BANK</span>
            <span class="brand-subtitle">MANAGEMENT SYSTEM</span>
        </div>
    </div>

    <nav class="sidebar-nav">
        <a href="${pageContext.request.contextPath}/customer/dashboard.jsp"
           class="nav-link <%= currentPage.contains("dashboard.jsp") ? "active" : "" %>">
            <i class="fa-solid fa-house"></i><span>Dashboard</span>
        </a>
        <a href="${pageContext.request.contextPath}/customer/myAccount.jsp"
           class="nav-link <%= currentPage.contains("myAccount.jsp") ? "active" : "" %>">
            <i class="fa-solid fa-user"></i><span>My Account</span>
        </a>
        
        <a href="${pageContext.request.contextPath}/customer/transactionHistory.jsp"
           class="nav-link <%= currentPage.contains("transactionHistory.jsp") ? "active" : "" %>">
            <i class="fa-solid fa-clipboard-list"></i><span>Transaction History</span>
        </a>
        <a href="${pageContext.request.contextPath}/customer/loan.jsp"
           class="nav-link <%= currentPage.contains("loan.jsp") ? "active" : "" %>">
            <i class="fa-solid fa-sack-dollar"></i><span>Loan</span>
        </a>
        <a href="${pageContext.request.contextPath}/customer/profile.jsp"
           class="nav-link <%= currentPage.contains("profile.jsp") ? "active" : "" %>">
            <i class="fa-solid fa-circle-user"></i><span>Profile</span>
        </a>
    </nav>

    <div class="sidebar-footer">
        <a href="javascript:void(0);" 
   class="nav-link logout-link" 
   id="logoutBtn">
    <i class="fa-solid fa-right-from-bracket"></i>
    <span>Logout</span>
</a>
    </div>
</aside>
<!-- ================= END SIDEBAR ================= -->
