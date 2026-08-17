/* =========================================================
   TRANSACTION HISTORY JS
   Employee - Banking Management System
   ========================================================= */

console.log("Transaction History JS Loaded");


/* =========================================================
   API CONFIGURATION
   ========================================================= */

const API_BASE = "http://localhost:8082/api";


/* =========================================================
   PAGINATION CONFIGURATION
   ========================================================= */

const pageSize = 8;

let currentPage = 0;

/*
 * Backend currently returns only List.
 * Therefore we cannot directly know totalPages.
 *
 * hasNextPage becomes true when backend returns
 * exactly 8 records.
 */
let hasNextPage = false;


/*
 * Current search mode
 *
 * "ALL"      = all customer transactions
 * "CUSTOMER" = particular customer transactions
 */
let transactionMode = "ALL";


/*
 * Currently searched account number
 */
let searchedAccountNumber = "";


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Transaction History page initialized"
        );

        loadAllTransactions(0);

        initializeSearch();

    }
);


/* =========================================================
   SEARCH INPUT
   ========================================================= */

function initializeSearch() {

    const accountInput =
        document.getElementById(
            "accountNumber"
        );


    if (!accountInput) {
        return;
    }


    accountInput.addEventListener(
        "keypress",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                searchCustomerTransactions();

            }

        }
    );

}


/* =========================================================
   LOAD ALL TRANSACTIONS
   ========================================================= */

async function loadAllTransactions(page = 0) {

    console.log(
        "Loading all transactions - Page:",
        page
    );


    try {

        const response =
            await fetch(
                API_BASE +
                "/employee/transactions/history?page=" +
                page +
                "&size=" +
                pageSize
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load transactions."
            );

        }


        const result =
            await response.json();


        console.log(
            "All Transactions Response:",
            result
        );


        /*
         * Backend response:
         *
         * {
         *   status: true,
         *   code: 200,
         *   message: "...",
         *   data: [...]
         * }
         */

        let transactions = [];


        if (
            result &&
            Array.isArray(result.data)
        ) {

            transactions =
                result.data;

        }


        /*
         * Change mode to ALL
         */

        transactionMode = "ALL";

        searchedAccountNumber = "";


        /*
         * Update current page
         */

        currentPage =
            page;


        /*
         * Determine whether another page exists.
         *
         * If backend gives exactly 8 records,
         * there may be another page.
         *
         * If less than 8 records are returned,
         * this is the last page.
         */

        hasNextPage =
            transactions.length === pageSize;


        /*
         * Display transactions
         */

        displayTransactions(
            transactions
        );


        /*
         * Clear customer information
         */

        clearCustomerInformation();


        /*
         * Show pagination
         */

        updatePaginationButtons();


        /*
         * Clear message
         */

        hideMessage();


    }
    catch (error) {

        console.error(
            "Transaction loading error:",
            error
        );


        displayTransactions([]);


        showMessage(
            "Unable to load transaction history.",
            "error"
        );

    }

}


/* =========================================================
   SEARCH PARTICULAR CUSTOMER
   ========================================================= */

