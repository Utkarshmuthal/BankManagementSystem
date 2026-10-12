/**
 * Customer Transaction History
 *
 * Connected to Spring Boot backend.
 */

"use strict";


/* =========================================================
   CONFIGURATION
   ========================================================= */

const BACKEND_PORT = "8082";

const API_BASE_URL =
    window.location.port === BACKEND_PORT
        ? "/api"
        : `http://localhost:${BACKEND_PORT}/api`;


/*
 * Backend is connected.
 */
const USE_MOCK_DATA = false;


/* =========================================================
   VARIABLES
   ========================================================= */

let allTransactions = [];

let filteredTransactions = [];

let currentPageNumber = 1;

const recordsPerPage = 8;


/*
 * Total records available in backend.
 *
 * Important:
 * This is NOT the number of transactions currently
 * loaded on the page.
 */
let totalTransactionRecords = 0;


/*
 * Actual logged-in customer's account number.
 */
let customerAccountNumber = null;


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Customer Transaction History loaded."
        );

        /*
         * Make sure old account value is not reused.
         */
        customerAccountNumber = null;

        /*
         * Clear old frontend transaction arrays.
         */
        allTransactions = [];
        filteredTransactions = [];

        /*
         * Set current date and time.
         */
        setCurrentDateTime();

        /*
         * Load logged-in customer's data.
         */
        loadCustomerTransactionHistory();

        /*
         * Setup Enter key search.
         */
        setupSearch();
    }
);


/* =========================================================
   LOAD CUSTOMER TRANSACTION HISTORY
   ========================================================= */

