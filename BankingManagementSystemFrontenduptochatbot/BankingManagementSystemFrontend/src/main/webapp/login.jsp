
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bank Login</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/auth.css">
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
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.4 0-8 2.2-8 5v3h16v-3c0-2.8-3.6-5-8-5Z"/></svg>
      </div>
      <h1>Welcome Back</h1>
    </div>
    <p class="card-subtext">Login to access your account</p>

    <div id="result" class="alert alert-error"></div>

    <div class="form-group">
      <label for="email">Email</label>
      <div class="input-wrapper">
        <svg viewBox="0 0 24 24"><path d="M3 6h18v12H3z"/><path d="M3 7l9 6 9-6"/></svg>
        <input type="email" id="email" placeholder="Enter Email">
      </div>
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <div class="input-wrapper">
        <svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
        <input type="password" id="password" placeholder="Enter your password">
      </div>
    </div>

    <button class="btn-primary" onclick="login()">
      <svg viewBox="0 0 24 24"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/></svg>
      Login
    </button>

  <a class="btn-secondary-link"
   href="${pageContext.request.contextPath}/forgetPassword.jsp">
    Forgot Password?
</a>
    <div class="card-footer">
    New here?
    <a href="${pageContext.request.contextPath}/register.jsp">
        Create an account
    </a>
</div>

  </div>

 <script>
    const contextPath = "${pageContext.request.contextPath}";
</script>

<script src="${pageContext.request.contextPath}/assets/js/login.js"></script>
  <script>
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