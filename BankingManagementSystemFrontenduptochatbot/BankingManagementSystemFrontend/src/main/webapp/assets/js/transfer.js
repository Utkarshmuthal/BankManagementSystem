/* =========================================================
   TRANSFER JS
   Employee - Banking Management System
   ========================================================= */

console.log("Transfer JS Loaded");


/* =========================================================
   API CONFIGURATION
   ========================================================= */

const API_BASE = "http://localhost:8082/api";


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Transfer page initialized");

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
   INITIALIZE ACCOUNT INPUT
   ========================================================= */

function initializeAccountInput() {

    const accountInput =
        document.getElementById("fromAccountNumber");

    if (!accountInput) {
        return;
    }


    /* -----------------------------------------------------
       LOAD ACCOUNT DETAILS ON BLUR
       ----------------------------------------------------- */

    accountInput.addEventListener(
        "blur",
        function () {

            loadAccountDetails();

        }
    );


    /* -----------------------------------------------------
       LOAD ACCOUNT DETAILS ON ENTER
       ----------------------------------------------------- */

    accountInput.addEventListener(
        "keypress",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                loadAccountDetails();

            }

        }
    );

}


/* =========================================================
   LOAD SENDER ACCOUNT DETAILS
   ========================================================= */

async function loadAccountDetails() {

    const accountInput =
        document.getElementById("fromAccountNumber");

    if (!accountInput) {
        return;
    }


    const accountNumber =
        accountInput.value.trim();


    /* -----------------------------------------------------
       EMPTY ACCOUNT NUMBER
       ----------------------------------------------------- */

    if (accountNumber === "") {

        clearAccountDetails();

        return;

    }


    console.log(
        "Loading sender account:",
        accountNumber
    );


    try {

        const response =
            await fetch(
                API_BASE +
                "/employee/transactions/account/" +
                encodeURIComponent(accountNumber)
            );


        /* -------------------------------------------------
           ACCOUNT NOT FOUND
           ------------------------------------------------- */

        if (!response.ok) {

            clearAccountDetails();

            if (response.status === 404) {

                showMessage(
                    "Account not found.",
                    "error"
                );

                return;

            }

            throw new Error(
                "Unable to load account details."
            );

        }


        const result =
            await response.json();


        console.log(
            "Account Details:",
            result
        );


        const account =
            result.data || result;


        displayAccountDetails(
            account,
            accountNumber
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
   DISPLAY ACCOUNT DETAILS
   ========================================================= */

function displayAccountDetails(
    account,
    accountNumber
) {


    /* -----------------------------------------------------
       CUSTOMER NAME
       ----------------------------------------------------- */

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


    /* -----------------------------------------------------
       ACCOUNT NUMBER
       ----------------------------------------------------- */

    const displayAccountNumber =
        document.getElementById(
            "displayAccountNumber"
        );


    if (displayAccountNumber) {

        displayAccountNumber.textContent =
            account.accountNumber ||
            accountNumber;

    }


    /* -----------------------------------------------------
       ACCOUNT TYPE
       ----------------------------------------------------- */

    const accountType =
        document.getElementById(
            "accountType"
        );


    if (accountType) {

        accountType.textContent =
            account.accountType ||
            "-";

    }


    /* -----------------------------------------------------
       BALANCE
       ----------------------------------------------------- */

    const balance =
        parseFloat(
            account.currentBalance ??
            account.balance ??
            0
        );


    /* -----------------------------------------------------
       CURRENT BALANCE
       ----------------------------------------------------- */

    const currentBalance =
        document.getElementById(
            "currentBalance"
        );


    if (currentBalance) {

        currentBalance.textContent =
            formatCurrency(balance);

    }


    /* -----------------------------------------------------
       AVAILABLE BALANCE
       ----------------------------------------------------- */

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
   TRANSFER AMOUNT
   ========================================================= */

async function transferAmount() {


    /* =====================================================
       SENDER ACCOUNT
       ===================================================== */

    const fromAccount =
        document.getElementById(
            "fromAccountNumber"
        ).value.trim();


    /* =====================================================
       RECEIVER ACCOUNT
       ===================================================== */

    const toAccount =
        document.getElementById(
            "toAccountNumber"
        ).value.trim();


    /* =====================================================
       TRANSFER AMOUNT
       ===================================================== */

    const amount =
        document.getElementById(
            "transferAmount"
        ).value.trim();


    /* =====================================================
       DESCRIPTION
       ===================================================== */

    const description =
        document.getElementById(
            "description"
        ).value.trim();


    /* =====================================================
       TRANSACTION DATE
       ===================================================== */

    const transactionDate =
        document.getElementById(
            "transactionDate"
        ).value;


    /* =====================================================
       VALIDATE SENDER ACCOUNT
       ===================================================== */

    if (fromAccount === "") {

        showMessage(
            "Please enter sender account number.",
            "error"
        );


        document.getElementById(
            "fromAccountNumber"
        ).focus();


        return;

    }


    /* =====================================================
       VALIDATE RECEIVER ACCOUNT
       ===================================================== */

    if (toAccount === "") {

        showMessage(
            "Please enter receiver account number.",
            "error"
        );


        document.getElementById(
            "toAccountNumber"
        ).focus();


        return;

    }


    /* =====================================================
       SAME ACCOUNT CHECK
       ===================================================== */

    if (fromAccount === toAccount) {

        showMessage(
            "Sender and receiver account cannot be same.",
            "error"
        );


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
            "Please enter a valid transfer amount.",
            "error"
        );


        document.getElementById(
            "transferAmount"
        ).focus();


        return;

    }


    /* =====================================================
       VALIDATE DATE
       ===================================================== */

    if (transactionDate === "") {

        showMessage(
            "Please select transaction date.",
            "error"
        );


        document.getElementById(
            "transactionDate"
        ).focus();


        return;

    }


    /* =====================================================
       CHECK CURRENT BALANCE
       ===================================================== */

    const balanceElement =
        document.getElementById(
            "currentBalance"
        );


    let currentBalance = 0;


    if (
        balanceElement &&
        balanceElement.textContent
    ) {

        const balanceText =
            balanceElement.textContent
                .replace(/[₹,]/g, "")
                .trim();


        currentBalance =
            parseFloat(balanceText) || 0;

    }


    const transferAmountValue =
        parseFloat(amount);


    /* =====================================================
       FRONTEND BALANCE CHECK
       ===================================================== */

    if (
        transferAmountValue >
        currentBalance
    ) {

        showMessage(
            "Insufficient balance in sender account.",
            "error"
        );


        return;

    }


    /* =====================================================
       REQUEST DATA
       
       IMPORTANT:
       These names must match backend DTO.
       ===================================================== */

    const transferData = {

        fromAccount:
            fromAccount,

        toAccount:
            toAccount,

        amount:
            transferAmountValue,

        description:
            description,

        transactionDate:
            transactionDate

    };


    console.log(
        "Transfer Request:",
        transferData
    );


    /* =====================================================
       SEND REQUEST TO BACKEND
       ===================================================== */

    try {

        const response =
            await fetch(
                API_BASE +
                "/employee/transactions/transfer",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            transferData
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
            "Transfer Response:",
            result
        );


        /* =================================================
           BACKEND ERROR
           ================================================= */

        if (!response.ok) {

            let errorMessage =
                "Transfer failed.";


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
            "Amount transferred successfully.",
            "success"
        );


        /* -------------------------------------------------
           CLEAR AMOUNT
           ------------------------------------------------- */

        const transferInput =
            document.getElementById(
                "transferAmount"
            );


        if (transferInput) {

            transferInput.value = "";

        }


        /* -------------------------------------------------
           CLEAR DESCRIPTION
           ------------------------------------------------- */

        const descriptionInput =
            document.getElementById(
                "description"
            );


        if (descriptionInput) {

            descriptionInput.value = "";

        }


        /* -------------------------------------------------
           REFRESH SENDER ACCOUNT
           ------------------------------------------------- */

        await refreshAccountDetails(
            fromAccount
        );


    }
    catch (error) {

        console.error(
            "Transfer error:",
            error
        );


        showMessage(
            error.message ||
            "Unable to process transfer.",
            "error"
        );

    }

}


/* =========================================================
   REFRESH SENDER ACCOUNT DETAILS
   ========================================================= */

async function refreshAccountDetails(
    accountNumber
) {

    try {

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


        displayAccountDetails(
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


    /* -----------------------------------------------------
       REMOVE OLD MESSAGE
       ----------------------------------------------------- */

    const oldMessage =
        document.querySelector(
            ".transfer-message"
        );


    if (oldMessage) {

        oldMessage.remove();

    }


    /* -----------------------------------------------------
       CREATE MESSAGE
       ----------------------------------------------------- */

    const messageBox =
        document.createElement(
            "div"
        );


    messageBox.className =
        "transfer-message " +
        type;


    messageBox.textContent =
        message;


    /* -----------------------------------------------------
       ADD MESSAGE TO PAGE
       ----------------------------------------------------- */

    const transactionContainer =
        document.querySelector(
            ".transaction-container"
        );


    const transactionPage =
        document.querySelector(
            ".transaction-page"
        );


    if (transactionContainer) {

        transactionContainer.prepend(
            messageBox
        );

    }
    else if (transactionPage) {

        transactionPage.prepend(
            messageBox
        );

    }


    /* -----------------------------------------------------
       REMOVE MESSAGE AFTER 4 SECONDS
       ----------------------------------------------------- */

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
   TRANSACTION NAVIGATION
   ========================================================= */

function openTransaction(type) {

    const contextPath =
        getContextPath();


    switch (type) {


        /* =================================================
           DEPOSIT
           ================================================= */

        case "deposit":

            window.location.href =
                contextPath +
                "/employee/deposite.jsp";

            break;


        /* =================================================
           WITHDRAW
           ================================================= */

        case "withdraw":

            window.location.href =
                contextPath +
                "/employee/withdraw.jsp";

            break;


        /* =================================================
           TRANSFER
           ================================================= */

        case "transfer":

            window.location.href =
                contextPath +
                "/employee/transfer.jsp";

            break;


        /* =================================================
           TRANSACTION HISTORY
           ================================================= */

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