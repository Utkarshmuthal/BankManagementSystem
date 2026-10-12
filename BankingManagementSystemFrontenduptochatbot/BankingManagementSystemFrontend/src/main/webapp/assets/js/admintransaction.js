// ============================================================
// ADMIN TRANSACTION HISTORY JS
// ============================================================

const API_BASE_URL = "http://localhost:8082";

// ============================================================
// PAGINATION VARIABLES
// ============================================================

let currentPage = 0;
let pageSize = 8;

// All transactions received from backend
let allTransactions = [];

// Transactions after account search
let filteredTransactions = [];


// ============================================================
// PAGE LOAD
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Admin Transaction History JS loaded");

    // Set default page size
    const pageSizeSelect = document.getElementById("pageSize");

    if (pageSizeSelect) {
        pageSizeSelect.value = "8";
    }

    loadAllTransactions();

    initializeEnterKey();
});


// ============================================================
// ENTER KEY SEARCH
// ============================================================

function initializeEnterKey() {

    const input = document.getElementById("accountNumberInput");

    if (!input) {
        return;
    }

    input.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            searchTransactions();
        }
    });
}


// ============================================================
// LOAD ALL TRANSACTIONS
// ============================================================

async function loadAllTransactions() {

    console.log("Loading all transactions...");

    currentPage = 0;

    const input = document.getElementById("accountNumberInput");

    if (input) {
        input.value = "";
    }

    try {

        showLoading();

        // Existing backend API
        // GET /api/employee/transactions/history

        const url =
            `${API_BASE_URL}/api/employee/transactions/history`;

        console.log(
            "Transaction API URL:",
            url
        );

        const response = await fetch(url, {

            method: "GET",

            credentials: "include",

            headers: {
                "Accept": "application/json"
            }

        });

        console.log(
            "Transaction HTTP Status:",
            response.status
        );

        if (!response.ok) {

            const errorText = await response.text();

            console.error(
                "Transaction API Error:",
                errorText
            );

            throw new Error(
                `HTTP ${response.status}`
            );
        }

        const result = await response.json();

        console.log(
            "Transaction API Response:",
            result
        );


        // ====================================================
        // SUPPORT ApiResponse AND DIRECT ARRAY
        // ====================================================

        const data =
            result.data !== undefined
                ? result.data
                : result;


        allTransactions =
            extractTransactions(data);


        console.log(
            "All Transactions:",
            allTransactions
        );


        // ====================================================
        // SHOW ALL TRANSACTIONS
        // ====================================================

        filteredTransactions =
            [...allTransactions];


        renderCurrentPage();

    }

    catch (error) {

        console.error(
            "Transaction Load Error:",
            error
        );

        allTransactions = [];

        filteredTransactions = [];

        updateTotalTransactions(0);

        updateShowingText(0, 0);

        renderPagination(0, 0);

        showError();
    }
}


// ============================================================
// SEARCH TRANSACTIONS
// ============================================================

async function searchTransactions() {

    const input =
        document.getElementById(
            "accountNumberInput"
        );

    if (!input) {
        return;
    }


    const accountNumber =
        input.value.trim();


    if (!accountNumber) {

        alert(
            "Please enter account number."
        );

        input.focus();

        return;
    }


    console.log(
        "Searching account:",
        accountNumber
    );


    currentPage = 0;


    // ========================================================
    // FILTER EXISTING TRANSACTIONS
    // ========================================================

    filteredTransactions =
        allTransactions.filter(function (transaction) {


            const account =
                getValue(
                    transaction,
                    [
                        "accountNumber",
                        "account_number"
                    ],
                    ""
                );


            const fromAccount =
                getValue(
                    transaction,
                    [
                        "fromAccount",
                        "from_account",
                        "fromAccountNumber",
                        "from_account_number"
                    ],
                    ""
                );


            const toAccount =
                getValue(
                    transaction,
                    [
                        "toAccount",
                        "to_account",
                        "toAccountNumber",
                        "to_account_number"
                    ],
                    ""
                );


            const searchValue =
                String(accountNumber)
                    .trim()
                    .toLowerCase();


            return (

                String(account)
                    .toLowerCase()
                    .includes(searchValue)

                ||

                String(fromAccount)
                    .toLowerCase()
                    .includes(searchValue)

                ||

                String(toAccount)
                    .toLowerCase()
                    .includes(searchValue)
            );
        });


    console.log(
        "Filtered Transactions:",
        filteredTransactions
    );


    renderCurrentPage();
}


