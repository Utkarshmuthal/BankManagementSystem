/* =========================================================
   EMPLOYEE REPORTS JS
   Banking Management System
   ========================================================= */

console.log("Employee Reports JS Loaded");


/* =========================================================
   API CONFIGURATION
   ========================================================= */

const API_BASE = "http://localhost:8082/api";


/* =========================================================
   GLOBAL CHART DATA
   ========================================================= */

let currentReport = null;


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Reports page initialized");

    setDefaultDates();

    /*
     * Automatically load report for default date range
     */
    generateReport();

});


/* =========================================================
   SET DEFAULT DATES
   ========================================================= */

function setDefaultDates() {

    const fromDate =
        document.getElementById("fromDate");

    const toDate =
        document.getElementById("toDate");


    if (!fromDate || !toDate) {
        return;
    }


    const today = new Date();


    const firstDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
    );


    fromDate.value =
        formatDateForInput(firstDay);


    toDate.value =
        formatDateForInput(today);

}


/* =========================================================
   FORMAT DATE
   ========================================================= */

function formatDateForInput(date) {

    const year =
        date.getFullYear();

    const month =
        String(date.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(date.getDate())
            .padStart(2, "0");


    return `${year}-${month}-${day}`;
}


/* =========================================================
   DATE RANGE CHANGE
   ========================================================= */

const dateRange =
    document.getElementById("dateRange");


if (dateRange) {

    dateRange.addEventListener(
        "change",
        function () {

            const value = this.value;

            const today = new Date();

            const fromDate =
                document.getElementById("fromDate");

            const toDate =
                document.getElementById("toDate");


            /* CUSTOM */

            if (value === "custom") {

                fromDate.value = "";
                toDate.value = "";

                return;
            }


            /* TODAY */

            if (value === "today") {

                fromDate.value =
                    formatDateForInput(today);

                toDate.value =
                    formatDateForInput(today);
            }


            /* THIS WEEK */

            else if (value === "week") {

                const start =
                    new Date(today);

                start.setDate(
                    today.getDate() -
                    today.getDay()
                );


                fromDate.value =
                    formatDateForInput(start);

                toDate.value =
                    formatDateForInput(today);
            }


            /* THIS MONTH */

            else if (value === "month") {

                const start =
                    new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        1
                    );


                fromDate.value =
                    formatDateForInput(start);

                toDate.value =
                    formatDateForInput(today);
            }


            /* THIS YEAR */

            else if (value === "year") {

                const start =
                    new Date(
                        today.getFullYear(),
                        0,
                        1
                    );


                fromDate.value =
                    formatDateForInput(start);

                toDate.value =
                    formatDateForInput(today);
            }

        }
    );

}


/* =========================================================
   GENERATE REPORT
   ========================================================= */

async function generateReport() {

    const fromDate =
        document.getElementById("fromDate").value;

    const toDate =
        document.getElementById("toDate").value;


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


    console.log(
        "Generating report:",
        fromDate,
        toDate
    );


    try {

        const url =
            API_BASE +
            "/employee/reports" +
            "?fromDate=" +
            encodeURIComponent(fromDate) +
            "&toDate=" +
            encodeURIComponent(toDate);


        console.log(
            "Report API:",
            url
        );


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "HTTP Error: " +
                response.status
            );
        }


        const report =
            await response.json();


        console.log(
            "Report Response:",
            report
        );


        /*
         * Save report globally
         */
        currentReport = report;


        /*
         * Update all cards
         */
        updateReportData(report);


        /*
         * Draw chart using backend data
         */
        drawTransactionChart(
            report.monthlyChart
        );

    }
    catch (error) {

        console.error(
            "Report error:",
            error
        );


        alert(
            "Unable to load report data from server."
        );
    }

}


/* =========================================================
   UPDATE REPORT DATA
   ========================================================= */

function updateReportData(report) {

    if (!report) {
        return;
    }


    /* =====================================================
       TRANSACTION SUMMARY
       ===================================================== */

    setText(
        "totalTransactions",
        report.totalTransactions
    );


    setText(
        "totalDeposits",
        report.totalDeposits
    );


    setText(
        "totalWithdrawals",
        report.totalWithdrawals
    );


    setText(
        "totalTransfers",
        report.totalTransfers
    );


    /* =====================================================
       AMOUNT SUMMARY

       IMPORTANT:
       These names exactly match backend JSON.
       ===================================================== */

    setText(
        "depositAmount",
        formatCurrency(
            report.totalDepositedAmount
        )
    );


    setText(
        "withdrawAmount",
        formatCurrency(
            report.totalWithdrawnAmount
        )
    );


    setText(
        "transferAmount",
        formatCurrency(
            report.totalTransferredAmount
        )
    );


    /* =====================================================
       CUSTOMER SUMMARY
       ===================================================== */

    setText(
        "totalCustomers",
        report.totalCustomers
    );


    setText(
        "approvedCustomers",
        report.approvedCustomers
    );


    setText(
        "pendingCustomers",
        report.pendingCustomers
    );


    setText(
        "rejectedCustomers",
        report.rejectedCustomers
    );


    /* =====================================================
       ACCOUNT SUMMARY
       ===================================================== */

    setText(
        "totalAccounts",
        report.totalAccounts
    );


    setText(
        "savingsAccounts",
        report.savingsAccounts
    );


    setText(
        "currentAccounts",
        report.currentAccounts
    );


    /* =====================================================
       RECENT ACTIVITY
       ===================================================== */

    updateActivityTable(
        report.recentActivity
    );

}


