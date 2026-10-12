/* ==========================================================================
   BANKING MANAGEMENT SYSTEM - CUSTOMER REGISTRATION
   ========================================================================== */

   document.addEventListener("DOMContentLoaded", function () {
       initFileUploads();
       initFormValidation();
       initDuplicateMessageClear();
       initLiveDuplicateCheck();
   });
/* ==========================================================================
   FILE UPLOAD LABEL
   ========================================================================== */

function initFileUploads() {

    const aadhaarInput = document.getElementById("uploadAadhaar");
    const aadhaarLabel = document.getElementById("aadhaarFileLabel");

    const panInput = document.getElementById("uploadPan");
    const panLabel = document.getElementById("panFileLabel");


    // Aadhaar File
    if (aadhaarInput && aadhaarLabel) {

        aadhaarInput.addEventListener("change", function () {

            const error = document.getElementById("aadhaarFileError");

            if (this.files.length > 0) {

                aadhaarLabel.textContent = this.files[0].name;

                if (error) {
                    error.textContent = "";
                    error.style.display = "none";
                }

            } else {

                aadhaarLabel.textContent = "No file chosen";

            }

        });

    }


    // PAN File
    if (panInput && panLabel) {

        panInput.addEventListener("change", function () {

            const error = document.getElementById("panFileError");

            if (this.files.length > 0) {

                panLabel.textContent = this.files[0].name;

                if (error) {
                    error.textContent = "";
                    error.style.display = "none";
                }

            } else {

                panLabel.textContent = "No file chosen";

            }

        });

    }

}


/* ==========================================================================
   PASSWORD SHOW / HIDE
   ========================================================================== */

function togglePasswordVisibility(inputId, button) {

    const input = document.getElementById(inputId);

    if (!input) {
        return;
    }

    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }

}


/* ==========================================================================
   DUPLICATE ERROR MESSAGE FUNCTIONS
   ========================================================================== */

function clearDuplicateMessages() {

    const messages = document.querySelectorAll(".duplicate-error");

    messages.forEach(function (message) {

        message.textContent = "";
        message.style.display = "none";

    });

}


function showDuplicateMessage(fieldId, message) {

    const field = document.getElementById(fieldId);

    if (!field) {
        return;
    }

    let errorElement =
        document.getElementById(fieldId + "Error");


    /*
     * If error element does not exist in JSP,
     * create it automatically.
     */

    if (!errorElement) {

        errorElement = document.createElement("div");

        errorElement.id = fieldId + "Error";

        errorElement.className = "duplicate-error";

        field.parentElement.parentElement.appendChild(errorElement);

    }


    errorElement.textContent = "❌ " + message;

    errorElement.style.display = "block";

}


function initDuplicateMessageClear() {

    const email = document.getElementById("email");
    const mobile = document.getElementById("mobile");
    const aadhaar = document.getElementById("aadhaarNo");
    const pan = document.getElementById("panNo");


    if (email) {

        email.addEventListener("input", function () {

            clearFieldError("emailError");

        });

    }


    if (mobile) {

        mobile.addEventListener("input", function () {

            clearFieldError("mobileError");

        });

    }


    if (aadhaar) {

        aadhaar.addEventListener("input", function () {

            clearFieldError("aadhaarNoError");

        });

    }


    if (pan) {

        pan.addEventListener("input", function () {

            clearFieldError("panNoError");

        });

    }

}


function clearFieldError(errorId) {

    const errorElement =
        document.getElementById(errorId);

    if (errorElement) {

        errorElement.textContent = "";

        errorElement.style.display = "none";

    }

}


/* ==========================================================================
   DOCUMENT VALIDATION
   ========================================================================== */

