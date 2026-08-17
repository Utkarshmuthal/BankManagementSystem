<%@ page contentType="text/html;charset=UTF-8" %>

<!-- ================= NAVBAR ================= -->

<header class="topbar">

    <div class="topbar-left">

        <button
            id="sidebarToggle"
            class="icon-btn"
            aria-label="Toggle sidebar">

            <i class="fa-solid fa-bars"></i>

        </button>

        <h1 class="page-title" id="pageTitle">
            Dashboard
        </h1>

    </div>


    <div class="topbar-right">

        <!-- Notification -->

       


        <!-- Profile -->

        <div class="profile-chip">

            <div
                class="navbar-user-avatar"
                id="navbarUserAvatar">

                <img
                    id="navbarProfilePhoto"
                    src=""
                    alt="Profile Photo">

                <span id="navbarProfileInitials">
                    MB
                </span>

            </div>


            <div class="profile-text">

                <span
                    class="profile-name"
                    id="customerName">
                    Monika Bhujbal
                </span>

            </div>


            <i class="fa-solid fa-chevron-down"></i>

        </div>

    </div>

</header>


<script
    src="${pageContext.request.contextPath}/assets/js/customer-navbar.js">
</script>

<!-- ================= END NAVBAR ================= -->