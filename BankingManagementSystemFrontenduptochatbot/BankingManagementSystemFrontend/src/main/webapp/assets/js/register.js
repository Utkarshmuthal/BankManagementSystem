/* ==========================================================================
   BANKING MANAGEMENT SYSTEM - CUSTOMER REGISTRATION
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

    initFileUploads();
    initFormValidation();

});

/* ==========================================================================
   FILE UPLOAD LABEL
   ========================================================================== */

function initFileUploads() {

    const aadhaarInput = document.getElementById("uploadAadhaar");
    const aadhaarLabel = document.getElementById("aadhaarFileLabel");

    const panInput = document.getElementById("uploadPan");
    const panLabel = document.getElementById("panFileLabel");

    if (aadhaarInput) {

        aadhaarInput.addEventListener("change", function () {

            if (this.files.length > 0) {
                aadhaarLabel.textContent = this.files[0].name;
            } else {
                aadhaarLabel.textContent = "No file chosen";
            }

        });

    }

    if (panInput) {

        panInput.addEventListener("change", function () {

            if (this.files.length > 0) {
                panLabel.textContent = this.files[0].name;
            } else {
                panLabel.textContent = "No file chosen";
            }

        });

    }

}

/* ==========================================================================
   PASSWORD SHOW / HIDE
   ========================================================================== */

function togglePasswordVisibility(inputId) {

    const input = document.getElementById(inputId);

    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }

}

/* ==========================================================================
   FORM VALIDATION + API CALL
   ========================================================================== */

function initFormValidation() {

    const form = document.getElementById("registrationForm");

    if (!form) return;

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const mobile = document.getElementById("mobile").value;
        const aadhaar = document.getElementById("aadhaarNo").value;
        const pan = document.getElementById("panNo").value;

        // Password Match
        if (password !== confirmPassword) {

            alert("Passwords do not match.");
            return;

        }

        // Password Length
        if (password.length < 8) {

            alert("Password must be at least 8 characters.");
            return;

        }

        // Mobile
        if (!/^[0-9]{10}$/.test(mobile)) {

            alert("Enter valid 10 digit mobile number.");
            return;

        }

        // Aadhaar
        if (!/^[0-9]{12}$/.test(aadhaar)) {

            alert("Enter valid 12 digit Aadhaar number.");
            return;

        }

        // PAN
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

        if (!panRegex.test(pan.toUpperCase())) {

            alert("Enter valid PAN number.");
            return;

        }

        const formData = new FormData(form);

        try {

            const response = await fetch("http://localhost:8082/api/customer/register", {

                method: "POST",
                body: formData

            });

            const result = await response.json();

            if (result.status) {

                alert(
                    "Registration Successful!\n\n" +
                    "Your registration request has been submitted successfully.\n\n" +
                    "Your account will be verified by the bank employee.\n\n" +
                    "After approval, your account will be activated and you will receive a notification."
                );

                form.reset();

                document.getElementById("aadhaarFileLabel").textContent = "No file chosen";
                document.getElementById("panFileLabel").textContent = "No file chosen";

            } else {

                alert(result.message);

            }

        } catch (error) {

            console.error(error);
            alert("Unable to connect to the server.");

        }

    });

    const btnReset = document.getElementById("btnReset");

    if (btnReset) {

        btnReset.addEventListener("click", function () {

            setTimeout(function () {

                document.getElementById("aadhaarFileLabel").textContent = "No file chosen";
                document.getElementById("panFileLabel").textContent = "No file chosen";

            }, 100);

        });

    }

}