async function loadCustomerTransactionHistory() {

    try {

        /*
         * Get currently logged-in customer ID.
         */
        const customerId =
            sessionStorage.getItem("customerId");


        console.log(
            "Session Customer ID:",
            customerId
        );


        /*
         * Customer is not logged in.
         */
        if (!customerId) {

            alert(
                "Customer session not found. Please login again."
            );

            window.location.href =
                "../login.jsp";

            return;
        }


        /*
         * Make sure logged-in user is CUSTOMER.
         */
        const role =
            sessionStorage.getItem("role");


        if (
            role &&
            role !== "CUSTOMER"
        ) {

            alert(
                "You are not authorized to access this page."
            );

            window.location.href =
                "../login.jsp";

            return;
        }


        /* =====================================================
           GET CUSTOMER ACCOUNT DETAILS
           ===================================================== */

        /*
         * IMPORTANT:
         *
         * We are NOT using a hardcoded account number.
         *
         * We first get the account belonging to the
         * logged-in customer.
         */
        const accountResponse =
            await fetch(
                `${API_BASE_URL}/customer/dashboard/${encodeURIComponent(customerId)}`,
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


        if (!accountResponse.ok) {

            throw new Error(
                `Unable to fetch customer account. HTTP Status: ${accountResponse.status}`
            );
        }


        const accountResult =
            await accountResponse.json();


        console.log(
            "Customer Dashboard Response:",
            accountResult
        );


        /*
         * Existing API response structure:
         *
         * {
         *     data: {
         *         customerId: ...,
         *         accountNumber: ...
         *     }
         * }
         */
        const accountData =
            accountResult.data;


        if (
            !accountData ||
            !accountData.accountNumber
        ) {

            throw new Error(
                "Account number not found for logged-in customer."
            );
        }


        /*
         * Store ONLY this customer's account number.
         */
        customerAccountNumber =
            String(
                accountData.accountNumber
            );


        console.log(
            "Logged-in Customer Account Number:",
            customerAccountNumber
        );


        /*
         * Display account number on page.
         */
        const accountNumberElement =
            document.getElementById(
                "accountNumber"
            );


        if (accountNumberElement) {

            accountNumberElement.innerText =
                customerAccountNumber;
        }


        /* =====================================================
           LOAD FIRST PAGE OF TRANSACTIONS
           ===================================================== */

        currentPageNumber = 1;

        await loadTransactions();


        /* =====================================================
           LOAD TRANSACTION SUMMARY
           ===================================================== */

        await loadTransactionSummary(
            customerAccountNumber
        );

    }
    catch (error) {

        console.error(
            "Error loading customer transaction history:",
            error
        );


        allTransactions = [];

        filteredTransactions = [];

        totalTransactionRecords = 0;


        showEmptyState();

        updatePagination();


        alert(
            "Unable to load transaction history."
        );
    }
}


/* =========================================================
   LOAD TRANSACTIONS
   ========================================================= */

async function loadTransactions() {

    try {

        /*
         * Check account number.
         */
        if (!customerAccountNumber) {

            console.error(
                "Customer account number is missing."
            );

            return;
        }


        /*
         * MOCK DATA
         *
         * Currently disabled.
         */
        if (USE_MOCK_DATA) {

            allTransactions = [];

            filteredTransactions = [];

            totalTransactionRecords = 0;

            renderTransactions();

            return;
        }


        /* =====================================================
           GET FILTER VALUES
           ===================================================== */

        const transactionTypeElement =
            document.getElementById(
                "transactionType"
            );


        const searchElement =
            document.getElementById(
                "transactionSearch"
            );


        const fromDateElement =
            document.getElementById(
                "fromDate"
            );


        const toDateElement =
            document.getElementById(
                "toDate"
            );


        const transactionType =
            transactionTypeElement
                ? transactionTypeElement.value
                : "ALL";


        const search =
            searchElement
                ? searchElement.value.trim()
                : "";


        const fromDate =
            fromDateElement
                ? fromDateElement.value
                : "";


        const toDate =
            toDateElement
                ? toDateElement.value
                : "";


        /* =====================================================
           BUILD BACKEND URL
           ===================================================== */

        const params =
            new URLSearchParams();


        /*
         * Logged-in customer's account.
         */
        params.append(
            "accountNumber",
            customerAccountNumber
        );


        /*
         * Backend page is ZERO based.
         *
         * Frontend page:
         * 1, 2, 3...
         *
         * Backend page:
         * 0, 1, 2...
         */
        params.append(
            "page",
            currentPageNumber - 1
        );


        /*
         * Number of records per page.
         */
        params.append(
            "size",
            recordsPerPage
        );


        /*
         * Transaction type.
         */
        if (
            transactionType &&
            transactionType !== "ALL"
        ) {

            params.append(
                "transactionType",
                transactionType
            );
        }


        /*
         * Search.
         */
        if (search) {

            params.append(
                "search",
                search
            );
        }


        /*
         * From date.
         */
        if (fromDate) {

            params.append(
                "fromDate",
                fromDate
            );
        }


        /*
         * To date.
         */
        if (toDate) {

            params.append(
                "toDate",
                toDate
            );
        }


        /* =====================================================
           CALL BACKEND
           ===================================================== */

        const response =
            await fetch(
                `${API_BASE_URL}/customer/transactions/history?${params.toString()}`,
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                `Unable to fetch transaction history. HTTP Status: ${response.status}`
            );
        }


        /* =====================================================
           CONVERT RESPONSE TO JSON
           ===================================================== */

        const result =
            await response.json();


        console.log(
            "Transaction History Response:",
            result
        );


        /* =====================================================
           CHECK RESPONSE
           ===================================================== */

        if (
            !result ||
            !Array.isArray(result.transactions)
        ) {

            throw new Error(
                "Invalid transaction response from backend."
            );
        }


        /*
         * Backend gives total number of matching
         * transactions.
         */
        totalTransactionRecords =
            Number(
                result.totalTransactions
            ) || 0;


        /* =====================================================
           CONVERT BACKEND DATA
           ===================================================== */

        allTransactions =
            result.transactions.map(
                function (transaction) {

                    let amount =
                        Number(
                            transaction.amount
                        ) || 0;


                    /* =========================================
                       DEPOSIT
                       ========================================= */

                    if (
                        transaction.transactionType &&
                        transaction.transactionType.toUpperCase() ===
                        "DEPOSIT"
                    ) {

                        amount =
                            Math.abs(amount);
                    }


                    /* =========================================
                       WITHDRAW
                       ========================================= */

                    else if (
                        transaction.transactionType &&
                        transaction.transactionType.toUpperCase() ===
                        "WITHDRAW"
                    ) {

                        amount =
                            -Math.abs(amount);
                    }


                    /* =========================================
                       TRANSFER
                       ========================================= */

                    else if (
                        transaction.transactionType &&
                        transaction.transactionType.toUpperCase() ===
                        "TRANSFER"
                    ) {

                        /*
                         * Money sent by customer
                         */
                        if (
                            String(
                                transaction.fromAccount
                            ) ===
                            String(
                                customerAccountNumber
                            )
                        ) {

                            amount =
                                -Math.abs(amount);
                        }


                        /*
                         * Money received by customer
                         */
                        else if (
                            String(
                                transaction.toAccount
                            ) ===
                            String(
                                customerAccountNumber
                            )
                        ) {

                            amount =
                                Math.abs(amount);
                        }
                    }


                    /*
                     * Other transaction types.
                     */
                    else {

                        amount =
                            Math.abs(amount);
                    }


                    /* =========================================
                       RETURN FRONTEND OBJECT
                       ========================================= */

                    return {

                        date:
                            formatTransactionDate(
                                transaction.transactionDate
                            ),

                        type:
                            transaction.transactionType,

                        description:
                            transaction.description ||
                            "-",

                        referenceId:
                            "TXN" +
                            transaction.transactionId,

                        amount:
                            amount,

                        balance:
                            Number(
                                transaction.currentBalance
                            ) || 0,

                        status:
                            transaction.status
                    };
                }
            );


        /*
         * For the current page.
         */
        filteredTransactions =
            [
                ...allTransactions
            ];


        /*
         * Display transactions.
         */
        renderTransactions();

    }
    catch (error) {

        console.error(
            "Error loading transactions:",
            error
        );


        allTransactions = [];

        filteredTransactions = [];

        totalTransactionRecords = 0;


        showEmptyState();

        updatePagination();
    }
}