// ============================================================
// RENDER CURRENT PAGE
// ============================================================

function renderCurrentPage() {

    const total =
        filteredTransactions.length;


    // ========================================================
    // TOTAL PAGES
    // ========================================================

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                total / pageSize
            )
        );


    // ========================================================
    // SAFETY
    // ========================================================

    if (currentPage >= totalPages) {

        currentPage =
            Math.max(
                0,
                totalPages - 1
            );
    }


    // ========================================================
    // START INDEX
    // ========================================================

    const startIndex =
        currentPage * pageSize;


    // ========================================================
    // END INDEX
    // ========================================================

    const endIndex =
        Math.min(
            startIndex + pageSize,
            total
        );


    // ========================================================
    // CURRENT PAGE TRANSACTIONS
    // ========================================================

    const currentTransactions =
        filteredTransactions.slice(
            startIndex,
            endIndex
        );


    console.log(
        "Current Page:",
        currentPage + 1
    );


    console.log(
        "Current Page Transactions:",
        currentTransactions
    );


    // ========================================================
    // RENDER TABLE
    // ========================================================

    renderTransactions(
        currentTransactions
    );


    // ========================================================
    // UPDATE TOTAL
    // ========================================================

    updateTotalTransactions(
        total
    );


    // ========================================================
    // UPDATE SHOWING TEXT
    // ========================================================

    updateShowingText(
        total,
        currentTransactions.length
    );


    // ========================================================
    // PAGINATION
    // ========================================================

    renderPagination(
        totalPages,
        total
    );
}


// ============================================================
// EXTRACT TRANSACTIONS
// ============================================================

function extractTransactions(data) {

    // Direct array
    if (Array.isArray(data)) {

        return data;
    }


    // Page content
    if (
        data &&
        Array.isArray(data.content)
    ) {

        return data.content;
    }


    // transactions
    if (
        data &&
        Array.isArray(data.transactions)
    ) {

        return data.transactions;
    }


    // transactionList
    if (
        data &&
        Array.isArray(data.transactionList)
    ) {

        return data.transactionList;
    }


    // records
    if (
        data &&
        Array.isArray(data.records)
    ) {

        return data.records;
    }


    // nested data
    if (
        data &&
        data.data &&
        Array.isArray(data.data)
    ) {

        return data.data;
    }


    return [];
}


// ============================================================
// RENDER TRANSACTIONS
// ============================================================

function renderTransactions(transactions) {

    const tbody =
        document.getElementById(
            "transactionTableBody"
        );


    if (!tbody) {
        return;
    }


    tbody.innerHTML = "";


    // ========================================================
    // NO DATA
    // ========================================================

    if (
        !transactions ||
        transactions.length === 0
    ) {

        tbody.innerHTML = `

            <tr class="no-data-row">

                <td colspan="8">

                    <i class="fa-solid fa-receipt"></i>

                    ${
                        allTransactions.length === 0
                            ? "No transactions found"
                            : "No transactions found for this account"
                    }

                </td>

            </tr>

        `;

        return;
    }


    // ========================================================
    // CREATE ROWS
    // ========================================================

    transactions.forEach(function (transaction) {

        const row =
            document.createElement("tr");


        // ====================================================
        // TRANSACTION ID
        // ====================================================

        const transactionId =
            getValue(
                transaction,
                [
                    "transactionId",
                    "transaction_id",
                    "id"
                ],
                "-"
            );


        // ====================================================
        // DATE
        // ====================================================

        const dateTime =
            getValue(
                transaction,
                [
                    "transactionDate",
                    "transaction_date",
                    "dateTime",
                    "date",
                    "createdAt",
                    "created_at"
                ],
                "-"
            );


        // ====================================================
        // ACCOUNT NUMBER
        // ====================================================

        const accountNumber =
            getValue(
                transaction,
                [
                    "accountNumber",
                    "account_number"
                ],
                "-"
            );


        // ====================================================
        // FROM ACCOUNT
        // ====================================================

        const fromAccount =
            getValue(
                transaction,
                [
                    "fromAccount",
                    "from_account",
                    "fromAccountNumber",
                    "from_account_number"
                ],
                "-"
            );


        // ====================================================
        // TO ACCOUNT
        // ====================================================

        const toAccount =
            getValue(
                transaction,
                [
                    "toAccount",
                    "to_account",
                    "toAccountNumber",
                    "to_account_number"
                ],
                "-"
            );


        // ====================================================
        // AMOUNT
        // ====================================================

        const amount =
            numberValue(
                getValue(
                    transaction,
                    [
                        "amount",
                        "transactionAmount",
                        "transaction_amount"
                    ],
                    0
                )
            );


        // ====================================================
        // STATUS
        // ====================================================

        const status =
            getValue(
                transaction,
                [
                    "status"
                ],
                "-"
            );


        // ====================================================
        // DESCRIPTION
        // ====================================================

        const description =
            getValue(
                transaction,
                [
                    "description",
                    "remarks",
                    "narration"
                ],
                "-"
            );


        // ====================================================
        // TRANSACTION TYPE
        // ====================================================

        const type =
            getTransactionType(
                transaction,
                description
            );


        // ====================================================
        // FORMAT DATE
        // ====================================================

        const formattedDate =
            formatDateTime(
                dateTime
            );


        // ====================================================
        // FORMAT AMOUNT
        // ====================================================

        const formattedAmount =
            formatCurrency(
                amount
            );


        // ====================================================
        // CREATE TABLE ROW
        // ====================================================
        //
        // IMPORTANT:
        // Employee column completely removed.
        //
        // Total columns = 8
        //
        // 1. Transaction ID
        // 2. Date & Time
        // 3. Account Number
        // 4. From Account
        // 5. To Account
        // 6. Amount
        // 7. Status
        // 8. Description
        //
        // ====================================================

        row.innerHTML = `

            <td class="transaction-id">

                ${escapeHtml(transactionId)}

            </td>


            <td>

                ${escapeHtml(formattedDate)}

            </td>


            <td>

                ${escapeHtml(accountNumber)}

            </td>


            <td>

                ${escapeHtml(fromAccount)}

            </td>


            <td>

                ${escapeHtml(toAccount)}

            </td>


            <td class="amount ${getAmountClass(type)}">

                ${formattedAmount}

            </td>


            <td>

                ${createStatusBadge(status)}

            </td>


            <td>

                ${escapeHtml(description)}

            </td>

        `;


        tbody.appendChild(row);

    });
}


