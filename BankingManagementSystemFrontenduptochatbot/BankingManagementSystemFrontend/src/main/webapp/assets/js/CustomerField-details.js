/**
 * 
 */
/**
 * =========================================================
 * CUSTOMER DETAILS JS
 * Employee - Customer Details
 * =========================================================
 */

console.log("Customer Details JS Loaded");


/* =========================================================
   API
========================================================= */

const API_BASE =
    "http://localhost:8082/api/employee/customers";


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Customer Details Page Loaded"
        );


        loadCustomerDetails();

    }
);


/* =========================================================
   GET CUSTOMER ID FROM URL
========================================================= */

function getCustomerId() {

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    return urlParams.get("id");
}


/* =========================================================
   LOAD CUSTOMER DETAILS
========================================================= */

function loadCustomerDetails() {

    const customerId =
        getCustomerId();


    console.log(
        "Customer ID:",
        customerId
    );


    if (!customerId) {

        showError(
            "Customer ID not found."
        );

        return;

    }


    showLoading();


    const url =
        API_BASE +
        "/" +
        encodeURIComponent(
            customerId
        );


    console.log(
        "Customer Details API:",
        url
    );


    fetch(url)

        .then(
            function (response) {

                if (!response.ok) {

                    throw new Error(
                        "HTTP Error: " +
                        response.status
                    );

                }


                return response.json();

            }
        )


        .then(
            function (result) {

                console.log(
                    "Customer Details Result:",
                    result
                );


                if (
                    result &&
                    result.status === true
                ) {

                    /*
                     * ApiResponse:
                     *
                     * {
                     *   status: true,
                     *   code: 200,
                     *   message: "...",
                     *   data: {...}
                     * }
                     */

                    const customer =
                        result.data;


                    if (!customer) {

                        showError(
                            "Customer details not found."
                        );

                        return;

                    }


                    displayCustomer(
                        customer
                    );

                }

                else {

                    showError(

                        result &&
                        result.message

                            ? result.message

                            : "Customer details not found."

                    );

                }

            }
        )


        .catch(
            function (error) {

                console.error(
                    "Customer Details Error:",
                    error
                );


                showError(
                    error.message ||
                    "Unable to load customer details."
                );

            }
        );

}


/* =========================================================
   DISPLAY CUSTOMER
========================================================= */

function displayCustomer(customer) {

    console.log(
        "Customer:",
        customer
    );


    /* =====================================================
       CUSTOMER INFORMATION
    ===================================================== */

    setText(
        "customerId",
        customer.customerId
    );


    setText(
        "fullName",
        customer.fullName
    );


    setText(
        "dob",
        formatDate(customer.dob)
    );


    setText(
        "gender",
        customer.gender
    );


    setText(
        "mobile",
        customer.mobile ||
        customer.mobileNumber
    );


    setText(
        "email",
        customer.email
    );


    setText(
        "address",
        customer.address
    );


    setText(
        "city",
        customer.city
    );


    setText(
        "state",
        customer.state
    );


    setText(
        "pinCode",
        customer.pinCode ||
        customer.pin
    );


    /* =====================================================
       ACCOUNT INFORMATION
    ===================================================== */

    setText(
        "accountNumber",
        customer.accountNumber
    );


    const accountType =
        customer.accountType;


    setText(
        "accountType",
        formatAccountType(
            accountType
        )
    );


    const accountStatus =
        customer.status ||
        customer.accountStatus;


    updateStatusBadge(
        accountStatus
    );


    setText(
        "openingDate",
        formatDate(
            customer.openingDate ||
            customer.accountOpeningDate
        )
    );


    setText(
        "balance",
        "₹ " +
        formatBalance(
            customer.balance
        )
    );


    setText(
        "ifscCode",
        customer.ifscCode ||
        customer.ifsc
    );


    setText(
        "branch",
        customer.branch ||
        customer.branchName
    );


    /* =====================================================
       KYC INFORMATION
    ===================================================== */

    setText(
        "aadhaarNumber",
        formatAadhaar(
            customer.aadhaarNo ||
            customer.aadhaarNumber
        )
    );


    setText(
        "panNumber",
        customer.panNo ||
        customer.panNumber
    );


    updateKycStatus(
        customer
    );


    /* =====================================================
       STATUS MESSAGE
    ===================================================== */

    updateStatusMessage(
        accountStatus
    );


    hideLoading();


    const details =
        document.getElementById(
            "customerDetails"
        );


    if (details) {

        details.style.display =
            "grid";

    }

}


/* =========================================================
   UPDATE ACCOUNT STATUS
========================================================= */