/* =========================================================
   LOAD TRANSACTION SUMMARY
   ========================================================= */

async function loadTransactionSummary(
    accountNumber
) {

    try {

        if (!accountNumber) {

            return;
        }


        /*
         * Get date filters.
         */
        const fromDateElement =
            document.getElementById(
                "fromDate"
            );


        const toDateElement =
            document.getElementById(
                "toDate"
            );


        const fromDate =
            fromDateElement
                ? fromDateElement.value
                : "";


        const toDate =
            toDateElement
                ? toDateElement.value
                : "";


        const params =
            new URLSearchParams();


        params.append(
            "accountNumber",
            accountNumber
        );


        if (fromDate) {

            params.append(
                "fromDate",
                fromDate
            );
        }


        if (toDate) {

            params.append(
                "toDate",
                toDate
            );
        }


        /* =====================================================
           CALL SUMMARY API
           ===================================================== */

        const response =
            await fetch(
                `${API_BASE_URL}/customer/transactions/summary?${params.toString()}`,
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                `Unable to fetch transaction summary. HTTP Status: ${response.status}`
            );
        }


        const summary =
            await response.json();


        console.log(
            "Transaction Summary:",
            summary
        );


        /* =====================================================
           AVAILABLE BALANCE
           ===================================================== */

        const balanceElement =
            document.getElementById(
                "availableBalance"
            );


        if (balanceElement) {

            balanceElement.innerText =
                `₹${formatNumber(
                    summary.currentBalance
                )}`;
        }


        /* =====================================================
           TOTAL TRANSACTIONS
           ===================================================== */

        const totalTransactionsElement =
            document.getElementById(
                "totalTransactions"
            );


        if (totalTransactionsElement) {

            totalTransactionsElement.innerText =
                Number(
                    summary.totalTransactions
                ) || 0;
        }


        /* =====================================================
           TOTAL DEPOSITS
           ===================================================== */

        const totalDepositsElement =
            document.getElementById(
                "totalDeposits"
            );


        if (totalDepositsElement) {

            totalDepositsElement.innerText =
                `₹${formatNumber(
                    summary.totalDeposits
                )}`;
        }


        /* =====================================================
           TOTAL WITHDRAWALS
           ===================================================== */

        const totalWithdrawalsElement =
            document.getElementById(
                "totalWithdrawals"
            );


        if (totalWithdrawalsElement) {

            totalWithdrawalsElement.innerText =
                `₹${formatNumber(
                    summary.totalWithdrawals
                )}`;
        }

    }
    catch (error) {

        console.error(
            "Error loading transaction summary:",
            error
        );
    }
}


/* =========================================================
   FORMAT TRANSACTION DATE
   ========================================================= */

function formatTransactionDate(
    dateString
) {

    if (!dateString) {

        return "-";
    }


    const date =
        new Date(dateString);


    if (isNaN(date.getTime())) {

        return "-";
    }


    const datePart =
        date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );


    const timePart =
        date.toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    return `${datePart}, ${timePart}`;
}


/* =========================================================
   RENDER TRANSACTIONS
   ========================================================= */