async function searchCustomerTransactions() {

    const accountInput =
        document.getElementById(
            "accountNumber"
        );


    if (!accountInput) {
        return;
    }


    const accountNumber =
        accountInput.value.trim();


    if (accountNumber === "") {

        showMessage(
            "Please enter account number.",
            "error"
        );

        accountInput.focus();

        return;

    }


    console.log(
        "Searching account:",
        accountNumber
    );


    try {

        /*
         * =====================================================
         * LOAD ACCOUNT DETAILS
         * =====================================================
         */

        const accountResponse =
            await fetch(
                API_BASE +
                "/employee/transactions/account/" +
                encodeURIComponent(
                    accountNumber
                )
            );


        console.log(
            "Account Details HTTP Status:",
            accountResponse.status
        );


        /*
         * =====================================================
         * ACCOUNT ERROR
         * =====================================================
         */

        if (!accountResponse.ok) {

            let errorMessage =
                "Unable to load account.";


            try {

                const errorResult =
                    await accountResponse.json();


                if (
                    errorResult &&
                    errorResult.message
                ) {

                    errorMessage =
                        errorResult.message;

                }

            }
            catch (error) {

                console.log(
                    "Account error is not JSON."
                );

            }


            clearCustomerInformation();

            displayTransactions([]);


            hidePagination();


            if (
                accountResponse.status === 404
            ) {

                showMessage(
                    "Account not found.",
                    "error"
                );

            }
            else {

                showMessage(
                    errorMessage,
                    "error"
                );

            }


            return;

        }


        /*
         * =====================================================
         * ACCOUNT RESPONSE
         * =====================================================
         */

        const accountResult =
            await accountResponse.json();


        console.log(
            "Account Details:",
            accountResult
        );


        const account =
            accountResult.data ||
            accountResult;


        if (!account) {

            clearCustomerInformation();

            displayTransactions([]);

            hidePagination();

            showMessage(
                "Account details not found.",
                "error"
            );

            return;

        }


        /*
         * =====================================================
         * DISPLAY CUSTOMER INFORMATION
         * =====================================================
         */

        displayCustomerInformation(
            account,
            accountNumber
        );


        /*
         * =====================================================
         * STORE CUSTOMER SEARCH
         * =====================================================
         */

        transactionMode =
            "CUSTOMER";

        searchedAccountNumber =
            accountNumber;

        currentPage = 0;


        /*
         * =====================================================
         * LOAD CUSTOMER TRANSACTIONS
         * =====================================================
         */

        await loadCustomerTransactions(
            accountNumber,
            0
        );


    }
    catch (error) {

        console.error(
            "Customer transaction error:",
            error
        );


        showMessage(
            error.message ||
            "Unable to load customer transaction history.",
            "error"
        );

    }

}


/* =========================================================
   LOAD PARTICULAR CUSTOMER TRANSACTIONS
   ========================================================= */

async function loadCustomerTransactions(
    accountNumber,
    page = 0
) {

    console.log(
        "Loading customer transactions:",
        accountNumber,
        "Page:",
        page
    );


    try {

        const response =
            await fetch(
                API_BASE +
                "/employee/transactions/history/" +
                encodeURIComponent(
                    accountNumber
                ) +
                "?page=" +
                page +
                "&size=" +
                pageSize
            );


        console.log(
            "Customer Transaction HTTP Status:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                "Unable to load customer transactions."
            );

        }


        const result =
            await response.json();


        console.log(
            "Customer Transactions:",
            result
        );


        let transactions = [];


        if (
            result &&
            Array.isArray(result.data)
        ) {

            transactions =
                result.data;

        }


        /*
         * Update customer mode
         */

        transactionMode =
            "CUSTOMER";


        searchedAccountNumber =
            accountNumber;


        currentPage =
            page;


        /*
         * Determine next page
         */

        hasNextPage =
            transactions.length === pageSize;


        /*
         * Display transactions
         */

        displayTransactions(
            transactions
        );


        /*
         * Show pagination
         */

        updatePaginationButtons();


        hideMessage();


    }
    catch (error) {

        console.error(
            "Customer transaction loading error:",
            error
        );


        displayTransactions([]);


        showMessage(
            error.message ||
            "Unable to load customer transactions.",
            "error"
        );

    }

}


/* =========================================================
   DISPLAY CUSTOMER INFORMATION
   ========================================================= */

function displayCustomerInformation(
    account,
    accountNumber
) {

    const customerName =
        document.getElementById(
            "historyCustomerName"
        );


    const displayAccountNumber =
        document.getElementById(
            "historyAccountNumber"
        );


    const accountType =
        document.getElementById(
            "historyAccountType"
        );


    const balance =
        document.getElementById(
            "historyBalance"
        );


    if (customerName) {

        customerName.textContent =
            account.customerName ||
            account.fullName ||
            account.name ||
            "-";

    }


    if (displayAccountNumber) {

        displayAccountNumber.textContent =
            account.accountNumber ||
            account.accountNo ||
            accountNumber;

    }


    if (accountType) {

        accountType.textContent =
            account.accountType ||
            "-";

    }


    if (balance) {

        const accountBalance =
            account.currentBalance !== undefined
                ? account.currentBalance
                : account.balance;


        balance.textContent =
            formatCurrency(
                parseFloat(
                    accountBalance || 0
                )
            );

    }

}


/* =========================================================
   CLEAR CUSTOMER INFORMATION
   ========================================================= */

