<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PrimeBank | Bank Smarter, Live Better</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/navbar.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/home.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
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
        <a href="${pageContext.request.contextPath}/about.jsp">About Us</a>
        <a href="${pageContext.request.contextPath}/service.jsp">Services</a>
        <a href="${pageContext.request.contextPath}/features.jsp">Features</a>
        <a href="${pageContext.request.contextPath}/contact.jsp">Contact Us</a>
        <a href="${pageContext.request.contextPath}/jsp/auth/login.jsp" class="pb-nav-mobile-only">Login</a>
        <a href="${pageContext.request.contextPath}/jsp/auth/register.jsp" class="pb-nav-mobile-only">Open an Account</a>
    </nav>

    <div class="pb-header-actions">
        <label for="pb-nav-check" class="pb-nav-toggle" aria-label="Toggle navigation"><i class="fa-solid fa-bars"></i></label>
        <a href="${pageContext.request.contextPath}/login.jsp" class="btn btn-outline"><i class="fa-solid fa-user"></i> Login</a>
        <a href="${pageContext.request.contextPath}/register.jsp" class="btn btn-primary">Open an Account</a>
    </div>
</header>

<!-- ===================== Hero ===================== -->
<section class="pb-hero">
    <div class="pb-hero-inner">
        <div class="pb-hero-copy">
            <p class="pb-hero-eyebrow">Welcome to PrimeBank</p>
            <h1>Bank Smarter,<br><span>Live Better</span></h1>
            <p>Experience the next generation of banking with secure, fast and convenient financial solutions all in one place.</p>
            <div class="pb-hero-actions">
                <a href="${pageContext.request.contextPath}/register.jsp" class="btn btn-primary">Open an Account <i class="fa-solid fa-arrow-right"></i></a>
                <a href="${pageContext.request.contextPath}/jsp/features.jsp" class="btn btn-outline">Learn More <i class="fa-solid fa-arrow-right"></i></a>
            </div>
        </div>

        <div class="pb-hero-visual">

    <img src="${pageContext.request.contextPath}/assets/images/hero-bank.png"
         alt="PrimeBank Hero"
         class="img-fluid hero-image">

</div>
    </div>
</section>

<!-- ===================== Feature strip ===================== -->
<div class="pb-feature-strip">
    <div class="pb-feature-item">
        <div class="pb-feature-icon"><i class="fa-solid fa-shield-halved"></i></div>
        <div>
            <h4>Secure Banking</h4>
            <p>Advanced security to protect your money and privacy.</p>
        </div>
    </div>
    <div class="pb-feature-item">
        <div class="pb-feature-icon"><i class="fa-solid fa-bolt"></i></div>
        <div>
            <h4>Fast Transactions</h4>
            <p>Instant transfers and payments anytime, anywhere.</p>
        </div>
    </div>
    <div class="pb-feature-item">
        <div class="pb-feature-icon"><i class="fa-solid fa-mobile-screen"></i></div>
        <div>
            <h4>Bank Anywhere</h4>
            <p>Access your account from mobile or desktop.</p>
        </div>
    </div>
    <div class="pb-feature-item">
        <div class="pb-feature-icon"><i class="fa-solid fa-headset"></i></div>
        <div>
            <h4>24/7 Support</h4>
            <p>Our support team is always here to help you.</p>
        </div>
    </div>
</div>

