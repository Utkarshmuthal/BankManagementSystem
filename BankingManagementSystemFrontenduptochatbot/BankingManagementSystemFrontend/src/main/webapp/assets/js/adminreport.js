// ============================================================
// ADMIN REPORT JS
// ============================================================

const API_BASE_URL = "http://localhost:8082";

let transactionChartInstance = null;
let loanChartInstance = null;


// ============================================================
// PAGE LOAD
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("====================================");
    console.log("Admin Report JS loaded");
    console.log("====================================");

    initializeDateRange();

    // Automatically load report after page refresh
    generateReport();
});


// ============================================================
// DATE RANGE INITIALIZATION
// ============================================================

function initializeDateRange() {

    const fromDate = document.getElementById("fromDate");
    const toDate = document.getElementById("toDate");
    const dateRange = document.getElementById("dateRange");

    if (!fromDate || !toDate) {
        console.error("Date input elements not found.");
        return;
    }

    const today = new Date();

    // First day of current month
    const firstDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
    );

    fromDate.value = formatInputDate(firstDay);
    toDate.value = formatInputDate(today);

    // Keep dropdown on This Month
    if (dateRange) {
        dateRange.value = "thisMonth";
    }

    console.log("Default From Date:", fromDate.value);
    console.log("Default To Date:", toDate.value);
}


// ============================================================
// DATE RANGE DROPDOWN
// ============================================================

function changeDateRange() {

    const rangeElement = document.getElementById("dateRange");
    const fromDate = document.getElementById("fromDate");
    const toDate = document.getElementById("toDate");

    if (!rangeElement || !fromDate || !toDate) {
        return;
    }

    const range = rangeElement.value;

    const today = new Date();

    let from;
    let to = new Date(today);

    switch (range) {

        case "thisMonth":

            from = new Date(
                today.getFullYear(),
                today.getMonth(),
                1
            );

            to = new Date(today);

            break;


        case "lastMonth":

            from = new Date(
                today.getFullYear(),
                today.getMonth() - 1,
                1
            );

            to = new Date(
                today.getFullYear(),
                today.getMonth(),
                0
            );

            break;


        case "last3Months":

            from = new Date(
                today.getFullYear(),
                today.getMonth() - 2,
                1
            );

            to = new Date(today);

            break;


        case "thisYear":

            from = new Date(
                today.getFullYear(),
                0,
                1
            );

            to = new Date(today);

            break;


        default:

            from = new Date(
                today.getFullYear(),
                today.getMonth(),
                1
            );

            to = new Date(today);

            break;
    }

    fromDate.value = formatInputDate(from);
    toDate.value = formatInputDate(to);

    console.log("Selected Range:", range);
    console.log("From:", fromDate.value);
    console.log("To:", toDate.value);
}


// ============================================================
// GENERATE REPORT
// ============================================================

async function generateReport() {

    console.log("====================================");
    console.log("Generating Admin Report");
    console.log("====================================");

    const fromDateElement =
        document.getElementById("fromDate");

    const toDateElement =
        document.getElementById("toDate");

    if (!fromDateElement || !toDateElement) {
        console.error("Date fields not found.");
        return;
    }

    const fromDate = fromDateElement.value;
    const toDate = toDateElement.value;

    console.log("From Date:", fromDate);
    console.log("To Date:", toDate);

    if (!fromDate || !toDate) {

        alert(
            "Please select From Date and To Date."
        );

        return;
    }

    if (fromDate > toDate) {

        alert(
            "From Date cannot be greater than To Date."
        );

        return;
    }

    await loadAdminReport(
        fromDate,
        toDate
    );
}


// ============================================================
// LOAD ADMIN REPORT
// ============================================================

