/**
 * Admin Dashboard Data
 *
 * This JavaScript file is ONLY for the Admin Dashboard.
 *
 * Backend API:
 * GET http://localhost:8082/api/admin/dashboard
 */

(function () {

    "use strict";


    // ==========================================
    // BACKEND CONFIGURATION
    // ==========================================

    const BACKEND_PORT = "8082";

    const API_BASE_URL =
        window.location.port === BACKEND_PORT
            ? "/api/admin"
            : `http://localhost:${BACKEND_PORT}/api/admin`;


    // ==========================================
    // FETCH ADMIN DASHBOARD DATA
    // ==========================================

    async function fetchAdminDashboard() {

        try {

            console.log("Loading admin dashboard data...");


            const response = await fetch(
                `${API_BASE_URL}/dashboard`,
                {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );


            // Check HTTP response
            if (!response.ok) {

                throw new Error(
                    `HTTP Error: ${response.status}`
                );

            }


            // Convert response to JSON
            const result = await response.json();


            console.log(
                "Admin Dashboard API Response:",
                result
            );


            // ==========================================
            // GET DATA FROM API RESPONSE
            // ==========================================

            const data = result.data;


            if (!data) {

                throw new Error(
                    "Dashboard data is missing in API response."
                );

            }


            // ==========================================
            // UPDATE TOTAL CUSTOMERS
            // ==========================================

            setText(
                "totalCustomers",
                formatNumber(data.totalCustomers)
            );


            // ==========================================
            // UPDATE TOTAL EMPLOYEES
            // ==========================================

            setText(
                "totalEmployees",
                formatNumber(data.totalEmployees)
            );


            // ==========================================
            // UPDATE TOTAL ACCOUNTS
            // ==========================================

            setText(
                "totalAccounts",
                formatNumber(data.totalAccounts)
            );


            // ==========================================
            // UPDATE TOTAL LOANS
            // ==========================================

            setText(
                "totalLoans",
                formatNumber(data.totalLoans)
            );


            // ==========================================
            // UPDATE PENDING KYC
            // ==========================================

            setText(
                "pendingKyc",
                formatNumber(data.pendingKyc)
            );


            // ==========================================
            // UPDATE TODAY'S DEPOSITS
            // ==========================================

            setText(
                "todayDeposits",
                formatCurrency(data.todayDeposits)
            );


            // ==========================================
            // UPDATE TODAY'S WITHDRAWALS
            // ==========================================

            setText(
                "todayWithdrawals",
                formatCurrency(data.todayWithdrawals)
            );


            // ==========================================
            // UPDATE TOTAL TRANSACTIONS
            // ==========================================

            setText(
                "totalTransactions",
                formatNumber(data.totalTransactions)
            );


            console.log(
                "Admin dashboard data loaded successfully."
            );

        }
        catch (error) {

            console.error(
                "Error loading admin dashboard:",
                error
            );

        }

    }


    // ==========================================
    // SET VALUE INTO HTML ELEMENT
    // ==========================================

    function setText(elementId, value) {

        const element =
            document.getElementById(elementId);


        if (element) {

            element.innerText = value;

        }
        else {

            console.warn(
                `Element with ID '${elementId}' was not found.`
            );

        }

    }


    // ==========================================
    // FORMAT NUMBER
    //
    // Example:
    // 3560 -> 3,560
    // 1250 -> 1,250
    // ==========================================

    function formatNumber(value) {

        const number = Number(value);


        if (isNaN(number)) {

            return "0";

        }


        return number.toLocaleString("en-IN");

    }


    // ==========================================
    // FORMAT INDIAN CURRENCY
    //
    // Example:
    // 245000 -> ₹2,45,000
    // 135000 -> ₹1,35,000
    // ==========================================

    function formatCurrency(value) {

        const number = Number(value);


        if (isNaN(number)) {

            return "₹0";

        }


        return "₹" + number.toLocaleString("en-IN");

    }


    // ==========================================
    // RUN WHEN DASHBOARD PAGE LOADS
    // ==========================================

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            console.log(
                "Admin Dashboard page loaded."
            );


            // Make sure this code runs
            // only on the dashboard page.

            if (
                document.getElementById("totalCustomers") ||
                document.getElementById("totalEmployees") ||
                document.getElementById("totalAccounts")
            ) {

                fetchAdminDashboard();

            }

        }
    );


})();