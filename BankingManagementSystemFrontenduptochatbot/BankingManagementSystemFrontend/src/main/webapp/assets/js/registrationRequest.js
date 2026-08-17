/**
 * =========================================================
 * REGISTRATION REQUEST JS
 * Employee Registration Request
 * =========================================================
 */

console.log("RegistrationRequest JS Loaded");

const API_BASE =
    "http://localhost:8082/api/employee/requests";

let currentPage = 0;

const pageSize = 6;

let hasNextPage = false;


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Registration Request Page Loaded");

    loadDashboard();

    /*
     * Default option
     *
     * You can change this to ALL if your
     * dropdown should initially show ALL.
     */
    const statusFilter =
        document.getElementById("statusFilter");

    if (statusFilter) {

        /*
         * Keep whatever option is selected
         * in JSP.
         *
         * If nothing is selected,
         * use ALL.
         */
        if (!statusFilter.value) {

            statusFilter.value = "ALL";

        }

    }

    /*
     * Load first page
     */
    loadCustomers(0);


    /* =====================================================
       SEARCH BUTTON
    ===================================================== */

    const searchBtn =
        document.getElementById("searchBtn");

    if (searchBtn) {

        searchBtn.addEventListener(
            "click",
            function () {

                currentPage = 0;

                loadCustomers(0);

            }
        );

    }


    /* =====================================================
       RESET BUTTON
    ===================================================== */

    const resetBtn =
        document.getElementById("resetBtn");

    if (resetBtn) {

        resetBtn.addEventListener(
            "click",
            resetSearch
        );

    }


    /* =====================================================
       STATUS FILTER
    ===================================================== */

    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            function () {

                /*
                 * Whenever status changes,
                 * start from page 1.
                 */
                currentPage = 0;

                hasNextPage = false;

                loadCustomers(0);

            }
        );

    }


    /* =====================================================
       PREVIOUS BUTTON
    ===================================================== */

    const prevBtn =
        document.getElementById("prevBtn");

    if (prevBtn) {

        prevBtn.addEventListener(
            "click",
            function () {

                previousPage();

            }
        );

    }


    /* =====================================================
       NEXT BUTTON
    ===================================================== */

    const nextBtn =
        document.getElementById("nextBtn");

    if (nextBtn) {

        nextBtn.addEventListener(
            "click",
            function () {

                nextPage();

            }
        );

    }


    /* =====================================================
       DASHBOARD CARDS
    ===================================================== */

    const statusCards =
        document.querySelectorAll(
            ".dashboard-card"
        );

    statusCards.forEach(function (card) {

        card.addEventListener(
            "click",
            function () {

                const status =
                    card.getAttribute(
                        "data-status"
                    );

                if (!status) {

                    return;

                }

                if (statusFilter) {

                    statusFilter.value =
                        status;

                }

                currentPage = 0;

                hasNextPage = false;

                loadCustomers(0);

            }
        );

    });


    /* =====================================================
       ENTER KEY SEARCH
    ===================================================== */

    const searchKeyword =
        document.getElementById(
            "searchKeyword"
        );

    if (searchKeyword) {

        searchKeyword.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    currentPage = 0;

                    loadCustomers(0);

                }

            }
        );

    }

});


/* =========================================================
   DASHBOARD COUNTS
========================================================= */

