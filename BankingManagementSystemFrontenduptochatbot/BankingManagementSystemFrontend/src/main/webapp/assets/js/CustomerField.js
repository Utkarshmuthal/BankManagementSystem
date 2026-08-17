/**
 * =========================================================
 * EMPLOYEE CUSTOMERS JS
 * =========================================================
 *
 * Features:
 * - Approved customers
 * - Active / Inactive status
 * - Click status badge to toggle
 * - Status updated in database
 * - Status changes immediately on page
 * - Search
 * - Account Type filter
 * - Status filter
 * - Pagination
 * - Savings / Current summary
 * =========================================================
 */

console.log("Employee Customers JS Loaded");


/* =========================================================
   API
========================================================= */

const API_BASE =
    "http://localhost:8082/api/employee/customers";


/* =========================================================
   PAGINATION
========================================================= */

let currentPage = 0;

const pageSize = 6;


/* =========================================================
   CUSTOMER DATA
========================================================= */

let allCustomers = [];

let filteredCustomers = [];


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Employee Customers Page Loaded");

    loadCustomers();


    /* =====================================================
       SEARCH BUTTON
    ===================================================== */

    const searchBtn =
        document.getElementById("searchBtn");

    const searchButton =
        document.getElementById("searchButton");


    if (searchBtn) {

        searchBtn.addEventListener(
            "click",
            applyAllFilters
        );

    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            applyAllFilters
        );

    }


    /* =====================================================
       SEARCH ENTER
    ===================================================== */

    const searchKeyword =
        document.getElementById("searchKeyword");


    if (searchKeyword) {

        searchKeyword.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    applyAllFilters();

                }

            }
        );

    }


    /* =====================================================
       ACCOUNT TYPE FILTER
    ===================================================== */

    const accountTypeFilter =
        document.getElementById(
            "accountTypeFilter"
        );


    if (accountTypeFilter) {

        accountTypeFilter.addEventListener(
            "change",
            applyAllFilters
        );

    }


    /* =====================================================
       STATUS FILTER
    ===================================================== */

    const accountStatusFilter =
        document.getElementById(
            "accountStatusFilter"
        );


    if (accountStatusFilter) {

        accountStatusFilter.addEventListener(
            "change",
            applyAllFilters
        );

    }


    /* =====================================================
       RESET
    ===================================================== */

    const resetBtn =
        document.getElementById("resetBtn");


    if (resetBtn) {

        resetBtn.addEventListener(
            "click",
            resetFilters
        );

    }


    /* =====================================================
       PREVIOUS
    ===================================================== */

    const prevBtn =
        document.getElementById("prevBtn");


    if (prevBtn) {

        prevBtn.addEventListener(
            "click",
            previousPage
        );

    }


    /* =====================================================
       NEXT
    ===================================================== */

    const nextBtn =
        document.getElementById("nextBtn");


    if (nextBtn) {

        nextBtn.addEventListener(
            "click",
            nextPage
        );

    }

});


/* =========================================================
   LOAD CUSTOMERS
========================================================= */

function loadCustomers() {

    showLoading();


    const url =
        API_BASE +
        "?page=0&size=1000";


    console.log(
        "Customers URL:",
        url
    );


    fetch(url)

        .then(function (response) {

            if (!response.ok) {

                throw new Error(
                    "Customer HTTP Error: " +
                    response.status
                );

            }

            return response.json();

        })

        .then(function (result) {

            console.log(
                "Customer Result:",
                result
            );


            if (
                result &&
                result.status === true
            ) {

                allCustomers =
                    result.data || [];


                console.log(
                    "All Customers:",
                    allCustomers
                );


                currentPage = 0;


                applyAllFilters();

            }

            else {

                allCustomers = [];

                filteredCustomers = [];

                fillCustomerTable([]);

                updateSummary([]);

                updatePagination([]);

            }

        })

        .catch(function (error) {

            console.error(
                "Customer Load Error:",
                error
            );


            allCustomers = [];

            filteredCustomers = [];


            showError();

        });

}


