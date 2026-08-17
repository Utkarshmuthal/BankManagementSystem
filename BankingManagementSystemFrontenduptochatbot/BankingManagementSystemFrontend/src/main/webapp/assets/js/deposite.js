/* =========================================================
   DEPOSIT JS
   Employee - Banking Management System
   ========================================================= */

console.log("Deposit JS Loaded");


/* =========================================================
   API CONFIGURATION
   ========================================================= */

const API_BASE = "http://localhost:8082/api";


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Deposit page initialized");

    setTodayDate();

    initializeAccountInput();

});


/* =========================================================
   SET TODAY DATE
   ========================================================= */

function setTodayDate() {

    const dateInput =
        document.getElementById("transactionDate");

    if (!dateInput) {
        return;
    }

    const today = new Date();

    const year =
        today.getFullYear();

    const month =
        String(today.getMonth() + 1).padStart(2, "0");

    const day =
        String(today.getDate()).padStart(2, "0");

    dateInput.value =
        year + "-" +
        month + "-" +
        day;
}


/* =========================================================
   ACCOUNT INPUT INITIALIZATION
   ========================================================= */

function initializeAccountInput() {

    const accountInput =
        document.getElementById("accountNumber");

    if (!accountInput) {
        return;
    }


    /* =====================================================
       ENTER KEY
       ===================================================== */

    accountInput.addEventListener(
        "keypress",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                loadAccountDetails();

            }

        }
    );


    /* =====================================================
       WHEN USER LEAVES ACCOUNT FIELD
       ===================================================== */

    accountInput.addEventListener(
        "blur",
        function () {

            if (
                accountInput.value.trim() !== ""
            ) {

                loadAccountDetails();

            }

        }
    );

}


/* =========================================================
   LOAD ACCOUNT DETAILS
   ========================================================= */

async function loadAccountDetails() {

    const accountInput =
        document.getElementById("accountNumber");

    if (!accountInput) {
        return;
    }


    const accountNumber =
        accountInput.value.trim();


    /* =====================================================
       EMPTY ACCOUNT NUMBER
       ===================================================== */

    if (accountNumber === "") {

        clearAccountDetails();

        return;

    }


    console.log(
        "Loading account details:",
        accountNumber
    );


    try {

        /* =================================================
           CORRECT BACKEND ENDPOINT

           Controller:

           GET
           /api/employee/transactions/account/{accountNumber}
           ================================================= */

        const response =
            await fetch(
                API_BASE +
                "/employee/transactions/account/" +
                encodeURIComponent(accountNumber)
            );


        /* =================================================
           HANDLE HTTP ERROR
           ================================================= */

        if (!response.ok) {

            clearAccountDetails();

            let errorResult = null;

            try {

                errorResult =
                    await response.json();

            }
            catch (error) {

                console.log(
                    "Error response is not JSON."
                );

            }


            let errorMessage =
                "Account not found.";


            if (
                errorResult &&
                errorResult.message
            ) {

                errorMessage =
                    errorResult.message;

            }


            showMessage(
                errorMessage,
                "error"
            );

            return;

        }


        /* =================================================
           READ JSON RESPONSE
           ================================================= */

        const result =
            await response.json();


        console.log(
            "Account Details Response:",
            result
        );


        /* =================================================
           API RESPONSE

           {
               status: true,
               code: 200,
               message: "...",
               data: {...}
           }
           ================================================= */

        const account =
            result.data || result;


        if (!account) {

            clearAccountDetails();

            showMessage(
                "Account details not found.",
                "error"
            );

            return;

        }


        /* =================================================
           UPDATE ACCOUNT INFORMATION
           ================================================= */

        updateAccountDetails(
            account,
            accountNumber
        );


        console.log(
            "Account loaded successfully."
        );

    }
    catch (error) {

        console.error(
            "Account loading error:",
            error
        );


        clearAccountDetails();


        showMessage(
            "Unable to load account details.",
            "error"
        );

    }

}


/* =========================================================
   UPDATE ACCOUNT DETAILS
   ========================================================= */

