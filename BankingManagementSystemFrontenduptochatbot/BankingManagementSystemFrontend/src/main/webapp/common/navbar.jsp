<header class="pb-header">
    <div class="pb-logo">
        <i class="fa-solid fa-building-columns"></i>
        <div>
            PrimeBank
            <span class="tagline">Your Trust. Our Priority.</span>
        </div>
    </div>

    <input type="checkbox" id="pb-nav-check" class="pb-nav-check">

    <nav class="pb-nav">
    <a href="${pageContext.request.contextPath}/index.jsp" class="nav-link">Home</a>
    <a href="${pageContext.request.contextPath}/about.jsp" class="nav-link">About Us</a>
    <a href="${pageContext.request.contextPath}/services.jsp" class="nav-link">Services</a>
    <a href="${pageContext.request.contextPath}/features.jsp" class="nav-link">Features</a>
    <a href="${pageContext.request.contextPath}/contact.jsp" class="nav-link">Contact Us</a>

    <a href="${pageContext.request.contextPath}/auth/login.jsp" class="pb-nav-mobile-only">Login</a>

    <a href="${pageContext.request.contextPath}/auth/register.jsp" class="pb-nav-mobile-only">
        Open an Account
    </a>
	</nav>

    <div class="pb-header-actions">
        <label for="pb-nav-check" class="pb-nav-toggle" aria-label="Toggle navigation"><i class="fa-solid fa-bars"></i></label>
        <a href="${pageContext.request.contextPath}/login.jsp" class="btn btn-outline"><i class="fa-solid fa-user"></i> Login</a>
        <a href="${pageContext.request.contextPath}/jsp/auth/register.jsp" class="btn btn-primary">Open an Account</a>
    </div>
</header>
