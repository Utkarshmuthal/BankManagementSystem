<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>

<meta charset="UTF-8">
<title>Customer Details</title>

<link rel="stylesheet"
	href="${pageContext.request.contextPath}/assets/css/customer-details.css">

<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

</head>

<body>

	<!-- Sidebar -->
	<jsp:include page="sidebar.jsp" />

	<div class="main-content">

		<!-- Navbar -->
		<jsp:include page="navbar.jsp" />

		<!-- Main Content -->
		<main class="content-area">

			<!-- Page Header -->
			<div class="page-header">

				<div>

					<h2>
						<i class="fa-solid fa-user-check"></i> Customer Details
					</h2>

					<p>Review customer information before approval.</p>

				</div>

				<span class="status pending"> Pending Approval </span>

			</div>


			<!-- Customer Information -->
			<div class="card">

				<h3>
					<i class="fa-solid fa-user"></i> Customer Information
				</h3>

				<div class="details-grid">

					<div>
						<label>Customer ID</label> <span id="customerId"></span>
					</div>

					<div>
						<label>Full Name</label> <span id="fullName"></span>
					</div>

					<div>
						<label>Email</label> <span id="email"></span>
					</div>

					<div>
						<label>Mobile</label> <span id="mobile"></span>
					</div>

					<div>
						<label>Date of Birth</label> <span id="dob"></span>
					</div>

					<div>
						<label>Gender</label> <span id="gender"></span>
					</div>

					<div>
						<label>Account Type</label> <span id="accountType"></span>
					</div>

					<div>
						<label>City</label> <span id="city"></span>
					</div>

					<div>
						<label>State</label> <span id="state"></span>
					</div>

					<div>
						<label>PIN Code</label> <span id="pinCode"></span>
					</div>

					<div class="full-width">
						<label>Address</label> <span id="address"></span>
					</div>
					<div>
						<label>Aadhaar Number</label> <span id="aadhaarNo">-</span>
					</div>

					<div>
						<label>PAN Number</label> <span id="panNo">-</span>
					</div>
				</div>

			</div>


			<!-- Documents -->
			<div class="card">

				<h3>

					<i class="fa-solid fa-id-card"></i> Uploaded Documents

				</h3>

				<div class="document-grid">

					<div class="document-box">

						<h4>Aadhaar Card</h4>

						<img id="aadhaarImage"> <br>

						<button class="btn-view">View Full Size</button>

					</div>

					<div class="document-box">

						<h4>PAN Card</h4>

						<img id="panImage"> <br>

						<button class="btn-view">View Full Size</button>

					</div>

				</div>

			</div>


			<!-- Action Buttons -->

			<div class="action-section">

				<button class="approve-btn" onclick="approveCustomer()">

					<i class="fa-solid fa-circle-check"></i> Approve & Create Account

				</button>

				<button class="reject-btn" onclick="rejectCustomer()">

					<i class="fa-solid fa-circle-xmark"></i> Reject

				</button>

				<button class="back-btn" onclick="history.back()">

					<i class="fa-solid fa-arrow-left"></i> Back

				</button>

			</div>

		</main>

	</div>

	
<script
    src="${pageContext.request.contextPath}/assets/js/customer-details.js?v=2">
</script></body>
</html>