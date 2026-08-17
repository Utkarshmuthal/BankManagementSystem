/**
 * ============================================================
 * BANK MANAGEMENT SYSTEM
 * CUSTOMER MANAGEMENT JAVASCRIPT
 * ============================================================
 */


/* ============================================================
   BACKEND CONFIGURATION
============================================================ */

// Change ONLY this if your backend port is different.

const BACKEND_PORT = "8082";

const API_BASE_URL =
    window.location.port === BACKEND_PORT
        ? "/api/admin"
        : `http://localhost:${BACKEND_PORT}/api/admin`;


/*
 * Customer API
 *
 * Expected:
 *
 * GET    /api/admin/customers
 * DELETE /api/admin/customers/{id}
 */

const CUSTOMER_API =
    `${API_BASE_URL}/customers`;



/* ============================================================
   GLOBAL VARIABLES
============================================================ */

let allCustomers = [];

let selectedCustomer = null;



/* ============================================================
   PAGE LOAD
============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    initializeCustomerPage();

});



/* ============================================================
   INITIALIZE
============================================================ */

function initializeCustomerPage() {

    setupEvents();

    loadCustomers();

}



/* ============================================================
   EVENTS
============================================================ */

function setupEvents() {


    /* SEARCH */

    const searchInput =
        document.getElementById("customerSearchInput");

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                filterCustomers();

            }
        );

    }



    /* STATUS */

    const statusFilter =
        document.getElementById("statusFilter");

    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            function () {

                filterCustomers();

            }
        );

    }



    /* REFRESH */

    const refreshBtn =
        document.getElementById("refreshBtn");

    if (refreshBtn) {

        refreshBtn.addEventListener(
            "click",
            function () {

                loadCustomers();

            }
        );

    }



    /* SIDEBAR */

    const sidebarToggle =
        document.getElementById("sidebarToggle");

    if (sidebarToggle) {

        sidebarToggle.addEventListener(
            "click",
            function () {

                toggleSidebar();

            }
        );

    }



    /* LOGOUT */

    const logoutBtn =
        document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            function () {

                handleLogout();

            }
        );

    }



    /* CUSTOMER MODAL CLOSE */

    const closeCustomerModal =
        document.getElementById("closeCustomerModal");

    const closeCustomerModalBottom =
        document.getElementById("closeCustomerModalBottom");


    if (closeCustomerModal) {

        closeCustomerModal.addEventListener(
            "click",
            closeCustomerDetailsModal
        );

    }


    if (closeCustomerModalBottom) {

        closeCustomerModalBottom.addEventListener(
            "click",
            closeCustomerDetailsModal
        );

    }



    /* DELETE MODAL CLOSE */

    const closeDeleteModal =
        document.getElementById("closeDeleteModal");

    const cancelDeleteBtn =
        document.getElementById("cancelDeleteBtn");


    if (closeDeleteModal) {

        closeDeleteModal.addEventListener(
            "click",
            closeDeleteCustomerModal
        );

    }


    if (cancelDeleteBtn) {

        cancelDeleteBtn.addEventListener(
            "click",
            closeDeleteCustomerModal
        );

    }



    /* CONFIRM DELETE */

    const confirmDeleteBtn =
        document.getElementById("confirmDeleteBtn");

    if (confirmDeleteBtn) {

        confirmDeleteBtn.addEventListener(
            "click",
            confirmDeleteCustomer
        );

    }



    /* CLICK OUTSIDE MODALS */

    const detailsModal =
        document.getElementById("customerDetailsModal");

    const deleteModal =
        document.getElementById("deleteCustomerModal");


    if (detailsModal) {

        detailsModal.addEventListener(
            "click",
            function (event) {

                if (event.target === detailsModal) {

                    closeCustomerDetailsModal();

                }

            }
        );

    }


    if (deleteModal) {

        deleteModal.addEventListener(
            "click",
            function (event) {

                if (event.target === deleteModal) {

                    closeDeleteCustomerModal();

                }

            }
        );

    }



    /* ESCAPE KEY */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeCustomerDetailsModal();

                closeDeleteCustomerModal();

            }

        }
    );

}



