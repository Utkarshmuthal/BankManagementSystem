/* =====================================================
   CUSTOMER DASHBOARD JS
   Handles:
   - Sidebar toggle
   - Dashboard data
   - Customer profile name
   - Navbar profile photo
   - Recent transactions
   - My Account
===================================================== */

const BACKEND_PORT = "8082";

const API_BASE_URL =
    window.location.port === BACKEND_PORT
        ? "/api/customer"
        : `http://localhost:${BACKEND_PORT}/api/customer`;


/* =====================================================
   PAGE LOAD
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    initSidebarToggle();

    loadDashboard();

    loadCustomerProfile();

    loadRecentTransactions();

    // My Account page
    if (document.getElementById("fullName")) {
        loadMyAccount();
    }

});


/* =====================================================
   SIDEBAR TOGGLE
===================================================== */

function initSidebarToggle() {

    const toggleBtn =
        document.getElementById("sidebarToggle");

    const sidebar =
        document.getElementById("sidebar");

    if (!toggleBtn || !sidebar) {
        return;
    }

    toggleBtn.addEventListener("click", function () {

        sidebar.classList.toggle("collapsed");

    });

}


/* =====================================================
   LOAD CUSTOMER PROFILE
   Used for navbar name + profile photo
===================================================== */

async function loadCustomerProfile() {

    const customerId =
        sessionStorage.getItem("customerId");

    if (!customerId) {

        console.error("Customer ID not found.");

        return;
    }

    try {

        const response = await fetch(
            `${API_BASE_URL}/profile/${customerId}`
        );

        if (!response.ok) {

            throw new Error(
                `Profile request failed: ${response.status}`
            );
        }

        const result =
            await response.json();

        console.log(
            "Customer Profile Response:",
            result
        );

        if (!result.status) {

            console.error(
                result.message ||
                "Unable to load customer profile."
            );

            return;
        }

        const profile =
            result.data;

        if (!profile) {

            console.error(
                "Profile data not available."
            );

            return;
        }


        /* =========================================
           CUSTOMER NAME
        ========================================= */

        const customerName =
            document.getElementById("customerName");

        if (customerName) {

            customerName.textContent =
                profile.fullName || "Customer";
        }


        /* =========================================
           DASHBOARD BANNER NAME
        ========================================= */

        const bannerCustomerName =
            document.getElementById(
                "bannerCustomerName"
            );

        if (bannerCustomerName) {

            bannerCustomerName.textContent =
                profile.fullName || "Customer";
        }


        /* =========================================
           PROFILE PHOTO
        ========================================= */

        setNavbarProfilePhoto(
            profile.profileImage,
            profile.fullName
        );

    }
    catch (error) {

        console.error(
            "Error loading customer profile:",
            error
        );

    }

}


/* =====================================================
   SET NAVBAR PROFILE PHOTO
===================================================== */

function setNavbarProfilePhoto(
    profileImage,
    fullName
) {

    const image =
        document.getElementById(
            "navbarProfilePhoto"
        );

    const initials =
        document.getElementById(
            "navbarProfileInitials"
        );


    if (!image) {

        console.warn(
            "navbarProfilePhoto element not found."
        );

        return;
    }


    /* =========================================
       IF PROFILE IMAGE EXISTS
    ========================================= */

    if (profileImage) {

        let imageUrl = profileImage;


        /*
         * Database contains:
         * /uploads/profile/filename.jpeg
         *
         * Backend is:
         * http://localhost:8082
         */

        if (
            profileImage.startsWith("/")
        ) {

            imageUrl =
                `http://localhost:${BACKEND_PORT}${profileImage}`;

        }


        console.log(
            "Profile Image URL:",
            imageUrl
        );


        image.src = imageUrl;

        image.style.display = "block";


        /*
         * Hide initials when photo exists
         */

        if (initials) {

            initials.style.display =
                "none";
        }


        /*
         * If image fails to load,
         * show initials instead.
         */

        image.onerror = function () {

            console.error(
                "Unable to load profile image:",
                imageUrl
            );

            image.style.display =
                "none";

            if (initials) {

                initials.style.display =
                    "flex";

                initials.textContent =
                    getInitials(fullName);
            }

        };

    }

    else {

        /*
         * No profile photo
         * Show initials
         */

        image.removeAttribute("src");

        image.style.display =
            "none";


        if (initials) {

            initials.style.display =
                "flex";

            initials.textContent =
                getInitials(fullName);
        }

    }

}