function clearCustomerInformation() {

    const customerName =
        document.getElementById(
            "historyCustomerName"
        );


    const accountNumber =
        document.getElementById(
            "historyAccountNumber"
        );


    const accountType =
        document.getElementById(
            "historyAccountType"
        );


    const balance =
        document.getElementById(
            "historyBalance"
        );


    if (customerName) {

        customerName.textContent =
            "-";

    }


    if (accountNumber) {

        accountNumber.textContent =
            "-";

    }


    if (accountType) {

        accountType.textContent =
            "-";

    }


    if (balance) {

        balance.textContent =
            "₹0.00";

    }

}


/* =========================================================
   DISPLAY TRANSACTIONS
   ========================================================= */

function displayTransactions(
    transactions
) {

    const tableBody =
        document.getElementById(
            "transactionTableBody"
        );


    const count =
        document.getElementById(
            "transactionCount"
        );


    if (!tableBody) {
        return;
    }


    tableBody.innerHTML = "";


    /*
     * =====================================================
     * EMPTY
     * =====================================================
     */

    if (
        !transactions ||
        transactions.length === 0
    ) {

        tableBody.innerHTML = `

            <tr class="empty-row">

                <td colspan="9">

                    <div class="empty-state">

                        <i class="fa-regular fa-rectangle-list"></i>

                        <p>
                            No transactions found.
                        </p>

                        <span>
                            No transaction records are available.
                        </span>

                    </div>

                </td>

            </tr>

        `;


        if (count) {

            count.textContent =
                "0 transactions";

        }


        return;

    }


    /*
     * =====================================================
     * COUNT
     * =====================================================
     */

    if (count) {

        count.textContent =
            transactions.length +
            (
                transactions.length === 1
                    ? " transaction"
                    : " transactions"
            );

    }


    /*
     * =====================================================
     * CREATE ROWS
     * =====================================================
     */

    transactions.forEach(
        function (transaction) {

            const row =
                document.createElement(
                    "tr"
                );


            /*
             * =================================================
             * TRANSACTION ID
             * =================================================
             */

            const transactionId =
                transaction.transactionId ||
                transaction.transactionID ||
                transaction.id ||
                "-";


            /*
             * =================================================
             * DATE
             * =================================================
             */

            const dateValue =
                transaction.transactionDate ||
                transaction.date ||
                transaction.createdAt ||
                transaction.transactionTime;


            const transactionDate =
                formatDate(
                    dateValue
                );


            /*
             * =================================================
             * TIME
             * =================================================
             */

            const timeValue =
                transaction.transactionTime ||
                transaction.createdAt ||
                transaction.transactionDate ||
                transaction.date;


            const transactionTime =
                formatTime(
                    timeValue
                );


            /*
             * =================================================
             * TRANSACTION TYPE
             * =================================================
             */

            const type =
                transaction.transactionType ||
                transaction.type ||
                "-";


            /*
             * =================================================
             * ACCOUNT NUMBER
             * =================================================
             */

            const accountNumber =
                transaction.accountNumber ||
                transaction.accountNo ||
                transaction.customerAccountNumber ||
                "-";


            /*
             * =================================================
             * FROM ACCOUNT
             * =================================================
             */

            const fromAccount =
                transaction.fromAccountNumber ||
                transaction.fromAccount ||
                transaction.senderAccountNumber ||
                transaction.senderAccount ||
                transaction.sourceAccountNumber ||
                "-";


            /*
             * =================================================
             * TO ACCOUNT
             * =================================================
             */

            const toAccount =
                transaction.toAccountNumber ||
                transaction.toAccount ||
                transaction.receiverAccountNumber ||
                transaction.receiverAccount ||
                transaction.destinationAccountNumber ||
                "-";


            /*
             * =================================================
             * AMOUNT
             * =================================================
             */

            const amount =
                parseFloat(
                    transaction.amount ||
                    0
                );


            /*
             * =================================================
             * STATUS
             * =================================================
             */

            const status =
                transaction.status ||
                "SUCCESS";


            /*
             * =================================================
             * DESCRIPTION
             * =================================================
             */

            const description =
                transaction.description ||
                "-";


            /*
             * =================================================
             * CREATE ROW
             * =================================================
             */

            row.innerHTML = `

                <td>
                    ${escapeHtml(
                        transactionId
                    )}
                </td>


                <td>

                    ${escapeHtml(
                        transactionDate
                    )}

                    <br>

                    <small class="transaction-time">

                        ${escapeHtml(
                            transactionTime
                        )}

                    </small>

                </td>


                <td>

                    ${getTransactionTypeHtml(
                        type
                    )}

                </td>


                <td>

                    ${escapeHtml(
                        accountNumber
                    )}

                </td>


                <td>

                    ${escapeHtml(
                        fromAccount
                    )}

                </td>


                <td>

                    ${escapeHtml(
                        toAccount
                    )}

                </td>


                <td class="${getAmountClass(
                    type
                )}">

                    ${formatCurrency(
                        amount
                    )}

                </td>


                <td>

                    ${getStatusHtml(
                        status
                    )}

                </td>


                <td>

                    ${escapeHtml(
                        description
                    )}

                </td>

            `;


            tableBody.appendChild(
                row
            );

        }
    );

}