function renderTransactions() {

    const tableBody =
        document.getElementById(
            "transactionTableBody"
        );


    const emptyState =
        document.getElementById(
            "emptyTransactionState"
        );


    if (!tableBody) {

        return;
    }


    tableBody.innerHTML = "";


    /*
     * No transactions.
     */
    if (
        filteredTransactions.length === 0
    ) {

        showEmptyState();

        updatePagination();

        return;
    }


    /*
     * Hide empty state.
     */
    if (emptyState) {

        emptyState.style.display =
            "none";
    }


    /*
     * IMPORTANT:
     *
     * Backend already sends only 8 records.
     *
     * Therefore we DO NOT slice the array here.
     */
    filteredTransactions.forEach(
        function (transaction) {

            const row =
                document.createElement(
                    "tr"
                );


            /*
             * Credit / Debit class.
             */
            const amountClass =
                transaction.amount >= 0
                    ? "credit"
                    : "debit";


            /*
             * Credit gets + sign.
             */
            const amountPrefix =
                transaction.amount >= 0
                    ? "+"
                    : "";


            /*
             * Date parts.
             */
            const dateParts =
                transaction.date.split(",");


            const dateOnly =
                dateParts[0] || "-";


            const timeOnly =
                dateParts
                    .slice(1)
                    .join(",") || "-";


            /* =================================================
               CREATE ROW
               ================================================= */

            row.innerHTML = `

                <td>

                    <div class="date-time">

                        <strong>
                            ${dateOnly}
                        </strong>

                        <small>
                            ${timeOnly}
                        </small>

                    </div>

                </td>


                <td>

                    <span class="transaction-type ${getTypeClass(transaction.type)}">

                        ${formatTransactionType(
                            transaction.type
                        )}

                    </span>

                </td>


                <td>

                    <div class="description">

                        <strong>
                            ${transaction.description}
                        </strong>

                    </div>

                </td>


                <td>

                    <span class="reference-id">

                        ${transaction.referenceId}

                    </span>

                </td>


                <td>

                    <span class="transaction-amount ${amountClass}">

                        ${amountPrefix}
                        ₹${formatNumber(
                            Math.abs(
                                transaction.amount
                            )
                        )}

                    </span>

                </td>


                <td>

                    <span class="balance">

                        ₹${formatNumber(
                            transaction.balance
                        )}

                    </span>

                </td>


                <td>

                    <span class="status ${getStatusClass(transaction.status)}">

                        <i class="fa-solid fa-circle-check"></i>

                        ${formatStatus(
                            transaction.status
                        )}

                    </span>

                </td>

            `;


            tableBody.appendChild(
                row
            );

        }
    );


    /*
     * Update pagination.
     */
    updatePagination();
}


/* =========================================================
   TRANSACTION TYPE CLASS
   ========================================================= */

function getTypeClass(type) {

    if (!type) {

        return "";
    }


    switch (
        type.toUpperCase()
    ) {

        case "DEPOSIT":

            return "deposit";


        case "WITHDRAW":

            return "withdraw";


        case "TRANSFER":

            return "transfer";


        case "INTEREST":

            return "interest";


        default:

            return "";
    }
}


/* =========================================================
   FORMAT TRANSACTION TYPE
   ========================================================= */

function formatTransactionType(type) {

    if (!type) {

        return "-";
    }


    switch (
        type.toUpperCase()
    ) {

        case "DEPOSIT":

            return "Deposit";


        case "WITHDRAW":

            return "Withdrawal";


        case "TRANSFER":

            return "Transfer";


        case "INTEREST":

            return "Interest";


        default:

            return type;
    }
}


/* =========================================================
   STATUS CLASS
   ========================================================= */

function getStatusClass(status) {

    if (
        status &&
        status.toUpperCase() === "SUCCESS"
    ) {

        return "success";
    }


    return "failed";
}


/* =========================================================
   FORMAT STATUS
   ========================================================= */

function formatStatus(status) {

    if (!status) {

        return "Unknown";
    }


    switch (
        status.toUpperCase()
    ) {

        case "SUCCESS":

            return "Success";


        case "FAILED":

            return "Failed";


        case "PENDING":

            return "Pending";


        default:

            return status;
    }
}


/* =========================================================
   APPLY FILTERS
   ========================================================= */

async function applyFilters() {

    /*
     * Start from page 1.
     */
    currentPageNumber = 1;


    /*
     * Reload from backend with filters.
     */
    await loadTransactions();


    /*
     * Reload summary for date filters.
     */
    await loadTransactionSummary(
        customerAccountNumber
    );
}


/* =========================================================
   RESET FILTERS
   ========================================================= */

async function resetFilters() {

    const fromDateElement =
        document.getElementById(
            "fromDate"
        );


    const toDateElement =
        document.getElementById(
            "toDate"
        );


    const transactionTypeElement =
        document.getElementById(
            "transactionType"
        );


    const searchElement =
        document.getElementById(
            "transactionSearch"
        );


    if (fromDateElement) {

        fromDateElement.value =
            "";
    }


    if (toDateElement) {

        toDateElement.value =
            "";
    }


    if (transactionTypeElement) {

        transactionTypeElement.value =
            "ALL";
    }


    if (searchElement) {

        searchElement.value =
            "";
    }


    /*
     * Start from page 1.
     */
    currentPageNumber = 1;


    /*
     * Load all transactions again
     * for this customer's account.
     */
    await loadTransactions();


    /*
     * Reload summary.
     */
    await loadTransactionSummary(
        customerAccountNumber
    );
}


