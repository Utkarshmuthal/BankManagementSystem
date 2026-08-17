/* =====================================================
   Employee Dashboard JS
===================================================== */

const API_BASE_URL = "http://localhost:8082/api";

document.addEventListener("DOMContentLoaded", function () {

    initSidebarToggle();

    updateWelcomeBanner();

    setInterval(updateWelcomeBanner, 1000);

    loadEmployeeProfile();

    loadDashboardStats();

    loadRecentRegistrations();

});

/* =====================================================
   Sidebar Toggle
===================================================== */

function initSidebarToggle() {

    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("sidebarToggle");

    if (!sidebar || !toggleBtn) return;

    toggleBtn.addEventListener("click", function () {

        sidebar.classList.toggle("collapsed");

    });

}

/* =====================================================
   Welcome Banner
===================================================== */

function updateWelcomeBanner() {

    const now = new Date();

    const hour = now.getHours();

    let greeting = "";

    if (hour >= 5 && hour < 12) {

        greeting = "Good Morning";

    } else if (hour >= 12 && hour < 17) {

        greeting = "Good Afternoon";

    } else if (hour >= 17 && hour < 21) {

        greeting = "Good Evening";

    } else {

        greeting = "Good Night";

    }

    const employeeName =
        sessionStorage.getItem("employeeName") || "Employee";

    const heading = document.querySelector(".banner-text h2");

    if (heading) {

        heading.innerHTML =
            `${greeting}, <span id="bannerEmployeeName">${employeeName}</span>!`;

    }

    const dateOptions = {

        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"

    };

    const bannerDate = document.getElementById("bannerDate");

    if (bannerDate) {

        bannerDate.textContent =
            now.toLocaleDateString("en-IN", dateOptions);

    }

    const timeOptions = {

        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true

    };

    const bannerTime = document.getElementById("bannerTime");

    if (bannerTime) {

        bannerTime.textContent =
            now.toLocaleTimeString("en-IN", timeOptions);

    }

    const avatar = document.querySelector(".avatar-circle");

    if (avatar) {

        const initials = employeeName
            .trim()
            .split(" ")
            .map(name => name.charAt(0).toUpperCase())
            .join("")
            .substring(0, 2);

        avatar.textContent = initials;

    }

}

/* =====================================================
   Employee Profile
===================================================== */

function loadEmployeeProfile() {

    fetch(API_BASE_URL + "/employees/profile", {

        method: "GET",

        credentials: "include"

    })

    .then(response => response.json())

    .then(data => {

        if (!data) return;

        sessionStorage.setItem("employeeName", data.firstName);

        updateWelcomeBanner();

        const navbarName = document.getElementById("employeeName");

        if (navbarName) {

            navbarName.textContent = data.firstName + " " + data.lastName;

        }

    })

    .catch(error => {

        console.log("Employee Profile Error :", error);

    });

}	/* =====================================================
	   Dashboard Statistics
	===================================================== */

	function loadDashboardStats() {

	    fetch(API_BASE_URL + "/employee/requests/dashboard", {

	        method: "GET"

	    })

	    .then(response => response.json())

	    .then(res => {

	        if (!res.status) return;

	        const data = res.data;

	        document.getElementById("pendingRegistrations").textContent =
	            data.pending;

	        document.getElementById("totalCustomers").textContent =
	            data.total;

	        // Until Account API is ready
	        document.getElementById("activeAccounts").textContent =
	            data.approved;

	        // Until Transaction API is ready
	        document.getElementById("todaysTransactions").textContent =
	            "0";

	        // Until Loan API is ready
	        document.getElementById("pendingLoans").textContent =
	            "0";

	        document.getElementById("todaysDeposits").textContent =
	            "₹0";

	        document.getElementById("todaysWithdrawals").textContent =
	            "₹0";

	        document.getElementById("reportsGenerated").textContent =
	            "0";

	    })

	    .catch(error => {

	        console.log("Dashboard Error :", error);

	    });

	}

	/* =====================================================
	   Recent Registration Requests
	===================================================== */

	function loadRecentRegistrations() {

	    fetch(API_BASE_URL + "/employee/requests?page=0&size=6")

	    .then(response => response.json())

	    .then(res => {

	        if (!res.status) return;

	        const customers = res.data;

	        const tbody =
	            document.getElementById("recentRegistrationsBody");

	        tbody.innerHTML = "";

	        customers.forEach(customer => {

	            tbody.innerHTML += `

	            <tr>

	                <td>${customer.fullName}</td>

	                <td>${customer.mobile}</td>

	                <td>${customer.email}</td>

	                <td>--</td>

	                <td>

	                    <span class="status-pill status-pending">

	                        ${customer.approvalStatus}

	                    </span>

	                </td>

	                <td>

	                    <button class="action-btn"

	                        onclick="viewCustomer(${customer.customerId})">

	                        <i class="fa-solid fa-eye"></i>

	                    </button>

	                </td>

	            </tr>

	            `;

	        });

	    })

	    .catch(error => {

	        console.log("Registration Request Error :", error);

	    });

	}

	/* =====================================================
	   View Customer
	===================================================== */

	function viewCustomer(customerId) {

	    window.location.href =
	        "registrationRequest.jsp?id=" + customerId;

	}

	/* =====================================================
	   Helper Function
	===================================================== */

	function handleResponse(response) {

	    if (!response.ok) {

	        throw new Error("HTTP Error : " + response.status);

	    }

	    return response.json();

	}