/* =========================================================
   UPDATE ACTIVITY TABLE
   ========================================================= */

function updateActivityTable(activityList) {

    if (!Array.isArray(activityList)) {
        return;
    }


    let totalCount = 0;

    let totalAmount = 0;


    activityList.forEach(function (activity) {

        const type =
            String(
                activity.activity_type || ""
            ).toUpperCase();


        const count =
            Number(
                activity.count || 0
            );


        const amount =
            Number(
                activity.total_amount || 0
            );


        totalCount += count;

        totalAmount += amount;


        /* DEPOSIT */

        if (type === "DEPOSIT") {

            setText(
                "activityDepositCount",
                count
            );

            setText(
                "activityDepositAmount",
                formatCurrency(amount)
            );
        }


        /* WITHDRAW */

        else if (type === "WITHDRAW") {

            setText(
                "activityWithdrawCount",
                count
            );

            setText(
                "activityWithdrawAmount",
                formatCurrency(amount)
            );
        }


        /* TRANSFER */

        else if (type === "TRANSFER") {

            setText(
                "activityTransferCount",
                count
            );

            setText(
                "activityTransferAmount",
                formatCurrency(amount)
            );
        }

    });


    setText(
        "activityTotalCount",
        totalCount
    );


    setText(
        "activityTotalAmount",
        formatCurrency(totalAmount)
    );

}


/* =========================================================
   SET TEXT
   ========================================================= */

function setText(id, value) {

    const element =
        document.getElementById(id);


    if (!element) {
        return;
    }


    if (
        value === null ||
        value === undefined
    ) {

        return;
    }


    element.textContent = value;
}


/* =========================================================
   FORMAT CURRENCY
   ========================================================= */

function formatCurrency(amount) {

    return (
        "₹" +
        Number(amount || 0).toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        )
    );

}


/* =========================================================
   TRANSACTION CHART
   ========================================================= */

function drawTransactionChart(monthlyData) {

    const canvas =
        document.getElementById(
            "transactionChart"
        );


    if (!canvas) {
        return;
    }


    const ctx =
        canvas.getContext("2d");


    const width =
        canvas.clientWidth;


    const height =
        canvas.clientHeight;


    if (width <= 0 || height <= 0) {
        return;
    }


    const ratio =
        window.devicePixelRatio || 1;


    canvas.width =
        width * ratio;


    canvas.height =
        height * ratio;


    ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );


    /*
     * =====================================================
     * BACKEND DATA
     *
     * Backend returns:
     *
     * monthlyChart: [
     * {
     *   transaction_day,
     *   deposits,
     *   withdrawals,
     *   transfers
     * }
     * ]
     * =====================================================
     */

    if (
        !Array.isArray(monthlyData) ||
        monthlyData.length === 0
    ) {

        drawEmptyChart(
            ctx,
            width,
            height
        );

        return;
    }


    const labels = [];

    const deposits = [];

    const withdrawals = [];

    const transfers = [];


    monthlyData.forEach(function (item) {

        labels.push(
            formatChartDate(
                item.transaction_day
            )
        );


        deposits.push(
            Number(
                item.deposits || 0
            )
        );


        withdrawals.push(
            Number(
                item.withdrawals || 0
            )
        );


        transfers.push(
            Number(
                item.transfers || 0
            )
        );

    });


    /*
     * Clear canvas
     */

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /*
     * Find common maximum.
     *
     * This is important because all
     * three lines should use the
     * same Y-axis.
     */

    const maxValue =
        Math.max(
            ...deposits,
            ...withdrawals,
            ...transfers,
            0
        );


    drawAxes(
        ctx,
        width,
        height,
        labels,
        maxValue
    );


    drawLine(
        ctx,
        width,
        height,
        deposits,
        maxValue,
        "#16a34a"
    );


    drawLine(
        ctx,
        width,
        height,
        withdrawals,
        maxValue,
        "#ef4444"
    );


    drawLine(
        ctx,
        width,
        height,
        transfers,
        maxValue,
        "#7c3aed"
    );

}


