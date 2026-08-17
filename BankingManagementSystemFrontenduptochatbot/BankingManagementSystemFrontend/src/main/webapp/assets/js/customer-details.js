/*
 * =========================================================
 * CUSTOMER DETAILS JS
 * Employee - Customer Details
 * =========================================================
 */

console.log("Customer Details JS Loaded");

/* =========================================================
   API BASE URL
   ========================================================= */

const API_BASE =
    "http://localhost:8082/api/employee/requests";

/* =========================================================
   UPLOAD BASE URL
   IMPORTANT:
   Change this ONLY if your Spring Boot upload mapping
   uses a different URL.
   ========================================================= */

const UPLOAD_BASE =
    "http://localhost:8082/uploads";


/* =========================================================
   GET CUSTOMER ID FROM URL

   Example:
   customer-details.jsp?id=5
   ========================================================= */

const urlParams =
    new URLSearchParams(window.location.search);

const customerId =
    urlParams.get("id");

console.log("Customer ID:", customerId);
console.log("API BASE:", API_BASE);
console.log("UPLOAD BASE:", UPLOAD_BASE);


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    if (!customerId) {

        console.error(
            "Customer ID missing from URL"
        );

        alert(
            "Customer ID not found in URL."
        );

        return;
    }

    loadCustomerDetails(customerId);

});


/* =========================================================
   LOAD CUSTOMER DETAILS
   ========================================================= */

function loadCustomerDetails(id) {

    const url =
        API_BASE +
        "/" +
        encodeURIComponent(id);

    console.log(
        "Loading customer details from:"
    );

    console.log(url);


    fetch(url, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })

    .then(function (response) {

        console.log(
            "Customer Details HTTP Status:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                "HTTP Error: " +
                response.status
            );

        }


        return response.json();

    })

    .then(function (result) {

        console.log(
            "Customer Details API Response:",
            result
        );


        /* =================================================
           CHECK API RESPONSE
           ================================================= */

        if (!result.status) {

            console.error(
                "Backend returned failure:",
                result.message
            );

            alert(
                result.message ||
                "Unable to load customer details."
            );

            return;
        }


        const customer =
            result.data;


        if (!customer) {

            console.error(
                "result.data is null."
            );

            alert(
                "Customer information not found."
            );

            return;
        }


        console.log(
            "Customer Object:",
            customer
        );


        /* =================================================
           CUSTOMER INFORMATION
           ================================================= */

        setValue(
            "customerId",
            customer.customerId
        );

        setValue(
            "fullName",
            customer.fullName
        );

        setValue(
            "email",
            customer.email
        );

        setValue(
            "mobile",
            customer.mobile
        );

        setValue(
            "dob",
            customer.dob
        );

        setValue(
            "gender",
            customer.gender
        );

        setValue(
            "accountType",
            customer.accountType
        );

        setValue(
            "city",
            customer.city
        );

        setValue(
            "state",
            customer.state
        );

        setValue(
            "pinCode",
            customer.pinCode
        );

        setValue(
            "address",
            customer.address
        );


        /* =================================================
           AADHAAR NUMBER
           ================================================= */

        setValue(
            "aadhaarNo",
            customer.aadhaarNo
        );


        /* =================================================
           PAN NUMBER
           ================================================= */

        setValue(
            "panNo",
            customer.panNo
        );


        /* =================================================
           DOCUMENT IMAGES
           ================================================= */

        console.log(
            "Aadhaar Image Name:",
            customer.aadhaarImage
        );

        console.log(
            "PAN Image Name:",
            customer.panImage
        );


        loadImage(
            "aadhaarImage",
            customer.aadhaarImage,
            "aadhaar"
        );


        loadImage(
            "panImage",
            customer.panImage,
            "pan"
        );


        /* =================================================
           STATUS
           ================================================= */

        updateStatus(
            customer.approvalStatus
        );

    })

    .catch(function (error) {

        console.error(
            "Customer Details Error:",
            error
        );

        alert(
            "Unable to load customer details. " +
            "Please check the backend API."
        );

    });

}


/* =========================================================
   SET VALUE
   ========================================================= */

function setValue(elementId, value) {

    const element =
        document.getElementById(elementId);


    if (!element) {

        console.warn(
            "Element not found:",
            elementId
        );

        return;
    }


    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        element.innerText = "-";

    } else {

        element.innerText = value;

    }

}


/* =========================================================
   LOAD IMAGE
   ========================================================= */

function loadImage(
    elementId,
    imageName,
    folder
) {

    const image =
        document.getElementById(elementId);


    if (!image) {

        console.error(
            "Image element not found:",
            elementId
        );

        return;
    }


    /* =====================================================
       CHECK IMAGE NAME
       ===================================================== */

    if (
        imageName === null ||
        imageName === undefined ||
        imageName === "" ||
        imageName === "null"
    ) {

        console.warn(
            "No image available:",
            elementId
        );

        image.removeAttribute("src");

        image.alt =
            "Document not available";

        return;
    }


    /* =====================================================
       CREATE IMAGE URL
       ===================================================== */

    const imageUrl =
        UPLOAD_BASE +
        "/" +
        folder +
        "/" +
        encodeURIComponent(imageName);


    console.log(
        "Loading image:",
        imageUrl
    );


    /* =====================================================
       SET IMAGE
       ===================================================== */

    image.src = imageUrl;

    image.alt =
        folder.toUpperCase() +
        " Document";


    /* =====================================================
       IMAGE LOADED
       ===================================================== */

    image.onload = function () {

        console.log(
            "Image loaded successfully:",
            imageUrl
        );

    };


    /* =====================================================
       IMAGE ERROR
       ===================================================== */

    image.onerror = function () {

        console.error(
            "IMAGE FAILED TO LOAD:"
        );

        console.error(
            imageUrl
        );

        image.alt =
            "Unable to load " +
            folder +
            " document";

    };

}