async function loadAdminReport(
    fromDate,
    toDate
) {

    try {

        console.log("Loading Admin Report...");

        const url =
            `${API_BASE_URL}/api/admin/reports` +
            `?fromDate=${encodeURIComponent(fromDate)}` +
            `&toDate=${encodeURIComponent(toDate)}`;

        console.log("Request URL:", url);

        const response = await fetch(url, {

            method: "GET",

            credentials: "include",

            headers: {
                "Accept": "application/json"
            }
        });

        console.log(
            "Admin Report HTTP Status:",
            response.status
        );

        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "Admin Report Error:",
                errorText
            );

            throw new Error(
                `HTTP ${response.status}`
            );
        }

        const result =
            await response.json();

        console.log(
            "Complete Admin Report Response:",
            result
        );

        // Your API currently returns a flat object.
        // This also supports { data: {...} } if backend changes.
        const data =
            result.data
                ? result.data
                : result;

        console.log(
            "Actual Report Data:",
            data
        );


        // ====================================================
        // UPDATE PAGE
        // ====================================================

        updateSummaryCards(data);

        updateTransactionSummary(data);

        updateLoanSummary(data);

        updateEmployeeSummary(data);

        updateAmountSummary(data);

        updateTransactionChart(data);

        updateLoanChart(data);

        updateAccountDistribution(data);


        console.log(
            "Admin report loaded successfully."
        );

    }
    catch (error) {

        console.error(
            "Admin Report Error:",
            error
        );

        alert(
            "Unable to load Admin Report.\n" +
            error.message
        );
    }
}


// ============================================================
// SUMMARY CARDS
// ============================================================

function updateSummaryCards(data) {

    setText(
        "totalCustomers",
        formatNumber(data.totalCustomers)
    );


    setText(
        "totalEmployees",
        formatNumber(data.totalEmployees)
    );


    setText(
        "totalAccounts",
        formatNumber(data.totalAccounts)
    );


    setText(
        "totalTransactions",
        formatNumber(data.totalTransactions)
    );


    setText(
        "totalLoans",
        formatNumber(
            data.totalLoans ??
            data.totalLoanApplications
        )
    );
}


// ============================================================
// TRANSACTION SUMMARY
// ============================================================

function updateTransactionSummary(data) {

    const depositCount =
        numberValue(
            data.depositCount
        );


    const withdrawalCount =
        numberValue(
            data.withdrawalCount ??
            data.withdrawCount
        );


    const transferCount =
        numberValue(
            data.transferCount
        );


    const depositAmount =
        numberValue(
            data.depositAmount
        );


    const withdrawalAmount =
        numberValue(
            data.withdrawalAmount ??
            data.withdrawAmount
        );


    const transferAmount =
        numberValue(
            data.transferAmount
        );


    console.log(
        "Transaction Summary:",
        {
            depositCount,
            withdrawalCount,
            transferCount,
            depositAmount,
            withdrawalAmount,
            transferAmount
        }
    );


    // Deposit
    setText(
        "depositCount",
        formatNumber(depositCount)
    );

    setText(
        "depositAmount",
        formatCurrency(depositAmount)
    );


    // Withdrawal
    setText(
        "withdrawalCount",
        formatNumber(withdrawalCount)
    );

    setText(
        "withdrawalAmount",
        formatCurrency(withdrawalAmount)
    );


    // Transfer
    setText(
        "transferCount",
        formatNumber(transferCount)
    );

    setText(
        "transferAmount",
        formatCurrency(transferAmount)
    );


    // Total
    const totalCount =
        depositCount +
        withdrawalCount +
        transferCount;


    const totalAmount =
        depositAmount +
        withdrawalAmount +
        transferAmount;


    setText(
        "totalTransactionCount",
        formatNumber(
            data.totalTransactions ??
            totalCount
        )
    );


    setText(
        "totalTransactionAmount",
        formatCurrency(totalAmount)
    );
}


// ============================================================
// LOAN SUMMARY
// ============================================================