function validateDocuments() {

    const aadhaarFile =
        document.getElementById("uploadAadhaar");

    const panFile =
        document.getElementById("uploadPan");

    const aadhaarError =
        document.getElementById("aadhaarFileError");

    const panError =
        document.getElementById("panFileError");


    // Clear old document errors

    if (aadhaarError) {

        aadhaarError.textContent = "";

        aadhaarError.style.display = "none";

    }


    if (panError) {

        panError.textContent = "";

        panError.style.display = "none";

    }


    let valid = true;


    // Aadhaar document

    if (!aadhaarFile ||
        !aadhaarFile.files ||
        aadhaarFile.files.length === 0) {

        if (aadhaarError) {

            aadhaarError.textContent =
                "❌ Aadhaar document is required.";

            aadhaarError.style.display = "block";

        }

        valid = false;

    }


    // PAN document

    if (!panFile ||
        !panFile.files ||
        panFile.files.length === 0) {

        if (panError) {

            panError.textContent =
                "❌ PAN document is required.";

            panError.style.display = "block";

        }

        valid = false;

    }


    return valid;

}


/* ==========================================================================
   FIND DUPLICATE FIELD FROM BACKEND MESSAGE
   ========================================================================== */

function showDuplicateError(message) {

    clearDuplicateMessages();

    if (!message) {
        return;
    }


    const lowerMessage =
        message.toLowerCase();


    // Email

    if (
        lowerMessage.includes("email") &&
        (
            lowerMessage.includes("already") ||
            lowerMessage.includes("exist") ||
            lowerMessage.includes("registered")
        )
    ) {

        showDuplicateMessage(
            "email",
            "Email already exists."
        );

        document.getElementById("email").focus();

        return;

    }


    // Mobile

    if (
        lowerMessage.includes("mobile") &&
        (
            lowerMessage.includes("already") ||
            lowerMessage.includes("exist") ||
            lowerMessage.includes("registered")
        )
    ) {

        showDuplicateMessage(
            "mobile",
            "Mobile number already exists."
        );

        document.getElementById("mobile").focus();

        return;

    }


    // Aadhaar

    if (
        (
            lowerMessage.includes("aadhaar") ||
            lowerMessage.includes("aadhar")
        ) &&
        (
            lowerMessage.includes("already") ||
            lowerMessage.includes("exist") ||
            lowerMessage.includes("registered")
        )
    ) {

        showDuplicateMessage(
            "aadhaarNo",
            "Aadhaar number already exists."
        );

        document.getElementById("aadhaarNo").focus();

        return;

    }


    // PAN

    if (
        lowerMessage.includes("pan") &&
        (
            lowerMessage.includes("already") ||
            lowerMessage.includes("exist") ||
            lowerMessage.includes("registered")
        )
    ) {

        showDuplicateMessage(
            "panNo",
            "PAN number already exists."
        );

        document.getElementById("panNo").focus();

        return;

    }


    // Other backend validation error

    alert(message);

}


/* ==========================================================================
   FORM VALIDATION + API CALL
   ========================================================================== */