/* =========================================================
   UPDATE STATUS
   ========================================================= */

function updateStatus(status) {

    const statusElement =
        document.querySelector(
            ".page-header .status"
        );


    if (!statusElement) {

        console.warn(
            "Status element not found."
        );

        return;
    }


    if (
        !status ||
        status === "PENDING_APPROVAL"
    ) {

        statusElement.innerText =
            "Pending Approval";

        statusElement.className =
            "status pending";

        return;
    }


    if (status === "APPROVED") {

        statusElement.innerText =
            "Approved";

        statusElement.className =
            "status approved";

        return;
    }


    if (status === "REJECTED") {

        statusElement.innerText =
            "Rejected";

        statusElement.className =
            "status rejected";

        return;
    }


    statusElement.innerText =
        status;

}


/* =========================================================
   APPROVE CUSTOMER
   ========================================================= */

function approveCustomer() {

    if (!customerId) {

        alert(
            "Customer ID not found."
        );

        return;
    }


    const confirmation =
        confirm(
            "Are you sure you want to approve this customer and create the account?"
        );


    if (!confirmation) {

        return;
    }


    const url =
        API_BASE +
        "/" +
        encodeURIComponent(customerId) +
        "/approve";


    console.log(
        "Approve URL:",
        url
    );


    fetch(url, {

        method: "PUT",

        headers: {

            "Content-Type":
                "application/json",

            "Accept":
                "application/json"

        }

    })

    .then(function (response) {

        console.log(
            "Approve HTTP Status:",
            response.status
        );


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
            "Approve Response:",
            result
        );


        if (result.status) {

            alert(
                result.message ||
                "Customer approved successfully."
            );


            window.location.href =
                "registrationRequest.jsp";

        } else {

            alert(
                result.message ||
                "Unable to approve customer."
            );

        }

    })

    .catch(function (error) {

        console.error(
            "Approve Customer Error:",
            error
        );

        alert(
            "Unable to approve customer. " +
            "Please check the backend."
        );

    });

}


/* =========================================================
   REJECT CUSTOMER
   ========================================================= */

function rejectCustomer() {

    if (!customerId) {

        alert(
            "Customer ID not found."
        );

        return;
    }


    const confirmation =
        confirm(
            "Are you sure you want to reject this customer registration?"
        );


    if (!confirmation) {

        return;
    }


    const url =
        API_BASE +
        "/" +
        encodeURIComponent(customerId) +
        "/reject";


    console.log(
        "Reject URL:",
        url
    );


    fetch(url, {

        method: "PUT",

        headers: {

            "Content-Type":
                "application/json",

            "Accept":
                "application/json"

        }

    })

    .then(function (response) {

        console.log(
            "Reject HTTP Status:",
            response.status
        );


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
            "Reject Response:",
            result
        );


        if (result.status) {

            alert(
                result.message ||
                "Customer rejected successfully."
            );


            window.location.href =
                "registrationRequest.jsp";

        } else {

            alert(
                result.message ||
                "Unable to reject customer."
            );

        }

    })

    .catch(function (error) {

        console.error(
            "Reject Customer Error:",
            error
        );

        alert(
            "Unable to reject customer. " +
            "Please check the backend."
        );

    });
	
	async function approveCustomer(customerId) {

	    if (!confirm("Are you sure you want to approve this customer?")) {
	        return;
	    }

	    try {

	        const response = await fetch(
	            `${contextPath}/api/employee/requests/${customerId}/approve`,
	            {
	                method: "PUT",
	                headers: {
	                    "Content-Type": "application/json"
	                },
	                credentials: "include"
	            }
	        );

	        const result = await response.json();

	        if (response.ok && result.status === true) {

	            alert(result.message);

	            // Refresh page/list
	            location.reload();

	        } else {

	            alert(result.message || "Unable to approve customer.");
	        }

	    } catch (error) {

	        console.error("Approve error:", error);
	        alert("Something went wrong while approving customer.");
	    }
	}
	async function rejectCustomer(customerId) {

	    if (!confirm("Are you sure you want to reject this customer?")) {
	        return;
	    }

	    try {

	        const response = await fetch(
	            `${contextPath}/api/employee/requests/${customerId}/reject`,
	            {
	                method: "PUT",
	                headers: {
	                    "Content-Type": "application/json"
	                },
	                credentials: "include"
	            }
	        );

	        const result = await response.json();

	        if (response.ok && result.status === true) {

	            alert(result.message);

	            // Refresh page/list
	            location.reload();

	        } else {

	            alert(result.message || "Unable to reject customer.");
	        }

	    } catch (error) {

	        console.error("Reject error:", error);
	        alert("Something went wrong while rejecting customer.");
	    }
	}
}