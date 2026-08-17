function verifyOtp() {

    const email = document.getElementById("email").value.trim();
    const otp = document.getElementById("otp").value.trim();

    // Validate email
    if (!email) {

        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "warning",
            title: "Email Required",
            text: "Please enter your email address.",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });

        return;
    }

    // Validate OTP
    if (!/^\d{6}$/.test(otp)) {

        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "warning",
            title: "Invalid OTP",
            text: "Please enter a valid 6-digit OTP.",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });

        return;
    }

    // Call backend
    fetch("http://localhost:8082/api/auth/verify-otp", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email: email,
            otp: otp
        })

    })
    .then(response => {

        if (!response.ok) {
            throw new Error("Unable to verify OTP");
        }

        return response.json();

    })
    .then(data => {

        console.log("Verify OTP Response:", data);

        if (data.status === true) {

            // Keep email for reset password page
            sessionStorage.setItem("resetEmail", email);

            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "OTP Verified Successfully",
                text: "You can now reset your password.",
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: true
            }).then(() => {

                window.location.href = "resetPassword.jsp";

            });

        } else {

            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: "OTP Verification Failed",
                text: data.message || "Invalid or expired OTP.",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            });

        }

    })
    .catch(error => {

        console.error("Verify OTP Error:", error);

        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: "Verification Failed",
            text: error.message,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });

    });
}