function loadDashboard() {

    console.log("Loading dashboard...");

    fetch(
        API_BASE + "/dashboard"
    )

        .then(function (response) {

            if (!response.ok) {

                throw new Error(
                    "Dashboard HTTP Error: " +
                    response.status
                );

            }

            return response.json();

        })

        .then(function (result) {

            console.log(
                "Dashboard Result:",
                result
            );

            if (
                result &&
                result.status &&
                result.data
            ) {

                const pendingCount =
                    document.getElementById(
                        "pendingCount"
                    );

                const approvedCount =
                    document.getElementById(
                        "approvedCount"
                    );

                const rejectedCount =
                    document.getElementById(
                        "rejectedCount"
                    );

                const totalCount =
                    document.getElementById(
                        "totalCount"
                    );


                if (pendingCount) {

                    pendingCount.innerText =
                        result.data.pending || 0;

                }


                if (approvedCount) {

                    approvedCount.innerText =
                        result.data.approved || 0;

                }


                if (rejectedCount) {

                    rejectedCount.innerText =
                        result.data.rejected || 0;

                }


                if (totalCount) {

                    totalCount.innerText =
                        result.data.total || 0;

                }

            }

        })

        .catch(function (error) {

            console.error(
                "Dashboard Error:",
                error
            );

        });

}


/* =========================================================
   LOAD CUSTOMERS
   ALL / PENDING / APPROVED / REJECTED
   ALL USE PAGINATION
========================================================= */

function loadCustomers(page) {

    if (page === undefined) {

        page = 0;

    }


    /*
     * Do not allow negative page
     */
    if (page < 0) {

        page = 0;

    }


    currentPage = page;


    const statusElement =
        document.getElementById(
            "statusFilter"
        );

    const keywordElement =
        document.getElementById(
            "searchKeyword"
        );


    const status =
        statusElement
            ? statusElement.value
            : "ALL";


    const keyword =
        keywordElement
            ? keywordElement.value.trim()
            : "";


    console.log(
        "Loading Customers:",
        "Status =", status,
        "Keyword =", keyword,
        "Page =", page,
        "Size =", pageSize
    );


    /*
     * IMPORTANT
     *
     * ALL statuses now use the SAME
     * paginated search API.
     */

    const url =
        API_BASE +
        "/search?keyword=" +
        encodeURIComponent(keyword) +
        "&status=" +
        encodeURIComponent(status) +
        "&page=" +
        page +
        "&size=" +
        pageSize;


    console.log(
        "Customers URL:",
        url
    );


    fetch(url)

        .then(function (response) {

            if (!response.ok) {

                throw new Error(
                    "Customers HTTP Error: " +
                    response.status
                );

            }

            return response.json();

        })

        .then(function (result) {

            console.log(
                "Customers Result:",
                result
            );


            if (
                !result ||
                !result.status
            ) {

                fillTable([]);

                hasNextPage = false;

                updatePageNumber();

                updatePagination();

                return;

            }


            const customers =
                result.data || [];


            /*
             * IMPORTANT
             *
             * If user clicks Next but backend
             * returns zero records, that page
             * does not exist.
             */
            if (
                customers.length === 0 &&
                page > 0
            ) {

                console.log(
                    "No more records. Staying on page:",
                    currentPage
                );

                hasNextPage = false;

                updatePagination();

                return;

            }


            /*
             * Display records
             */
            fillTable(customers);


            /*
             * If exactly 6 records came,
             * there may be another page.
             *
             * If less than 6 came,
             * this is the last page.
             */
            hasNextPage =
                customers.length === pageSize;


            updatePageNumber();

            updatePagination();

        })

        .catch(function (error) {

            console.error(
                "Load Customers Error:",
                error
            );

            fillTable([]);

            hasNextPage = false;

            updatePageNumber();

            updatePagination();

        });

}


/* =========================================================
   FILL TABLE
========================================================= */