/* =====================================================
   GET INITIALS
===================================================== */

function getInitials(fullName) {

    if (!fullName) {
        return "CU";
    }

    const words =
        fullName.trim().split(/\s+/);


    if (words.length === 1) {

        return words[0]
            .substring(0, 2)
            .toUpperCase();

    }


    return (
        words[0].charAt(0) +
        words[words.length - 1].charAt(0)
    ).toUpperCase();

}


/* =====================================================
   LOAD DASHBOARD
===================================================== */

function loadDashboard() {

    const customerId =
        sessionStorage.getItem("customerId");


    if (!customerId) {

        alert("Customer not logged in.");

        window.location.href =
            "login.jsp";

        return;
    }


    fetch(
        `${API_BASE_URL}/dashboard/${customerId}`
    )

        .then(handleResponse)

        .then(function (response) {

            const data =
                response.data;


            if (!data) {
                return;
            }


            /* Customer name */

            setText(
                "customerName",
                data.customerName
            );


            /* Dashboard banner */

            setText(
                "bannerCustomerName",
                data.customerName
            );


            /* Balance */

            setText(
                "availableBalance",
                formatCurrency(data.balance)
            );


            /* Account number */

            setText(
                "accountNumber",
                data.accountNumber
            );


            /* Account type */

            setText(
                "accountType",
                data.accountType
            );


            /* KYC */

            setText(
                "kycStatus",
                data.kycStatus
            );

        })

        .catch(function (error) {

            console.error(
                "Dashboard error:",
                error
            );

        });

}


/* =====================================================
   RECENT TRANSACTIONS
===================================================== */

function loadRecentTransactions() {

    const tbody =
        document.getElementById(
            "recentTransactionsBody"
        );


    if (!tbody) {
        return;
    }


    fetch(
        `${API_BASE_URL}/customer/transactions?limit=5`,
        {
            method: "GET",
            credentials: "include"
        }
    )

        .then(handleResponse)

        .then(function (transactions) {

            if (
                !transactions ||
                transactions.length === 0
            ) {

                return;
            }


            tbody.innerHTML =
                transactions
                    .map(rowTemplate)
                    .join("");

        })

        .catch(function (error) {

            console.warn(
                "Transactions API not available:",
                error.message
            );

        });

}


/* =====================================================
   TRANSACTION ROW
===================================================== */

function rowTemplate(tx) {

    const typeClass =
        "type-" +
        (tx.type || "deposit")
            .toLowerCase();


    const amountClass =
        tx.amount >= 0
            ? "amount-positive"
            : "amount-negative";


    const amountSign =
        tx.amount >= 0
            ? "+"
            : "-";


    const amountAbs =
        Math.abs(tx.amount)
            .toLocaleString("en-IN");


    return `
        <tr>

            <td>
                ${escapeHtml(tx.date)}
            </td>

            <td>
                <span class="type-pill ${typeClass}">
                    ${escapeHtml(tx.type)}
                </span>
            </td>

            <td>
                ${escapeHtml(tx.description)}
            </td>

            <td class="${amountClass}">
                ${amountSign} &#8377;${amountAbs}
            </td>

            <td>
                <span class="status-pill status-${(
                    tx.status || "success"
                ).toLowerCase()}">

                    ${escapeHtml(tx.status)}

                </span>
            </td>

        </tr>
    `;

}


/* =====================================================
   MY ACCOUNT
===================================================== */

