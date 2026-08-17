<%@ page contentType="text/html;charset=UTF-8" %>
<!-- ================= NAVBAR ================= -->
<header class="topbar">
    <div class="topbar-left">
        <button id="sidebarToggle" class="icon-btn" aria-label="Toggle sidebar">
            <i class="fa-solid fa-bars"></i>
        </button>
        <h1 class="page-title" id="pageTitle">Employee Dashboard</h1>
    </div>

    <div class="topbar-right">
        <button class="icon-btn notification-btn" aria-label="Notifications">
            <i class="fa-regular fa-bell"></i>
            <span class="badge" id="notificationCount">5</span>
        </button>

        <div class="profile-chip">
            <div class="avatar-circle" id="employeeAvatar">EM</div>
            <div class="profile-text">
                <span class="profile-name" id="employeeName">Employee</span>
                <span class="profile-role">Bank Employee</span>
            </div>
            <i class="fa-solid fa-chevron-down"></i>
        </div>
    </div>
</header>
<!-- ================= END NAVBAR ================= -->