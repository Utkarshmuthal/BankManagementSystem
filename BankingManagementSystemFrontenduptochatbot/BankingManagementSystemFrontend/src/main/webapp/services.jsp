<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>PrimeBank | Services</title>

<link rel="stylesheet"
href="${pageContext.request.contextPath}/assets/css/navbar.css">

<link rel="stylesheet"
href="${pageContext.request.contextPath}/assets/css/home.css">

<link rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

<style>

.services-banner{
background:#eef5ff;
padding:80px 0;
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
}

.service-container{
width:90%;
max-width:1200px;
margin:60px auto;
display:grid;
grid-template-columns:repeat(auto-fit,minmax(320px,1fr));
gap:30px;
}

.service-card{

background:#fff;
padding:30px;
border-radius:15px;
box-shadow:0 5px 20px rgba(0,0,0,.1);
transition:.3s;

}

.service-card:hover{

transform:translateY(-8px);

}

.service-card i{

font-size:45px;
color:#0d47a1;
margin-bottom:20px;

}

.service-card h3{

margin-bottom:15px;

color:#0d47a1;

}

.service-card p{

line-height:1.7;

color:#666;

margin-bottom:20px;

}

.service-card a{

display:inline-block;

padding:10px 22px;

background:#0d47a1;

color:white;

border-radius:5px;

text-decoration:none;

}

.service-card a:hover{

background:#1565c0;

}

</style>

</head>

<body>

<%@ include file="common/navbar.jsp"%>

<section class="services-banner">

<h1>Our Banking Services</h1>

<p>

Simple, Secure and Smart Banking Solutions for Everyone

</p>

</section>

<section class="service-container">

<div class="service-card">

<i class="fas fa-piggy-bank"></i>

<h3>Savings Account</h3>

<p>

Open a zero balance or premium savings account with attractive interest rates,
online banking and debit card facilities.

</p>

<a href="login.jsp">

Apply Now

</a>

</div>

<div class="service-card">

<i class="fas fa-building-columns"></i>

<h3>Current Account</h3>

<p>

Business current accounts with unlimited transactions,
cheque books and internet banking.

</p>

<a href="login.jsp">

Apply Now

</a>

</div>

<div class="service-card">

<i class="fas fa-credit-card"></i>

<h3>Debit & Credit Cards</h3>

<p>

Enjoy secure online shopping,
cash withdrawals,
reward points and cashback offers.

</p>

<a href="login.jsp">

Know More

</a>

</div>

<div class="service-card">

<i class="fas fa-money-bill-transfer"></i>

<h3>Fund Transfer</h3>

<p>

Transfer money instantly using

NEFT,

RTGS,

IMPS

and UPI.

</p>

<a href="login.jsp">

Transfer

</a>

</div>

<div class="service-card">

<i class="fas fa-hand-holding-dollar"></i>

<h3>Loans</h3>

<p>

Personal,

Education,

Home,

Vehicle

and Gold loans with minimum documentation.

</p>

<a href="login.jsp">

Apply

</a>

</div>

<div class="service-card">

<i class="fas fa-mobile-screen-button"></i>

<h3>Mobile Banking</h3>

<p>

Manage your account,

check balance,

transfer money,

pay bills

and much more from anywhere.

</p>

<a href="login.jsp">

Explore

</a>

</div>

<div class="service-card">

<i class="fas fa-chart-line"></i>

<h3>Investments</h3>

<p>

Mutual Funds,

Fixed Deposits,

Recurring Deposits

and Wealth Management.

</p>

<a href="login.jsp">

Start Investing

</a>

</div>

<div class="service-card">

<i class="fas fa-shield-halved"></i>

<h3>Safe Banking</h3>

<p>

Your account is protected with

OTP,

Encryption,

Biometric Login

and Fraud Detection.

</p>

<a href="features.jsp">

Learn More

</a>

</div>

</section>

<%@ include file="common/footer.jsp"%>
<%@ include file="common/chatbot.jsp"%>

</body>

</html>