function updateLoanSummary(data) {

    const totalApplications =
        numberValue(
            data.totalLoanApplications ??
            data.totalLoans
        );


    const approvedLoans =
        numberValue(
            data.approvedLoans
        );


    const pendingLoans =
        numberValue(
            data.pendingLoans
        );


    const rejectedLoans =
        numberValue(
            data.rejectedLoans
        );


    const approvedAmount =
        numberValue(
            data.approvedLoanAmount
        );


    const pendingAmount =
        numberValue(
            data.pendingLoanAmount
        );


    const rejectedAmount =
        numberValue(
            data.rejectedLoanAmount
        );


    const totalApplicationAmount =
        approvedAmount +
        pendingAmount +
        rejectedAmount;


    setText(
        "totalLoanApplications",
        formatNumber(totalApplications)
    );


    setText(
        "totalLoanApplicationAmount",
        formatCurrency(
            data.totalLoanApplicationAmount ??
            totalApplicationAmount
        )
    );


    setText(
        "approvedLoans",
        formatNumber(approvedLoans)
    );


    setText(
        "approvedLoanAmount",
        formatCurrency(approvedAmount)
    );


    setText(
        "pendingLoans",
        formatNumber(pendingLoans)
    );


    setText(
        "pendingLoanAmount",
        formatCurrency(pendingAmount)
    );


    setText(
        "rejectedLoans",
        formatNumber(rejectedLoans)
    );


    setText(
        "rejectedLoanAmount",
        formatCurrency(rejectedAmount)
    );
}


// ============================================================
// EMPLOYEE SUMMARY
// ============================================================

function updateEmployeeSummary(data) {

    setText(
        "employeeTotal",
        formatNumber(
            data.totalEmployees
        )
    );


    setText(
        "employeeActive",
        formatNumber(
            data.activeEmployees
        )
    );


    setText(
        "employeeInactive",
        formatNumber(
            data.inactiveEmployees
        )
    );


    setText(
        "employeeOnLeave",
        formatNumber(
            data.onLeave
        )
    );
}


// ============================================================
// AMOUNT SUMMARY
// ============================================================

function updateAmountSummary(data) {

    setText(
        "totalDepositedAmount",
        formatCurrency(
            data.depositAmount
        )
    );


    setText(
        "totalWithdrawnAmount",
        formatCurrency(
            data.withdrawalAmount ??
            data.withdrawAmount
        )
    );


    setText(
        "totalTransferredAmount",
        formatCurrency(
            data.transferAmount
        )
    );


    setText(
        "totalLoanDisbursed",
        formatCurrency(
            data.loanDisbursed ??
            data.totalLoanDisbursed ??
            data.approvedLoanAmount
        )
    );


    setText(
        "totalInterestCollected",
        formatCurrency(
            data.interestCollected ??
            data.totalInterestCollected
        )
    );
}


// ============================================================
// TRANSACTION CHART
// ============================================================

function updateTransactionChart(data) {

    const canvas =
        document.getElementById(
            "transactionChart"
        );


    if (!canvas) {

        console.error(
            "transactionChart canvas not found."
        );

        return;
    }


    if (typeof Chart === "undefined") {

        console.error(
            "Chart.js is not loaded."
        );

        return;
    }


    if (transactionChartInstance) {

        transactionChartInstance.destroy();

        transactionChartInstance = null;
    }


    const depositAmount =
        numberValue(
            data.depositAmount
        );


    const withdrawalAmount =
        numberValue(
            data.withdrawalAmount ??
            data.withdrawAmount
        );


    const transferAmount =
        numberValue(
            data.transferAmount
        );


    const ctx =
        canvas.getContext("2d");


    transactionChartInstance =
        new Chart(ctx, {

            type: "bar",

            data: {

                labels: [
                    "Selected Period"
                ],

                datasets: [

                    {
                        label: "Deposits",

                        data: [
                            depositAmount
                        ],

                        borderWidth: 1
                    },


                    {
                        label: "Withdrawals",

                        data: [
                            withdrawalAmount
                        ],

                        borderWidth: 1
                    },


                    {
                        label: "Transfers",

                        data: [
                            transferAmount
                        ],

                        borderWidth: 1
                    }

                ]
            },


            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: true,
                        position: "top"
                    },


                    tooltip: {

                        callbacks: {

                            label: function(context) {

                                return (
                                    context.dataset.label +
                                    ": " +
                                    formatCurrency(
                                        context.raw
                                    )
                                );
                            }
                        }
                    }
                },


                scales: {

                    x: {

                        title: {

                            display: true,

                            text: "Selected Date Range"
                        }
                    },


                    y: {

                        beginAtZero: true,

                        title: {

                            display: true,

                            text: "Amount (₹)"
                        },


                        ticks: {

                            callback: function(value) {

                                return (
                                    "₹" +
                                    Number(value)
                                        .toLocaleString(
                                            "en-IN"
                                        )
                                );
                            }
                        }
                    }
                }
            }
        });
}