/* =========================================================
   APPLY ALL FILTERS
========================================================= */

function applyAllFilters() {

    const keywordElement =
        document.getElementById(
            "searchKeyword"
        );


    const accountTypeElement =
        document.getElementById(
            "accountTypeFilter"
        );


    const statusElement =
        document.getElementById(
            "accountStatusFilter"
        );


    const keyword =
        keywordElement
            ? keywordElement.value
                .trim()
                .toLowerCase()
            : "";


    const selectedAccountType =
        accountTypeElement
            ? accountTypeElement.value
            : "ALL";


    const selectedStatus =
        statusElement
            ? statusElement.value
            : "ALL";


    console.log(
        "Filter:",
        keyword,
        selectedAccountType,
        selectedStatus
    );


    /* =====================================================
       FILTER CUSTOMERS
    ===================================================== */

    filteredCustomers =
        allCustomers.filter(
            function (customer) {


                /* =========================================
                   SEARCH
                ========================================= */

                const customerId =
                    String(
                        customer.customerId || ""
                    )
                    .toLowerCase();


                const fullName =
                    String(
                        customer.fullName || ""
                    )
                    .toLowerCase();


                const mobile =
                    String(
                        customer.mobile || ""
                    )
                    .toLowerCase();


                const email =
                    String(
                        customer.email || ""
                    )
                    .toLowerCase();


                const accountNumber =
                    String(
                        customer.accountNumber || ""
                    )
                    .toLowerCase();


                const matchesSearch =

                    !keyword ||

                    customerId.includes(
                        keyword
                    ) ||

                    fullName.includes(
                        keyword
                    ) ||

                    mobile.includes(
                        keyword
                    ) ||

                    email.includes(
                        keyword
                    ) ||

                    accountNumber.includes(
                        keyword
                    );


                /* =========================================
                   ACCOUNT TYPE
                ========================================= */

                const customerAccountType =
                    String(
                        customer.accountType || ""
                    )
                    .toUpperCase();


                let matchesAccountType = true;


                if (
                    selectedAccountType !== "ALL"
                ) {

                    matchesAccountType =
                        customerAccountType.includes(
                            selectedAccountType
                        );

                }


                /* =========================================
                   ACCOUNT STATUS
                ========================================= */

                const customerStatus =
                    getCustomerStatus(
                        customer
                    );


                let matchesStatus = true;


                if (
                    selectedStatus !== "ALL"
                ) {

                    matchesStatus =
                        customerStatus ===
                        selectedStatus;

                }


                /* =========================================
                   FINAL RESULT
                ========================================= */

                return (

                    matchesSearch &&

                    matchesAccountType &&

                    matchesStatus

                );

            }
        );


    console.log(
        "Filtered Customers:",
        filteredCustomers
    );


    currentPage = 0;


    renderCurrentPage();

}


/* =========================================================
   RENDER CURRENT PAGE
========================================================= */

function renderCurrentPage() {

    const start =
        currentPage * pageSize;


    const end =
        start + pageSize;


    const pageCustomers =
        filteredCustomers.slice(
            start,
            end
        );


    fillCustomerTable(
        pageCustomers
    );


    updateSummary(
        filteredCustomers
    );


    updatePagination(
        pageCustomers
    );

}


/* =========================================================
   GET CUSTOMER STATUS
========================================================= */

function getCustomerStatus(customer) {

    if (!customer) {

        return "ACTIVE";

    }


    /*
     * First check accountStatus.
     * Then check status.
     */

    const status =
        customer.accountStatus ||
        customer.status ||
        "ACTIVE";


    return String(status)
        .trim()
        .toUpperCase();

}


/* =========================================================
   FILL CUSTOMER TABLE
========================================================= */