function updateStatusBadge(status) {

    const element =
        document.getElementById(
            "accountStatus"
        );


    if (!element) {

        return;

    }


    const normalizedStatus =
        String(
            status || ""
        ).toUpperCase();


    element.classList.remove(
        "status-active",
        "status-inactive"
    );


    if (
        normalizedStatus ===
        "ACTIVE"
    ) {

        element.classList.add(
            "status-active"
        );


        element.innerText =
            "Active";

    }

    else if (
        normalizedStatus ===
        "INACTIVE"
    ) {

        element.classList.add(
            "status-inactive"
        );


        element.innerText =
            "Inactive";

    }

    else {

        element.innerText =
            status || "-";

    }

}


/* =========================================================
   KYC STATUS
========================================================= */

function updateKycStatus(customer) {

    const element =
        document.getElementById(
            "kycStatus"
        );


    if (!element) {

        return;

    }


    const status =
        customer.kycStatus ||
        customer.verificationStatus ||
        customer.approvalStatus;


    if (
        status &&
        String(status)
            .toUpperCase()
            .includes("REJECT")
    ) {

        element.innerText =
            "Rejected";

        element.className =
            "badge status-inactive";

    }

    else {

        element.innerText =
            "Verified";

        element.className =
            "badge verified";

    }

}


/* =========================================================
   STATUS MESSAGE
========================================================= */

function updateStatusMessage(status) {

    const message =
        document.getElementById(
            "statusMessageText"
        );


    if (!message) {

        return;

    }


    const normalizedStatus =
        String(
            status || ""
        ).toUpperCase();


    if (
        normalizedStatus ===
        "ACTIVE"
    ) {

        message.innerText =
            "This customer is approved and account is active.";

    }

    else if (
        normalizedStatus ===
        "INACTIVE"
    ) {

        message.innerText =
            "This customer is approved but the account is inactive.";

    }

    else {

        message.innerText =
            "Customer account information.";

    }

}


/* =========================================================
   ACCOUNT TYPE
========================================================= */

function formatAccountType(value) {

    if (!value) {

        return "-";

    }


    const text =
        String(value)
            .toLowerCase();


    if (
        text.includes("saving")
    ) {

        return "Savings Account";

    }


    if (
        text.includes("current")
    ) {

        return "Current Account";

    }


    return value;

}


/* =========================================================
   AADHAAR FORMAT
========================================================= */

function formatAadhaar(value) {

    if (!value) {

        return "-";

    }


    const text =
        String(value)
            .replace(/\s/g, "");


    /*
     * Show only last 4 digits.
     *
     * Example:
     * 123456789012
     *
     * becomes:
     * XXXX XXXX 9012
     */

    if (
        text.length >= 4
    ) {

        const lastFour =
            text.slice(-4);


        return "XXXX XXXX " +
               lastFour;

    }


    return value;

}


/* =========================================================
   BALANCE
========================================================= */

function formatBalance(value) {

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
   DATE
========================================================= */

function formatDate(value) {

    if (!value) {

        return "-";

    }


    /*
     * If backend sends:
     *
     * 1994-06-12
     *
     * display:
     *
     * 12-06-1994
     */

    const parts =
        String(value).split("-");


    if (
        parts.length === 3
    ) {

        return (
            parts[2] +
            "-" +
            parts[1] +
            "-" +
            parts[0]
        );

    }


    return value;

}


/* =========================================================
   SET TEXT
========================================================= */

function setText(id, value) {

    const element =
        document.getElementById(id);


    if (!element) {

        return;

    }


    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        element.innerText = "-";

    }

    else {

        element.innerText =
            value;

    }

}


/* =========================================================
   LOADING
========================================================= */

function showLoading() {

    const loading =
        document.getElementById(
            "loading"
        );


    const details =
        document.getElementById(
            "customerDetails"
        );


    const error =
        document.getElementById(
            "errorMessage"
        );


    if (loading) {

        loading.style.display =
            "block";

    }


    if (details) {

        details.style.display =
            "none";

    }


    if (error) {

        error.style.display =
            "none";

    }

}


/* =========================================================
   HIDE LOADING
========================================================= */

function hideLoading() {

    const loading =
        document.getElementById(
            "loading"
        );


    if (loading) {

        loading.style.display =
            "none";

    }

}


/* =========================================================
   ERROR
========================================================= */

function showError(message) {

    const loading =
        document.getElementById(
            "loading"
        );


    const details =
        document.getElementById(
            "customerDetails"
        );


    const error =
        document.getElementById(
            "errorMessage"
        );


    if (loading) {

        loading.style.display =
            "none";

    }


    if (details) {

        details.style.display =
            "none";

    }


    if (error) {

        error.innerText =
            message;

        error.style.display =
            "block";

    }

}


/* =========================================================
   BACK
========================================================= */

function goBack() {

    window.location.href =
        CONTEXT_PATH +
        "/employee/customers.jsp";

}