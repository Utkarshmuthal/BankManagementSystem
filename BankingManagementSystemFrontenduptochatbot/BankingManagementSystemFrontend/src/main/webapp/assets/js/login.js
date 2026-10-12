function login() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    console.log("Email:", email);

    fetch("http://localhost:8082/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
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

        console.log("Login Response:", data);

        if (data.message !== "Login Successful") {

            document.getElementById("result").innerHTML =
                data.message || "Login failed.";

            return;
        }

        /*
         * =====================================================
         * CLEAR OLD SESSION DATA
         * =====================================================
         *
         * This is important when switching between
         * CUSTOMER and EMPLOYEE accounts.
         */
        sessionStorage.clear();

        /*
         * =====================================================
         * COMMON LOGIN DATA
         * =====================================================
         */
        sessionStorage.setItem("userId", data.userId);
        sessionStorage.setItem("role", data.role);

        /*
         * =====================================================
         * STORE ONLY ROLE-SPECIFIC ID
         * =====================================================
         */
        if (data.role === "EMPLOYEE") {

            if (!data.employeeId) {
                console.error(
                    "Employee login successful but employeeId is missing.",
                    data
                );

                throw new Error(
                    "Employee ID was not received from login."
                );
            }

            sessionStorage.setItem(
                "employeeId",
                String(data.employeeId)
            );

            /*
             * Make sure old customer ID cannot be used.
             */
            sessionStorage.removeItem("customerId");

            console.log(
                "Stored Employee ID:",
                sessionStorage.getItem("employeeId")
            );
        }

        else if (data.role === "CUSTOMER") {

            if (!data.customerId) {
                console.error(
                    "Customer login successful but customerId is missing.",
                    data
                );

                throw new Error(
                    "Customer ID was not received from login."
                );
            }

            sessionStorage.setItem(
                "customerId",
                String(data.customerId)
            );

            /*
             * Make sure old employee ID cannot be used.
             */
            sessionStorage.removeItem("employeeId");

            console.log(
                "Stored Customer ID:",
                sessionStorage.getItem("customerId")
            );
        }

        else {

            /*
             * ADMIN / MANAGER
             */
            sessionStorage.removeItem("employeeId");
            sessionStorage.removeItem("customerId");
        }

        /*
         * =====================================================
         * REDIRECT
         * =====================================================
         */
        if (data.role === "ADMIN") {

            window.location.href =
                "admin/dashboard.jsp";

        }

        else if (data.role === "EMPLOYEE") {

            window.location.href =
                "employee/dashboard.jsp";

        }

        else if (data.role === "CUSTOMER") {

            window.location.href =
                "customer/dashboard.jsp";

        }

        else if (data.role === "MANAGER") {

            window.location.href =
                "manager/dashboard.jsp";

        }

        else {

            document.getElementById("result").innerHTML =
                "Unknown Role: " + data.role;
        }

    })
    .catch(error => {

        console.error("Login Error:", error);

        document.getElementById("result").innerHTML =
            error.message;
    });
}


function goToForgotPassword() {
    window.location.href =
        contextPath + "/forgotPassword.jsp";
}


function goToRegister() {
    window.location.href =
        contextPath + "/register.jsp";
}