function loadMyAccount() {

    const customerId =
        sessionStorage.getItem("customerId");


    if (!customerId) {

        alert("Customer not logged in.");

        window.location.href =
            "../login.jsp";

        return;
    }


    fetch(
        `${API_BASE_URL}/my-account/${customerId}`
    )

        .then(function (response) {

            if (!response.ok) {

                throw new Error(
                    "Unable to fetch account details"
                );

            }

            return response.json();

        })

        .then(function (result) {

            const data =
                result.data;


            if (!data) {
                return;
            }


            setText(
                "customerId",
                data.customerId
            );

            setText(
                "summaryCustomerId",
                data.customerId
            );

            setText(
                "fullName",
                data.fullName
            );

            setText(
                "email",
                data.email
            );

            setText(
                "mobileNumber",
                data.mobileNumber
            );

            setText(
                "dob",
                data.dateOfBirth
            );

            setText(
                "gender",
                data.gender
            );

            setText(
                "address",
                data.address
            );

            setText(
                "city",
                data.city
            );

            setText(
                "state",
                data.state
            );

            setText(
                "pinCode",
                data.pinCode
            );

            setText(
                "aadhaarNumber",
                data.aadhaarNumber
            );

            setText(
                "panNumber",
                data.panNumber
            );

            setText(
                "accountNumber",
                data.accountNumber
            );

            setText(
                "accountType",
                data.accountType
            );

            setText(
                "summaryAccountType",
                data.accountType
            );


            setText(
                "balance",
                "₹ " +
                Number(data.balance)
                    .toLocaleString(
                        "en-IN",
                        {
                            minimumFractionDigits: 2
                        }
                    )
            );


            setText(
                "summaryKycStatus",
                data.kycStatus
            );


            setText(
                "summaryAccountStatus",
                data.accountStatus
            );


            updateStatus(
                "kycStatus",
                data.kycStatus
            );


            updateStatus(
                "accountStatus",
                data.accountStatus
            );

        })

        .catch(function (error) {

            console.error(error);

            alert(error.message);

        });

}


/* =====================================================
   STATUS BADGE
===================================================== */

function updateStatus(id, value) {

    const badge =
        document.getElementById(id);


    if (!badge) {
        return;
    }


    badge.textContent =
        value || "-";


    badge.classList.remove(
        "verified",
        "pending",
        "rejected",
        "active",
        "inactive"
    );


    switch (
        String(value || "").toUpperCase()
    ) {

        case "APPROVED":

            badge.classList.add(
                "verified"
            );

            break;


        case "PENDING":

            badge.classList.add(
                "pending"
            );

            break;


        case "ACTIVE":

            badge.classList.add(
                "active"
            );

            break;


        default:

            badge.classList.add(
                "rejected"
            );

            break;

    }

}


/* =====================================================
   COMMON SETTER
===================================================== */

function setText(id, value) {

    const element =
        document.getElementById(id);


    if (
        element &&
        value !== null &&
        value !== undefined
    ) {

        element.textContent =
            value;

    }

}


/* =====================================================
   CURRENCY
===================================================== */

function formatCurrency(amount) {

    if (
        amount === undefined ||
        amount === null
    ) {

        return "--";

    }


    return (
        "₹ " +
        Number(amount)
            .toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2
                }
            )
    );

}


/* =====================================================
   API RESPONSE
===================================================== */

function handleResponse(response) {

    if (!response.ok) {

        throw new Error(
            `Request failed with status ${response.status}`
        );

    }

    return response.json();

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHtml(str) {

    if (
        str === undefined ||
        str === null
    ) {

        return "";

    }


    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}
/* =====================================================
   CUSTOMER LOGOUT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const logoutBtn = document.getElementById("logoutBtn");

    if (!logoutBtn) {
        return;
    }

    logoutBtn.addEventListener("click", function (event) {

        event.preventDefault();

        const confirmLogout =
            confirm("Are you sure you want to logout?");

        if (!confirmLogout) {
            return;
        }

        /* Remove customer login information */
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("customerId");

        /* Redirect to login page */
        window.location.href = "../login.jsp";
    });

});
/* =====================================================
   COMMON LOGOUT FUNCTION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", function (event) {

            event.preventDefault();

            console.log("Logout clicked");

            // Clear logged-in user session
            sessionStorage.clear();

            // Clear browser stored data if any
            localStorage.removeItem("userId");
            localStorage.removeItem("role");
            localStorage.removeItem("customerId");
            localStorage.removeItem("employeeId");

            // Redirect to login page
            window.location.href =
                contextPath + "/login.jsp";
        });
    }

});