<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>PrimeBank | Features</title>

<link rel="stylesheet"
href="${pageContext.request.contextPath}/assets/css/navbar.css">

<link rel="stylesheet"
href="${pageContext.request.contextPath}/assets/css/home.css">

<link rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

<style>

/* ===========================================
   FEATURES PAGE
=========================================== */

.services-banner{

    background:#eef5ff;
    padding:60px 20px;
    text-align:center;

}

.services-banner h1{

    font-size:45px;
    color:#0d47a1;
    margin-bottom:15px;

}

.services-banner p{

    font-size:18px;
    color:#555;
    max-width:700px;
    margin:auto;
    line-height:1.8;

}

/* Feature Cards */

.service-container{

    width:90%;
    max-width:1200px;
    margin:70px auto;

    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
    gap:30px;

}

.service-card{

    background:#fff;
    padding:35px;
    border-radius:15px;
    text-align:center;

    box-shadow:0 8px 20px rgba(0,0,0,.08);

    transition:.3s;

}

.service-card:hover{

    transform:translateY(-8px);

}

.service-card i{

    font-size:42px;
    color:#0d47a1;
    margin-bottom:20px;

}

.service-card h3{

    color:#0d47a1;
    margin-bottom:15px;

}

.service-card p{

    color:#666;
    line-height:1.8;

}


/* Smart Banking */

.about-container{

    width:90%;
    max-width:1200px;
    margin:90px auto;

    display:grid;
    grid-template-columns:1fr 1fr;
    gap:60px;
    align-items:center;

}

.about-content span{

    color:#1976d2;
    font-weight:700;
    letter-spacing:2px;

}

.about-content h2{

    font-size:38px;
    color:#0d47a1;
    margin:15px 0 20px;

}

.about-content p{

    color:#666;
    line-height:1.9;
    margin-bottom:20px;

}

.about-content h3{

    color:#0d47a1;
    margin:30px 0 15px;

}

.about-list{

    list-style:none;
    padding:0;

}

.about-list li{

    margin:14px 0;
    display:flex;
    align-items:center;
    gap:12px;
    color:#555;

}

.about-list i{

    color:#0d47a1;

}

.about-image{

    text-align:center;

}

.about-image img{

    width:100%;
    max-width:520px;
    border-radius:15px;
    box-shadow:0 12px 30px rgba(0,0,0,.12);

}


/* Security */

.mission-section{

    width:90%;
    max-width:1200px;
    margin:80px auto;

    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
    gap:30px;

}

.mission-card{

    background:#fff;

    padding:35px;

    border-radius:15px;

    text-align:center;

    box-shadow:0 8px 20px rgba(0,0,0,.08);

    transition:.3s;

}

.mission-card:hover{

    transform:translateY(-8px);

}

.mission-card i{

    font-size:40px;

    color:#0d47a1;

    margin-bottom:20px;

}

.mission-card h3{

    color:#0d47a1;

    margin-bottom:15px;

}

.mission-card p{

    color:#666;

    line-height:1.8;

}


/* Statistics */

.achievement{

    width:90%;
    max-width:1200px;
    margin:90px auto;

}

.achievement h2{

    text-align:center;
    color:#0d47a1;
    margin-bottom:45px;
    font-size:38px;

}

.achievement-grid{

    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
    gap:25px;

}

