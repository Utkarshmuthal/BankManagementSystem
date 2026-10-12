/**
 * =========================================================
 * ADMIN SETTINGS JAVASCRIPT
 * =========================================================
 */


/* =========================================================
   BACKEND URL
   ========================================================= */

const API_BASE_URL = "http://localhost:8082";


/* =========================================================
   GET LOGGED-IN ADMIN USER ID
   ========================================================= */

function getAdminUserId() {

    let userId =
        sessionStorage.getItem("userId");

    if (!userId) {
        userId =
            localStorage.getItem("userId");
    }

    if (!userId) {
        userId =
            sessionStorage.getItem("adminUserId");
    }

    if (!userId) {
        userId =
            localStorage.getItem("adminUserId");
    }

    if (!userId) {

        console.error(
            "Admin userId not found."
        );

        showToast(
            "Admin session expired. Please login again.",
            "error"
        );

        return null;
    }

    return userId;
}


/* =========================================================
   TOAST MESSAGE
   ========================================================= */

function showToast(message, type = "success") {

    const oldToast =
        document.querySelector(".toast-message");

    if (oldToast) {
        oldToast.remove();
    }

    const toast =
        document.createElement("div");

    toast.className =
        "toast-message " + type;

    toast.innerHTML =
        message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.style.opacity = "0";

        toast.style.transform =
            "translateX(120%)";

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 2500);
}


/* =========================================================
   SAVE ADMIN PROFILE
   =========================================================

   EMAIL UPDATE NOW SHOWS CONFIRMATION POPUP

   Full Name and Phone Number are frontend/display only.
   ========================================================= */

async function saveAdminProfile() {

    const emailElement =
        document.getElementById("adminEmail");

    if (!emailElement) {

        showToast(
            "Email field not found.",
            "error"
        );

        return;
    }

    const email =
        emailElement.value.trim();


    /* -----------------------------------------------------
       VALIDATE EMAIL
       ----------------------------------------------------- */

    if (email === "") {

        showToast(
            "Please enter email.",
            "error"
        );

        return;
    }


    if (!validateEmail(email)) {

        showToast(
            "Please enter a valid email.",
            "error"
        );

        return;
    }


    /* -----------------------------------------------------
       GET ADMIN USER ID
       ----------------------------------------------------- */

    const userId =
        getAdminUserId();

    if (!userId) {
        return;
    }


    /* -----------------------------------------------------
       SHOW EMAIL UPDATE POPUP
       ----------------------------------------------------- */

    showEmailUpdatePopup();
}


/* =========================================================
   SHOW EMAIL UPDATE POPUP
   ========================================================= */

   function showEmailUpdatePopup() {

       console.log("STEP 1: save popup function called");

       const modal = document.getElementById("emailUpdateModal");

       console.log("STEP 2: modal =", modal);

       if (modal) {

           modal.style.display = "flex";

           console.log("STEP 3: popup displayed");

       } else {

           console.error("STEP 3: emailUpdateModal NOT FOUND");
       }
   }

/* =========================================================
   CLOSE EMAIL UPDATE POPUP
   ========================================================= */

function closeEmailUpdatePopup() {

    const modal =
        document.getElementById(
            "emailUpdateModal"
        );

    if (modal) {

        modal.classList.remove("show");

    }
}


/* =========================================================
   CONFIRM EMAIL UPDATE
   ========================================================= */