function fillCustomerTable(customers) {

    const tbody =
        document.getElementById(
            "customerTableBody"
        );


    if (!tbody) {

        return;

    }


    tbody.innerHTML = "";


    if (
        !customers ||
        customers.length === 0
    ) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="9"
                    class="loading-cell"
                >

                    No customers found.

                </td>

            </tr>

        `;


        return;

    }


    customers.forEach(
        function (customer) {


            /* =========================================
               ACCOUNT TYPE
            ========================================= */

            const accountType =
                customer.accountType || "-";


            /* =========================================
               STATUS
            ========================================= */

            const accountStatus =
                getCustomerStatus(
                    customer
                );


            /* =========================================
               ACCOUNT NUMBER
            ========================================= */

            const accountNumber =
                customer.accountNumber || "-";


            /* =========================================
               BALANCE
            ========================================= */

            const balance =
                customer.balance !== null &&
                customer.balance !== undefined
                    ? customer.balance
                    : 0;


            /* =========================================
               ACCOUNT TYPE CLASS
            ========================================= */

            let accountTypeClass =
                "account-current";


            if (
                String(accountType)
                    .toUpperCase()
                    .includes("SAVING")
            ) {

                accountTypeClass =
                    "account-savings";

            }


            /* =========================================
               STATUS CLASS
            ========================================= */

            let statusClass =
                "status-active";


            if (
                accountStatus ===
                "INACTIVE"
            ) {

                statusClass =
                    "status-inactive";

            }


            /* =========================================
               TABLE ROW
            ========================================= */

            tbody.innerHTML += `

                <tr>

                    <!-- Customer ID -->

                    <td>
                        ${escapeHtml(
                            customer.customerId
                        )}
                    </td>


                    <!-- Customer Name -->

                    <td>
                        ${escapeHtml(
                            customer.fullName
                        )}
                    </td>


                    <!-- Mobile -->

                    <td>
                        ${escapeHtml(
                            customer.mobile
                        )}
                    </td>


                    <!-- Email -->

                    <td>
                        ${escapeHtml(
                            customer.email
                        )}
                    </td>


                    <!-- Account Number -->

                    <td>
                        ${escapeHtml(
                            accountNumber
                        )}
                    </td>


                    <!-- Account Type -->

                    <td>

                        <span
                            class="account-type ${accountTypeClass}"
                        >

                            ${escapeHtml(
                                formatAccountType(
                                    accountType
                                )
                            )}

                        </span>

                    </td>


                    <!-- Balance -->

                    <td>

                        <span class="balance">

                            ₹ ${formatBalance(balance)}

                        </span>

                    </td>


                    <!-- STATUS -->

                    <td>

                        <span
                            class="account-status ${statusClass}"
                            onclick="toggleAccountStatus(
                                ${customer.customerId},
                                this
                            )"
                            title="Click to change status"
                        >

                            ${escapeHtml(
                                formatStatus(
                                    accountStatus
                                )
                            )}

                        </span>

                    </td>


                    <!-- VIEW -->

                    <td>

                        <button
                            type="button"
                            class="view-btn"
                            onclick="viewCustomer(
                                ${customer.customerId}
                            )"
                        >

                            <i class="fa-solid fa-eye"></i>

                            View

                        </button>

                    </td>

                </tr>

            `;

        }
    );

}


/* =========================================================
   TOGGLE ACTIVE / INACTIVE
========================================================= */

function toggleAccountStatus(
    customerId,
    statusElement
) {

    if (!customerId) {

        alert(
            "Customer ID not found."
        );

        return;

    }


    if (!statusElement) {

        return;

    }


    /*
     * Prevent double click.
     */

    if (
        statusElement.dataset.loading ===
        "true"
    ) {

        return;

    }


    /* =====================================================
       FIND CUSTOMER
    ===================================================== */

    const customer =
        allCustomers.find(
            function (item) {

                return Number(
                    item.customerId
                ) === Number(
                    customerId
                );

            }
        );


    if (!customer) {

        alert(
            "Customer not found."
        );

        return;

    }


    /*
     * Get CURRENT status before changing.
     */

    const oldStatus =
        getCustomerStatus(
            customer
        );


    /*
     * EXACT TOGGLE
     *
     * ACTIVE   -> INACTIVE
     * INACTIVE -> ACTIVE
     */

    const newStatus =
        oldStatus === "ACTIVE"
            ? "INACTIVE"
            : "ACTIVE";


    console.log(
        "Status Change:",
        oldStatus,
        "->",
        newStatus
    );


    /* =====================================================
       DISABLE BADGE
    ===================================================== */

    statusElement.dataset.loading =
        "true";


    statusElement.style.opacity =
        "0.5";


    statusElement.style.pointerEvents =
        "none";


    /* =====================================================
       API URL
    ===================================================== */

    const url =
        API_BASE +
        "/" +
        customerId +
        "/toggle-status";


    console.log(
        "Toggle Status URL:",
        url
    );


    /* =====================================================
       CALL BACKEND
    ===================================================== */

    fetch(
        url,
        {
            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json"
            }
        }
    )

    .then(
        function (response) {

            return response
                .json()
                .then(
                    function (result) {

                        if (
                            !response.ok
                        ) {

                            throw new Error(
                                result &&
                                result.message
                                    ? result.message
                                    : "Unable to change account status."
                            );

                        }


                        return result;

                    }
                );

        }
    )

    .then(
        function (result) {

            console.log(
                "Toggle Status Result:",
                result
            );


            /*
             * Backend request succeeded.
             */

            if (
                !result ||
                result.status !== true
            ) {

                throw new Error(
                    result &&
                    result.message
                        ? result.message
                        : "Unable to change account status."
                );

            }


            /* =================================================
               GET STATUS FROM BACKEND
            ================================================= */

            let backendStatus = null;


            /*
             * Case 1:
             *
             * data: "ACTIVE"
             */

            if (
                typeof result.data ===
                "string"
            ) {

                backendStatus =
                    result.data;

            }


            /*
             * Case 2:
             *
             * data: {
             *     status: "ACTIVE"
             * }
             */

            else if (
                result.data &&
                result.data.status
            ) {

                backendStatus =
                    result.data.status;

            }


            /*
             * If backend does not return
             * status, use our exact toggle.
             */

            if (!backendStatus) {

                backendStatus =
                    newStatus;

            }


            backendStatus =
                String(
                    backendStatus
                )
                .trim()
                .toUpperCase();


            /*
             * Only allow ACTIVE or INACTIVE.
             *
             * This prevents unwanted text
             * from appearing in the badge.
             */

            if (
                backendStatus !== "ACTIVE" &&
                backendStatus !== "INACTIVE"
            ) {

                backendStatus =
                    newStatus;

            }


            /* =================================================
               UPDATE CUSTOMER IN MEMORY
            ================================================= */

            customer.status =
                backendStatus;


            customer.accountStatus =
                backendStatus;


            /*
             * IMPORTANT:
             *
             * Do NOT print backend response
             * inside the table.
             *
             * Only print:
             *
             * Active
             *
             * OR
             *
             * Inactive
             */

            updateStatusElement(
                statusElement,
                backendStatus
            );


            /* =================================================
               UPDATE FILTERED CUSTOMER
            ================================================= */

            const filteredCustomer =
                filteredCustomers.find(
                    function (item) {

                        return Number(
                            item.customerId
                        ) === Number(
                            customerId
                        );

                    }
                );


            if (filteredCustomer) {

                filteredCustomer.status =
                    backendStatus;

                filteredCustomer.accountStatus =
                    backendStatus;

            }


            /*
             * Update summary.
             */

            updateSummary(
                filteredCustomers
            );


            /*
             * If a status filter is selected,
             * re-apply it.
             *
             * Example:
             *
             * Active filter
             * Active -> Inactive
             *
             * customer disappears.
             *
             * All filter
             * badge remains visible and changes.
             */

            const statusFilter =
                document.getElementById(
                    "accountStatusFilter"
                );


            const selectedStatus =
                statusFilter
                    ? statusFilter.value
                    : "ALL";


            if (
                selectedStatus !== "ALL"
            ) {

                applyAllFilters();

            }

        }
    )

    .catch(
        function (error) {

            console.error(
                "Toggle Status Error:",
                error
            );


            /*
             * IMPORTANT:
             *
             * Do not change badge when
             * backend request fails.
             */

            alert(
                error.message ||
                "Unable to change account status."
            );

        }
    )

    .finally(
        function () {

            statusElement.dataset.loading =
                "false";


            statusElement.style.opacity =
                "1";


            statusElement.style.pointerEvents =
                "auto";

        }
    );

}


/* =========================================================
   UPDATE STATUS BADGE
========================================================= */

function updateStatusElement(
    element,
    status
) {

    if (!element) {

        return;

    }


    /*
     * Normalize status.
     */

    let normalizedStatus =
        String(
            status || ""
        )
        .trim()
        .toUpperCase();


    /*
     * Only allow two statuses.
     */

    if (
        normalizedStatus !== "ACTIVE" &&
        normalizedStatus !== "INACTIVE"
    ) {

        return;

    }


    /* =====================================================
       REMOVE OLD STATUS CLASS
    ===================================================== */

    element.classList.remove(
        "status-active",
        "status-inactive"
    );


    /* =====================================================
       ADD NEW STATUS CLASS
    ===================================================== */

    if (
        normalizedStatus ===
        "INACTIVE"
    ) {

        element.classList.add(
            "status-inactive"
        );

    }

    else {

        element.classList.add(
            "status-active"
        );

    }


    /* =====================================================
       ONLY DISPLAY ACTIVE / INACTIVE
    ===================================================== */

    element.textContent =
        normalizedStatus === "ACTIVE"
            ? "Active"
            : "Inactive";

}


/* =========================================================
   VIEW CUSTOMER
========================================================= */

/* =========================================================
   VIEW CUSTOMER DETAILS
========================================================= */

function viewCustomer(customerId) {

    if (!customerId) {

        alert("Customer ID not found.");
        return;

    }

    console.log(
        "Opening Customer Details:",
        customerId
    );


    /*
     * Get application context path
     *
     * Example:
     * /BankingManagementSystemFrontend
     */

    const pathParts =
        window.location.pathname.split("/");


    const contextPath =
        "/" + pathParts[1];


    /*
     * Open CustomerFieldDetail.jsp
     *
     * Actual JSP location:
     *
     * webapp/employee/CustomerFieldDetail.jsp
     */

    const url =
        contextPath +
        "/employee/CustomerFieldDetail.jsp?id=" +
        encodeURIComponent(customerId);


    console.log(
        "Customer Details URL:",
        url
    );


    window.location.href = url;
}

/* =========================================================
   RESET FILTERS
========================================================= */

function resetFilters() {

    const keyword =
        document.getElementById(
            "searchKeyword"
        );


    const accountType =
        document.getElementById(
            "accountTypeFilter"
        );


    const status =
        document.getElementById(
            "accountStatusFilter"
        );


    if (keyword) {

        keyword.value = "";

    }


    if (accountType) {

        accountType.value =
            "ALL";

    }


    if (status) {

        status.value =
            "ALL";

    }


    currentPage = 0;


    applyAllFilters();

}


/* =========================================================
   PREVIOUS PAGE
========================================================= */

function previousPage() {

    if (
        currentPage <= 0
    ) {

        return;

    }


    currentPage--;


    renderCurrentPage();

}


/* =========================================================
   NEXT PAGE
========================================================= */

function nextPage() {

    const totalPages =
        Math.ceil(
            filteredCustomers.length /
            pageSize
        );


    if (
        currentPage >=
        totalPages - 1
    ) {

        return;

    }


    currentPage++;


    renderCurrentPage();

}


/* =========================================================
   PAGINATION
========================================================= */

function updatePagination(
    customers
) {

    const prevBtn =
        document.getElementById(
            "prevBtn"
        );


    const nextBtn =
        document.getElementById(
            "nextBtn"
        );


    const pageNo =
        document.getElementById(
            "pageNo"
        );


    const paginationInfo =
        document.getElementById(
            "paginationInfo"
        );


    const total =
        filteredCustomers.length;


    const totalPages =
        Math.ceil(
            total /
            pageSize
        );


    /* =====================================================
       PAGE NUMBER
    ===================================================== */

    if (pageNo) {

        pageNo.innerText =
            currentPage + 1;

    }


    /* =====================================================
       PREVIOUS BUTTON
    ===================================================== */

    if (prevBtn) {

        prevBtn.disabled =
            currentPage === 0;

    }


    /* =====================================================
       NEXT BUTTON
    ===================================================== */

    if (nextBtn) {

        nextBtn.disabled =
            currentPage >=
            totalPages - 1 ||
            totalPages === 0;

    }


    /* =====================================================
       SHOWING TEXT
    ===================================================== */

    if (paginationInfo) {

        if (total === 0) {

            paginationInfo.innerText =
                "Showing 0 customers";

        }

        else {

            const start =
                currentPage *
                pageSize +
                1;


            const end =
                Math.min(
                    start +
                    customers.length -
                    1,
                    total
                );


            paginationInfo.innerText =
                "Showing " +
                start +
                " to " +
                end +
                " customers";

        }

    }

}


/* =========================================================
   SUMMARY
========================================================= */

function updateSummary(
    customers
) {

    let active = 0;

    let savings = 0;

    let current = 0;


    customers.forEach(
        function (customer) {


            /* =========================================
               STATUS
            ========================================= */

            const status =
                getCustomerStatus(
                    customer
                );


            if (
                status ===
                "ACTIVE"
            ) {

                active++;

            }


            /* =========================================
               ACCOUNT TYPE
            ========================================= */

            const type =
                String(
                    customer.accountType ||
                    ""
                )
                .toUpperCase();


            if (
                type.includes(
                    "SAVING"
                )
            ) {

                savings++;

            }


            if (
                type.includes(
                    "CURRENT"
                )
            ) {

                current++;

            }

        }
    );


    setText(
        "totalCustomers",
        customers.length
    );


    setText(
        "activeAccounts",
        active
    );


    setText(
        "savingsAccounts",
        savings
    );


    setText(
        "currentAccounts",
        current
    );

}


/* =========================================================
   FORMAT ACCOUNT TYPE
========================================================= */

function formatAccountType(
    value
) {

    if (!value) {

        return "-";

    }


    const text =
        String(value)
            .toLowerCase();


    if (
        text.includes(
            "saving"
        )
    ) {

        return "Savings";

    }


    if (
        text.includes(
            "current"
        )
    ) {

        return "Current";

    }


    return value;

}


/* =========================================================
   FORMAT STATUS
========================================================= */

function formatStatus(
    value
) {

    if (!value) {

        return "-";

    }


    const text =
        String(value)
            .toLowerCase();


    if (
        text === "active"
    ) {

        return "Active";

    }


    if (
        text === "inactive"
    ) {

        return "Inactive";

    }


    /*
     * Fallback.
     */

    return text.replace(
        /\b\w/g,
        function (letter) {

            return letter.toUpperCase();

        }
    );

}


/* =========================================================
   FORMAT BALANCE
========================================================= */

function formatBalance(
    value
) {

    const number =
        Number(value);


    if (
        isNaN(number)
    ) {

        return "0.00";

    }


    return number.toLocaleString(
        "en-IN",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );

}


/* =========================================================
   SET TEXT
========================================================= */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.innerText =
            value;

    }

}


/* =========================================================
   LOADING
========================================================= */

function showLoading() {

    const tbody =
        document.getElementById(
            "customerTableBody"
        );


    if (!tbody) {

        return;

    }


    tbody.innerHTML = `

        <tr>

            <td
                colspan="9"
                class="loading-cell"
            >

                Loading customers...

            </td>

        </tr>

    `;

}


/* =========================================================
   ERROR
========================================================= */

function showError() {

    const tbody =
        document.getElementById(
            "customerTableBody"
        );


    if (!tbody) {

        return;

    }


    tbody.innerHTML = `

        <tr>

            <td
                colspan="9"
                class="loading-cell"
            >

                Unable to load customers.

            </td>

        </tr>

    `;

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(
    value
) {

    if (
        value === null ||
        value === undefined
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