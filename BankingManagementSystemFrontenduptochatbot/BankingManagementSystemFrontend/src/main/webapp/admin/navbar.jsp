<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
    String pageTitle = request.getParameter("pageTitle");
    if(pageTitle == null){
        pageTitle = "Dashboard";
    }

    String showSearch = request.getParameter("showSearch");
    boolean searchVisible = "true".equalsIgnoreCase(showSearch);
%>

<header class="topbar">

    <!-- ===========================
            LEFT SECTION
    ============================ -->

    <div class="topbar-left">

        <button class="toggle-menu-btn" type="button">
            <i class="fa-solid fa-bars"></i>
        </button>

        <h2 class="page-title">
            <%= pageTitle %>
        </h2>

    </div>

    <!-- ===========================
            RIGHT SECTION
    ============================ -->

    <div class="topbar-right">

        <% if(searchVisible){ %>

        <div class="search-bar">

            <i class="fa-solid fa-magnifying-glass"></i>

            <input
                    type="text"
                    id="employeeSearchInput"
                    placeholder="Search employee..."
                    onkeyup="if(typeof filterEmployeesTable==='function'){filterEmployeesTable(this.value);}">

        </div>

        <% } %>

        <!-- Notification -->

        <button class="icon-badge-btn" type="button">

            <i class="fa-regular fa-bell"></i>

            <span class="badge">3</span>

        </button>

        <!-- Profile -->

        <div class="user-profile-menu">

            <div class="user-avatar">

                <img
                        src="${pageContext.request.contextPath}/assets/images/admin.png"
                        alt="Admin"
                        onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">

                <i class="fa-solid fa-user-tie" style="display:none;"></i>

            </div>

            <div class="user-details">

                <span class="user-name">
                    Administrator
                </span>

                <span class="user-role">
                    Super Administrator
                </span>

            </div>

            <i class="fa-solid fa-chevron-down dropdown-icon"></i>

        </div>

    </div>

</header>