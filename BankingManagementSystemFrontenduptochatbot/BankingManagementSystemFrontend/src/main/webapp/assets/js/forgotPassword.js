function forgotPassword() {

    const email = document.getElementById("email").value.trim();

    if (!email) {

        Swal.fire({
            icon: "warning",
            title: "Email Required",
            text: "Please enter your email address.",
            confirmButtonText: "OK"
        });

        return;
    }

    fetch("http://localhost:8082/api/auth/forgot-password", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email: email
        })

    })
    .then(response => {

        if (!response.ok) {
            throw new Error("Unable to send OTP");
        }

        return response.json();

    })
    .then(data => {

        console.log("Forgot Password Response:", data);

        if (data.status === true) {

            // Save email for OTP verification
            sessionStorage.setItem("resetEmail", email);

			Swal.fire({
			    toast: true,
			    position: "top-end",
			    icon: "success",
			    title: "OTP Sent Successfully",
			    text: "OTP sent to " + email,
			    showConfirmButton: false,
			    timer: 3000,
			    timerProgressBar: true
			}).then(() => {

			    window.location.href = "verifyOtp.jsp";

			});

        } else {

            Swal.fire({
                icon: "error",
                title: "Failed",
                text: data.message || "Unable to send OTP.",
                confirmButtonText: "OK"
            });

        }

    })
    .catch(error => {

        console.error("Forgot Password Error:", error);

        Swal.fire({
            icon: "error",
            title: "Something went wrong",
            text: error.message,
            confirmButtonText: "OK"
        });

    });
}