async function confirmEmailUpdate() {

    const emailElement =
        document.getElementById("adminEmail");

    if (!emailElement) {
        return;
    }

    const email =
        emailElement.value.trim();


    /* -----------------------------------------------------
       GET ADMIN USER ID
       ----------------------------------------------------- */

    const userId =
        getAdminUserId();

    if (!userId) {

        closeEmailUpdatePopup();

        return;
    }


    /* -----------------------------------------------------
       GET UPDATE BUTTON
       ----------------------------------------------------- */

    const updateButton =
        document.querySelector(
            ".email-update-btn"
        );


    if (updateButton) {

        updateButton.disabled = true;

        updateButton.textContent =
            "Updating...";

    }


    try {

        /* -------------------------------------------------
           CALL BACKEND
           ------------------------------------------------- */

        const response =
            await fetch(
                `${API_BASE_URL}/api/admin/settings/profile/${userId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        email: email
                    })
                }
            );


        /* -------------------------------------------------
           READ RESPONSE
           ------------------------------------------------- */

        const data =
            await response.json();


        console.log(
            "Admin profile response:",
            data
        );


        /* -------------------------------------------------
           SUCCESS
           ------------------------------------------------- */

        if (
            response.ok &&
            (
                data.success === true ||
                data.code === 200
            )
        ) {

            closeEmailUpdatePopup();


            showToast(
                "Admin email updated successfully.",
                "success"
            );


            /* -------------------------------------------------
               UPDATE NAVBAR EMAIL
               ------------------------------------------------- */

            const navbarEmail =
                document.getElementById(
                    "navbarAdminEmail"
                );

            if (navbarEmail) {

                navbarEmail.textContent =
                    email;

            }


            /* -------------------------------------------------
               STORE UPDATED EMAIL
               ------------------------------------------------- */

            sessionStorage.setItem(
                "adminEmail",
                email
            );


        } else {

            showToast(
                data.message ||
                "Unable to update admin email.",
                "error"
            );

        }


    } catch (error) {

        console.error(
            "Update admin email error:",
            error
        );


        showToast(
            "Unable to connect to server.",
            "error"
        );


    } finally {

        /* -------------------------------------------------
           ENABLE UPDATE BUTTON AGAIN
           ------------------------------------------------- */

        if (updateButton) {

            updateButton.disabled = false;

            updateButton.textContent =
                "Update";

        }

    }
}


/* =========================================================
   UPDATE ADMIN PASSWORD
   ========================================================= */

async function updatePassword() {

    const currentPasswordElement =
        document.getElementById(
            "currentPassword"
        );

    const newPasswordElement =
        document.getElementById(
            "newPassword"
        );

    const confirmPasswordElement =
        document.getElementById(
            "confirmPassword"
        );


    /* -----------------------------------------------------
       CHECK ELEMENTS
       ----------------------------------------------------- */

    if (
        !currentPasswordElement ||
        !newPasswordElement ||
        !confirmPasswordElement
    ) {

        showToast(
            "Password fields not found.",
            "error"
        );

        return;
    }


    /* -----------------------------------------------------
       GET VALUES
       ----------------------------------------------------- */

    const currentPassword =
        currentPasswordElement.value.trim();

    const newPassword =
        newPasswordElement.value.trim();

    const confirmPassword =
        confirmPasswordElement.value.trim();


    /* -----------------------------------------------------
       VALIDATION
       ----------------------------------------------------- */

    if (currentPassword === "") {

        showToast(
            "Please enter current password.",
            "error"
        );

        return;
    }


    if (newPassword === "") {

        showToast(
            "Please enter new password.",
            "error"
        );

        return;
    }


    if (newPassword.length < 6) {

        showToast(
            "New password must contain at least 6 characters.",
            "error"
        );

        return;
    }


    if (confirmPassword === "") {

        showToast(
            "Please confirm your new password.",
            "error"
        );

        return;
    }


    if (newPassword !== confirmPassword) {

        showToast(
            "New password and confirm password do not match.",
            "error"
        );

        return;
    }


    /* -----------------------------------------------------
       GET ADMIN USER ID
       ----------------------------------------------------- */

    const userId =
        getAdminUserId();

    if (!userId) {
        return;
    }


    /* -----------------------------------------------------
       GET BUTTON
       ----------------------------------------------------- */

    const button =
        document.querySelector(
            'button[onclick="updatePassword()"]'
        );


    if (button) {

        button.disabled = true;

        button.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Updating...';

    }


    try {

        /* -------------------------------------------------
           CALL BACKEND
           ------------------------------------------------- */

        const response =
            await fetch(
                `${API_BASE_URL}/api/admin/settings/password/${userId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        currentPassword:
                            currentPassword,

                        newPassword:
                            newPassword,

                        confirmPassword:
                            confirmPassword

                    })
                }
            );


        /* -------------------------------------------------
           READ RESPONSE
           ------------------------------------------------- */

        const data =
            await response.json();


        console.log(
            "Change password response:",
            data
        );


        /* -------------------------------------------------
           SUCCESS
           ------------------------------------------------- */

        if (
            response.ok &&
            (
                data.success === true ||
                data.code === 200
            )
        ) {

            showToast(
                "Password changed successfully.",
                "success"
            );


            /* Clear fields */

            currentPasswordElement.value =
                "";

            newPasswordElement.value =
                "";

            confirmPasswordElement.value =
                "";


        } else {

            showToast(
                data.message ||
                "Unable to change password.",
                "error"
            );

        }


    } catch (error) {

        console.error(
            "Change password error:",
            error
        );


        showToast(
            "Unable to connect to server.",
            "error"
        );


    } finally {

        /* -------------------------------------------------
           ENABLE BUTTON
           ------------------------------------------------- */

        if (button) {

            button.disabled = false;

            button.innerHTML =
                '<i class="fa-solid fa-lock"></i> Update Password';

        }

    }

}	/* =========================================================
	   SAVE BANK INFORMATION
	   =========================================================

	   FRONTEND ONLY
	   ========================================================= */

	function saveBankInformation() {

	    const bankName =
	        document.getElementById(
	            "bankName"
	        ).value.trim();

	    const branchName =
	        document.getElementById(
	            "branchName"
	        ).value.trim();

	    const ifscCode =
	        document.getElementById(
	            "ifscCode"
	        ).value.trim();

	    const address =
	        document.getElementById(
	            "bankAddress"
	        ).value.trim();

	    const contact =
	        document.getElementById(
	            "contactNumber"
	        ).value.trim();

	    const email =
	        document.getElementById(
	            "bankEmail"
	        ).value.trim();


	    if (bankName === "") {

	        showToast(
	            "Please enter bank name.",
	            "error"
	        );

	        return;
	    }


	    if (branchName === "") {

	        showToast(
	            "Please enter branch name.",
	            "error"
	        );

	        return;
	    }


	    if (ifscCode === "") {

	        showToast(
	            "Please enter IFSC code.",
	            "error"
	        );

	        return;
	    }


	    if (address === "") {

	        showToast(
	            "Please enter bank address.",
	            "error"
	        );

	        return;
	    }


	    if (contact === "") {

	        showToast(
	            "Please enter contact number.",
	            "error"
	        );

	        return;
	    }


	    if (email === "") {

	        showToast(
	            "Please enter bank email.",
	            "error"
	        );

	        return;
	    }


	    if (!validateEmail(email)) {

	        showToast(
	            "Please enter a valid bank email.",
	            "error"
	        );

	        return;
	    }


	    showToast(
	        "Bank information saved successfully."
	    );
	}


	/* =========================================================
	   SAVE NOTIFICATION SETTINGS
	   =========================================================

	   FRONTEND ONLY
	   ========================================================= */

	function saveNotificationSettings() {

	    const customerAlerts =
	        document.getElementById(
	            "customerAlerts"
	        ).checked;

	    const loanAlerts =
	        document.getElementById(
	            "loanAlerts"
	        ).checked;

	    const transactionAlerts =
	        document.getElementById(
	            "transactionAlerts"
	        ).checked;


	    console.log(
	        "Customer Alerts:",
	        customerAlerts
	    );


	    console.log(
	        "Loan Alerts:",
	        loanAlerts
	    );


	    console.log(
	        "Transaction Alerts:",
	        transactionAlerts
	    );


	    showToast(
	        "Notification settings saved successfully."
	    );
	}


	/* =========================================================
	   EMAIL VALIDATION
	   ========================================================= */

	function validateEmail(email) {

	    const emailPattern =
	        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	    return emailPattern.test(email);
	}


	/* =========================================================
	   PHONE NUMBER - ONLY NUMBERS
	   ========================================================= */

	document.addEventListener(
	    "DOMContentLoaded",
	    function () {

	        const phoneInput =
	            document.getElementById(
	                "phoneNumber"
	            );


	        if (phoneInput) {

	            phoneInput.addEventListener(
	                "input",
	                function () {

	                    this.value =
	                        this.value.replace(
	                            /\D/g,
	                            ""
	                        );

	                }
	            );

	        }

	    }
	);