/* =========================================================
   TRANSACTION TYPE HTML
   ========================================================= */

function getTransactionTypeHtml(
    type
) {

    const transactionType =
        String(type).toUpperCase();


    if (
        transactionType ===
        "DEPOSIT"
    ) {

        return `

            <span class="transaction-type deposit">

                <i class="fa-solid fa-arrow-down"></i>

                Deposit

            </span>

        `;

    }


    if (
        transactionType ===
        "WITHDRAW"
    ) {

        return `

            <span class="transaction-type withdraw">

                <i class="fa-solid fa-arrow-up"></i>

                Withdraw

            </span>

        `;

    }


    if (
        transactionType ===
        "TRANSFER"
    ) {

        return `

            <span class="transaction-type transfer">

                <i class="fa-solid fa-right-left"></i>

                Transfer

            </span>

        `;

    }


    return `

        <span class="transaction-type">

            ${escapeHtml(type)}

        </span>

    `;

}


/* =========================================================
   AMOUNT CLASS
   ========================================================= */

function getAmountClass(
    type
) {

    const transactionType =
        String(type).toUpperCase();


    if (
        transactionType ===
        "DEPOSIT"
    ) {

        return "amount-positive";

    }


    if (
        transactionType ===
        "WITHDRAW"
    ) {

        return "amount-negative";

    }


    return "";

}


/* =========================================================
   STATUS HTML
   ========================================================= */

function getStatusHtml(
    status
) {

    const value =
        String(status).toUpperCase();


    if (
        value === "SUCCESS" ||
        value === "COMPLETED"
    ) {

        return `

            <span class="transaction-status success">

                ${escapeHtml(status)}

            </span>

        `;

    }


    if (
        value === "PENDING"
    ) {

        return `

            <span class="transaction-status pending">

                ${escapeHtml(status)}

            </span>

        `;

    }


    if (
        value === "FAILED" ||
        value === "REJECTED"
    ) {

        return `

            <span class="transaction-status failed">

                ${escapeHtml(status)}

            </span>

        `;

    }


    return `

        <span class="transaction-status">

            ${escapeHtml(status)}

        </span>

    `;

}


/* =========================================================
   PAGINATION
   ========================================================= */

function updatePaginationButtons() {

    const pagination =
        document.getElementById(
            "pagination"
        );


    const previousButton =
        document.getElementById(
            "previousPage"
        );


    const nextButton =
        document.getElementById(
            "nextPage"
        );


    const pageInfo =
        document.getElementById(
            "pageInfo"
        );


    if (!pagination) {
        return;
    }


    pagination.style.display =
        "flex";


    /*
     * =====================================================
     * PREVIOUS
     * =====================================================
     */

    if (previousButton) {

        previousButton.disabled =
            currentPage === 0;

    }


    /*
     * =====================================================
     * NEXT
     * =====================================================
     */

    if (nextButton) {

        nextButton.disabled =
            !hasNextPage;

    }


    /*
     * =====================================================
     * PAGE INFORMATION
     *
     * Since backend does not return totalPages,
     * we show the current page only.
     *
     * Example:
     *
     * Page 1
     * Page 2
     * Page 3
     * =====================================================
     */

    if (pageInfo) {

        pageInfo.textContent =
            "Page " +
            (currentPage + 1);

    }

}


/* =========================================================
   CHANGE PAGE
   ========================================================= */