<!-- ===================== Services ===================== -->
<section class="pb-services">
    <div class="container">
        <h2 class="section-title">Our Services</h2>
        <p class="section-subtitle">Explore a wide range of banking services designed for you.</p>

        <div class="pb-services-grid">
            <div class="pb-service-card">
                <div class="pb-service-icon"><i class="fa-solid fa-credit-card"></i></div>
                <h3>Accounts</h3>
                <p>Savings, Current and Salary accounts tailored for you.</p>
                <a href="${pageContext.request.contextPath}/jsp/customer/accounts.jsp" class="explore-link">Explore &rarr;</a>
            </div>
            <div class="pb-service-card">
                <div class="pb-service-icon"><i class="fa-solid fa-right-left"></i></div>
                <h3>Fund Transfer</h3>
                <p>Transfer money instantly to any bank account.</p>
                <a href="${pageContext.request.contextPath}/jsp/transaction/fundTransfer.jsp" class="explore-link">Explore &rarr;</a>
            </div>
            <div class="pb-service-card">
                <div class="pb-service-icon"><i class="fa-solid fa-file-invoice"></i></div>
                <h3>Bill Payments</h3>
                <p>Pay your utility bills, recharges and more seamlessly.</p>
                <a href="${pageContext.request.contextPath}/jsp/transaction/billPayments.jsp" class="explore-link">Explore &rarr;</a>
            </div>
            <div class="pb-service-card">
                <div class="pb-service-icon"><i class="fa-solid fa-sack-dollar"></i></div>
                <h3>Loans</h3>
                <p>Personal, Home, Car and Education loans at best rates.</p>
                <a href="${pageContext.request.contextPath}/jsp/loan/loans.jsp" class="explore-link">Explore &rarr;</a>
            </div>
            <div class="pb-service-card">
                <div class="pb-service-icon"><i class="fa-solid fa-id-card"></i></div>
                <h3>Cards</h3>
                <p>Debit, Credit and Prepaid cards for your needs.</p>
                <a href="${pageContext.request.contextPath}/jsp/customer/cards.jsp" class="explore-link">Explore &rarr;</a>
            </div>
            <div class="pb-service-card">
                <div class="pb-service-icon"><i class="fa-solid fa-chart-line"></i></div>
                <h3>Investments</h3>
                <p>Grow your wealth with smart investment options.</p>
                <a href="${pageContext.request.contextPath}/jsp/customer/investments.jsp" class="explore-link">Explore &rarr;</a>
            </div>
        </div>
    </div>
</section>

<!-- ===================== Stats bar ===================== -->
<section class="pb-stats">
    <div class="pb-stats-inner">
        <div class="pb-stat-item">
            <div class="pb-stat-icon"><i class="fa-solid fa-users"></i></div>
            <div>
                <strong>2.5M+</strong>
                <span>Happy Customers</span>
            </div>
        </div>
        <div class="pb-stat-item">
            <div class="pb-stat-icon"><i class="fa-solid fa-building-columns"></i></div>
            <div>
                <strong>18,753+</strong>
                <span>Total Accounts</span>
            </div>
        </div>
        <div class="pb-stat-item">
            <div class="pb-stat-icon"><i class="fa-solid fa-right-left"></i></div>
            <div>
                <strong>25.3M+</strong>
                <span>Transactions (Monthly)</span>
            </div>
        </div>
        <div class="pb-stat-item">
            <div class="pb-stat-icon"><i class="fa-solid fa-indian-rupee-sign"></i></div>
            <div>
                <strong>&#8377; 245.68 Cr</strong>
                <span>Total Balance Managed</span>
            </div>
        </div>
    </div>
</section>

<!-- ===================== How it works ===================== -->
<section class="pb-how">
    <h2 class="section-title">How It Works</h2>
    <p class="section-subtitle">Banking made simple in just 3 easy steps.</p>

    <div class="pb-how-steps">
        <div class="pb-how-step">
            <div class="pb-step-number">1</div>
            <div class="pb-step-icon"><i class="fa-solid fa-user-plus"></i></div>
            <h4>Create Account</h4>
            <p>Open your account in minutes with a simple and secure process.</p>
        </div>
        <div class="pb-how-step">
            <div class="pb-step-number">2</div>
            <div class="pb-step-icon"><i class="fa-solid fa-building-columns"></i></div>
            <h4>Add Money</h4>
            <p>Add funds to your account using multiple payment options.</p>
        </div>
        <div class="pb-how-step">
            <div class="pb-step-number">3</div>
            <div class="pb-step-icon"><i class="fa-solid fa-mobile-screen"></i></div>
            <h4>Start Banking</h4>
            <p>Enjoy seamless banking services anytime, anywhere.</p>
        </div>
    </div>
