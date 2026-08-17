<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html lang="en">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Bank Security</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">

<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/navbar.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/security.css">
<link rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
<link rel="stylesheet"
href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

</head>

<body>
<!-- ===================== Header ===================== -->
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
        <a href="${pageContext.request.contextPath}/index.jsp" class="active">Home</a>
        <a href="${pageContext.request.contextPath}/jsp/about.jsp">About Us</a>
        <a href="${pageContext.request.contextPath}/jsp/services.jsp">Services</a>
        <a href="${pageContext.request.contextPath}/jsp/features.jsp">Features</a>
        <a href="${pageContext.request.contextPath}/jsp/contact.jsp">Contact Us</a>
        <a href="${pageContext.request.contextPath}/jsp/auth/login.jsp" class="pb-nav-mobile-only">Login</a>
        <a href="${pageContext.request.contextPath}/jsp/auth/register.jsp" class="pb-nav-mobile-only">Open an Account</a>
    </nav>

    <div class="pb-header-actions">
        <label for="pb-nav-check" class="pb-nav-toggle" aria-label="Toggle navigation"><i class="fa-solid fa-bars"></i></label>
        <a href="${pageContext.request.contextPath}/jsp/auth/login.jsp" class="btn btn-outline"><i class="fa-solid fa-user"></i> Login</a>
        <a href="${pageContext.request.contextPath}/jsp/auth/register.jsp" class="btn btn-primary">Open an Account</a>
    </div>
</header>

<section class="hero-section">

    <div class="container">

        <div class="row align-items-center">

            <!-- Left Side -->

            <div class="col-lg-6">

                <span class="security-badge">
                    <i class="bi bi-shield-check"></i>
                    Secure Digital Banking
                </span>

                <h1>
                    Your Security
                    <span>is Our Priority</span>
                </h1>

                <p>
                    We protect your banking experience using advanced
                    encryption, AI-powered fraud detection, secure login,
                    and real-time transaction monitoring.
                </p>

                <div class="hero-buttons">

                    <a href="#features" class="btn btn-primary btn-lg">
                        Learn More
                    </a>

                    <a href="#" class="btn btn-outline-primary btn-lg">
                        Report Fraud
                    </a>

                </div>

            </div>

            <!-- Right Side -->

            <div class="col-lg-6 text-center">

                <img src="${pageContext.request.contextPath}/assets/images/security.jpeg"
                     class="hero-image img-fluid">

            </div>

        </div>

    </div>

</section>
<section class="security-features py-4" id="features">

    <div class="container-lg">

        <div class="text-center mb-4">
            <h2>How We Protect You</h2>
            <p>Your security is our highest priority.</p>
        </div>

        <div class="row g-3">

            <!-- Card 1 -->
            <div class="col-lg-4 col-md-6">

                <div class="security-card text-center">

                    <i class="bi bi-shield-lock-fill"></i>

                    <h4>Secure Login</h4>

                    <p>
                        Secure authentication protects your account from unauthorized access.
                    </p>

                </div>

            </div>

            <!-- Card 2 -->
            <div class="col-lg-4 col-md-6">

                <div class="security-card text-center">

                    <i class="bi bi-phone-fill"></i>

                    <h4>Two-Factor Authentication</h4>

                    <p>
                        OTP verification adds an extra layer of protection.
                    </p>

                </div>

            </div>

            <!-- Card 3 -->
            <div class="col-lg-4 col-md-6">

                <div class="security-card text-center">

                    <i class="bi bi-lock-fill"></i>

                    <h4>Data Encryption</h4>

                    <p>
                        Your personal information and transactions are securely encrypted.
                    </p>

                </div>

            </div>

            <!-- Card 4 -->
            <div class="col-lg-4 col-md-6">

                <div class="security-card text-center">

                    <i class="bi bi-bell-fill"></i>

                    <h4>Instant Alerts</h4>

                    <p>
                        Get SMS and email notifications for every important transaction.
                    </p>

                </div>

            </div>

            <!-- Card 5 -->
            <div class="col-lg-4 col-md-6">

                <div class="security-card text-center">

                    <i class="bi bi-eye-fill"></i>

                    <h4>Fraud Detection</h4>

                    <p>
                        Continuous monitoring helps identify suspicious activities.
                    </p>

                </div>

            </div>

            <!-- Card 6 -->
            <div class="col-lg-4 col-md-6">

                <div class="security-card text-center">

                    <i class="bi bi-key-fill"></i>

                    <h4>Password Protection</h4>

                    <p>
                        Passwords are securely encrypted and never stored as plain text.
                    </p>

                </div>

            </div>

        </div>

    </div>

</section>

</body>
</html>