function fillTable(customers) {

    const tbody =
        document.getElementById(
            "requestTableBody"
        );


    if (!tbody) {

        console.error(
            "requestTableBody not found"
        );

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
                    colspan="7"
                    style="
                        text-align:center;
                        padding:30px;
                        color:#64748b;
                    "
                >

                    No registration requests found.

                </td>

            </tr>

        `;

        return;

    }


    customers.forEach(
        function (customer, index) {


            const status =
                customer.approvalStatus ||
                "PENDING_APPROVAL";


            let statusClass =
                "pending";


            let statusText =
                "Pending";


            if (
                status === "APPROVED"
            ) {

                statusClass =
                    "approved";

                statusText =
                    "Approved";

            }


            else if (
                status === "REJECTED"
            ) {

                statusClass =
                    "rejected";

                statusText =
                    "Rejected";

            }


            /* =================================================
               ACTION BUTTONS
            ================================================= */

            let actionButtons = `

                <button
                    type="button"
                    class="action-btn view-btn"
                    onclick="viewCustomer(${customer.customerId})"
                >

                    <i class="fa-solid fa-eye"></i>

                    View

                </button>

            `;


            /*
             * Pending customer
             *
             * Approve + Reject
             */

            if (
                status === "PENDING_APPROVAL"
            ) {

                actionButtons += `

                    <button
                        type="button"
                        class="action-btn approve-btn"
                        onclick="approveCustomer(${customer.customerId})"
                    >

                        <i class="fa-solid fa-check"></i>

                        Approve

                    </button>


                    <button
                        type="button"
                        class="action-btn reject-btn"
                        onclick="rejectCustomer(${customer.customerId})"
                    >

                        <i class="fa-solid fa-xmark"></i>

                        Reject

                    </button>

                `;

            }


            /*
             * Approved customer
             */

            else if (
                status === "APPROVED"
            ) {

                actionButtons += `

                    <span
                        class="action-completed approved-text"
                    >

                        <i class="fa-solid fa-circle-check"></i>

                        Approved

                    </span>

                `;

            }


            /*
             * Rejected customer
             */

            else if (
                status === "REJECTED"
            ) {

                actionButtons += `

                    <span
                        class="action-completed rejected-text"
                    >

                        <i class="fa-solid fa-circle-xmark"></i>

                        Rejected

                    </span>

                `;

            }


            /*
             * Serial number
             *
             * Page 1:
             * 1 - 6
             *
             * Page 2:
             * 7 - 12
             */

            const serialNumber =
                (currentPage * pageSize)
                + index
                + 1;


            tbody.innerHTML += `

                <tr>

                    <td>
                        ${serialNumber}
                    </td>


                    <td>
                        ${escapeHtml(
                            customer.fullName
                        )}
                    </td>


                    <td>
                        ${escapeHtml(
                            customer.email
                        )}
                    </td>


                    <td>
                        ${escapeHtml(
                            customer.mobile
                        )}
                    </td>


                    <td>
                        ${escapeHtml(
                            customer.accountType
                        )}
                    </td>


                    <td>

                        <span
                            class="status ${statusClass}"
                        >

                            ${statusText}

                        </span>

                    </td>


                    <td>

                        ${actionButtons}

                    </td>

                </tr>

            `;

        }
    );

}


/* =========================================================
   PREVIOUS PAGE
========================================================= */

function previousPage() {

    /*
     * Already on first page
     */
    if (currentPage <= 0) {

        return;

    }


    console.log(
        "Previous Page:",
        currentPage - 1
    );


    loadCustomers(
        currentPage - 1
    );

}


/* =========================================================
   NEXT PAGE
========================================================= */

function nextPage() {

    /*
     * No next page
     */
    if (!hasNextPage) {

        console.log(
            "Next page does not exist."
        );

        return;

    }


    console.log(
        "Next Page:",
        currentPage + 1
    );


    loadCustomers(
        currentPage + 1
    );

}


/* =========================================================
   UPDATE PAGE NUMBER
========================================================= */

function updatePageNumber() {

    const pageNo =
        document.getElementById(
            "pageNo"
        );


    if (pageNo) {

        pageNo.innerText =
            currentPage + 1;

    }

}


/* =========================================================
   UPDATE PAGINATION BUTTONS
========================================================= */

function updatePagination() {

    const prevBtn =
        document.getElementById(
            "prevBtn"
        );


    const nextBtn =
        document.getElementById(
            "nextBtn"
        );


    /*
     * PREVIOUS
     */

    if (prevBtn) {

        prevBtn.disabled =
            currentPage === 0;

    }


    /*
     * NEXT
     */

    if (nextBtn) {

        nextBtn.disabled =
            !hasNextPage;

    }

}


/* =========================================================
   RESET SEARCH
========================================================= */

function resetSearch() {

    const keyword =
        document.getElementById(
            "searchKeyword"
        );


    const status =
        document.getElementById(
            "statusFilter"
        );


    if (keyword) {

        keyword.value = "";

    }


    if (status) {

        status.value = "ALL";

    }


    currentPage = 0;

    hasNextPage = false;


    loadCustomers(0);

}


/* =========================================================
   SEARCH
========================================================= */

function searchCustomers() {

    /*
     * We don't need a separate API call here.
     *
     * loadCustomers() already sends:
     *
     * keyword
     * status
     * page
     * size
     */

    currentPage = 0;

    hasNextPage = false;

    loadCustomers(0);

}


/* =========================================================
   VIEW CUSTOMER
========================================================= */

function viewCustomer(customerId) {

    if (!customerId) {

        alert(
            "Customer ID not found."
        );

        return;

    }


    window.location.href =
        "customer-details.jsp?id=" +
        encodeURIComponent(
            customerId
        );

}


/* =========================================================
   APPROVE CUSTOMER
========================================================= */

function approveCustomer(customerId) {

    if (!customerId) {

        alert(
            "Customer ID not found."
        );

        return;

    }


    const confirmed =
        confirm(
            "Are you sure you want to approve this customer?"
        );


    if (!confirmed) {

        return;

    }


    const url =
        API_BASE +
        "/" +
        customerId +
        "/approve";


    console.log(
        "Approve URL:",
        url
    );


    fetch(
        url,
        {
            method: "PUT"
        }
    )

        .then(function (response) {

            if (!response.ok) {

                throw new Error(
                    "Approve HTTP Error: " +
                    response.status
                );

            }

            return response.json();

        })

        .then(function (result) {

            console.log(
                "Approve Result:",
                result
            );


            if (
                result &&
                result.status
            ) {

                alert(
                    result.message ||
                    "Customer approved successfully."
                );


                /*
                 * Refresh dashboard
                 */

                loadDashboard();


                /*
                 * Reload current registration page
                 */

                loadCustomers(
                    currentPage
                );

            }

            else {

                alert(
                    result.message ||
                    "Unable to approve customer."
                );

            }

        })

        .catch(function (error) {

            console.error(
                "Approve Error:",
                error
            );


            alert(
                "Approve failed. Check browser console and backend."
            );

        });

}


/* =========================================================
   REJECT CUSTOMER
========================================================= */

function rejectCustomer(customerId) {

    if (!customerId) {

        alert(
            "Customer ID not found."
        );

        return;

    }


    const confirmed =
        confirm(
            "Are you sure you want to reject this customer?"
        );


    if (!confirmed) {

        return;

    }


    const url =
        API_BASE +
        "/" +
        customerId +
        "/reject";


    console.log(
        "Reject URL:",
        url
    );


    fetch(
        url,
        {
            method: "PUT"
        }
    )

        .then(function (response) {

            if (!response.ok) {

                throw new Error(
                    "Reject HTTP Error: " +
                    response.status
                );

            }

            return response.json();

        })

        .then(function (result) {

            console.log(
                "Reject Result:",
                result
            );


            if (
                result &&
                result.status
            ) {

                alert(
                    result.message ||
                    "Customer rejected successfully."
                );


                loadDashboard();


                loadCustomers(
                    currentPage
                );

            }

            else {

                alert(
                    result.message ||
                    "Unable to reject customer."
                );

            }

        })

        .catch(function (error) {

            console.error(
                "Reject Error:",
                error
            );


            alert(
                "Reject failed. Check browser console and backend."
            );

        });

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

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