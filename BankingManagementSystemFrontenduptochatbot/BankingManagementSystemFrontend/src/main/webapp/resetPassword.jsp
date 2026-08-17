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
<title>Reset Password - Banking Management System</title>
<link rel="stylesheet"
      href="${pageContext.request.contextPath}/assets/css/auth.css">

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
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
      </div>
      <h1>Reset Password</h1>
    </div>
    <p class="card-subtext">Enter the OTP sent to your email and choose a new password</p>

    <div id="result" class="alert alert-error"></div>

    

   
    <div class="form-group">
      <label for="newPassword">New Password</label>
      <div class="input-wrapper">
        <svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
        <input type="password" id="newPassword" placeholder="Create a new password">
      </div>
    </div>

    <div class="form-group">
      <label for="confirmPassword">Confirm New Password</label>
      <div class="input-wrapper">
        <svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
        <input type="password" id="confirmPassword" placeholder="Re-enter your new password">
      </div>
    </div>

  <button type="button" class="btn-primary" id="resetPasswordBtn">

    <svg viewBox="0 0 24 24">
        <path d="M3 12a9 9 0 1 0 3-6.7"/>
        <path d="M3 4v5h5"/>
    </svg>

    Reset Password

</button>
    <div class="card-footer">
      Remembered it after all? <a onclick="goToLogin()">Login here</a>
    </div>

  </div>

  <script src="${pageContext.request.contextPath}/assets/js/resetPassword.js"></script>
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