/* ============================================================
   LOAD CUSTOMERS
============================================================ */

async function loadCustomers() {

    const tableBody =
        document.getElementById("customerTableBody");


    if (!tableBody) {
        return;
    }


    tableBody.innerHTML = `
        <tr>
            <td colspan="8" class="loading-cell">
                <i class="fa-solid fa-spinner fa-spin"></i>
                Loading customers...
            </td>
        </tr>
    `;


    try {

        const response =
            await fetch(CUSTOMER_API, {

                method: "GET",

                headers: {
                    "Accept": "application/json"
                }

            });


        if (!response.ok) {

            throw new Error(
                `HTTP Error: ${response.status}`
            );

        }


        const result =
            await response.json();


        /*
         * Supports:
         *
         * [
         *   {...}
         * ]
         *
         * OR
         *
         * {
         *   data: [...]
         * }
         *
         * OR
         *
         * {
         *   content: [...]
         * }
         */

        if (Array.isArray(result)) {

            allCustomers = result;

        }

        else if (Array.isArray(result.data)) {

            allCustomers = result.data;

        }

        else if (Array.isArray(result.content)) {

            allCustomers = result.content;

        }

        else if (result.data &&
                 Array.isArray(result.data.content)) {

            allCustomers = result.data.content;

        }

        else {

            allCustomers = [];

        }


        updateStatistics();

        filterCustomers();


    }

    catch (error) {

        console.error(
            "Customer loading error:",
            error
        );


        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="error-cell">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    Unable to load customers.
                </td>
            </tr>
        `;

    }

}



/* ============================================================
   FILTER CUSTOMERS
============================================================ */

function filterCustomers() {

    const searchInput =
        document.getElementById("customerSearchInput");

    const statusFilter =
        document.getElementById("statusFilter");


    const searchText =
        searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";


    const selectedStatus =
        statusFilter
            ? statusFilter.value.toUpperCase()
            : "ALL";


    const filteredCustomers =
        allCustomers.filter(function (customer) {


            const id =
                getValue(
                    customer,
                    [
                        "customerId",
                        "customer_id",
                        "id"
                    ]
                );


            const name =
                getValue(
                    customer,
                    [
                        "fullName",
                        "full_name",
                        "name"
                    ]
                );


            const email =
                getValue(
                    customer,
                    [
                        "email",
                        "emailAddress"
                    ]
                );


            const mobile =
                getValue(
                    customer,
                    [
                        "mobile",
                        "mobileNumber",
                        "phone"
                    ]
                );


            const status =
                getValue(
                    customer,
                    [
                        "status",
                        "approvalStatus",
                        "approval_status"
                    ]
                ).toUpperCase();


            const searchMatch =
                !searchText ||

                String(id)
                    .toLowerCase()
                    .includes(searchText) ||

                String(name)
                    .toLowerCase()
                    .includes(searchText) ||

                String(email)
                    .toLowerCase()
                    .includes(searchText) ||

                String(mobile)
                    .toLowerCase()
                    .includes(searchText);


            const statusMatch =
                selectedStatus === "ALL" ||
                status === selectedStatus;


            return searchMatch && statusMatch;

        });


    renderCustomerTable(filteredCustomers);

}



/* ============================================================
   RENDER TABLE
============================================================ */

function renderCustomerTable(customers) {

    const tableBody =
        document.getElementById("customerTableBody");

    const emptyState =
        document.getElementById("emptyState");


    if (!tableBody) {
        return;
    }


    tableBody.innerHTML = "";


    if (!customers || customers.length === 0) {

        if (emptyState) {
            emptyState.style.display = "block";
        }

        return;

    }


    if (emptyState) {
        emptyState.style.display = "none";
    }


    customers.forEach(
        function (customer, index) {

            const row =
                createCustomerRow(
                    customer,
                    index + 1
                );

            tableBody.appendChild(row);

        }
    );

}



/* ============================================================
   CREATE TABLE ROW
============================================================ */

function createCustomerRow(customer, serialNumber) {

    const row =
        document.createElement("tr");


    const customerId =
        getValue(
            customer,
            [
                "customerId",
                "customer_id",
                "id"
            ]
        );


    const fullName =
        getValue(
            customer,
            [
                "fullName",
                "full_name",
                "name"
            ]
        );


    const email =
        getValue(
            customer,
            [
                "email",
                "emailAddress"
            ]
        );


    const mobile =
        getValue(
            customer,
            [
                "mobile",
                "mobileNumber",
                "phone"
            ]
        );


    const status =
        getValue(
            customer,
            [
                "status",
                "approvalStatus",
                "approval_status"
            ]
        );


    const appliedAt =
        getValue(
            customer,
            [
                "appliedAt",
                "applied_at",
                "applicationDate",
                "application_date",
                "createdAt",
                "created_at"
            ]
        );


    row.innerHTML = `

        <td>
            ${escapeHtml(serialNumber)}
        </td>


        <td>
            ${escapeHtml(customerId || "-")}
        </td>


        <td>
            ${escapeHtml(fullName || "-")}
        </td>


        <td>
            ${escapeHtml(email || "-")}
        </td>


        <td>
            ${escapeHtml(mobile || "-")}
        </td>


        <td>
            ${createStatusBadge(status)}
        </td>


        <td>
            ${formatDate(appliedAt)}
        </td>


        <td>

            <div class="actions">

                <button
                    type="button"
                    class="view-btn"
                    title="View Customer"
                    data-action="view">

                    <i class="fa-solid fa-eye"></i>

                </button>


                <button
                    type="button"
                    class="delete-btn"
                    title="Delete Customer"
                    data-action="delete">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        </td>

    `;


    /* VIEW */

    row.querySelector(
        '[data-action="view"]'
    ).addEventListener(
        "click",
        function () {

            openCustomerDetailsModal(customer);

        }
    );


    /* DELETE */

    row.querySelector(
        '[data-action="delete"]'
    ).addEventListener(
        "click",
        function () {

            openDeleteCustomerModal(customer);

        }
    );


    return row;

}



/* ============================================================
   STATUS BADGE
============================================================ */

function createStatusBadge(status) {

    const cleanStatus =
        String(status || "UNKNOWN")
            .toUpperCase();


    let cssClass =
        "status-inactive";


    if (cleanStatus === "APPROVED" ||
        cleanStatus === "ACTIVE") {

        cssClass = "status-approved";

    }

    else if (cleanStatus === "PENDING") {

        cssClass = "status-pending";

    }

    else if (cleanStatus === "REJECTED") {

        cssClass = "status-rejected";

    }


    return `
        <span class="status-badge ${cssClass}">
            ${escapeHtml(cleanStatus)}
        </span>
    `;

}



/* ============================================================
   OPEN CUSTOMER DETAILS
============================================================ */

function openCustomerDetailsModal(customer) {

    if (!customer) {
        return;
    }


    selectedCustomer = customer;


    setText(
        "viewCustomerId",
        getValue(customer, [
            "customerId",
            "customer_id",
            "id"
        ])
    );


    setText(
        "viewCustomerUserId",
        getValue(customer, [
            "userId",
            "user_id"
        ])
    );


    setText(
        "viewCustomerName",
        getValue(customer, [
            "fullName",
            "full_name",
            "name"
        ])
    );


    setText(
        "viewCustomerEmail",
        getValue(customer, [
            "email",
            "emailAddress"
        ])
    );


    setText(
        "viewCustomerMobile",
        getValue(customer, [
            "mobile",
            "mobileNumber",
            "phone"
        ])
    );


    setText(
        "viewCustomerDob",
        formatDate(
            getValue(customer, [
                "dateOfBirth",
                "date_of_birth",
                "dob"
            ])
        )
    );


    setText(
        "viewCustomerGender",
        getValue(customer, [
            "gender"
        ])
    );


    setText(
        "viewCustomerAddress",
        getValue(customer, [
            "address"
        ])
    );


    setText(
        "viewCustomerCity",
        getValue(customer, [
            "city"
        ])
    );


    setText(
        "viewCustomerState",
        getValue(customer, [
            "state"
        ])
    );


    setText(
        "viewCustomerPinCode",
        getValue(customer, [
            "pinCode",
            "pin_code",
            "pincode"
        ])
    );


    setText(
        "viewCustomerAadhaar",
        getValue(customer, [
            "aadhaar",
            "aadhaarNumber",
            "aadhaar_number"
        ])
    );


    setText(
        "viewCustomerPan",
        getValue(customer, [
            "pan",
            "panNumber",
            "pan_number"
        ])
    );


    setText(
        "viewCustomerAccountType",
        getValue(customer, [
            "accountType",
            "account_type",
            "preferredAccount",
            "preferred_account"
        ])
    );


    setText(
        "viewCustomerStatus",
        getValue(customer, [
            "status",
            "approvalStatus",
            "approval_status"
        ])
    );


    setText(
        "viewCustomerAppliedAt",
        formatDateTime(
            getValue(customer, [
                "appliedAt",
                "applied_at",
                "createdAt",
                "created_at"
            ])
        )
    );


    setText(
        "viewCustomerDate",
        formatDate(
            getValue(customer, [
                "applicationDate",
                "application_date"
            ])
        )
    );


    const modal =
        document.getElementById(
            "customerDetailsModal"
        );


    if (modal) {

        modal.classList.add("show");

        document.body.style.overflow = "hidden";

    }

}



/* ============================================================
   CLOSE CUSTOMER DETAILS
============================================================ */

function closeCustomerDetailsModal() {

    const modal =
        document.getElementById(
            "customerDetailsModal"
        );


    if (modal) {

        modal.classList.remove("show");

    }


    restoreBodyScroll();

}



/* ============================================================
   OPEN DELETE MODAL
============================================================ */

function openDeleteCustomerModal(customer) {

    if (!customer) {
        return;
    }


    selectedCustomer = customer;


    const name =
        getValue(
            customer,
            [
                "fullName",
                "full_name",
                "name"
            ]
        );


    setText(
        "deleteCustomerName",
        name || "-"
    );


    const modal =
        document.getElementById(
            "deleteCustomerModal"
        );


    if (modal) {

        modal.classList.add("show");

        document.body.style.overflow = "hidden";

    }

}



/* ============================================================
   CLOSE DELETE MODAL
============================================================ */

function closeDeleteCustomerModal() {

    const modal =
        document.getElementById(
            "deleteCustomerModal"
        );


    if (modal) {

        modal.classList.remove("show");

    }


    restoreBodyScroll();

}



/* ============================================================
   CONFIRM DELETE
============================================================ */

async function confirmDeleteCustomer() {

    if (!selectedCustomer) {

        return;

    }


    const customerId =
        getValue(
            selectedCustomer,
            [
                "customerId",
                "customer_id",
                "id"
            ]
        );


    if (!customerId) {

        alert(
            "Customer ID not found."
        );

        return;

    }


    const confirmButton =
        document.getElementById(
            "confirmDeleteBtn"
        );


    if (confirmButton) {

        confirmButton.disabled = true;

        confirmButton.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Deleting...
        `;

    }


    try {

        const response =
            await fetch(
                `${CUSTOMER_API}/${encodeURIComponent(customerId)}`,
                {
                    method: "DELETE",

                    headers: {
                        "Accept": "application/json"
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                `Delete failed: ${response.status}`
            );

        }


        closeDeleteCustomerModal();


        alert(
            "Customer deleted successfully."
        );


        selectedCustomer = null;


        await loadCustomers();


    }

    catch (error) {

        console.error(
            "Delete customer error:",
            error
        );


        alert(
            "Unable to delete customer."
        );

    }

    finally {

        if (confirmButton) {

            confirmButton.disabled = false;

            confirmButton.innerHTML = `
                <i class="fa-solid fa-trash"></i>
                Delete Customer
            `;

        }

    }

}



/* ============================================================
   STATISTICS
============================================================ */

function updateStatistics() {

    const total =
        allCustomers.length;


    let active = 0;

    let inactive = 0;


    allCustomers.forEach(
        function (customer) {

            const status =
                getValue(
                    customer,
                    [
                        "status",
                        "approvalStatus",
                        "approval_status"
                    ]
                ).toUpperCase();


            if (
                status === "APPROVED" ||
                status === "ACTIVE"
            ) {

                active++;

            }

            else {

                inactive++;

            }

        }
    );


    const newThisMonth =
        countNewThisMonth();


    setText(
        "totalCustomers",
        total
    );


    setText(
        "activeCustomers",
        active
    );


    setText(
        "inactiveCustomers",
        inactive
    );


    setText(
        "newCustomers",
        newThisMonth
    );

}



/* ============================================================
   NEW THIS MONTH
============================================================ */

function countNewThisMonth() {

    const now =
        new Date();


    const currentMonth =
        now.getMonth();


    const currentYear =
        now.getFullYear();


    let count = 0;


    allCustomers.forEach(
        function (customer) {

            const dateValue =
                getValue(
                    customer,
                    [
                        "appliedAt",
                        "applied_at",
                        "applicationDate",
                        "application_date",
                        "createdAt",
                        "created_at"
                    ]
                );


            if (!dateValue) {
                return;
            }


            const date =
                new Date(dateValue);


            if (
                !isNaN(date.getTime()) &&
                date.getMonth() === currentMonth &&
                date.getFullYear() === currentYear
            ) {

                count++;

            }

        }
    );


    return count;

}



/* ============================================================
   GET VALUE
============================================================ */

function getValue(object, keys) {

    if (!object) {
        return "";
    }


    for (const key of keys) {

        if (
            object[key] !== undefined &&
            object[key] !== null
        ) {

            return object[key];

        }

    }


    return "";

}



/* ============================================================
   SET TEXT
============================================================ */

function setText(elementId, value) {

    const element =
        document.getElementById(elementId);


    if (element) {

        element.textContent =
            value !== undefined &&
            value !== null &&
            value !== ""
                ? value
                : "-";

    }

}



/* ============================================================
   DATE
============================================================ */

function formatDate(value) {

    if (!value) {
        return "-";
    }


    const date =
        new Date(value);


    if (isNaN(date.getTime())) {

        return String(value);

    }


    return date.toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );

}



