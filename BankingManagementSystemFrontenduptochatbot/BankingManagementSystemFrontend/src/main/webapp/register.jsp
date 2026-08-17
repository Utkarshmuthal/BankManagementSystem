<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Customer Registration - Banking Management System</title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/register.css">
</head>
<body>

    <!-- Header Bar -->
    <header class="navbar">
        <div class="brand">
            <div class="brand-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>
                </svg>
            </div>
            <div class="brand-text">
                <span class="title">BANKING</span>
                <span class="subtitle">MANAGEMENT SYSTEM</span>
            </div>
        </div>
        <div class="auth-link">
            <span>Already have an account?</span>
            <a href="${pageContext.request.contextPath}/login.jsp" class="login-btn">
                Login
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </a>
        </div>
    </header>

    <!-- Main Container -->
    <main class="page-container">
        <!-- Left Hero Section -->
        <section class="hero-sidebar">
            <div class="hero-header">
                <h1>Create Your<br>Banking Account</h1>
                <p>Fill your details to get started with our banking services.</p>
            </div>

            <!-- Hero Graphic Illustration -->
            <div class="hero-illustration">
                <img src="${pageContext.request.contextPath}/assets/images/bank_hero.jpg" alt="Banking Illustration" onerror="this.src='https://illustrations.puchd.ac.in/images/bank.png';">
            </div>

            <!-- Feature Badges -->
            <div class="features-list">
                <div class="feature-item">
                    <div class="feature-icon icon-blue">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                    </div>
                    <div class="feature-info">
                        <h4>Secure & Safe</h4>
                        <p>Your data is protected</p>
                    </div>
                </div>

                <div class="feature-item">
                    <div class="feature-icon icon-teal">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                    </div>
                    <div class="feature-info">
                        <h4>Fast Verification</h4>
                        <p>Quick account approval</p>
                    </div>
                </div>

                <div class="feature-item">
                    <div class="feature-icon icon-purple">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                    </div>
                    <div class="feature-info">
                        <h4>Trusted Service</h4>
                        <p>Serving millions of customers</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Right Registration Form Card -->
        <section class="form-card">
            <div class="form-header">
                <h2>Customer Registration</h2>
                <p>Please fill all the details carefully</p>
            </div>

