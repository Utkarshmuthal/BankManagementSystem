<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
    String email = request.getParameter("email");
    if (email == null) {
        email = "";
    }
%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Verify OTP - Banking Management System</title>
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
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 8l9 5 9-5"/></svg>
      </div>
      <h1>Verify OTP</h1>
    </div>
    <p class="card-subtext">Enter the one-time code we sent to your email</p>

    <div id="result" class="alert alert-error"></div>

    <div class="form-group">
      <label for="email">Email Address</label>
      <div class="input-wrapper">
        <svg viewBox="0 0 24 24"><path d="M3 6h18v12H3z"/><path d="M3 7l9 6 9-6"/></svg>
        <input type="email" id="email" value="<%=email%>">
      </div>
    </div>

    <div class="form-group">
      <label for="otp">OTP</label>
      <div class="input-wrapper">
        <svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 8l9 5 9-5"/></svg>
        <input type="text" id="otp" placeholder="Enter the 6-digit code" maxlength="6">
      </div>
    </div>

    <button class="btn-primary" onclick="verifyOtp()">
      <svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
      Verify OTP
    </button>

    <div class="card-footer">
      Didn't get a code? <a onclick="goToLogin()">Back to Login</a>
    </div>

  </div>

  <script src="${pageContext.request.contextPath}/assets/js/verifyOtp.js"></script>
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