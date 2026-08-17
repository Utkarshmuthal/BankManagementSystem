document.addEventListener("DOMContentLoaded", function () {

    /* ========================================================
       BACKEND API
       ======================================================== */

    const API_BASE_URL = "http://localhost:8082/api/admin/accounts";


    /* ========================================================
       ACCOUNT DATA
       This will now come from Spring Boot API
       ======================================================== */

    let accounts = [];


    /* ========================================================
       ELEMENTS
       ======================================================== */

    const tableBody =
        document.getElementById("accountsTableBody");

    const searchInput =
        document.getElementById("accountSearch");

    const typeFilter =
        document.getElementById("accountTypeFilter");

    const statusFilter =
        document.getElementById("statusFilter");

    const refreshBtn =
        document.getElementById("refreshBtn");

    const emptyState =
        document.getElementById("emptyState");

    const errorState =
        document.getElementById("errorState");

    const errorMessage =
        document.getElementById("errorMessage");

    const retryBtn =
        document.getElementById("retryBtn");

    const accountCount =
        document.getElementById("accountCount");

    const totalAccounts =
        document.getElementById("totalAccounts");

    const activeAccounts =
        document.getElementById("activeAccounts");

    const inactiveAccounts =
        document.getElementById("inactiveAccounts");

    const newAccounts =
        document.getElementById("newAccounts");


    /* ========================================================
       MODAL ELEMENTS
       ======================================================== */

    const modal =
        document.getElementById("accountModal");

    const modalClose =
        document.getElementById("modalClose");

    const closeModalBtn =
        document.getElementById("closeModalBtn");


    /* ========================================================
       FORMAT CURRENCY
       ======================================================== */

    function formatCurrency(amount) {

        if (amount === null || amount === undefined) {
            amount = 0;
        }

        return new Intl.NumberFormat("en-IN", {

            style: "currency",

            currency: "INR",

            minimumFractionDigits: 2

        }).format(Number(amount));

    }


    /* ========================================================
       FORMAT DATE
       ======================================================== */

    function formatDate(dateValue) {

        if (!dateValue) {
            return "—";
        }

        const date = new Date(dateValue);

        if (isNaN(date.getTime())) {
            return dateValue;
        }

        return date.toLocaleDateString("en-IN", {

            day: "2-digit",

            month: "2-digit",

            year: "numeric"

        });

    }


    /* ========================================================
       LOAD ALL ACCOUNTS
       GET /api/admin/accounts
       ======================================================== */

    async function loadAccounts() {

        showLoading();

        hideError();

        try {

            const response =
                await fetch(API_BASE_URL, {

                    method: "GET",

                    headers: {
                        "Accept": "application/json"
                    }

                });


            if (!response.ok) {

                throw new Error(
                    "Server returned status " +
                    response.status
                );

            }


            const result =
                await response.json();


            console.log("Accounts API Response:", result);


            /*
             * If your backend returns:
             *
             * {
             *   "success": true,
             *   "message": "...",
             *   "data": [...]
             * }
             *
             * then use result.data.
             *
             * If your backend directly returns [...]
             * then use result.
             */

            if (Array.isArray(result)) {

                accounts = result;

            } else if (Array.isArray(result.data)) {

                accounts = result.data;

            } else {

                accounts = [];

            }


            updateStatistics();

            populateAccountTypes();

            filterAccounts();


        } catch (error) {

            console.error(
                "Error loading accounts:",
                error
            );

            showError(
                "Unable to connect to the Accounts API. " +
                "Please check whether your Spring Boot backend is running."
            );

        }

    }


    /* ========================================================
       SHOW LOADING
       ======================================================== */

    function showLoading() {

        tableBody.innerHTML = `

            <tr id="loadingRow">

                <td colspan="8">

                    <div class="loading-state">

                        <div class="spinner"></div>

                        <span>
                            Loading accounts...
                        </span>

                    </div>

                </td>

            </tr>

        `;

        emptyState.style.display = "none";

    }


    /* ========================================================
       SHOW ERROR
       ======================================================== */

    function showError(message) {

        if (errorState) {

            errorState.style.display = "block";

        }

        if (errorMessage) {

            errorMessage.textContent = message;

        }

        tableBody.innerHTML = "";

        emptyState.style.display = "none";

        accountCount.textContent =
            "Unable to load accounts";

    }


    /* ========================================================
       HIDE ERROR
       ======================================================== */

    function hideError() {

        if (errorState) {

            errorState.style.display = "none";

        }

    }


    /* ========================================================
       UPDATE STATISTICS
       ======================================================== */

    function updateStatistics() {

        const total =
            accounts.length;


        const active =
            accounts.filter(function (account) {

                return String(account.status)
                    .toUpperCase() === "ACTIVE";

            }).length;


        const inactive =
            accounts.filter(function (account) {

                return String(account.status)
                    .toUpperCase() === "INACTIVE";

            }).length;


        if (totalAccounts) {

            totalAccounts.textContent = total;

        }


        if (activeAccounts) {

            activeAccounts.textContent = active;

        }


        if (inactiveAccounts) {

            inactiveAccounts.textContent = inactive;

        }


        /*
         * New accounts this month
         */

        const now = new Date();

        const currentMonth =
            now.getMonth();

        const currentYear =
            now.getFullYear();


        const monthlyAccounts =
            accounts.filter(function (account) {

                if (!account.createdAt) {
                    return false;
                }

                const date =
                    new Date(account.createdAt);

                return (
                    date.getMonth() === currentMonth &&
                    date.getFullYear() === currentYear
                );

            }).length;


        if (newAccounts) {

            newAccounts.textContent =
                monthlyAccounts;

        }

    }


    /* ========================================================
       POPULATE ACCOUNT TYPE FILTER
       ======================================================== */

    function populateAccountTypes() {

        if (!typeFilter) {
            return;
        }


        const currentValue =
            typeFilter.value;


        const types = [
            ...new Set(
                accounts
                    .map(function (account) {
                        return account.accountType;
                    })
                    .filter(function (type) {
                        return type;
                    })
            )
        ];


        typeFilter.innerHTML = `

            <option value="">
                All Types
            </option>

        `;


        types.forEach(function (type) {

            const option =
                document.createElement("option");

            option.value = type;

            option.textContent = type;

            typeFilter.appendChild(option);

        });


        typeFilter.value = currentValue;

    }


    /* ========================================================
       RENDER TABLE
       ======================================================== */

    function renderAccounts(data) {

        tableBody.innerHTML = "";


        if (data.length === 0) {

            emptyState.style.display = "block";

            accountCount.textContent =
                "Showing 0 accounts";

            return;

        }


        emptyState.style.display = "none";


        data.forEach(function (account, index) {

            const row =
                document.createElement("tr");


            const status =
                String(account.status || "")
                    .toUpperCase();


            let statusClass =
                "status-default";


            if (status === "ACTIVE") {

                statusClass =
                    "status-active";

            } else if (status === "INACTIVE") {

                statusClass =
                    "status-inactive";

            }


            row.innerHTML = `

                <td>
                    ${index + 1}
                </td>

                <td class="account-number-cell">
                    ${account.accountNumber || "—"}
                </td>

                <td>
                    ${account.customerId || "—"}
                </td>

                <td>
                    ${account.accountType || "—"}
                </td>

                <td class="balance-cell">
                    ${formatCurrency(account.balance)}
                </td>

                <td>

                    <span class="status-badge ${statusClass}">
                        ${status || "—"}
                    </span>

                </td>

                <td>
                    ${formatDate(account.createdAt)}
                </td>

                <td>

                    <button
                        type="button"
                        class="view-btn"
                        data-id="${account.accountId}"
                        title="View Account">

                        <i class="fa-solid fa-eye"></i>

                    </button>

                </td>

            `;


            tableBody.appendChild(row);

        });


        accountCount.textContent =
            "Showing " + data.length + " accounts";


        /* ====================================================
           VIEW BUTTON EVENTS
           ==================================================== */

        document
            .querySelectorAll(".view-btn")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const id =
                            Number(this.dataset.id);

                        openAccountModal(id);

                    }
                );

            });

    }


    /* ========================================================
       SEARCH + FILTER
       ======================================================== */

    function filterAccounts() {

        const search =
            searchInput.value
                .trim()
                .toLowerCase();


        const selectedType =
            typeFilter.value;


        const selectedStatus =
            statusFilter.value;


        const filtered =
            accounts.filter(function (account) {


                const accountNumber =
                    String(
                        account.accountNumber || ""
                    ).toLowerCase();


                const customerId =
                    String(
                        account.customerId || ""
                    ).toLowerCase();


                const accountType =
                    String(
                        account.accountType || ""
                    );


                const status =
                    String(
                        account.status || ""
                    ).toUpperCase();


                const matchesSearch =

                    accountNumber.includes(search)

                    ||

                    customerId.includes(search);


                const matchesType =

                    selectedType === ""

                    ||

                    accountType === selectedType;


                const matchesStatus =

                    selectedStatus === ""

                    ||

                    status === selectedStatus;


                return (

                    matchesSearch &&

                    matchesType &&

                    matchesStatus

                );

            });


        renderAccounts(filtered);

    }


    /* ========================================================
       GET ACCOUNT BY ID
       GET /api/admin/accounts/{id}
       ======================================================== */

    async function openAccountModal(accountId) {

        try {

            const response =
                await fetch(
                    API_BASE_URL + "/" + accountId,
                    {
                        method: "GET",

                        headers: {
                            "Accept": "application/json"
                        }
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Unable to load account details"
                );

            }


            const result =
                await response.json();


            console.log(
                "Account Details API Response:",
                result
            );


            let account;


            if (result.data) {

                account = result.data;

            } else {

                account = result;

            }


            if (!account) {

                throw new Error(
                    "Account not found"
                );

            }


            /* =================================================
               FILL MODAL
               ================================================= */

            document.getElementById(
                "detailAccountId"
            ).textContent =
                account.accountId || "—";


            document.getElementById(
                "detailAccountNumber"
            ).textContent =
                account.accountNumber || "—";


            document.getElementById(
                "detailCustomerId"
            ).textContent =
                account.customerId || "—";


            document.getElementById(
                "detailAccountType"
            ).textContent =
                account.accountType || "—";


            document.getElementById(
                "detailBalance"
            ).textContent =
                formatCurrency(account.balance);


            const statusElement =
                document.getElementById(
                    "detailStatus"
                );


            const status =
                String(account.status || "")
                    .toUpperCase();


            statusElement.textContent =
                status || "—";


            if (status === "ACTIVE") {

                statusElement.className =
                    "status-badge status-active";

            } else if (status === "INACTIVE") {

                statusElement.className =
                    "status-badge status-inactive";

            } else {

                statusElement.className =
                    "status-badge status-default";

            }


            document.getElementById(
                "detailCreatedAt"
            ).textContent =
                formatDate(account.createdAt);


            /* =================================================
               OPEN MODAL
               ================================================= */

            modal.style.display = "flex";

            document.body.style.overflow = "hidden";


        } catch (error) {

            console.error(
                "Account details error:",
                error
            );

            alert(
                "Unable to load account details."
            );

        }

    }


    /* ========================================================
       CLOSE MODAL
       ======================================================== */

    function closeAccountModal() {

        modal.style.display = "none";

        document.body.style.overflow = "";

    }


    /* ========================================================
       SEARCH EVENT
       ======================================================== */

    searchInput.addEventListener(
        "input",
        filterAccounts
    );


    /* ========================================================
       TYPE FILTER
       ======================================================== */

    typeFilter.addEventListener(
        "change",
        filterAccounts
    );


    /* ========================================================
       STATUS FILTER
       ======================================================== */

    statusFilter.addEventListener(
        "change",
        filterAccounts
    );


    /* ========================================================
       REFRESH
       ======================================================== */

    refreshBtn.addEventListener(
        "click",
        function () {

            searchInput.value = "";

            typeFilter.value = "";

            statusFilter.value = "";

            loadAccounts();

        }
    );


    /* ========================================================
       MODAL CLOSE BUTTON
       ======================================================== */

    modalClose.addEventListener(
        "click",
        closeAccountModal
    );


    closeModalBtn.addEventListener(
        "click",
        closeAccountModal
    );


    /* ========================================================
       CLOSE MODAL OUTSIDE
       ======================================================== */

    modal.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {

                closeAccountModal();

            }

        }
    );


    /* ========================================================
       CLOSE MODAL WITH ESC
       ======================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (

                event.key === "Escape"

                &&

                modal.style.display === "flex"

            ) {

                closeAccountModal();

            }

        }
    );


    /* ========================================================
       RETRY API
       ======================================================== */

    if (retryBtn) {

        retryBtn.addEventListener(
            "click",
            loadAccounts
        );

    }


    /* ========================================================
       INITIAL LOAD
       ======================================================== */

    loadAccounts();

});