document.addEventListener("DOMContentLoaded", function () {

    console.log("resetPassword.js loaded successfully");

    const resetButton = document.getElementById("resetPasswordBtn");

    if (!resetButton) {

        console.error("Reset Password button not found!");

        return;
    }

    resetButton.addEventListener("click", function () {

        console.log("Reset Password button clicked");

        resetPassword();

    });

});


function resetPassword() {

    console.log("RESET PASSWORD FUNCTION STARTED");

    const newPassword =
        document.getElementById("newPassword").value.trim();

    const confirmPassword =
        document.getElementById("confirmPassword").value.trim();


    if (!newPassword) {

        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "warning",
            title: "Password Required",
            text: "Please enter a new password.",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });

        return;
    }


    if (!confirmPassword) {

        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "warning",
            title: "Confirm Password",
            text: "Please confirm your new password.",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });

        return;
    }


    if (newPassword !== confirmPassword) {

        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: "Passwords Do Not Match",
            text: "Please enter the same password.",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });

        return;
    }


    const email = sessionStorage.getItem("resetEmail");

    console.log("Reset Email:", email);


    if (!email) {

        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: "Session Expired",
            text: "Please start the password reset process again.",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });

        return;
    }


    fetch("http://localhost:8082/api/auth/reset-password", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            email: email,
            newPassword: newPassword,
            confirmPassword: confirmPassword

        })

    })

    .then(response => {

        console.log("HTTP Status:", response.status);

        return response.json();

    })

    .then(data => {

        console.log("Backend Response:", data);


        if (data.status === true) {

            Swal.fire({

                toast: true,

                position: "top-end",

                icon: "success",

                title: "Password Reset Successfully",

                text: data.message ||
                      "Your password has been reset successfully.",

                showConfirmButton: false,

                timer: 2500,

                timerProgressBar: true

            }).then(() => {

                sessionStorage.removeItem("resetEmail");
                sessionStorage.removeItem("resetOtp");

                window.location.href = "login.jsp";

            });

        } else {

            Swal.fire({

                toast: true,

                position: "top-end",

                icon: "error",

                title: "Reset Password Failed",

                text: data.message ||
                      "Password reset failed.",

                showConfirmButton: false,

                timer: 3000,

                timerProgressBar: true

            });

        }

    })

    .catch(error => {

        console.error("Reset Password Error:", error);

        Swal.fire({

            toast: true,

            position: "top-end",

            icon: "error",

            title: "Reset Failed",

            text: "Unable to connect to the server.",

            showConfirmButton: false,

            timer: 3000,

            timerProgressBar: true

        });

    });

}