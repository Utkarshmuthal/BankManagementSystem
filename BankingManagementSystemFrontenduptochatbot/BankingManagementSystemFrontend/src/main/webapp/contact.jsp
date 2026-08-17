<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>PrimeBank | Contact Us</title>

<link rel="stylesheet"
href="${pageContext.request.contextPath}/assets/css/navbar.css">

<link rel="stylesheet"
href="${pageContext.request.contextPath}/assets/css/home.css">

<link rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

<style>

*{

margin:0;
padding:0;
box-sizing:border-box;

}

body{

font-family:'Segoe UI',sans-serif;
background:#f8fbff;

}

/*========================
        Banner
=========================*/

.contact-banner{

background:#eef5ff;
padding:65px 20px;
text-align:center;

}

.contact-banner h1{

font-size:46px;
color:#0d47a1;
margin-bottom:15px;

}

.contact-banner p{

max-width:700px;
margin:auto;
font-size:18px;
color:#666;
line-height:1.8;

}

/*========================
     Contact Cards
=========================*/

.contact-cards{

width:90%;
max-width:1200px;

margin:70px auto;

display:grid;
grid-template-columns:repeat(auto-fit,minmax(280px,1fr));

gap:30px;

}

.contact-card{

background:white;

padding:35px;

border-radius:15px;

text-align:center;

box-shadow:0 5px 20px rgba(0,0,0,.08);

transition:.3s;

}

.contact-card:hover{

transform:translateY(-8px);

}

.contact-card i{

width:75px;
height:75px;

line-height:75px;

border-radius:50%;

background:#eef5ff;

color:#0d47a1;

font-size:30px;

margin-bottom:20px;

}

.contact-card h3{

color:#0d47a1;

margin-bottom:15px;

}

.contact-card p{

color:#666;

line-height:1.8;

}

/*========================
 Contact Section
=========================*/

.contact-section{

width:90%;

max-width:1200px;

margin:80px auto;

display:grid;

grid-template-columns:1fr 1fr;

gap:60px;

align-items:center;

}

.contact-left span{

color:#1976d2;

font-size:14px;

font-weight:bold;

letter-spacing:2px;

}

.contact-left h2{

font-size:40px;

color:#0d47a1;

margin:15px 0;

}

.contact-left p{

color:#666;

line-height:1.8;

margin-bottom:30px;

}

.contact-form{

display:flex;

flex-direction:column;

gap:18px;

}

.contact-form input,
.contact-form textarea{

width:100%;

padding:15px;

border:1px solid #ddd;

border-radius:10px;

font-size:15px;

outline:none;

transition:.3s;

}

.contact-form input:focus,
.contact-form textarea:focus{

border-color:#0d47a1;

box-shadow:0 0 8px rgba(13,71,161,.15);

}

.contact-form button{

background:#0d47a1;

color:white;

padding:15px;

border:none;

border-radius:10px;

cursor:pointer;

font-size:16px;

transition:.3s;

}

.contact-form button:hover{

background:#1565c0;

}

.contact-right{

text-align:center;

}

.contact-right img{

width:100%;
max-width:500px;

}
/*==========================
        CTA Section
===========================*/

.contact-cta{

    margin-top:80px;

    padding:80px 20px;

    text-align:center;

    background:linear-gradient(135deg,#0d47a1,#1565c0);

    color:#fff;

}

.contact-cta h2{

    font-size:40px;

    margin-bottom:20px;

}

.contact-cta p{

    width:70%;

    margin:auto;

    line-height:1.8;

    font-size:18px;

    margin-bottom:35px;

}

.cta-buttons{

    display:flex;

    justify-content:center;

    gap:20px;

    flex-wrap:wrap;

}

.cta-buttons a{

    text-decoration:none;

    color:#0d47a1;

    background:#fff;

    padding:14px 30px;

    border-radius:8px;

    font-weight:600;

    transition:.3s;

}

.cta-buttons a:hover{

    background:#eef5ff;

    transform:translateY(-3px);

}

/*==========================
       Responsive
===========================*/

@media(max-width:992px){

.contact-section{

    grid-template-columns:1fr;

}

.contact-right{

    display:flex;
    flex-direction:column;
    gap:25px;

}

.info-card{

    background:#fff;

    padding:30px;

    border-radius:15px;

    box-shadow:0 8px 25px rgba(0,0,0,.08);

    margin-bottom:25px;

    transition:.3s;

}

.info-card:hover{

    transform:translateY(-5px);

}
</style>

</head>

<body>

<%@ include file="common/navbar.jsp"%>

<section class="contact-banner">

<h1>Contact PrimeBank</h1>

<p>

Have questions about your account, loans,
cards or digital banking?

Our support team is always ready to help.

</p>

</section>

<section class="contact-cards">

<div class="contact-card">

<i class="fas fa-location-dot"></i>

<h3>Head Office</h3>

<p>

PrimeBank Tower

<br>

Finance Street

<br>

Mumbai, Maharashtra - 400001

</p>

</div>

<div class="contact-card">

<i class="fas fa-phone"></i>

<h3>Call Us</h3>

<p>

1800-123-4567

<br>

+91 98765 43210

</p>

</div>

<div class="contact-card">

<i class="fas fa-envelope"></i>

<h3>Email Us</h3>

<p>

support@primebank.com

<br>

info@primebank.com

</p>

</div>

</section>

<section class="contact-section">

<div class="contact-left">

<span>GET IN TOUCH</span>

<h2>Send Us A Message</h2>

<p>

Fill in the form below and our banking
specialists will contact you shortly.

</p>

<form class="contact-form">

<input type="text"
placeholder="Full Name"
required>

<input type="email"
placeholder="Email Address"
required>

<input type="tel"
placeholder="Mobile Number"
required>

<input type="text"
placeholder="Subject">

<textarea rows="6"
placeholder="Write your message..."
required></textarea>

<button type="submit">

<i class="fas fa-paper-plane"></i>

Send Message

</button>

</form>

</div>



</section>

<!-- ================= CTA Section ================= -->

<section class="contact-cta">

    <h2>Need More Help?</h2>

    <p>

        Our relationship managers are always ready to assist you with
        banking services, loans, investments and digital banking.

    </p>

    <div class="cta-buttons">

        <a href="${pageContext.request.contextPath}/services.jsp">

            Explore Services

        </a>

        <a href="${pageContext.request.contextPath}/about.jsp">

            Learn More

        </a>

    </div>

</section>

<%@ include file="common/footer.jsp"%>
<%@ include file="common/chatbot.jsp"%>

</body>

</html>