function updateAccountDetails(
    account,
    enteredAccountNumber
) {

    if (!account) {
        return;
    }


    /* =====================================================
       CUSTOMER NAME
       ===================================================== */

    const customerName =
        document.getElementById(
            "customerName"
        );


    if (customerName) {

        customerName.textContent =
            account.customerName ||
            account.fullName ||
            "-";

    }


    /* =====================================================
       ACCOUNT NUMBER
       ===================================================== */

    const displayAccountNumber =
        document.getElementById(
            "displayAccountNumber"
        );


    if (displayAccountNumber) {

        displayAccountNumber.textContent =
            account.accountNumber ||
            enteredAccountNumber ||
            "-";

    }


    /* =====================================================
       ACCOUNT TYPE
       ===================================================== */

    const accountType =
        document.getElementById(
            "accountType"
        );


    if (accountType) {

        accountType.textContent =
            account.accountType ||
            "-";

    }


    /* =====================================================
       CURRENT BALANCE

       Your backend response uses:

       currentBalance
       ===================================================== */

    const balance =
        parseFloat(
            account.currentBalance || 0
        );


    /* =====================================================
       CURRENT BALANCE
       ===================================================== */

    const currentBalance =
        document.getElementById(
            "currentBalance"
        );


    if (currentBalance) {

        currentBalance.textContent =
            formatCurrency(balance);

    }


    /* =====================================================
       AVAILABLE BALANCE
       ===================================================== */

    const availableBalance =
        document.getElementById(
            "availableBalance"
        );


    if (availableBalance) {

        availableBalance.textContent =
            formatCurrency(balance);

    }

}


/* =========================================================
   CLEAR ACCOUNT DETAILS
   ========================================================= */

function clearAccountDetails() {

    const customerName =
        document.getElementById(
            "customerName"
        );


    const displayAccountNumber =
        document.getElementById(
            "displayAccountNumber"
        );


    const accountType =
        document.getElementById(
            "accountType"
        );


    const currentBalance =
        document.getElementById(
            "currentBalance"
        );


    const availableBalance =
        document.getElementById(
            "availableBalance"
        );


    if (customerName) {

        customerName.textContent =
            "-";

    }


    if (displayAccountNumber) {

        displayAccountNumber.textContent =
            "-";

    }


    if (accountType) {

        accountType.textContent =
            "-";

    }


    if (currentBalance) {

        currentBalance.textContent =
            "₹0.00";

    }


    if (availableBalance) {

        availableBalance.textContent =
            "₹0.00";

    }

}


/* =========================================================
   DEPOSIT AMOUNT
   ========================================================= */

