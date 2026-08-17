function login() {

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    console.log("Email:", email);
    console.log("Password:", password);

	fetch("http://localhost:8082/api/auth/login", {

	    method: "POST",

	    headers: {
	        "Content-Type": "application/json"
	    },

	    body: JSON.stringify({

	        email: email,
	        password: password

	    })

	})

    .then(response => {

        if (!response.ok) {
            throw new Error("Unable to connect to server");
        }

        return response.json();

    })

    .then(data => {

        console.log(data);

        if (data.message === "Login Successful") {

            // Store login details
            sessionStorage.setItem("userId", data.userId);
            sessionStorage.setItem("role", data.role);

			sessionStorage.setItem("customerId", data.customerId);
			console.log("Login Response:", data);
			console.log("Stored customerId:", sessionStorage.getItem("customerId"));
             
			
            // Redirect according to role

            if (data.role === "ADMIN") {

                window.location.href = "admin/dashboard.jsp";

            }
            else if (data.role === "EMPLOYEE") {

                window.location.href = "employee/dashboard.jsp";

            }
            else if (data.role === "CUSTOMER") {

                window.location.href = "customer/dashboard.jsp";

            }
            else if (data.role === "MANAGER") {

                window.location.href = "manager/dashboard.jsp";

            }
            else {

                document.getElementById("result").innerHTML =
                    "Unknown Role : " + data.role;

            }

        } else {

            document.getElementById("result").innerHTML =
                data.message;

        }

    })

    .catch(error => {

        console.error(error);

        document.getElementById("result").innerHTML =
            error.message;

    });

}
function goToForgotPassword() {
    window.location.href = contextPath + "/forgotPassword.jsp";
}

function goToRegister() {
    window.location.href = contextPath + "/register.jsp";
}