function initFormValidation() {

    const form =
        document.getElementById("registrationForm");

    if (!form) {
        return;
    }


    /*
     * File inputs are hidden.
     * Therefore native browser validation is disabled.
     * All required validation is handled manually below.
     */

    form.noValidate = true;


    form.addEventListener("submit", async function (event) {

        event.preventDefault();


        // Clear old errors

        clearDuplicateMessages();


        /* ==============================================================
           GET FORM VALUES
           ============================================================== */

        const emailElement =
            document.getElementById("email");

        const passwordElement =
            document.getElementById("password");

        const confirmPasswordElement =
            document.getElementById("confirmPassword");

        const mobileElement =
            document.getElementById("mobile");

        const aadhaarElement =
            document.getElementById("aadhaarNo");

        const panElement =
            document.getElementById("panNo");

        const aadhaarFile =
            document.getElementById("uploadAadhaar");

        const panFile =
            document.getElementById("uploadPan");


        const email =
            emailElement
                ? emailElement.value.trim()
                : "";


        const password =
            passwordElement
                ? passwordElement.value
                : "";


        const confirmPassword =
            confirmPasswordElement
                ? confirmPasswordElement.value
                : "";


        const mobile =
            mobileElement
                ? mobileElement.value.trim()
                : "";


        const aadhaar =
            aadhaarElement
                ? aadhaarElement.value.trim()
                : "";


        const pan =
            panElement
                ? panElement.value.trim().toUpperCase()
                : "";


        /* ==============================================================
           EMAIL VALIDATION
           ============================================================== */

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailRegex.test(email)) {

            alert("Enter a valid email address.");

            if (emailElement) {
                emailElement.focus();
            }

            return;

        }


        /* ==============================================================
           PASSWORD MATCH
           ============================================================== */

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            if (confirmPasswordElement) {
                confirmPasswordElement.focus();
            }

            return;

        }


        /* ==============================================================
           PASSWORD LENGTH
           ============================================================== */

        if (password.length < 8) {

            alert(
                "Password must be at least 8 characters."
            );

            if (passwordElement) {
                passwordElement.focus();
            }

            return;

        }


        /* ==============================================================
           MOBILE VALIDATION
           ============================================================== */

        if (!/^[6-9][0-9]{9}$/.test(mobile)) {

            alert(
                "Enter valid 10 digit mobile number."
            );

            if (mobileElement) {
                mobileElement.focus();
            }

            return;

        }


        /* ==============================================================
           AADHAAR VALIDATION
           ============================================================== */

        if (!/^[0-9]{12}$/.test(aadhaar)) {

            alert(
                "Enter valid 12 digit Aadhaar number."
            );

            if (aadhaarElement) {
                aadhaarElement.focus();
            }

            return;

        }


        /* ==============================================================
           PAN VALIDATION
           ============================================================== */

        const panRegex =
            /^[A-Z]{5}[0-9]{4}[A-Z]$/;


        if (!panRegex.test(pan)) {

            alert(
                "Enter valid PAN number."
            );

            if (panElement) {
                panElement.focus();
            }

            return;

        }


        /* ==============================================================
           AADHAAR + PAN DOCUMENT VALIDATION
           ============================================================== */

        if (!validateDocuments()) {
            return;
        }


        /* ==============================================================
           CREATE FORMDATA
           ============================================================== */

        const formData =
            new FormData(form);


        /* ==============================================================
           API CALL
           ============================================================== */

        try {

            const response = await fetch(
                "http://localhost:8082/api/customer/register",
                {
                    method: "POST",
                    body: formData
                }
            );


            /* ==========================================================
               READ RESPONSE
               ========================================================== */

            let result;

            try {

                result =
                    await response.json();

            } catch (jsonError) {

                console.error(
                    "Invalid JSON response:",
                    jsonError
                );

                alert(
                    "Something went wrong while processing the server response."
                );

                return;

            }


            console.log(
                "HTTP Status:",
                response.status
            );

            console.log(
                "Backend Response:",
                result
            );


            /* ==========================================================
               SUCCESS
               ========================================================== */

            if (
                response.ok &&
                result.status === true
            ) {

                alert(
                    "Registration Successful!\n\n" +
                    "Your registration request has been submitted successfully.\n\n" +
                    "Your account will be verified by the bank employee.\n\n" +
                    "After approval, your account will be activated and you will receive a notification."
                );


                /* ======================================================
                   RESET FORM
                   ====================================================== */

                form.reset();


                // Reset Aadhaar file label

                const aadhaarLabel =
                    document.getElementById(
                        "aadhaarFileLabel"
                    );


                if (aadhaarLabel) {

                    aadhaarLabel.textContent =
                        "No file chosen";

                }


                // Reset PAN file label

                const panLabel =
                    document.getElementById(
                        "panFileLabel"
                    );


                if (panLabel) {

                    panLabel.textContent =
                        "No file chosen";

                }


                // Clear all errors

                clearDuplicateMessages();


                return;

            }


            /* ==========================================================
               DUPLICATE / VALIDATION ERROR
               ========================================================== */

            if (result.message) {

                showDuplicateError(
                    result.message
                );

                return;

            }


            /* ==========================================================
               UNKNOWN ERROR
               ========================================================== */

            alert(
                "Registration failed. Please try again."
            );


        } catch (error) {

            console.error(
                "Registration Error:",
                error
            );


            alert(
                "Unable to connect to the server.\n\n" +
                "Please make sure the backend server is running."
            );

        }

    });


    /* ==========================================================================
       RESET BUTTON
       ========================================================================== */

    const btnReset =
        document.getElementById("btnReset");


    if (btnReset) {

        btnReset.addEventListener("click", function () {

            setTimeout(function () {

                const aadhaarLabel =
                    document.getElementById(
                        "aadhaarFileLabel"
                    );

                const panLabel =
                    document.getElementById(
                        "panFileLabel"
                    );


                if (aadhaarLabel) {

                    aadhaarLabel.textContent =
                        "No file chosen";

                }


                if (panLabel) {

                    panLabel.textContent =
                        "No file chosen";

                }


                clearDuplicateMessages();

            }, 100);

        });

    }

}
// ================= LIVE DUPLICATE CHECK =================