/* =========================================================
   FORMAT CHART DATE
   ========================================================= */

function formatChartDate(dateValue) {

    if (!dateValue) {
        return "";
    }


    const date =
        new Date(dateValue);


    if (isNaN(date.getTime())) {
        return String(dateValue);
    }


    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    const month =
        date.toLocaleString(
            "en-US",
            {
                month: "short"
            }
        );


    return `${day} ${month}`;
}


/* =========================================================
   DRAW AXES
   ========================================================= */

function drawAxes(
    ctx,
    width,
    height,
    labels,
    maxValue
) {

    const left = 48;

    const right = 15;

    const top = 10;

    const bottom = 35;


    const chartWidth =
        width -
        left -
        right;


    const chartHeight =
        height -
        top -
        bottom;


    /*
     * Grid
     */

    ctx.strokeStyle =
        "#e5e7eb";

    ctx.lineWidth = 1;


    for (
        let i = 0;
        i <= 4;
        i++
    ) {

        const y =
            top +
            chartHeight -
            (
                chartHeight *
                i /
                4
            );


        ctx.beginPath();

        ctx.moveTo(
            left,
            y
        );

        ctx.lineTo(
            width - right,
            y
        );

        ctx.stroke();


        const value =
            Math.round(
                maxValue *
                i /
                4
            );


        ctx.fillStyle =
            "#667085";

        ctx.font =
            "10px Arial";

        ctx.textAlign =
            "right";


        ctx.fillText(
            formatShortNumber(value),
            left - 7,
            y + 3
        );

    }


    /*
     * X axis labels
     */

    ctx.textAlign =
        "center";

    ctx.fillStyle =
        "#667085";

    ctx.font =
        "10px Arial";


    if (labels.length === 1) {

        ctx.fillText(
            labels[0],
            left + chartWidth / 2,
            height - 10
        );

        return;
    }


    labels.forEach(
        function (label, index) {

            const x =
                left +
                (
                    chartWidth *
                    index /
                    (labels.length - 1)
                );


            ctx.fillText(
                label,
                x,
                height - 10
            );

        }
    );

}


/* =========================================================
   DRAW LINE
   ========================================================= */

function drawLine(
    ctx,
    width,
    height,
    values,
    maxValue,
    color
) {

    if (
        !values ||
        values.length === 0 ||
        maxValue === 0
    ) {
        return;
    }


    const left = 48;

    const right = 15;

    const top = 10;

    const bottom = 35;


    const chartWidth =
        width -
        left -
        right;


    const chartHeight =
        height -
        top -
        bottom;


    ctx.strokeStyle =
        color;

    ctx.lineWidth = 2;


    ctx.beginPath();


    values.forEach(
        function (value, index) {

            let x;


            if (values.length === 1) {

                x =
                    left +
                    chartWidth / 2;

            }
            else {

                x =
                    left +
                    (
                        chartWidth *
                        index /
                        (values.length - 1)
                    );

            }


            const y =
                top +
                chartHeight -
                (
                    value /
                    maxValue *
                    chartHeight *
                    0.85
                );


            if (index === 0) {

                ctx.moveTo(
                    x,
                    y
                );

            }
            else {

                ctx.lineTo(
                    x,
                    y
                );

            }

        }
    );


    ctx.stroke();


    /*
     * Points
     */

    values.forEach(
        function (value, index) {

            let x;


            if (values.length === 1) {

                x =
                    left +
                    chartWidth / 2;

            }
            else {

                x =
                    left +
                    (
                        chartWidth *
                        index /
                        (values.length - 1)
                    );

            }


            const y =
                top +
                chartHeight -
                (
                    value /
                    maxValue *
                    chartHeight *
                    0.85
                );


            ctx.beginPath();


            ctx.arc(
                x,
                y,
                3,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                color;

            ctx.fill();

        }
    );

}


/* =========================================================
   EMPTY CHART
   ========================================================= */

function drawEmptyChart(
    ctx,
    width,
    height
) {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    ctx.fillStyle =
        "#667085";

    ctx.font =
        "14px Arial";

    ctx.textAlign =
        "center";


    ctx.fillText(
        "No transaction data available",
        width / 2,
        height / 2
    );

}


/* =========================================================
   FORMAT SHORT NUMBER
   ========================================================= */

function formatShortNumber(number) {

    if (number >= 100000) {

        return (
            Math.round(
                number / 1000
            ) + "K"
        );

    }


    if (number >= 1000) {

        return (
            Math.round(
                number / 1000
            ) + "K"
        );

    }


    return String(number);
}


/* =========================================================
   WINDOW RESIZE
   ========================================================= */

window.addEventListener(
    "resize",
    function () {

        if (
            currentReport &&
            currentReport.monthlyChart
        ) {

            drawTransactionChart(
                currentReport.monthlyChart
            );

        }

    }
);