function changePage(
    page
) {

    console.log(
        "Changing page to:",
        page
    );


    /*
     * Prevent negative page
     */

    if (page < 0) {
        return;
    }


    /*
     * Prevent going forward when
     * there is no next page.
     */

    if (
        page > currentPage &&
        !hasNextPage
    ) {

        return;

    }


    /*
     * =====================================================
     * ALL TRANSACTIONS
     * =====================================================
     */

    if (
        transactionMode ===
        "ALL"
    ) {

        loadAllTransactions(
            page
        );

        return;

    }


    /*
     * =====================================================
     * PARTICULAR CUSTOMER
     * =====================================================
     */

    if (
        transactionMode ===
        "CUSTOMER" &&
        searchedAccountNumber
    ) {

        loadCustomerTransactions(
            searchedAccountNumber,
            page
        );

    }

}


/* =========================================================
   ALL TRANSACTIONS BUTTON
   ========================================================= */

function resetToAllTransactions() {

    const accountInput =
        document.getElementById(
            "accountNumber"
        );


    if (accountInput) {

        accountInput.value =
            "";

    }


    transactionMode =
        "ALL";


    searchedAccountNumber =
        "";


    currentPage =
        0;


    loadAllTransactions(
        0
    );

}


/*
 * Keep existing HTML onclick:
 *
 * onclick="loadAllTransactions()"
 *
 * Therefore we make loadAllTransactions()
 * itself work as the All Transactions button.
 */


/* =========================================================
   HIDE PAGINATION
   ========================================================= */

function hidePagination() {

    const pagination =
        document.getElementById(
            "pagination"
        );


    if (pagination) {

        pagination.style.display =
            "none";

    }

}


/* =========================================================
   SHOW PAGINATION
   ========================================================= */

function showPagination() {

    const pagination =
        document.getElementById(
            "pagination"
        );


    if (pagination) {

        pagination.style.display =
            "flex";

    }

}


/* =========================================================
   CURRENCY
   ========================================================= */

function formatCurrency(
    amount
) {

    return "₹" +
        Number(amount).toLocaleString(
            "en-IN",
            {
                minimumFractionDigits:
                    2,

                maximumFractionDigits:
                    2
            }
        );

}


/* =========================================================
   DATE
   ========================================================= */

function formatDate(
    dateValue
) {

    if (!dateValue) {

        return "-";

    }


    try {

        const date =
            new Date(
                dateValue
            );


        if (
            isNaN(
                date.getTime()
            )
        ) {

            return String(
                dateValue
            );

        }


        return date.toLocaleDateString(
            "en-GB"
        );

    }
    catch (error) {

        return String(
            dateValue
        );

    }

}


/* =========================================================
   TIME
   ========================================================= */

function formatTime(
    dateValue
) {

    if (!dateValue) {

        return "-";

    }


    try {

        const date =
            new Date(
                dateValue
            );


        if (
            isNaN(
                date.getTime()
            )
        ) {

            return "-";

        }


        return date.toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",

                minute: "2-digit"
            }
        );

    }
    catch (error) {

        return "-";

    }

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


/* =========================================================
   SHOW MESSAGE
   ========================================================= */

function showMessage(
    message,
    type
) {

    const messageBox =
        document.getElementById(
            "historyMessage"
        );


    if (!messageBox) {
        return;
    }


    messageBox.textContent =
        message;


    messageBox.className =
        "history-message " +
        type;


    messageBox.style.display =
        "block";


    setTimeout(
        function () {

            messageBox.style.display =
                "none";

        },
        4000
    );

}


/* =========================================================
   HIDE MESSAGE
   ========================================================= */

function hideMessage() {

    const messageBox =
        document.getElementById(
            "historyMessage"
        );


    if (messageBox) {

        messageBox.style.display =
            "none";

    }

}


/* =========================================================
   TRANSACTION NAVIGATION
   ========================================================= */

function openTransaction(
    type
) {

    const contextPath =
        getContextPath();


    switch (type) {

        case "deposit":

            window.location.href =
                contextPath +
                "/employee/deposite.jsp";

            break;


        case "withdraw":

            window.location.href =
                contextPath +
                "/employee/withdraw.jsp";

            break;


        case "transfer":

            window.location.href =
                contextPath +
                "/employee/transfer.jsp";

            break;


        case "history":

            window.location.href =
                contextPath +
                "/employee/transaction-history.jsp";

            break;


        default:

            console.log(
                "Unknown transaction type:",
                type
            );

    }

}


/* =========================================================
   GET CONTEXT PATH
   ========================================================= */

function getContextPath() {

    const path =
        window.location.pathname;


    const parts =
        path.split("/");


    if (
        parts.length > 1 &&
        parts[1] !== ""
    ) {

        return "/" +
            parts[1];

    }


    return "";

}