.achievement-box{

    background:linear-gradient(135deg,#0d47a1,#1565c0);

    color:#fff;

    padding:35px;

    border-radius:15px;

    text-align:center;

}

.achievement-box h1{

    font-size:42px;

    margin-bottom:10px;

}


/* CTA */

.about-cta{

    background:linear-gradient(135deg,#0d47a1,#1976d2);

    padding:80px 20px;

    text-align:center;

    color:#fff;

}

.about-cta h2{

    font-size:40px;

    margin-bottom:20px;

}

.about-cta p{

    max-width:700px;

    margin:auto;

    line-height:1.8;

    margin-bottom:35px;

}

.about-cta a{

    display:inline-block;

    padding:15px 35px;

    background:#fff;

    color:#0d47a1;

    text-decoration:none;

    border-radius:6px;

    font-weight:600;

    transition:.3s;

}

.about-cta a:hover{

    background:#e3f2fd;

}


/* Responsive */

@media(max-width:992px){

.about-container{

grid-template-columns:1fr;

}

.about-image{

order:-1;

margin-bottom:30px;

}

.services-banner h1{

font-size:36px;

}

.about-content h2{

font-size:30px;

}

.achievement h2{

font-size:30px;

}

.about-cta h2{

font-size:32px;

}

}

@media(max-width:768px){

.services-banner{

padding:50px 15px;

}

.service-card{

padding:28px;

}

.about-cta{

padding:60px 20px;

}

}

</style>

</head>

<body>

<%@ include file="common/navbar.jsp"%>

<section class="services-banner">

    <h1>Banking Features</h1>

    <p>

        Experience secure, intelligent and innovative digital banking
        designed for today's financial needs.

    </p>

</section>

<section class="service-container">

    <div class="service-card">

        <i class="fas fa-mobile-screen-button"></i>

        <h3>Mobile Banking</h3>

        <p>

            Access your accounts, transfer funds, pay bills and manage
            your finances anytime through the PrimeBank mobile app.

        </p>

    </div>

    <div class="service-card">

        <i class="fas fa-money-bill-transfer"></i>

        <h3>Instant Transfers</h3>

        <p>

            Transfer money instantly using UPI, IMPS, NEFT and RTGS
            with complete security.

        </p>

    </div>

    <div class="service-card">

        <i class="fas fa-lock"></i>

        <h3>Secure Banking</h3>

        <p>

            Advanced encryption and fraud monitoring keep every
            transaction protected.

        </p>

    </div>

    <div class="service-card">

        <i class="fas fa-bell"></i>

        <h3>Real-Time Alerts</h3>

        <p>

            Receive instant SMS and email notifications for every
            banking activity.

        </p>

    </div>

    <div class="service-card">

        <i class="fas fa-credit-card"></i>

        <h3>Card Management</h3>

        <p>

            Block, unblock and manage your debit or credit cards
            directly from your account.

        </p>

    </div>

    <div class="service-card">

        <i class="fas fa-fingerprint"></i>

        <h3>Biometric Login</h3>

        <p>

            Login securely using fingerprint or facial recognition
            for quick and safe access.

        </p>

    </div>

    <div class="service-card">

        <i class="fas fa-chart-line"></i>

        <h3>Expense Analytics</h3>

        <p>

            Monitor spending trends with detailed financial insights
            and smart reports.

        </p>

    </div>

    <div class="service-card">

        <i class="fas fa-headset"></i>

        <h3>24×7 Customer Support</h3>

        <p>

            Our dedicated banking experts are always available to
            assist you whenever needed.

        </p>

    </div>

</section>
<!-- ================= Smart Banking ================= -->

<section class="about-container">

    <div class="about-content">

        <span>SMART BANKING</span>

        <h2>Experience Banking Without Limits</h2>

        <p>

            PrimeBank combines innovation with security to deliver a
            seamless digital banking experience. Our intelligent
            platform enables customers to access banking services
            anytime, anywhere from any device.

        </p>

        <p>

            Whether you're checking balances, transferring funds,
            paying utility bills, managing investments or applying
            for loans, everything is just a few clicks away.

        </p>

        <h3>Key Highlights</h3>

        <ul class="about-list">

            <li>
                <i class="fas fa-check-circle"></i>
                24×7 Digital Banking
            </li>

            <li>
                <i class="fas fa-check-circle"></i>
                Instant Fund Transfers
            </li>

            <li>
                <i class="fas fa-check-circle"></i>
                Contactless Payments
            </li>

            <li>
                <i class="fas fa-check-circle"></i>
                AI Powered Fraud Detection
            </li>

            <li>
                <i class="fas fa-check-circle"></i>
                Personalized Banking Experience
            </li>

        </ul>

    </div>

    <div class="about-image">

        <img src="${pageContext.request.contextPath}/assets/images/security		.jpeg"
             alt="Features">

    </div>

</section>



<!-- ================= Security ================= -->

<section class="mission-section">

    <div class="mission-card">

        <i class="fas fa-lock"></i>

        <h3>256-bit Encryption</h3>

        <p>

            Industry-standard encryption keeps every transaction
            completely secure.

        </p>

    </div>

    <div class="mission-card">

        <i class="fas fa-user-shield"></i>

        <h3>Multi-Factor Authentication</h3>

        <p>

            Multiple verification layers protect customer accounts
            against unauthorized access.

        </p>

    </div>

    <div class="mission-card">

        <i class="fas fa-eye"></i>

        <h3>Fraud Monitoring</h3>

        <p>

            Real-time monitoring quickly detects suspicious activity
            and protects your money.

        </p>

    </div>

</section>



<!-- ================= Statistics ================= -->

<section class="achievement">

    <h2>PrimeBank Features At A Glance</h2>

    <div class="achievement-grid">

        <div class="achievement-box">

            <h1>99.9%</h1>

            <p>Secure Transactions</p>

        </div>

        <div class="achievement-box">

            <h1>24×7</h1>

            <p>Online Banking</p>

        </div>

        <div class="achievement-box">

            <h1>50+</h1>

            <p>Digital Services</p>

        </div>

        <div class="achievement-box">

            <h1>1M+</h1>

            <p>Monthly Transactions</p>

        </div>

    </div>

</section>



<!-- ================= CTA ================= -->

<section class="about-cta">

    <h2>Bank Smarter with PrimeBank</h2>

    <p>

        Enjoy fast, secure and intelligent banking with advanced
        digital features designed to simplify your everyday financial
        needs.

    </p>

    <a href="${pageContext.request.contextPath}/login.jsp">

        Get Started

    </a>

</section>

<%@ include file="common/footer.jsp"%>
<%@ include file="common/chatbot.jsp"%>

</body>

</html>