// ============================================================
// LOAN CHART
// ============================================================

function updateLoanChart(data) {

    const canvas =
        document.getElementById(
            "loanChart"
        );


    if (!canvas) {

        console.error(
            "loanChart canvas not found."
        );

        return;
    }


    if (typeof Chart === "undefined") {

        console.error(
            "Chart.js is not loaded."
        );

        return;
    }


    if (loanChartInstance) {

        loanChartInstance.destroy();

        loanChartInstance = null;
    }


    const approved =
        numberValue(
            data.approvedLoans
        );


    const pending =
        numberValue(
            data.pendingLoans
        );


    const rejected =
        numberValue(
            data.rejectedLoans
        );


    const ctx =
        canvas.getContext("2d");


    loanChartInstance =
        new Chart(ctx, {

            type: "bar",

            data: {

                labels: [
                    "Approved",
                    "Pending",
                    "Rejected"
                ],

                datasets: [

                    {
                        label: "Loan Applications",

                        data: [
                            approved,
                            pending,
                            rejected
                        ],

                        borderWidth: 1
                    }

                ]
            },


            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: true
                    }
                },


                scales: {

                    y: {

                        beginAtZero: true,

                        ticks: {
                            precision: 0
                        }
                    }
                }
            }
        });
}


// ============================================================
// ACCOUNT TYPE DISTRIBUTION
// ============================================================

function updateAccountDistribution(data) {

    const donut =
        document.querySelector(
            ".donut-chart"
        );


    const centerNumber =
        document.querySelector(
            ".donut-center strong"
        );


    const legend =
        document.querySelector(
            ".donut-legend"
        );


    if (!donut) {

        console.error(
            "Account donut chart not found."
        );

        return;
    }


    const distribution =
        data.accountTypeDistribution;


    if (
        !Array.isArray(distribution) ||
        distribution.length === 0
    ) {

        console.log(
            "No account distribution data available."
        );

        return;
    }


    console.log(
        "Account Type Distribution:",
        distribution
    );


    // --------------------------------------------
    // Total Accounts
    // --------------------------------------------

    if (centerNumber) {

        centerNumber.textContent =
            formatNumber(
                data.totalAccounts
            );
    }


    // --------------------------------------------
    // Read distribution
    // --------------------------------------------

    const items =
        distribution.map(function(item) {

            return {

                type:
                    item.accountType ??
                    item.type ??
                    item.name ??
                    "Unknown",

                count:
                    numberValue(
                        item.count ??
                        item.total ??
                        item.value
                    )
            };
        });


    const total =
        items.reduce(
            function(sum, item) {
                return sum + item.count;
            },
            0
        );


    if (total <= 0) {
        return;
    }


    // --------------------------------------------
    // Calculate percentages
    // --------------------------------------------

    items.forEach(function(item) {

        item.percentage =
            (
                item.count / total
            ) * 100;

    });


    // --------------------------------------------
    // Donut gradient
    // --------------------------------------------

    const percentages =
        items.map(
            item => item.percentage
        );


    const gradientParts = [];

    let current = 0;


    percentages.forEach(
        function(percentage, index) {

            const next =
                current + percentage;

            const color =
                getDonutColor(index);

            gradientParts.push(
                `${color} ${current}% ${next}%`
            );

            current = next;
        }
    );


    donut.style.background =
        `conic-gradient(${gradientParts.join(", ")})`;


    // --------------------------------------------
    // Update legend
    // --------------------------------------------

    if (legend) {

        legend.innerHTML = "";


        items.forEach(
            function(item, index) {

                const div =
                    document.createElement("div");


                const dot =
                    document.createElement("b");


                dot.className =
                    `account-dot account-dot-${index}`;


                const text =
                    document.createTextNode(
                        " " +
                        item.type +
                        " "
                    );


                const percentage =
                    document.createElement("span");


                percentage.textContent =
                    `${item.percentage.toFixed(1)}%`;


                div.appendChild(dot);

                div.appendChild(text);

                div.appendChild(
                    percentage
                );


                legend.appendChild(div);
            }
        );
    }
}