// ============================================================
// TRANSACTION TYPE
// ============================================================

function getTransactionType(
    transaction,
    description
) {

    const type =
        getValue(
            transaction,
            [
                "transactionType",
                "transaction_type",
                "type"
            ],
            ""
        );


    const value =
        `${type} ${description}`
            .toLowerCase();


    if (
        value.includes("withdraw")
    ) {

        return "withdraw";
    }


    if (
        value.includes("transfer")
    ) {

        return "transfer";
    }


    if (
        value.includes("deposit")
    ) {

        return "deposit";
    }


    return "deposit";
}


// ============================================================
// AMOUNT CLASS
// ============================================================

function getAmountClass(type) {

    if (type === "withdraw") {

        return "withdraw";
    }


    if (type === "transfer") {

        return "transfer";
    }


    return "deposit";
}


// ============================================================
// STATUS BADGE
// ============================================================

function createStatusBadge(status) {

    const value =
        String(status || "")
            .trim()
            .toLowerCase();


    let className =
        "status-pending";


    if (
        value === "success" ||
        value === "successful" ||
        value === "completed"
    ) {

        className =
            "status-success";
    }

    else if (
        value === "failed" ||
        value === "failure"
    ) {

        className =
            "status-failed";
    }

    else if (
        value === "reversed"
    ) {

        className =
            "status-reversed";
    }


    return `

        <span class="status-badge ${className}">

            ${escapeHtml(status)}

        </span>

    `;
}


// ============================================================
// UPDATE TOTAL TRANSACTIONS
// ============================================================

function updateTotalTransactions(total) {

    const element =
        document.getElementById(
            "totalTransactions"
        );


    if (!element) {
        return;
    }


    element.textContent =
        numberValue(total)
            .toLocaleString(
                "en-IN"
            );
}


// ============================================================
// SHOWING TEXT
// ============================================================

function updateShowingText(
    total,
    currentCount
) {

    const element =
        document.getElementById(
            "showingText"
        );


    if (!element) {
        return;
    }


    if (total === 0) {

        element.textContent =
            "Showing 0 to 0 of 0 transactions";

        return;
    }


    const start =
        currentPage * pageSize + 1;


    const end =
        Math.min(
            start + currentCount - 1,
            total
        );


    element.textContent =
        `Showing ${start} to ${end} of ${total} transactions`;
}


// ============================================================
// PAGINATION
// ============================================================
//
// Result:
//
// ← Previous       Page 1       Next →
//
// ============================================================

