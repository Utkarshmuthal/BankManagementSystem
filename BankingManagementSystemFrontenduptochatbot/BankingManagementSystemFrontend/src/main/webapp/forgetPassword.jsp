<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Forgot Password - Banking Management System</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/auth.css">
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>

  <div class="brand-header">
    <svg class="brand-icon" viewBox="0 0 48 48" fill="white" xmlns="http://www.w3.org/2000/svg">
      <polygon points="24,4 44,16 4,16"/>
      <rect x="8" y="18" width="4" height="20"/>
      <rect x="16" y="18" width="4" height="20"/>
      <rect x="22" y="18" width="4" height="20"/>
      <rect x="28" y="18" width="4" height="20"/>
      <rect x="36" y="18" width="4" height="20"/>
      <rect x="4" y="40" width="40" height="4"/>
    </svg>
    <div class="brand-text">
      <div class="brand-line1">BANKING</div>
      <div class="brand-line2">MANAGEMENT SYSTEM</div>
    </div>
  </div>

  <div class="auth-card">

    <div class="card-heading">
      <div class="icon-circle">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
      </div>
      <h1>Forgot Password?</h1>
    </div>
    <p class="card-subtext">Enter your email to receive a one-time code</p>

    <div id="result" class="alert alert-error"></div>

    <div class="form-group">
      <label for="email">Email Address</label>
      <div class="input-wrapper">
        <svg viewBox="0 0 24 24"><path d="M3 6h18v12H3z"/><path d="M3 7l9 6 9-6"/></svg>
        <input type="email" id="email" placeholder="you@example.com">
      </div>
    </div>

    <button class="btn-primary" onclick="forgotPassword()">
      <svg viewBox="0 0 24 24"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7Z"/></svg>
      Send OTP
    </button>

    <div class="card-footer">
      Remembered your password? <a onclick="goToLogin()">Login here</a>
    </div>

  </div>

  <script src="${pageContext.request.contextPath}/assets/js/forgotPassword.js"></script>
  <script>
    function goToLogin() {
      window.location.href = "login.jsp";
    }
    (function () {
      var target = document.getElementById("result");
      var observer = new MutationObserver(function () {
        if (target.innerHTML.trim() !== "") {
          target.classList.add("show");
        } else {
          target.classList.remove("show");
        }
      });
      observer.observe(target, { childList: true });
    })();
  </script>

</body>
</html>