function initLiveDuplicateCheck() {

    const email = document.getElementById("email");
    const mobile = document.getElementById("mobile");
    const aadhaar = document.getElementById("aadhaarNo");
    const pan = document.getElementById("panNo");

    // EMAIL
    if (email) {
        let timer;

        email.addEventListener("input", function () {

            clearTimeout(timer);
            clearFieldError("emailError");

            const value = this.value.trim();

            if (value === "") {
                return;
            }

            // Check only when email format is valid
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(value)) {
                return;
            }

            timer = setTimeout(function () {

                checkDuplicateField(
                    "email",
                    value,
                    "emailError",
                    "Email already exists."
                );

            }, 400);
        });
    }


    // MOBILE
    if (mobile) {
        let timer;

        mobile.addEventListener("input", function () {

            clearTimeout(timer);
            clearFieldError("mobileError");

            const value = this.value.trim();

            if (value === "") {
                return;
            }

            // Valid Indian mobile number
            if (!/^[6-9][0-9]{9}$/.test(value)) {
                return;
            }

            timer = setTimeout(function () {

                checkDuplicateField(
                    "mobile",
                    value,
                    "mobileError",
                    "Mobile number already exists."
                );

            }, 300);
        });
    }


    // AADHAAR
    if (aadhaar) {
        let timer;

        aadhaar.addEventListener("input", function () {

            clearTimeout(timer);
            clearFieldError("aadhaarNoError");

            const value = this.value.trim();

            if (value === "") {
                return;
            }

            // Aadhaar must be exactly 12 digits
            if (!/^[0-9]{12}$/.test(value)) {
                return;
            }

            timer = setTimeout(function () {

                checkDuplicateField(
                    "aadhaarNo",
                    value,
                    "aadhaarNoError",
                    "Aadhaar number already exists."
                );

            }, 300);
        });
    }


    // PAN
    if (pan) {
        let timer;

        pan.addEventListener("input", function () {

            clearTimeout(timer);
            clearFieldError("panNoError");

            // Convert PAN to uppercase
            this.value = this.value.toUpperCase();

            const value = this.value.trim();

            if (value === "") {
                return;
            }

            // PAN format
            if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value)) {
                return;
            }

            timer = setTimeout(function () {

                checkDuplicateField(
                    "panNo",
                    value,
                    "panNoError",
                    "PAN number already exists."
                );

            }, 300);
        });
    }
}


// ================= CHECK DUPLICATE API =================

async function checkDuplicateField(
    field,
    value,
    errorId,
    defaultMessage
) {

    try {

        const response = await fetch(
            "http://localhost:8082/api/customer/check-duplicate",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    field: field,
                    value: value
                })
            }
        );


        if (!response.ok) {

            console.error(
                "Duplicate check failed:",
                response.status
            );

            return;
        }


        const result = await response.json();

        console.log("Duplicate check:", field, result);


        // Make sure user has not changed the value
        // while API request was running
        const inputElement = document.getElementById(
            field === "aadhaarNo"
                ? "aadhaarNo"
                : field === "panNo"
                ? "panNo"
                : field
        );

        if (
            inputElement &&
            inputElement.value.trim() !== value
        ) {
            return;
        }


        if (result.exists === true) {

            const errorElement =
                document.getElementById(errorId);

            if (errorElement) {

                errorElement.textContent =
                    "❌ " +
                    (result.message || defaultMessage);

                errorElement.style.display = "block";
                errorElement.classList.add("show");
            }

        } else {

            clearFieldError(errorId);
        }


    } catch (error) {

        console.error(
            "Live duplicate check error:",
            error
        );
    }
}


// ================= CLEAR FIELD ERROR =================

function clearFieldError(errorId) {

    const errorElement =
        document.getElementById(errorId);

    if (errorElement) {

        errorElement.textContent = "";
        errorElement.style.display = "none";
        errorElement.classList.remove("show");
    }
}