/* =========================================================
   SEARCH
   ========================================================= */

function setupSearch() {

    const searchInput =
        document.getElementById(
            "transactionSearch"
        );


    if (!searchInput) {

        return;
    }


    searchInput.addEventListener(
        "keyup",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                applyFilters();
            }

        }
    );
}


/* =========================================================
   PAGINATION
   ========================================================= */

async function previousPage() {

    if (
        currentPageNumber > 1
    ) {

        currentPageNumber--;

        await loadTransactions();
    }
}


async function nextPage() {

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                totalTransactionRecords /
                recordsPerPage
            )
        );


    if (
        currentPageNumber <
        totalPages
    ) {

        currentPageNumber++;

        await loadTransactions();
    }
}


/* =========================================================
   UPDATE PAGINATION
   ========================================================= */

function updatePagination() {

    /*
     * IMPORTANT:
     *
     * Use backend total count.
     *
     * Do NOT use:
     *
     * filteredTransactions.length
     *
     * because backend only sends 8 records.
     */
    const total =
        totalTransactionRecords;


    const totalPages =
        Math.max(
            1,
            Math.ceil(
                total /
                recordsPerPage
            )
        );


    const currentPageElement =
        document.getElementById(
            "currentPage"
        );


    const showingCount =
        document.getElementById(
            "showingCount"
        );


    const previousButton =
        document.getElementById(
            "previousBtn"
        );


    const nextButton =
        document.getElementById(
            "nextBtn"
        );


    /* =====================================================
       CURRENT PAGE
       ===================================================== */

    if (currentPageElement) {

        currentPageElement.innerText =
            currentPageNumber;
    }


    /* =====================================================
       SHOWING COUNT
       ===================================================== */

    if (showingCount) {

        if (total === 0) {

            showingCount.innerText =
                "0";
        }

        else {

            const start =
                (
                    (
                        currentPageNumber - 1
                    ) *
                    recordsPerPage
                ) + 1;


            const end =
                Math.min(
                    currentPageNumber *
                    recordsPerPage,
                    total
                );


            showingCount.innerText =
                `${start}-${end} of ${total}`;
        }
    }


    /* =====================================================
       PREVIOUS BUTTON
       ===================================================== */

    if (previousButton) {

        previousButton.disabled =
            currentPageNumber <= 1;
    }


    /* =====================================================
       NEXT BUTTON
       ===================================================== */

    if (nextButton) {

        nextButton.disabled =
            currentPageNumber >= totalPages;
    }
}


/* =========================================================
   EMPTY STATE
   ========================================================= */

function showEmptyState() {

    const tableBody =
        document.getElementById(
            "transactionTableBody"
        );


    const emptyState =
        document.getElementById(
            "emptyTransactionState"
        );


    if (tableBody) {

        tableBody.innerHTML =
            "";
    }


    if (emptyState) {

        emptyState.style.display =
            "flex";
    }
}


/* =========================================================
   FORMAT NUMBER
   ========================================================= */

function formatNumber(value) {

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
   CURRENT DATE & TIME
   ========================================================= */

function setCurrentDateTime() {

    const now =
        new Date();


    const dateElement =
        document.getElementById(
            "currentDate"
        );


    const timeElement =
        document.getElementById(
            "currentTime"
        );


    if (dateElement) {

        dateElement.innerText =
            now.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                }
            );
    }


    if (timeElement) {

        timeElement.innerText =
            now.toLocaleTimeString(
                "en-IN",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );
    }
}


/* =========================================================
   VIEW BALANCE
   ========================================================= */

function viewBalance() {

    /*
     * Use current balance from the
     * latest loaded transaction.
     */
    if (
        allTransactions.length > 0
    ) {

        const balance =
            allTransactions[0].balance;


        alert(
            `Your available balance is ₹${formatNumber(balance)}`
        );
    }

    else {

        /*
         * If there are no transactions,
         * fetch balance from summary.
         */
        loadTransactionSummary(
            customerAccountNumber
        ).then(
            function () {

                const balanceElement =
                    document.getElementById(
                        "availableBalance"
                    );


                if (balanceElement) {

                    alert(
                        `Your ${balanceElement.innerText}`
                    );
                }

            }
        );
    }
}


/* =========================================================
   DOWNLOAD STATEMENT
   ========================================================= */

function downloadStatement() {

    alert(
        "Download Statement feature will be connected to the backend in the next step."
    );
}