/* ============================================================
   DATE + TIME
============================================================ */

function formatDateTime(value) {

    if (!value) {
        return "-";
    }


    const date =
        new Date(value);


    if (isNaN(date.getTime())) {

        return String(value);

    }


    return date.toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    )
    + ", "
    +
    date.toLocaleTimeString(
        "en-US",
        {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }
    );

}



/* ============================================================
   HTML ESCAPE
============================================================ */

function escapeHtml(value) {

    if (
        value === undefined ||
        value === null
    ) {

        return "";

    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}



/* ============================================================
   SIDEBAR TOGGLE
============================================================ */

function toggleSidebar() {

    const sidebar =
        document.querySelector(
            ".sidebar"
        );


    if (!sidebar) {
        return;
    }


    if (window.innerWidth <= 700) {

        sidebar.classList.toggle(
            "mobile-open"
        );

    }

}



/* ============================================================
   LOGOUT
============================================================ */

function handleLogout() {

    const confirmed =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmed) {
        return;
    }


    /*
     * Change this URL if your project
     * has a different logout page.
     */

    window.location.href =
        `${window.location.origin}${window.location.pathname.substring(
            0,
            window.location.pathname.indexOf("/admin/")
        )}/login.jsp`;

}



/* ============================================================
   BODY SCROLL
============================================================ */

function restoreBodyScroll() {

    const detailsModal =
        document.getElementById(
            "customerDetailsModal"
        );


    const deleteModal =
        document.getElementById(
            "deleteCustomerModal"
        );


    const detailsOpen =
        detailsModal &&
        detailsModal.classList.contains("show");


    const deleteOpen =
        deleteModal &&
        deleteModal.classList.contains("show");


    if (!detailsOpen && !deleteOpen) {

        document.body.style.overflow = "";

    }

}