// ============================================================
// DONUT COLORS
// ============================================================

function getDonutColor(index) {

    const colors = [

        "#2f6bff",

        "#28a745",

        "#f39c12",

        "#7b61ff",

        "#e74c3c",

        "#17a2b8"

    ];

    return colors[
        index % colors.length
    ];
}


// ============================================================
// EXPORT REPORT
// ============================================================

async function exportReport() {

    const fromDate =
        document.getElementById(
            "fromDate"
        ).value;


    const toDate =
        document.getElementById(
            "toDate"
        ).value;


    if (!fromDate || !toDate) {

        alert(
            "Please select date range."
        );

        return;
    }


    try {

        const url =
            `${API_BASE_URL}/api/admin/reports/export` +
            `?fromDate=${encodeURIComponent(fromDate)}` +
            `&toDate=${encodeURIComponent(toDate)}`;


        const response =
            await fetch(url, {

                method: "GET",

                credentials: "include"
            });


        if (!response.ok) {

            throw new Error(
                `Export failed: ${response.status}`
            );
        }


        const blob =
            await response.blob();


        const downloadUrl =
            window.URL.createObjectURL(
                blob
            );


        const link =
            document.createElement("a");


        link.href =
            downloadUrl;


        link.download =
            `Admin_Report_${fromDate}_to_${toDate}.pdf`;


        document.body.appendChild(link);

        link.click();

        link.remove();


        window.URL.revokeObjectURL(
            downloadUrl
        );

    }
    catch (error) {

        console.error(
            "Export Error:",
            error
        );


        alert(
            "Unable to export report."
        );
    }
}


// ============================================================
// HELPER: SET TEXT
// ============================================================

function setText(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value;

    }
    else {

        console.warn(
            `Element #${id} not found`
        );
    }
}


// ============================================================
// HELPER: NUMBER
// ============================================================

function numberValue(value) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return 0;
    }


    if (typeof value === "number") {

        return Number.isFinite(value)
            ? value
            : 0;
    }


    const cleaned =
        String(value)
            .replace(/[₹,\s]/g, "");


    const number =
        Number(cleaned);


    return Number.isFinite(number)
        ? number
        : 0;
}


// ============================================================
// HELPER: FORMAT NUMBER
// ============================================================

function formatNumber(value) {

    return numberValue(value)
        .toLocaleString("en-IN");
}


// ============================================================
// HELPER: FORMAT CURRENCY
// ============================================================

function formatCurrency(value) {

    return "₹" +
        numberValue(value)
            .toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );
}


// ============================================================
// HELPER: DATE FORMAT
// ============================================================

function formatInputDate(date) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    return `${year}-${month}-${day}`;
}


// ============================================================
// LOGOUT
// ============================================================

function logout() {

    if (
        confirm(
            "Are you sure you want to logout?"
        )
    ) {

        window.location.href =
            "login.jsp";
    }
}


// ============================================================
// SIDEBAR
// ============================================================

function toggleSidebar() {

    const sidebar =
        document.querySelector(
            ".sidebar"
        );


    const main =
        document.querySelector(
            ".main-content"
        );


    if (sidebar) {

        sidebar.classList.toggle(
            "collapsed"
        );
    }


    if (main) {

        main.classList.toggle(
            "expanded"
        );
    }
}