<form id="registrationForm"
      action="${pageContext.request.contextPath}/register"
      method="post"
      enctype="multipart/form-data">
                      
                <!-- Section 1: Personal Information -->
                <div class="form-section">
                    <h3 class="section-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                        </svg>
                        Personal Information
                    </h3>

                    <div class="form-grid grid-3">
                        <div class="form-group">
                            <label for="fullName">Full Name</label>
                            <div class="input-wrapper">
                                <svg class="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                                </svg>
                                <input type="text" id="fullName" name="fullName" placeholder="Enter full name" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="dob">Date of Birth</label>
                            <div class="input-wrapper">
                                <input type="date" id="dob" name="dob" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="gender">Gender</label>
                            <div class="select-wrapper">
                                <select id="gender" name="gender" required>
                                    <option value="" disabled selected>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="mobile">Mobile Number</label>
                            <div class="input-wrapper">
                                <svg class="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                </svg>
                                <input type="tel" id="mobile" name="mobile" placeholder="Enter mobile number" pattern="[0-9]{10}" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <div class="input-wrapper">
                                <svg class="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                                </svg>
                                <input type="email" id="email" name="email" placeholder="Enter email address" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="address">Address</label>
                            <div class="input-wrapper">
                                <svg class="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                                </svg>
                                <input type="text" id="address" name="address" placeholder="Enter your address" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="city">City</label>
                            <div class="input-wrapper">
                                <input type="text" id="city" name="city" placeholder="Enter city" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="state">State</label>
                            <div class="select-wrapper">
                                <select id="state" name="state" required>
                                    <option value="" disabled selected>Select state</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Karnataka">Karnataka</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                    <option value="Gujarat">Gujarat</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="pinCode">PIN Code</label>
                            <div class="input-wrapper">
                                <svg class="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
                                </svg>
                                <input type="text" id="pinCode" name="pinCode" placeholder="Enter PIN code" pattern="[0-9]{6}" required>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Section 2: KYC Details -->
                <div class="form-section">
                    <h3 class="section-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                        KYC Details
                    </h3>

                    <div class="form-grid grid-4">
                        <div class="form-group">
                            <label for="aadhaarNo">Aadhaar Number</label>
                            <div class="input-wrapper">
                                <svg class="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="4" width="18" height="16" rx="2"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="13" y2="12"/>
                                </svg>
                                <input type="text" id="aadhaarNo" name="aadhaarNo" placeholder="Enter Aadhaar number" pattern="[0-9]{12}" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Upload Aadhaar Card</label>
                            <div class="file-upload-box">
                                <input type="file" id="uploadAadhaar" name="aadhaarImage" class="file-input" accept=".pdf,.jpg,.jpeg,.png" required hidden>
                                <button type="button" class="btn-file-choose" onclick="document.getElementById('uploadAadhaar').click()">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                    Choose file
                                </button>
                                <span class="file-label" id="aadhaarFileLabel">No file chosen</span>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="panNo">PAN Number</label>
                            <div class="input-wrapper">
                                <svg class="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="4" width="18" height="16" rx="2"/><line x1="7" y1="8" x2="17" y2="8"/>
                                </svg>
                                <input type="text" id="panNo" name="panNo" placeholder="Enter PAN number" pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Upload PAN Card</label>
                            <div class="file-upload-box">
                                <input type="file" id="uploadPan" name="panImage" class="file-input" accept=".pdf,.jpg,.jpeg,.png" required hidden>
                                <button type="button" class="btn-file-choose" onclick="document.getElementById('uploadPan').click()">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                                    Choose file
                                </button>
                                <span class="file-label" id="panFileLabel">No file chosen</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Section 3: Login Details -->
                <div class="form-section">
                    <h3 class="section-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        Login Details
                    </h3>

                    <div class="form-grid grid-3">
                        <div class="form-group">
                            <label for="username">Username</label>
                            <div class="input-wrapper">
                                <svg class="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                                </svg>
                                <input type="text" id="username" name="username" placeholder="Create username" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="password">Password</label>
                            <div class="input-wrapper">
                                <svg class="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                </svg>
                                <input type="password" id="password" name="password" placeholder="Create password" required>
                                <button type="button" class="btn-toggle-eye" onclick="togglePasswordVisibility('password', this)">
                                    <svg class="eye-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                        <line x1="1" y1="1" x2="23" y2="23"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="confirmPassword">Confirm Password</label>
                            <div class="input-wrapper">
                                <svg class="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                </svg>
                                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" required>
                                <button type="button" class="btn-toggle-eye" onclick="togglePasswordVisibility('confirmPassword', this)">
                                    <svg class="eye-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                        <line x1="1" y1="1" x2="23" y2="23"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Section 4: Account Preference -->
                <div class="form-section">
                    <h3 class="section-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>
                        </svg>
                        Account Preference
                    </h3>

                    <div class="radio-group-container">
                        <label class="radio-label-title">Account Type</label>
                        <div class="radio-options">
                            <label class="custom-radio">
                                <input type="radio" name="accountType" value="Savings" checked>
                                <span class="radio-mark"></span>
                                Savings Account
                            </label>
                            <label class="custom-radio">
                                <input type="radio" name="accountType" value="Current">
                                <span class="radio-mark"></span>
                                Current Account
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Form Action Buttons -->
                <div class="form-actions">
                    <button type="submit" class="btn-primary">Register</button>
                    <button type="reset" class="btn-secondary" id="btnReset">Reset</button>
                </div>

                <!-- Footer Legal Terms -->
                <div class="form-footer-terms">
                    By registering, you agree to our <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a>.
                </div>

            </form>
        </section>
    </main>

    <!-- Custom JavaScript -->
    <script src="${pageContext.request.contextPath}/assets/js/register.js"></script>
</body>
</html>