function renderPagination(
    totalPages,
    total
) {

    const container =
        document.getElementById(
            "pagination"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    // ========================================================
    // NO TRANSACTIONS
    // ========================================================

    if (total === 0) {

        return;
    }


    // ========================================================
    // PREVIOUS BUTTON
    // ========================================================

    const previousButton =
        document.createElement("button");


    previousButton.type =
        "button";


    previousButton.className =
        "pagination-btn previous-btn";


    previousButton.innerHTML = `

        <i class="fa-solid fa-chevron-left"></i>

        <span>Previous</span>

    `;


    previousButton.disabled =
        currentPage === 0;


    if (!previousButton.disabled) {

        previousButton.addEventListener(
            "click",
            function () {

                currentPage--;

                renderCurrentPage();
            }
        );
    }


    container.appendChild(
        previousButton
    );


    // ========================================================
    // CURRENT PAGE
    // ========================================================

    const currentPageElement =
        document.createElement("span");


    currentPageElement.className =
        "current-page";


    currentPageElement.textContent =
        `Page ${currentPage + 1}`;


    container.appendChild(
        currentPageElement
    );


    // ========================================================
    // NEXT BUTTON
    // ========================================================

    const nextButton =
        document.createElement("button");


    nextButton.type =
        "button";


    nextButton.className =
        "pagination-btn next-btn";


    nextButton.innerHTML = `

        <span>Next</span>

        <i class="fa-solid fa-chevron-right"></i>

    `;


    nextButton.disabled =
        currentPage >= totalPages - 1;


    if (!nextButton.disabled) {

        nextButton.addEventListener(
            "click",
            function () {

                currentPage++;

                renderCurrentPage();
            }
        );
    }


    container.appendChild(
        nextButton
    );
}


// ============================================================
// CHANGE PAGE SIZE
// ============================================================

function changePageSize() {

    const select =
        document.getElementById(
            "pageSize"
        );


    if (!select) {
        return;
    }


    pageSize =
        parseInt(
            select.value,
            10
        );


    currentPage = 0;


    renderCurrentPage();
}


// ============================================================
// LOADING
// ============================================================

function showLoading() {

    const tbody =
        document.getElementById(
            "transactionTableBody"
        );


    if (!tbody) {
        return;
    }


    tbody.innerHTML = `

        <tr class="loading-row">

            <td colspan="8">

                <i class="fa-solid fa-spinner fa-spin"></i>

                Loading transactions...

            </td>

        </tr>

    `;
}


// ============================================================
// ERROR
// ============================================================

function showError() {

    const tbody =
        document.getElementById(
            "transactionTableBody"
        );


    if (!tbody) {
        return;
    }


    tbody.innerHTML = `

        <tr class="no-data-row">

            <td colspan="8">

                <i class="fa-solid fa-triangle-exclamation"></i>

                Unable to load transactions.

            </td>

        </tr>

    `;
}


// ============================================================
// GET VALUE
// ============================================================

function getValue(
    object,
    keys,
    defaultValue = "-"
) {

    if (!object) {

        return defaultValue;
    }


    for (const key of keys) {

        if (
            object[key] !== undefined &&
            object[key] !== null &&
            object[key] !== ""
        ) {

            return object[key];
        }
    }


    return defaultValue;
}


// ============================================================
// NUMBER VALUE
// ============================================================

function numberValue(value) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return 0;
    }


    if (
        typeof value === "number"
    ) {

        return Number.isFinite(value)
            ? value
            : 0;
    }


    const cleaned =
        String(value)
            .replace(
                /[₹,\s]/g,
                ""
            );


    const number =
        Number(cleaned);


    return Number.isFinite(number)
        ? number
        : 0;
}


// ============================================================
// CURRENCY
// ============================================================

function formatCurrency(value) {

    return "₹" +
        numberValue(value)
            .toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );
}


// ============================================================
// DATE FORMAT
// ============================================================

function formatDateTime(value) {

    if (
        value === null ||
        value === undefined ||
        value === "" ||
        value === "-"
    ) {

        return "-";
    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return String(value);
    }


    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const year =
        date.getFullYear();


    let hours =
        date.getHours();


    const minutes =
        String(
            date.getMinutes()
        ).padStart(
            2,
            "0"
        );


    const ampm =
        hours >= 12
            ? "PM"
            : "AM";


    hours =
        hours % 12 || 12;


    return `${day}/${month}/${year} ${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
}


// ============================================================
// ESCAPE HTML
// ============================================================

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