async function depositAmount() {

    /* =====================================================
       ACCOUNT NUMBER
       ===================================================== */

    const accountInput =
        document.getElementById(
            "accountNumber"
        );


    if (!accountInput) {

        showMessage(
            "Account number field not found.",
            "error"
        );

        return;

    }


    const accountNumber =
        accountInput.value.trim();


    /* =====================================================
       AMOUNT
       ===================================================== */

    const amountInput =
        document.getElementById(
            "depositAmount"
        );


    if (!amountInput) {

        showMessage(
            "Deposit amount field not found.",
            "error"
        );

        return;

    }


    const amount =
        amountInput.value.trim();


    /* =====================================================
       DESCRIPTION
       ===================================================== */

    const descriptionInput =
        document.getElementById(
            "description"
        );


    const description =
        descriptionInput
            ? descriptionInput.value.trim()
            : "";


    /* =====================================================
       TRANSACTION DATE
       ===================================================== */

    const transactionDateInput =
        document.getElementById(
            "transactionDate"
        );


    let transactionDate =
        transactionDateInput
            ? transactionDateInput.value
            : "";


    /* =====================================================
       VALIDATE ACCOUNT
       ===================================================== */

    if (accountNumber === "") {

        showMessage(
            "Please enter account number.",
            "error"
        );

        accountInput.focus();

        return;

    }


    /* =====================================================
       VALIDATE AMOUNT
       ===================================================== */

    if (
        amount === "" ||
        isNaN(amount) ||
        parseFloat(amount) <= 0
    ) {

        showMessage(
            "Please enter a valid deposit amount.",
            "error"
        );

        amountInput.focus();

        return;

    }


    /* =====================================================
       TRANSACTION DATE
       ===================================================== */

    if (transactionDate === "") {

        setTodayDate();

        transactionDateInput =
            document.getElementById(
                "transactionDate"
            );

        transactionDate =
            transactionDateInput
                ? transactionDateInput.value
                : "";

    }


    /* =====================================================
       REQUEST DATA
       ===================================================== */

    const depositData = {

        accountNumber:
            accountNumber,

        amount:
            parseFloat(amount),

        description:
            description,

        transactionDate:
            transactionDate

    };


    console.log(
        "Deposit Request:",
        depositData
    );


    /* =====================================================
       SEND REQUEST
       ===================================================== */

    try {

        const response =
            await fetch(
                API_BASE +
                "/employee/transactions/deposit",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            depositData
                        )

                }
            );


        /* =================================================
           READ RESPONSE
           ================================================= */

        let result = null;


        try {

            result =
                await response.json();

        }
        catch (jsonError) {

            console.log(
                "Response does not contain JSON."
            );

        }


        console.log(
            "Deposit Response:",
            result
        );


        /* =================================================
           BACKEND ERROR
           ================================================= */

        if (!response.ok) {

            let errorMessage =
                "Deposit failed.";


            if (
                result &&
                result.message
            ) {

                errorMessage =
                    result.message;

            }


            throw new Error(
                errorMessage
            );

        }


        /* =================================================
           SUCCESS
           ================================================= */

        showMessage(
            "Amount deposited successfully.",
            "success"
        );


        /* =================================================
           CLEAR AMOUNT
           ================================================= */

        amountInput.value = "";


        /* =================================================
           CLEAR DESCRIPTION
           ================================================= */

        if (descriptionInput) {

            descriptionInput.value = "";

        }


        /* =================================================
           UPDATE BALANCE

           If backend returns updated account
           information, use it directly.
           ================================================= */

        if (
            result &&
            result.data
        ) {

            updateAccountDetails(
                result.data,
                accountNumber
            );

        }
        else {

            await refreshAccountDetails(
                accountNumber
            );

        }

    }
    catch (error) {

        console.error(
            "Deposit error:",
            error
        );


        showMessage(
            error.message ||
            "Unable to process deposit.",
            "error"
        );

    }

}


/* =========================================================
   REFRESH ACCOUNT DETAILS
   ========================================================= */

async function refreshAccountDetails(
    accountNumber
) {

    try {

        /* =================================================
           SAME ACCOUNT ENDPOINT

           GET
           /api/employee/transactions/account/{accountNumber}
           ================================================= */

        const response =
            await fetch(
                API_BASE +
                "/employee/transactions/account/" +
                encodeURIComponent(
                    accountNumber
                )
            );


        if (!response.ok) {

            console.error(
                "Unable to refresh account."
            );

            return;

        }


        const result =
            await response.json();


        console.log(
            "Updated Account:",
            result
        );


        const account =
            result.data || result;


        updateAccountDetails(
            account,
            accountNumber
        );

    }
    catch (error) {

        console.error(
            "Refresh account error:",
            error
        );

    }

}


/* =========================================================
   FORMAT CURRENCY
   ========================================================= */

function formatCurrency(amount) {

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
   SHOW MESSAGE
   ========================================================= */

function showMessage(
    message,
    type
) {

    /* =====================================================
       REMOVE OLD MESSAGE
       ===================================================== */

    const oldMessage =
        document.querySelector(
            ".deposit-message"
        );


    if (oldMessage) {

        oldMessage.remove();

    }


    /* =====================================================
       CREATE MESSAGE
       ===================================================== */

    const messageBox =
        document.createElement(
            "div"
        );


    messageBox.className =
        "deposit-message " + type;


    messageBox.textContent =
        message;


    /* =====================================================
       ADD MESSAGE TO PAGE
       ===================================================== */

    const transactionPage =
        document.querySelector(
            ".transaction-page"
        );


    if (transactionPage) {

        transactionPage.prepend(
            messageBox
        );

    }


    /* =====================================================
       REMOVE MESSAGE
       ===================================================== */

    setTimeout(
        function () {

            if (messageBox) {

                messageBox.remove();

            }

        },
        4000
    );

}


/* =========================================================
   TRANSACTION TAB NAVIGATION
   ========================================================= */

function openTransaction(type) {

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

            break;

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

        return "/" + parts[1];

    }


    return "";

}