/* =========================================================
   WITHDRAW JS
   Employee - Banking Management System
   ========================================================= */

console.log("Withdraw JS Loaded");


/* =========================================================
   API CONFIGURATION
   ========================================================= */

const API_BASE = "http://localhost:8082/api";


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Withdraw page initialized");

    setTodayDate();

    initializeAccountInput();

});


/* =========================================================
   SET TODAY DATE
   ========================================================= */

function setTodayDate() {

    var dateInput =
        document.getElementById("transactionDate");

    if (!dateInput) {
        return;
    }

    var today = new Date();

    var year =
        today.getFullYear();

    var month =
        String(today.getMonth() + 1).padStart(2, "0");

    var day =
        String(today.getDate()).padStart(2, "0");

    dateInput.value =
        year + "-" + month + "-" + day;

}


/* =========================================================
   ACCOUNT INPUT INITIALIZATION
   ========================================================= */

function initializeAccountInput() {

    var accountInput =
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

            if (accountInput.value.trim() !== "") {

                loadAccountDetails();

            }

        }
    );

}


/* =========================================================
   LOAD ACCOUNT DETAILS
   ========================================================= */

async function loadAccountDetails() {

    var accountInput =
        document.getElementById("accountNumber");

    if (!accountInput) {
        return;
    }


    var accountNumber =
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
           ACCOUNT DETAILS API

           GET
           /api/employee/transactions/account/{accountNumber}
           ================================================= */

        var response =
            await fetch(
                API_BASE +
                "/employee/transactions/account/" +
                encodeURIComponent(accountNumber)
            );


        /* =================================================
           BACKEND ERROR
           ================================================= */

        if (!response.ok) {

            clearAccountDetails();

            var errorResult = null;

            try {

                errorResult =
                    await response.json();

            } catch (error) {

                console.log(
                    "Error response is not JSON"
                );

            }


            var errorMessage =
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
           READ JSON
           ================================================= */

        var result =
            await response.json();


        console.log(
            "Account Details Response:",
            result
        );


        /* =================================================
           GET DATA
           ================================================= */

        var account =
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
           CUSTOMER NAME
           ================================================= */

        var customerName =
            document.getElementById(
                "customerName"
            );


        if (customerName) {

            customerName.textContent =
                account.customerName ||
                account.fullName ||
                "-";

        }


        /* =================================================
           ACCOUNT NUMBER
           ================================================= */

        var displayAccountNumber =
            document.getElementById(
                "displayAccountNumber"
            );


        if (displayAccountNumber) {

            displayAccountNumber.textContent =
                account.accountNumber ||
                accountNumber;

        }


        /* =================================================
           ACCOUNT TYPE
           ================================================= */

        var accountType =
            document.getElementById(
                "accountType"
            );


        if (accountType) {

            accountType.textContent =
                account.accountType ||
                "-";

        }


        /* =================================================
           CURRENT BALANCE
           ================================================= */

        var balance =
            parseFloat(
                account.currentBalance ||
                account.balance ||
                0
            );


        var currentBalance =
            document.getElementById(
                "currentBalance"
            );


        if (currentBalance) {

            currentBalance.textContent =
                formatCurrency(balance);

        }


        /* =================================================
           AVAILABLE BALANCE
           ================================================= */

        var availableBalance =
            document.getElementById(
                "availableBalance"
            );


        if (availableBalance) {

            availableBalance.textContent =
                formatCurrency(balance);

        }


        console.log(
            "Account loaded successfully"
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
   CLEAR ACCOUNT DETAILS
   ========================================================= */

function clearAccountDetails() {

    var customerName =
        document.getElementById(
            "customerName"
        );


    var displayAccountNumber =
        document.getElementById(
            "displayAccountNumber"
        );


    var accountType =
        document.getElementById(
            "accountType"
        );


    var currentBalance =
        document.getElementById(
            "currentBalance"
        );


    var availableBalance =
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
   WITHDRAW AMOUNT
   ========================================================= */

async function withdrawAmount() {

    var accountInput =
        document.getElementById(
            "accountNumber"
        );


    var amountInput =
        document.getElementById(
            "withdrawAmount"
        );


    if (!accountInput || !amountInput) {

        showMessage(
            "Required fields not found.",
            "error"
        );

        return;

    }


    var accountNumber =
        accountInput.value.trim();


    var amount =
        amountInput.value.trim();


    var descriptionInput =
        document.getElementById(
            "description"
        );


    var description =
        descriptionInput
            ? descriptionInput.value.trim()
            : "";


    var transactionDateInput =
        document.getElementById(
            "transactionDate"
        );


    var transactionDate =
        transactionDateInput
            ? transactionDateInput.value
            : "";


    /* =====================================================
       VALIDATE ACCOUNT NUMBER
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
            "Please enter a valid withdraw amount.",
            "error"
        );

        amountInput.focus();

        return;

    }


    var withdrawAmountValue =
        parseFloat(amount);


    /* =====================================================
       VALIDATE DATE
       ===================================================== */

    if (transactionDate === "") {

        setTodayDate();

        transactionDate =
            document.getElementById(
                "transactionDate"
            ).value;

    }


    /* =====================================================
       GET CURRENT BALANCE
       ===================================================== */

    var balanceElement =
        document.getElementById(
            "currentBalance"
        );


    var currentBalance = 0;


    if (
        balanceElement &&
        balanceElement.textContent
    ) {

        var balanceText =
            balanceElement.textContent
                .replace(/[₹,]/g, "")
                .trim();


        currentBalance =
            parseFloat(balanceText) || 0;

    }


    /* =====================================================
       CHECK INSUFFICIENT BALANCE
       ===================================================== */

    if (
        withdrawAmountValue >
        currentBalance
    ) {

        showMessage(
            "Insufficient balance.",
            "error"
        );

        return;

    }


    /* =====================================================
       MINIMUM BALANCE
       ===================================================== */

    var minimumBalance = 500;


    if (
        currentBalance -
        withdrawAmountValue <
        minimumBalance
    ) {

        showMessage(
            "Withdrawal failed. Minimum balance of ₹500 must be maintained.",
            "error"
        );

        return;

    }


    /* =====================================================
       REQUEST DATA
       ===================================================== */

    var withdrawData = {

        accountNumber:
            accountNumber,

        amount:
            withdrawAmountValue,

        description:
            description,

        transactionDate:
            transactionDate

    };


    console.log(
        "Withdraw Request:",
        withdrawData
    );


    /* =====================================================
       SEND REQUEST
       ===================================================== */

    try {

        var response =
            await fetch(
                API_BASE +
                "/employee/transactions/withdraw",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            withdrawData
                        )

                }
            );


        /* =================================================
           READ RESPONSE
           ================================================= */

        var result = null;


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
            "Withdraw Response:",
            result
        );


        /* =================================================
           BACKEND ERROR
           ================================================= */

        if (!response.ok) {

            var errorMessage =
                "Withdrawal failed.";


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
            result && result.message
                ? result.message
                : "Amount withdrawn successfully.",
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
           REFRESH ACCOUNT DETAILS
           ================================================= */

        await refreshAccountDetails(
            accountNumber
        );


    }
    catch (error) {

        console.error(
            "Withdraw error:",
            error
        );


        showMessage(
            error.message ||
            "Unable to process withdrawal.",
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

        var response =
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


        var result =
            await response.json();


        console.log(
            "Updated Account:",
            result
        );


        var account =
            result.data || result;


        updateAccountDetails(account);


    }
    catch (error) {

        console.error(
            "Refresh account error:",
            error
        );

    }

}


/* =========================================================
   UPDATE ACCOUNT DETAILS
   ========================================================= */

function updateAccountDetails(account) {

    if (!account) {
        return;
    }


    var customerName =
        document.getElementById(
            "customerName"
        );


    if (customerName) {

        customerName.textContent =
            account.customerName ||
            account.fullName ||
            "-";

    }


    var displayAccountNumber =
        document.getElementById(
            "displayAccountNumber"
        );


    if (displayAccountNumber) {

        displayAccountNumber.textContent =
            account.accountNumber ||
            "-";

    }


    var accountType =
        document.getElementById(
            "accountType"
        );


    if (accountType) {

        accountType.textContent =
            account.accountType ||
            "-";

    }


    var balance =
        parseFloat(
            account.currentBalance ||
            account.balance ||
            0
        );


    var currentBalance =
        document.getElementById(
            "currentBalance"
        );


    if (currentBalance) {

        currentBalance.textContent =
            formatCurrency(balance);

    }


    var availableBalance =
        document.getElementById(
            "availableBalance"
        );


    if (availableBalance) {

        availableBalance.textContent =
            formatCurrency(balance);

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

    var oldMessage =
        document.querySelector(
            ".withdraw-message"
        );


    if (oldMessage) {

        oldMessage.remove();

    }


    var messageBox =
        document.createElement(
            "div"
        );


    messageBox.className =
        "withdraw-message " +
        type;


    messageBox.textContent =
        message;


    var transactionPage =
        document.querySelector(
            ".transaction-page"
        );


    if (transactionPage) {

        transactionPage.prepend(
            messageBox
        );

    }


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

    var contextPath =
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

    var path =
        window.location.pathname;


    var parts =
        path.split("/");


    if (
        parts.length > 1 &&
        parts[1] !== ""
    ) {

        return "/" + parts[1];

    }


    return "";

}