</section>

<!-- ===================== Why choose us ===================== -->
<section class="pb-why">
    <div class="pb-why-inner">
        <div class="pb-why-visual">
            <img src="${pageContext.request.contextPath}/assets/images/security-illustration.png" alt="Bank-grade security illustration">
        </div>
        <div class="pb-why-copy">
            <p class="pb-why-eyebrow">Your Security, Our Priority</p>
            <h2>Why Choose PrimeBank?</h2>
            <ul class="pb-why-list">
                <li>Bank-grade security with advanced encryption</li>
                <li>Multi-factor authentication for extra protection</li>
                <li>Real-time alerts and fraud monitoring</li>
                <li>Compliant with RBI guidelines and regulations</li>
                <li>Your money is safe with us</li>
            </ul>
            <a href="${pageContext.request.contextPath}/security.jsp" class="btn btn-primary">Learn More About Security <i class="fa-solid fa-arrow-right"></i></a>
        </div>
    </div>
</section>

<!-- ===================== Testimonials ===================== -->
<section class="pb-testimonials">
    <h2 class="section-title">What Our Customers Say</h2>

    <div class="pb-testimonial-track">
        <div class="pb-testimonial-card">
            <div class="pb-testimonial-quote">&#8220;</div>
            <div class="pb-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <p>PrimeBank has made my life so easy. The app is simple, secure and very useful for everyday banking.</p>
            <div class="pb-testimonial-author">
                <img src="${pageContext.request.contextPath}/assets/images/nisha.jpeg" alt="Rohan Mehta">
                <div>
                    <strong>Nisha Lohbande</strong>
                    <span>Business Owner</span>
                </div>
            </div>
        </div>
        <div class="pb-testimonial-card">
            <div class="pb-testimonial-quote">&#8220;</div>
            <div class="pb-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <p>I love the quick fund transfer and bill payment features. Highly recommended for everyone!</p>
            <div class="pb-testimonial-author">
                <img src="${pageContext.request.contextPath}/assets/images/pooja.jpeg" alt="Neha Sharma">
                <div>
                    <strong>Pooja Yadav</strong>
                    <span>Teacher</span>
                </div>
            </div>
        </div>
        <div class="pb-testimonial-card">
            <div class="pb-testimonial-quote">&#8220;</div>
            <div class="pb-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <p>Excellent customer support and very secure platform. I trust PrimeBank with my money.</p>
            <div class="pb-testimonial-author">
                <img src="${pageContext.request.contextPath}/assets/images/mahima.jpeg" alt="Amit Verma">
                <div>
                    <strong>Mahima Kodgyale</strong>
                    <span>Freelancer</span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ===================== CTA banner ===================== -->
<section class="pb-cta">
    <div class="pb-cta-inner">
        <div>
            <h3>Ready to experience smarter banking?</h3>
            <p>Join PrimeBank today and take control of your financial future.</p>
        </div>
        <a href="${pageContext.request.contextPath}/register.jsp" class="btn btn-outline">Open an Account Now <i class="fa-solid fa-arrow-right"></i></a>
    </div>
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
            <h5>Quick Links</h5>
            <ul>
                <li><a href="${pageContext.request.contextPath}/index.jsp">Home</a></li>
                <li><a href="${pageContext.request.contextPath}/about.jsp">About Us</a></li>
                <li><a href="${pageContext.request.contextPath}/jsp/services.jsp">Services</a></li>
                <li><a href="${pageContext.request.contextPath}/jsp/features.jsp">Features</a></li>
                <li><a href="${pageContext.request.contextPath}/jsp/contact.jsp">Contact Us</a></li>
            </ul>
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
<%@ include file="common/footer.jsp"%>
<%@ include file="common/chatbot.jsp"%>

</body>
</html>