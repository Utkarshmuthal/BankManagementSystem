<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>PrimeBank | About Us</title>

    <!-- Font Awesome -->
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <!-- Existing CSS -->
    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/assets/css/home.css">

    <style>

        /* =====================================================
           GLOBAL
        ===================================================== */

        * {
            box-sizing: border-box;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: "Segoe UI", Arial, sans-serif;
            background: #f6f8fc;
            color: #172033;
        }

        a {
            text-decoration: none;
        }

        /* =====================================================
           NAVBAR
        ===================================================== */

        .pb-navbar {
            height: 76px;
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 6%;
            border-bottom: 1px solid #e8edf5;
            position: sticky;
            top: 0;
            z-index: 1000;
        }

        .pb-logo {
            display: flex;
            align-items: center;
            gap: 11px;
            color: #0b2d68;
            font-size: 22px;
            font-weight: 800;
        }

        .pb-logo i {
            font-size: 27px;
            color: #1769e0;
        }

        .pb-logo small {
            display: block;
            font-size: 9px;
            letter-spacing: 1px;
            color: #718096;
            font-weight: 600;
        }

        .pb-nav {
            display: flex;
            align-items: center;
            gap: 30px;
        }

        .pb-nav a {
            color: #344054;
            font-size: 14px;
            font-weight: 600;
            transition: 0.25s;
        }

        .pb-nav a:hover,
        .pb-nav a.active {
            color: #1769e0;
        }

        .pb-actions {
            display: flex;
            gap: 10px;
        }

        .pb-btn {
            padding: 10px 19px;
            border-radius: 7px;
            font-size: 13px;
            font-weight: 700;
            transition: 0.25s;
        }

        .pb-btn-outline {
            border: 1px solid #1769e0;
            color: #1769e0;
            background: #fff;
        }

        .pb-btn-primary {
            background: #1769e0;
            color: #fff;
            border: 1px solid #1769e0;
        }

        .pb-btn:hover {
            transform: translateY(-2px);
        }

        /* =====================================================
           HERO
        ===================================================== */

        .about-hero {
            min-height: 430px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 70px 20px;

            background:
                linear-gradient(
                    135deg,
                    rgba(7, 45, 105, 0.97),
                    rgba(23, 105, 224, 0.90)
                );
            color: #fff;
        }

        .about-hero-content {
            max-width: 800px;
        }

        .hero-label {
            display: inline-flex;
            align-items: center;
            gap: 8px;

            padding: 8px 17px;

            border-radius: 30px;

            background: rgba(255,255,255,0.13);

            border: 1px solid rgba(255,255,255,0.2);

            font-size: 11px;

            font-weight: 700;

            letter-spacing: 2px;

            margin-bottom: 20px;
        }

        .about-hero h1 {
            margin: 0 0 18px;
            font-size: 52px;
            font-weight: 800;
        }

        .about-hero p {
            margin: auto;
            max-width: 700px;
            font-size: 17px;
            line-height: 1.8;
            color: rgba(255,255,255,0.88);
        }

        /* =====================================================
           COMMON
        ===================================================== */

        .section {
            width: 90%;
            max-width: 1180px;
            margin: auto;
            padding: 80px 0;
        }

        .section-heading {
            text-align: center;
            margin-bottom: 45px;
        }

        .section-heading span {
            color: #1769e0;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 2px;
        }

        .section-heading h2 {
            margin: 10px 0;
            color: #0b2d68;
            font-size: 36px;
        }

        .section-heading p {
            max-width: 680px;
            margin: auto;
            color: #687386;
            font-size: 14px;
            line-height: 1.8;
        }

        /* =====================================================
           ABOUT INTRO
        ===================================================== */

        .about-intro {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 65px;
            align-items: center;
        }

        .intro-label {
            color: #1769e0;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 2px;
        }

        .intro-content h2 {
            margin: 13px 0 20px;
            color: #0b2d68;
            font-size: 40px;
            line-height: 1.2;
        }

        .intro-content p {
            color: #687386;
            font-size: 14px;
            line-height: 1.9;
            margin-bottom: 16px;
        }

        .about-points {
            margin-top: 28px;
        }

        .about-point {
            display: flex;
            align-items: center;
            gap: 12px;
            margin: 13px 0;
            color: #344054;
            font-size: 14px;
        }

        .about-point i {
            width: 31px;
            height: 31px;
            border-radius: 8px;
            background: #eaf2ff;
            color: #1769e0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
        }

        /* =====================================================
           IMAGE
        ===================================================== */

        .about-image {
            position: relative;
        }

        .about-image img {
            width: 100%;
            max-width: 520px;
            display: block;
            margin: auto;
            border-radius: 20px;
            box-shadow: 0 20px 45px rgba(15, 35, 70, 0.15);
        }

        .experience-card {
            position: absolute;
            right: 15px;
            bottom: 20px;

            background: #fff;

            padding: 15px 20px;

            border-radius: 12px;

            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }

        .experience-card strong {
            display: block;
            color: #0b2d68;
            font-size: 24px;
        }

        .experience-card span {
            color: #718096;
            font-size: 11px;
        }

        /* =====================================================
           MISSION CARDS
        ===================================================== */

        .mission-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 22px;
        }

        .mission-card {
            background: #fff;
            border: 1px solid #e6ebf2;
            border-radius: 16px;
            padding: 32px 25px;
            text-align: center;
            transition: 0.3s;
        }

        .mission-card:hover {
            transform: translateY(-7px);
            box-shadow: 0 16px 35px rgba(20, 45, 90, 0.10);
        }

        .mission-icon {
            width: 60px;
            height: 60px;
            margin: auto;

            border-radius: 15px;

            background: #eaf2ff;

            color: #1769e0;

            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 23px;
        }

        .mission-card h3 {
            color: #0b2d68;
            margin: 18px 0 10px;
            font-size: 19px;
        }

        .mission-card p {
            margin: 0;
            color: #687386;
            font-size: 13px;
            line-height: 1.8;
        }

        /* =====================================================
           JOURNEY
        ===================================================== */

        .journey-section {
            background: #f0f5fc;
            width: 100%;
        }

        .journey-inner {
            width: 90%;
            max-width: 1180px;
            margin: auto;
        }

        .journey-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 18px;
        }

        .journey-card {
            background: #fff;
            padding: 25px;
            border-radius: 14px;
            border-top: 4px solid #1769e0;
            box-shadow: 0 7px 22px rgba(20,45,90,0.05);
        }

        .journey-card h3 {
            color: #1769e0;
            font-size: 28px;
            margin: 0 0 10px;
        }

        .journey-card h4 {
            color: #0b2d68;
            margin: 0 0 10px;
        }

        .journey-card p {
            color: #687386;
            font-size: 13px;
            line-height: 1.7;
            margin: 0;
        }

        /* =====================================================
           WHY PRIMEBANK
        ===================================================== */

        .why-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 18px;
        }

        .why-card {
            background: #fff;
            border: 1px solid #e6ebf2;
            border-radius: 15px;
            padding: 28px 20px;
            text-align: center;
            transition: 0.3s;
        }

        .why-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 30px rgba(15,35,70,0.08);
        }

        .why-icon {
            width: 52px;
            height: 52px;
            margin: auto;

            background: #eaf2ff;
            color: #1769e0;

            border-radius: 13px;

            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 20px;
        }

        .why-card h3 {
            color: #0b2d68;
            margin: 15px 0 8px;
            font-size: 16px;
        }

        .why-card p {
            color: #687386;
            margin: 0;
            font-size: 12px;
            line-height: 1.7;
        }

        /* =====================================================
           STATS
        ===================================================== */

        .stats-section {
            background: #0b2d68;
        }

        .stats-inner {
            width: 90%;
            max-width: 1180px;
            margin: auto;
            padding: 65px 0;
        }

        .stats-title {
            text-align: center;
            color: #fff;
            margin-bottom: 40px;
        }

        .stats-title h2 {
            font-size: 34px;
            margin: 8px 0;
        }

        .stats-title p {
            color: rgba(255,255,255,0.7);
            font-size: 13px;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 18px;
        }

        .stat-card {
            text-align: center;
            color: #fff;
            padding: 25px 10px;
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 14px;
            background: rgba(255,255,255,0.05);
        }

        .stat-card h2 {
            margin: 0 0 7px;
            font-size: 32px;
        }

        .stat-card p {
            margin: 0;
            color: rgba(255,255,255,0.7);
            font-size: 12px;
        }

        /* =====================================================
           CTA
        ===================================================== */

        .cta {
            padding: 80px 20px;
            text-align: center;
            background: linear-gradient(135deg,#1769e0,#0b2d68);
            color: #fff;
        }

        .cta h2 {
            margin: 0 0 14px;
            font-size: 38px;
        }

        .cta p {
            max-width: 680px;
            margin: 0 auto 28px;
            color: rgba(255,255,255,0.85);
            font-size: 14px;
            line-height: 1.8;
        }

        .cta-button {
            display: inline-flex;
            align-items: center;
            gap: 9px;

            background: #fff;
            color: #0b2d68;

            padding: 13px 24px;

            border-radius: 8px;

            font-weight: 700;
            font-size: 13px;

            transition: 0.25s;
        }

        .cta-button:hover {
            transform: translateY(-2px);
            background: #f0f5fc;
        }

        /* =====================================================
           FOOTER
        ===================================================== */

        .pb-footer {
            background: #071d45;
            color: #fff;
            padding: 45px 6% 25px;
        }

        .footer-grid {
            display: grid;
            grid-template-columns: 1.5fr 1fr 1fr 1fr;
            gap: 40px;
            max-width: 1200px;
            margin: auto;
        }

        .footer-brand h2 {
            margin: 0 0 12px;
        }

        .footer-brand p {
            color: #aebbd0;
            font-size: 13px;
            line-height: 1.7;
        }

        .footer-column h3 {
            font-size: 14px;
            margin-bottom: 15px;
        }

        .footer-column a {
            display: block;
            color: #aebbd0;
            font-size: 12px;
            margin: 10px 0;
        }

        .footer-column a:hover {
            color: #fff;
        }

        .footer-bottom {
            max-width: 1200px;
            margin: 35px auto 0;
            padding-top: 20px;
            border-top: 1px solid rgba(255,255,255,0.1);
            color: #8e9db5;
            text-align: center;
            font-size: 11px;
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media(max-width:1000px) {

            .pb-nav {
                gap: 15px;
            }

            .about-intro {
                grid-template-columns: 1fr;
            }

            .about-image {
                order: -1;
            }

            .mission-grid {
                grid-template-columns: 1fr;
            }

            .journey-grid {
                grid-template-columns: repeat(2,1fr);
            }

            .why-grid {
                grid-template-columns: repeat(2,1fr);
            }

            .stats-grid {
                grid-template-columns: repeat(2,1fr);
            }

            .footer-grid {
                grid-template-columns: repeat(2,1fr);
            }
        }

        @media(max-width:700px) {

            .pb-navbar {
                padding: 0 20px;
            }

            .pb-nav {
                display: none;
            }

            .pb-actions .pb-btn-outline {
                display: none;
            }

            .about-hero h1 {
                font-size: 38px;
            }

            .about-hero p {
                font-size: 14px;
            }

            .section {
                width: 92%;
                padding: 55px 0;
            }

            .intro-content h2 {
                font-size: 31px;
            }

            .journey-grid,
            .why-grid,
            .stats-grid {
                grid-template-columns: 1fr;
            }

            .footer-grid {
                grid-template-columns: 1fr;
            }

            .cta h2 {
                font-size: 29px;
            }
        }

    </style>


    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/navbar.css">

<style>
.pb-footer { background:#071d45; color:#fff; padding:45px 6% 25px; }
.pb-footer-grid { display:grid; grid-template-columns:1.5fr 1fr 1fr 1fr 1fr; gap:40px; max-width:1200px; margin:auto; }
.pb-footer-brand p { color:#aebbd0; font-size:13px; line-height:1.7; }
.pb-footer-grid h5 { color:#fff; font-size:14px; margin:0 0 15px; }
.pb-footer-grid ul { list-style:none; padding:0; margin:0; }
.pb-footer-grid li { color:#aebbd0; font-size:12px; line-height:1.7; margin:10px 0; }
.pb-footer-grid li i { margin-right:8px; }
.pb-footer-grid a { color:#aebbd0; text-decoration:none; font-size:12px; }
.pb-footer-grid a:hover { color:#fff; }
.pb-footer-social { display:flex; gap:10px; margin-top:18px; }
.pb-footer-social a { width:34px; height:34px; border:1px solid rgba(255,255,255,.18); border-radius:50%; display:flex; align-items:center; justify-content:center; }
.pb-footer-bottom { max-width:1200px; margin:35px auto 0; padding-top:20px; border-top:1px solid rgba(255,255,255,.1); color:#8e9db5; text-align:center; font-size:11px; display:flex; justify-content:space-between; gap:20px; }
@media(max-width:1000px){ .pb-footer-grid{grid-template-columns:repeat(2,1fr);} }
@media(max-width:700px){ .pb-footer-grid{grid-template-columns:1fr;} .pb-footer-bottom{flex-direction:column;} }
</style>
</head>

<body>

<%@ include file="common/navbar.jsp" %>

<!-- =====================================================
     HERO
===================================================== -->

<section class="about-hero">

    <div class="about-hero-content">

        <div class="hero-label">

            <i class="fa-solid fa-building-columns"></i>

            ABOUT PRIMEBANK

        </div>

        <h1>
            Banking Built Around You
        </h1>

        <p>
            PrimeBank combines trusted banking practices with
            modern technology to provide secure, simple and
            convenient financial services for individuals and
            businesses.
        </p>

    </div>

</section>

<!-- =====================================================
     ABOUT PRIMEBANK
===================================================== -->

<section class="section">

    <div class="about-intro">

        <div class="intro-content">

            <span class="intro-label">
                WHO WE ARE
            </span>

            <h2>
                Banking That Puts People First
            </h2>

            <p>
                PrimeBank is a modern banking platform designed
                to make financial services simpler, safer and
                more accessible.
            </p>

            <p>
                From opening an account and managing deposits to
                transferring funds and applying for loans,
                PrimeBank brings essential banking services
                together in one convenient platform.
            </p>

            <div class="about-points">

                <div class="about-point">

                    <i class="fa-solid fa-shield-halved"></i>

                    <span>
                        Secure and protected banking
                    </span>

                </div>

                <div class="about-point">

                    <i class="fa-solid fa-bolt"></i>

                    <span>
                        Fast and convenient transactions
                    </span>

                </div>

                <div class="about-point">

                    <i class="fa-solid fa-mobile-screen-button"></i>

                    <span>
                        Easy digital banking experience
                    </span>

                </div>

                <div class="about-point">

                    <i class="fa-solid fa-headset"></i>

                    <span>
                        Customer-focused support
                    </span>

                </div>

                <div class="about-point">

                    <i class="fa-solid fa-chart-line"></i>

                    <span>
                        Smart financial management
                    </span>

                </div>

            </div>

        </div>

        <div class="about-image">

            <img
                src="${pageContext.request.contextPath}/assets/images/primebank.png"
                alt="PrimeBank Banking">

            <div class="experience-card">

                <strong>20+</strong>

                <span>
                    Years of Banking Trust
                </span>

            </div>

        </div>

    </div>

</section>

<!-- =====================================================
     MISSION / VISION / VALUES
===================================================== -->

<section class="section">

    <div class="section-heading">

        <span>
            WHAT DRIVES US
        </span>

        <h2>
            Our Mission & Values
        </h2>

        <p>
            Our commitment to customers guides every banking
            service and decision we make.
        </p>

    </div>

    <div class="mission-grid">

        <div class="mission-card">

            <div class="mission-icon">

                <i class="fa-solid fa-bullseye"></i>

            </div>

            <h3>
                Our Mission
            </h3>

            <p>
                To provide secure, transparent and convenient
                financial services that help customers achieve
                their financial goals.
            </p>

        </div>

        <div class="mission-card">

            <div class="mission-icon">

                <i class="fa-solid fa-eye"></i>

            </div>

            <h3>
                Our Vision
            </h3>

            <p>
                To build a trusted digital banking ecosystem
                where technology and human service work together
                to create better financial experiences.
            </p>

        </div>

        <div class="mission-card">

            <div class="mission-icon">

                <i class="fa-solid fa-handshake"></i>

            </div>

            <h3>
                Our Values
            </h3>

            <p>
                Integrity, security, transparency, innovation
                and customer satisfaction are at the heart
                of PrimeBank.
            </p>

        </div>

    </div>

</section>

<!-- =====================================================
     OUR JOURNEY
===================================================== -->

<section class="journey-section">

    <div class="journey-inner"
         style="padding:80px 0;">

        <div class="section-heading">

            <span>
                OUR JOURNEY
            </span>

            <h2>
                Growing With Our Customers
            </h2>

            <p>
                PrimeBank continues to evolve with changing
                customer expectations and banking technology.
            </p>

        </div>

        <div class="journey-grid">

            <div class="journey-card">

                <h3>
                    2005
                </h3>

                <h4>
                    Foundation
                </h4>

                <p>
                    PrimeBank began with a vision of delivering
                    reliable and customer-focused banking services.
                </p>

            </div>

            <div class="journey-card">

                <h3>
                    2012
                </h3>

                <h4>
                    Digital Banking
                </h4>

                <p>
                    Expanded digital banking services and made
                    account management more convenient.
                </p>

            </div>

            <div class="journey-card">

                <h3>
                    2018
                </h3>

                <h4>
                    Mobile Experience
                </h4>

                <p>
                    Introduced modern mobile-first banking
                    experiences and faster digital payments.
                </p>

            </div>

            <div class="journey-card">

                <h3>
                    2026
                </h3>

                <h4>
                    Smarter Banking
                </h4>

                <p>
                    Continuing to build a secure, integrated
                    banking platform for modern customers.
                </p>

            </div>

        </div>

    </div>

</section>

<!-- =====================================================
     WHY PRIMEBANK
===================================================== -->

<section class="section">

    <div class="section-heading">

        <span>
            WHY PRIMEBANK
        </span>

        <h2>
            Banking You Can Trust
        </h2>

        <p>
            Everything we build is designed to make your
            banking experience safer and easier.
        </p>

    </div>

    <div class="why-grid">

        <div class="why-card">

            <div class="why-icon">

                <i class="fa-solid fa-lock"></i>

            </div>

            <h3>
                Strong Security
            </h3>

            <p>
                Your account and transactions are protected
                using modern security practices.
            </p>

        </div>

        <div class="why-card">

            <div class="why-icon">

                <i class="fa-solid fa-money-bill-transfer"></i>

            </div>

            <h3>
                Easy Transfers
            </h3>

            <p>
                Send and receive money quickly through
                convenient banking services.
            </p>

        </div>

        <div class="why-card">

            <div class="why-icon">

                <i class="fa-solid fa-mobile-screen"></i>

            </div>

            <h3>
                Digital Banking
            </h3>

            <p>
                Manage your banking activities online
                whenever you need them.
            </p>

        </div>

        <div class="why-card">

            <div class="why-icon">

                <i class="fa-solid fa-headset"></i>

            </div>

            <h3>
                Customer Support
            </h3>

            <p>
                Get assistance whenever you need help
                with your banking services.
            </p>

        </div>

    </div>

</section>

<!-- =====================================================
     PRIMEBANK STATISTICS
===================================================== -->

<section class="stats-section">

    <div class="stats-inner">

        <div class="stats-title">

            <h2>
                PrimeBank At A Glance
            </h2>

            <p>
                Built on trust, service and innovation.
            </p>

        </div>

        <div class="stats-grid">

            <div class="stat-card">

                <h2>
                    2.5M+
                </h2>

                <p>
                    Customers
                </p>

            </div>

            <div class="stat-card">

                <h2>
                    250+
                </h2>

                <p>
                    Banking Locations
                </p>

            </div>

            <div class="stat-card">

                <h2>
                    99.9%
                </h2>

                <p>
                    Platform Availability
                </p>

            </div>

            <div class="stat-card">

                <h2>
                    24×7
                </h2>

                <p>
                    Digital Banking
                </p>

            </div>

        </div>

    </div>

</section>

<!-- =====================================================
     CALL TO ACTION
===================================================== -->

<section class="cta">

    <h2>
        Ready to Start Banking With PrimeBank?
    </h2>

    <p>
        Open your account and experience secure,
        convenient and modern banking designed around you.
    </p>

    <!-- register.jsp EXISTS DIRECTLY UNDER webapp -->

    <a href="${pageContext.request.contextPath}/register.jsp"
       class="cta-button">

        Open an Account

        <i class="fa-solid fa-arrow-right"></i>

    </a>

</section>

<!-- ===================== Footer ===================== -->
<footer class="pb-footer">
    <div class="pb-footer-grid">
        <div class="pb-footer-brand">
            <div class="pb-logo"><i class="fa-solid fa-building-columns"></i> PrimeBank</div>
            <p>We are committed to providing secure, innovative and customer-centric banking solutions.</p>
            <div class="pb-footer-social">
                <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                <a href="#"><i class="fa-brands fa-twitter"></i></a>
                <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
                <a href="#"><i class="fa-brands fa-instagram"></i></a>
            </div>
        </div>

        <div>
            <div>
                <div>
                    <h5>Quick Links</h5>
                    <ul>
                        <li><a href="${pageContext.request.contextPath}/index.jsp">Home</a></li>
                        <li><a href="${pageContext.request.contextPath}/about.jsp">About Us</a></li>
                        <li><a href="${pageContext.request.contextPath}/services.jsp">Services</a></li>
                        <li><a href="${pageContext.request.contextPath}/features.jsp">Features</a></li>
                        <li><a href="${pageContext.request.contextPath}/contact.jsp">Contact Us</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div>
            <h5>Services</h5>
            <ul>
                <li><a href="${pageContext.request.contextPath}/jsp/customer/accounts.jsp">Accounts</a></li>
                <li><a href="${pageContext.request.contextPath}/jsp/transaction/fundTransfer.jsp">Fund Transfer</a></li>
                <li><a href="${pageContext.request.contextPath}/jsp/transaction/billPayments.jsp">Bill Payments</a></li>
                <li><a href="${pageContext.request.contextPath}/jsp/loan/loans.jsp">Loans</a></li>
                <li><a href="${pageContext.request.contextPath}/jsp/customer/investments.jsp">Investments</a></li>
            </ul>
        </div>

        <div>
            <h5>Customer Support</h5>
            <ul>
                <li><a href="${pageContext.request.contextPath}/jsp/help.jsp">Help Center</a></li>
                <li><a href="${pageContext.request.contextPath}/jsp/faqs.jsp">FAQs</a></li>
                <li><a href="${pageContext.request.contextPath}/jsp/security.jsp">Security</a></li>
                <li><a href="${pageContext.request.contextPath}/jsp/privacy.jsp">Privacy Policy</a></li>
                <li><a href="${pageContext.request.contextPath}/jsp/terms.jsp">Terms &amp; Conditions</a></li>
            </ul>
        </div>

        <div>
            <h5>Contact Us</h5>
            <ul>
                <li><i class="fa-solid fa-phone"></i> 1800 123 4567</li>
                <li><i class="fa-solid fa-envelope"></i> support@primebank.com</li>
                <li><i class="fa-solid fa-location-dot"></i> PrimeBank Tower, Finance Street, Mumbai, Maharashtra - 400001</li>
            </ul>
        </div>
    </div>

    <div class="pb-footer-bottom">
        <span>&copy; 2025 PrimeBank. All Rights Reserved.</span>
        <span>Made with &#10084; for a better banking experience</span>
    </div>
</footer>
<%@ include file="common/chatbot.jsp"%>

</body>

</html>