const API = "http://localhost:8082/api";
const BACKEND_ROOT = API.replace(/\/api$/, "");

let currentLoanId = null;
let currentLoanData = null;


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    loadLoans();

    toggleIncomeRequirement();

});


/* =========================================================
   GET CUSTOMER ID
   ========================================================= */

function getCustomerId() {

    const customerId =
        sessionStorage.getItem("customerId");

    if (customerId) {
        return customerId;
    }

    /*
     * Fallback in case your login stores it in localStorage.
     */

    const localCustomerId =
        localStorage.getItem("customerId");

    if (localCustomerId) {
        return localCustomerId;
    }

    return null;
}


/* =========================================================
   LOAD CUSTOMER LOANS
   ========================================================= */

async function loadLoans() {

    const customerId =
        getCustomerId();

    const body =
        document.getElementById(
            "loanTableBody"
        );


    if (!customerId) {

        console.error(
            "Customer ID not found in sessionStorage/localStorage."
        );

        if (body) {

            body.innerHTML = `
                <tr>
                    <td colspan="10" class="loading">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        Customer session not found. Please login again.
                    </td>
                </tr>
            `;

        }

        updateSummary([]);

        return;
    }


    try {

        const response =
            await fetch(
                `${API}/loans/customer/${encodeURIComponent(customerId)}`,
                {
                    method: "GET",

                    headers: {
                        "Accept": "application/json"
                    }
                }
            );


        const responseText =
            await response.text();


        if (!response.ok) {

            let message =
                "Unable to load loans.";

            try {

                const errorData =
                    JSON.parse(
                        responseText
                    );

                message =
                    errorData.message ||
                    errorData.error ||
                    message;

            } catch (e) {
                // Non-JSON response.
            }


            throw new Error(message);

        }


        const loans =
            responseText
                ? JSON.parse(responseText)
                : [];


        displayLoans(
            Array.isArray(loans)
                ? loans
                : []
        );


        updateSummary(
            Array.isArray(loans)
                ? loans
                : []
        );


    } catch (error) {

        console.error(
            "Load Loans Error:",
            error
        );


        if (body) {

            body.innerHTML = `
                <tr>
                    <td colspan="10" class="loading">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        ${escapeHtml(error.message)}
                    </td>
                </tr>
            `;

        }


        updateSummary([]);

    }

}


/* =========================================================
   DISPLAY LOANS
   ========================================================= */

function displayLoans(loans) {

    const body =
        document.getElementById(
            "loanTableBody"
        );


    if (!body) {
        return;
    }


    body.innerHTML = "";


    if (
        !loans ||
        loans.length === 0
    ) {

        body.innerHTML = `
            <tr>
                <td
                    colspan="10"
                    class="loading">

                    <i class="fa-solid fa-folder-open"></i>

                    No loans found.

                </td>
            </tr>
        `;

        return;
    }


    loans.forEach(
        function (loan) {

            const status =
                (
                    loan.status ||
                    "PENDING"
                ).toUpperCase();


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    <strong>
                        #${loan.loanId ?? "-"}
                    </strong>
                </td>


                <td>
                    ${escapeHtml(
                        loan.loanType || "-"
                    )}
                </td>


                <td>
                    ${currency(
                        loan.requestedAmount
                    )}
                </td>


                <td>
                    ${currency(
                        loan.approvedAmount
                    )}
                </td>


                <td>

                    ${
                        loan.interestRate != null
                            ? escapeHtml(
                                loan.interestRate
                            ) + "%"
                            : "-"
                    }

                </td>


                <td>

                    ${
                        loan.tenureMonths
                            ? escapeHtml(
                                loan.tenureMonths
                            ) + " Months"
                            : "-"
                    }

                </td>


                <td>
                    ${currency(
                        loan.emiAmount
                    )}
                </td>


                <td>

                    <span
                        class="status status-${status.toLowerCase()}">

                        ${escapeHtml(status)}

                    </span>

                </td>


                <td>
                    ${formatDate(
                        loan.applicationDate
                    )}
                </td>


                <td>

                    <button
                        type="button"
                        class="view-btn"
                        onclick="viewLoanById(${Number(loan.loanId)})">

                        <i class="fa-solid fa-eye"></i>

                        View

                    </button>

                </td>

            `;


            body.appendChild(row);

        }
    );

}


/* =========================================================
   VIEW LOAN BY ID
   ========================================================= */

async function viewLoanById(
    loanId
) {

    try {

        const response =
            await fetch(
                `${API}/loans/${loanId}`,
                {
                    method: "GET",

                    headers: {
                        "Accept":
                            "application/json"
                    }
                }
            );


        if (!response.ok) {

            const errorText =
                await response.text();

            let message =
                "Unable to load loan details.";

            try {

                const errorData =
                    JSON.parse(
                        errorText
                    );

                message =
                    errorData.message ||
                    errorData.error ||
                    message;

            } catch (e) {
                // Non JSON.
            }

            throw new Error(message);

        }


        const loan =
            await response.json();


        viewLoan(loan);


    } catch (error) {

        console.error(
            "View Loan Error:",
            error
        );

        alert(
            error.message
        );

    }

}


/* =========================================================
   SUMMARY
   ========================================================= */

function updateSummary(
    loans
) {

    let approved = 0;

    let pending = 0;

    let rejected = 0;


    loans.forEach(
        function (loan) {

            const status =
                (
                    loan.status ||
                    ""
                ).toUpperCase();


            if (
                status === "APPROVED" ||
                status === "ACTIVE"
            ) {

                approved++;

            }

            else if (
                status === "PENDING"
            ) {

                pending++;

            }

            else if (
                status === "REJECTED"
            ) {

                rejected++;

            }

        }
    );


    setText(
        "totalLoans",
        loans.length
    );


    setText(
        "approvedLoans",
        approved
    );


    setText(
        "pendingLoans",
        pending
    );


    setText(
        "rejectedLoans",
        rejected
    );

}


/* =========================================================
   INCOME REQUIREMENT
   ========================================================= */

function toggleIncomeRequirement() {

    const loanTypeElement =
        document.getElementById(
            "loanType"
        );


    const incomeInput =
        document.getElementById(
            "monthlyIncome"
        );


    const incomeLabel =
        document.getElementById(
            "monthlyIncomeLabel"
        );


    const incomeHint =
        document.getElementById(
            "incomeHint"
        );


    if (
        !loanTypeElement ||
        !incomeInput ||
        !incomeLabel ||
        !incomeHint
    ) {

        return;

    }


    const loanType =
        loanTypeElement.value;


    if (
        loanType === "EDUCATION"
    ) {

        incomeInput.required =
            false;


        incomeLabel.textContent =
            "Monthly Income (optional for students)";


        incomeHint.textContent =
            "(not mandatory for education loans)";

    }

    else {

        incomeInput.required =
            true;


        incomeLabel.textContent =
            "Monthly Income *";


        incomeHint.textContent =
            "(used for eligibility assessment)";

    }

}


/* =========================================================
   APPLY LOAN
   ========================================================= */

async function applyLoan(
    event
) {

    event.preventDefault();


    const customerId =
        getCustomerId();


    /*
     * IMPORTANT:
     * Do not send the request if customerId is missing.
     * This prevents customer_id = null in PostgreSQL.
     */

    if (!customerId) {

        showMessage(
            "Customer session not found. Please login again.",
            "error"
        );

        return;

    }


    const loanType =
        document.getElementById(
            "loanType"
        ).value;


    const requestedAmount =
        Number(
            document.getElementById(
                "requestedAmount"
            ).value
        );


    const tenureMonths =
        Number(
            document.getElementById(
                "tenureMonths"
            ).value
        );


    const purpose =
        document.getElementById(
            "purpose"
        ).value.trim();


    /*
     * Basic validation
     */

    if (!loanType) {

        showMessage(
            "Please select a loan type.",
            "error"
        );

        return;

    }


    if (
        !requestedAmount ||
        requestedAmount < 1000
    ) {

        showMessage(
            "Requested amount must be at least ₹1,000.",
            "error"
        );

        return;

    }


    if (!tenureMonths) {

        showMessage(
            "Please select a loan tenure.",
            "error"
        );

        return;

    }


    if (!purpose) {

        showMessage(
            "Please enter the purpose of the loan.",
            "error"
        );

        return;

    }


    /*
     * Loan object
     */

    /*
     * IMPORTANT FIX:
     * Read + validate monthly income BEFORE the loan is created.
     * Previously this validation ran after POST /api/loans/apply,
     * which could leave an orphaned PENDING loan (with no
     * assessment) if validation failed here.
     */

        const monthlyIncomeElement =
            document.getElementById(
                "monthlyIncome"
            );


        const monthlyExpensesElement =
            document.getElementById(
                "monthlyExpenses"
            );


        const existingEmiElement =
            document.getElementById(
                "existingEmi"
            );


        const employmentMonthsElement =
            document.getElementById(
                "employmentMonths"
            );


        const repaymentSourceElement =
            document.getElementById(
                "repaymentSource"
            );


        const monthlyIncomeRaw =
            monthlyIncomeElement
                ? monthlyIncomeElement.value.trim()
                : "";


        const monthlyExpensesRaw =
            monthlyExpensesElement
                ? monthlyExpensesElement.value.trim()
                : "";


        const existingEmiRaw =
            existingEmiElement
                ? existingEmiElement.value.trim()
                : "";


        const employmentMonthsRaw =
            employmentMonthsElement
                ? employmentMonthsElement.value.trim()
                : "";


        const repaymentSource =
            repaymentSourceElement
                ? repaymentSourceElement.value
                : "";


        /*
         * Education:
         * monthly income can be zero.
         *
         * Other loan types:
         * monthly income must be > 0.
         */

        if (
            loanType !== "EDUCATION" &&
            (
                !monthlyIncomeRaw ||
                Number(monthlyIncomeRaw) <= 0
            )
        ) {

            showMessage(
                "Monthly income must be greater than zero for " +
                loanType +
                " loan.",
                "error"
            );

            return;

        }


    const loan = {

        customerId:
            Number(customerId),

        loanType:
            loanType,

        requestedAmount:
            requestedAmount,

        tenureMonths:
            tenureMonths,

        purpose:
            purpose

    };


    const applyButton =
        document.getElementById(
            "applyBtn"
        );


    if (applyButton) {

        applyButton.disabled =
            true;

        applyButton.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Submitting...
        `;

    }


    try {

        /*
         * STEP 1
         * Create Loan
         */

        const response =
            await fetch(
                `${API}/loans/apply`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "Accept":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            loan
                        )
                }
            );


        const responseText =
            await response.text();


        let data = null;


        try {

            data =
                responseText
                    ? JSON.parse(
                        responseText
                    )
                    : null;

        } catch (e) {

            data = null;

        }


        if (!response.ok) {

            throw new Error(

                data?.message ||
                data?.error ||
                responseText ||
                "Loan application failed."

            );

        }


        if (
            !data ||
            !data.loanId
        ) {

            throw new Error(
                "Loan was created but loan ID was not returned."
            );

        }


        /*
         * STEP 2
         * Create Loan Assessment
         */

        const assessment = {

            loanId:
                data.loanId,

            monthlyIncome:
                monthlyIncomeRaw
                    ? Number(
                        monthlyIncomeRaw
                    )
                    : 0,

            monthlyExpenses:
                monthlyExpensesRaw
                    ? Number(
                        monthlyExpensesRaw
                    )
                    : 0,

            existingEmi:
                existingEmiRaw
                    ? Number(
                        existingEmiRaw
                    )
                    : 0,

            employmentMonths:
                employmentMonthsRaw
                    ? Number(
                        employmentMonthsRaw
                    )
                    : 0,

            repaymentSource:
                repaymentSource
                    ? repaymentSource
                    : null

        };


        const assessmentResponse =
            await fetch(
                `${API}/loans/${data.loanId}/assessment`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "Accept":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            assessment
                        )
                }
            );


        const assessmentText =
            await assessmentResponse.text();


        let assessmentData =
            null;


        try {

            assessmentData =
                assessmentText
                    ? JSON.parse(
                        assessmentText
                    )
                    : null;

        } catch (e) {

            assessmentData =
                null;

        }


        if (
            !assessmentResponse.ok
        ) {

            throw new Error(

                assessmentData?.message ||
                assessmentData?.error ||
                assessmentText ||
                "Loan assessment could not be created."

            );

        }


        /*
         * SUCCESS
         */

        showMessage(

            `Loan applied successfully. Loan ID: ${data.loanId}`,

            "success"

        );


        setTimeout(
            function () {

                closeLoanModal();

                loadLoans();

            },
            1000
        );


    } catch (error) {

        console.error(
            "Loan Application Error:",
            error
        );


        showMessage(
            error.message,
            "error"
        );


    } finally {

        if (applyButton) {

            applyButton.disabled =
                false;

            applyButton.innerHTML = `
                <i class="fa-solid fa-paper-plane"></i>
                Submit Application
            `;

        }

    }

}


/* =========================================================
   VIEW LOAN DETAILS
   ========================================================= */

function viewLoan(
    loan
) {

    currentLoanId =
        loan.loanId;

    currentLoanData =
        loan;


    const details =
        document.getElementById(
            "loanDetails"
        );


    if (!details) {
        return;
    }


    details.innerHTML = `

        <div class="detail-grid">


            <div>

                <span>
                    Loan ID
                </span>

                <strong>
                    #${loan.loanId ?? "-"}
                </strong>

            </div>


            <div>

                <span>
                    Status
                </span>

                <strong>

                    <span class="status status-${
                        String(
                            loan.status ||
                            "UNKNOWN"
                        ).toLowerCase()
                    }">

                        ${escapeHtml(
                            loan.status ||
                            "-"
                        )}

                    </span>

                </strong>

            </div>


            <div>

                <span>
                    Loan Type
                </span>

                <strong>
                    ${escapeHtml(
                        loan.loanType ||
                        "-"
                    )}
                </strong>

            </div>


            <div>

                <span>
                    Purpose
                </span>

                <strong>
                    ${escapeHtml(
                        loan.purpose ||
                        "-"
                    )}
                </strong>

            </div>


            <div>

                <span>
                    Requested Amount
                </span>

                <strong>
                    ${currency(
                        loan.requestedAmount
                    )}
                </strong>

            </div>


            <div>

                <span>
                    Approved Amount
                </span>

                <strong>
                    ${currency(
                        loan.approvedAmount
                    )}
                </strong>

            </div>


            <div>

                <span>
                    Interest Rate
                </span>

                <strong>

                    ${
                        loan.interestRate != null
                            ? escapeHtml(
                                loan.interestRate
                            ) + "%"
                            : "-"
                    }

                </strong>

            </div>


            <div>

                <span>
                    Tenure
                </span>

                <strong>

                    ${
                        loan.tenureMonths
                            ? escapeHtml(
                                loan.tenureMonths
                            ) + " Months"
                            : "-"
                    }

                </strong>

            </div>


            <div>

                <span>
                    Monthly EMI
                </span>

                <strong>
                    ${currency(
                        loan.emiAmount
                    )}
                </strong>

            </div>


            <div>

                <span>
                    Total Interest
                </span>

                <strong>
                    ${currency(
                        loan.totalInterest
                    )}
                </strong>

            </div>


            <div>

                <span>
                    Total Payable
                </span>

                <strong>
                    ${currency(
                        loan.totalPayable
                    )}
                </strong>

            </div>


            <div>

                <span>
                    Application Date
                </span>

                <strong>
                    ${formatDate(
                        loan.applicationDate
                    )}
                </strong>

            </div>


        </div>


        <div class="loan-detail-actions">


            <button
                type="button"
                class="action-btn"
                onclick="loadAssessment()">

                <i class="fa-solid fa-chart-line"></i>

                Assessment

            </button>


            <button
                type="button"
                class="action-btn"
                onclick="loadEmis()">

                <i class="fa-solid fa-calendar"></i>

                EMI Schedule

            </button>


            <button
                type="button"
                class="action-btn"
                onclick="loadDocuments()">

                <i class="fa-solid fa-file"></i>

                Documents

            </button>


        </div>


        <div id="extraLoanData">

        </div>

    `;


    const modal =
        document.getElementById(
            "detailsModal"
        );


    if (modal) {

        modal.classList.add(
            "show"
        );

    }

}


/* =========================================================
   ASSESSMENT
   ========================================================= */

async function loadAssessment() {

    const container =
        document.getElementById(
            "extraLoanData"
        );


    if (!container || !currentLoanId) {
        return;
    }


    container.innerHTML = `

        <div class="loading">

            <i class="fa-solid fa-spinner fa-spin"></i>

            Loading assessment...

        </div>

    `;


    try {

        const response =
            await fetch(
                `${API}/loans/${currentLoanId}/assessment`,
                {
                    method: "GET",

                    headers: {
                        "Accept":
                            "application/json"
                    }
                }
            );


        const responseText =
            await response.text();


        let data =
            null;


        try {

            data =
                responseText
                    ? JSON.parse(
                        responseText
                    )
                    : null;

        } catch (e) {

            data = null;

        }


        if (!response.ok) {

            throw new Error(
                data?.message ||
                "Assessment is not available yet."
            );

        }


        container.innerHTML = `

            <div class="loan-detail-section">


                <h3>

                    <i class="fa-solid fa-chart-line"></i>

                    Loan Assessment

                </h3>


                <div class="detail-grid">


                    <div>

                        <span>
                            Monthly Income
                        </span>

                        <strong>
                            ${currency(
                                data.monthlyIncome
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Monthly Expenses
                        </span>

                        <strong>
                            ${currency(
                                data.monthlyExpenses
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Existing EMI
                        </span>

                        <strong>
                            ${currency(
                                data.existingEmi
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Proposed EMI
                        </span>

                        <strong>
                            ${currency(
                                data.proposedEmi
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Debt To Income
                        </span>

                        <strong>
                            ${
                                data.debtToIncome != null
                                    ? data.debtToIncome + "%"
                                    : "-"
                            }
                        </strong>

                    </div>


                    <div>

                        <span>
                            Employment
                        </span>

                        <strong>
                            ${
                                data.employmentMonths != null
                                    ? data.employmentMonths +
                                      " Months"
                                    : "-"
                            }
                        </strong>

                    </div>


                    <div>

                        <span>
                            Repayment Capacity
                        </span>

                        <strong>
                            ${escapeHtml(
                                data.repaymentCapacity ||
                                "-"
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Risk Category
                        </span>

                        <strong>
                            ${escapeHtml(
                                data.riskCategory ||
                                "-"
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Risk Score
                        </span>

                        <strong>
                            ${
                                data.riskScore != null
                                    ? data.riskScore
                                    : "-"
                            }
                        </strong>

                    </div>


                    <div>

                        <span>
                            Background Check
                        </span>

                        <strong>
                            ${escapeHtml(
                                data.backgroundCheck ||
                                "-"
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Repayment Source
                        </span>

                        <strong>
                            ${escapeHtml(
                                data.repaymentSource ||
                                "-"
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Assessment Status
                        </span>

                        <strong>
                            ${escapeHtml(
                                data.assessmentStatus ||
                                "-"
                            )}
                        </strong>

                    </div>


                </div>


            </div>

        `;


    } catch (error) {

        container.innerHTML = `

            <div class="error-message">

                <i class="fa-solid fa-circle-info"></i>

                ${escapeHtml(
                    error.message
                )}

            </div>

        `;

    }

}


/* =========================================================
   EMI SCHEDULE
   ========================================================= */

async function loadEmis() {

    const container =
        document.getElementById(
            "extraLoanData"
        );


    if (!container || !currentLoanId) {
        return;
    }


    container.innerHTML = `

        <div class="loading">

            <i class="fa-solid fa-spinner fa-spin"></i>

            Loading EMI schedule...

        </div>

    `;


    try {

        const response =
            await fetch(
                `${API}/loan-emis/loan/${currentLoanId}`,
                {
                    method: "GET",

                    headers: {
                        "Accept":
                            "application/json"
                    }
                }
            );


        const responseText =
            await response.text();


        if (!response.ok) {

            throw new Error(
                "EMI schedule is not available."
            );

        }


        const emis =
            responseText
                ? JSON.parse(
                    responseText
                )
                : [];


        if (
            !Array.isArray(emis) ||
            emis.length === 0
        ) {

            container.innerHTML = `

                <div class="loan-detail-section">

                    <h3>

                        <i class="fa-solid fa-calendar-check"></i>

                        EMI Schedule

                    </h3>

                    <p>
                        No EMI records found.
                    </p>

                </div>

            `;

            return;

        }


        let rows = "";


        emis.forEach(
            function (emi) {

                const status =
                    String(
                        emi.status ||
                        "PENDING"
                    ).toUpperCase();


                rows += `

                    <tr>


                        <td>
                            ${emi.emiNumber ?? "-"}
                        </td>


                        <td>
                            ${formatDate(
                                emi.dueDate
                            )}
                        </td>


                        <td>
                            ${currency(
                                emi.emiAmount
                            )}
                        </td>


                        <td>
                            ${currency(
                                emi.principalAmount
                            )}
                        </td>


                        <td>
                            ${currency(
                                emi.interestAmount
                            )}
                        </td>


                        <td>
                            ${currency(
                                emi.paidAmount
                            )}
                        </td>


                        <td>

                            <span class="status status-${
                                status.toLowerCase()
                            }">

                                ${escapeHtml(
                                    status
                                )}

                            </span>

                        </td>


                        <td>

                            ${
                                status !== "PAID"
                                    ? `
                                        <button
                                            type="button"
                                            class="pay-btn"
                                            onclick="payEmi(
                                                ${emi.emiId},
                                                ${Number(emi.emiAmount || 0)}
                                            )">

                                            <i class="fa-solid fa-credit-card"></i>

                                            Pay EMI

                                        </button>
                                      `
                                    : `
                                        <span>
                                            Paid
                                        </span>
                                      `
                            }

                        </td>


                    </tr>

                `;

            }
        );


        container.innerHTML = `

            <div class="loan-detail-section">


                <h3>

                    <i class="fa-solid fa-calendar-check"></i>

                    EMI Schedule

                </h3>


                <div class="table-wrapper">


                    <table class="loan-table">


                        <thead>

                            <tr>

                                <th>
                                    EMI
                                </th>

                                <th>
                                    Due Date
                                </th>

                                <th>
                                    Amount
                                </th>

                                <th>
                                    Principal
                                </th>

                                <th>
                                    Interest
                                </th>

                                <th>
                                    Paid
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            ${rows}

                        </tbody>


                    </table>


                </div>


            </div>

        `;


    } catch (error) {

        container.innerHTML = `

            <div class="error-message">

                ${escapeHtml(
                    error.message
                )}

            </div>

        `;

    }

}


/* =========================================================
   PAY EMI
   ========================================================= */

async function payEmi(
    emiId,
    amount
) {

    const confirmed =
        confirm(
            `Pay EMI of ${currency(amount)}?`
        );


    if (!confirmed) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API}/loan-emis/${emiId}/pay?paidAmount=${encodeURIComponent(amount)}`,
                {
                    method: "PUT",

                    headers: {
                        "Accept":
                            "application/json"
                    }
                }
            );


        const responseText =
            await response.text();


        let data =
            null;


        try {

            data =
                responseText
                    ? JSON.parse(
                        responseText
                    )
                    : null;

        } catch (e) {

            data = null;

        }


        if (!response.ok) {

            throw new Error(

                data?.message ||
                data?.error ||
                responseText ||
                "EMI payment failed."

            );

        }


        alert(
            "EMI paid successfully."
        );


        await loadEmis();

        await loadLoans();


    } catch (error) {

        console.error(
            "EMI Payment Error:",
            error
        );


        alert(
            error.message
        );

    }

}


/* =========================================================
   DOCUMENTS
   ========================================================= */

async function loadDocuments() {

    const container =
        document.getElementById(
            "extraLoanData"
        );


    if (!container || !currentLoanId) {
        return;
    }


    container.innerHTML = `

        <div class="loading">

            <i class="fa-solid fa-spinner fa-spin"></i>

            Loading documents...

        </div>

    `;


    try {

        const response =
            await fetch(
                `${API}/loan-documents/loan/${currentLoanId}`,
                {
                    method: "GET",

                    headers: {
                        "Accept":
                            "application/json"
                    }
                }
            );


        const responseText =
            await response.text();


        if (!response.ok) {

            throw new Error(
                "Unable to load documents."
            );

        }


        const documents =
            responseText
                ? JSON.parse(
                    responseText
                )
                : [];


        let html = `

            <div class="loan-detail-section">


                <h3>

                    <i class="fa-solid fa-file-lines"></i>

                    Loan Documents

                </h3>

        `;


        /*
         * Only allow new uploads while the loan is still
         * PENDING. Once an employee has approved/rejected it,
         * there is nothing left to review.
         */

        const loanStatus =
            String(
                (currentLoanData && currentLoanData.status) ||
                ""
            ).toUpperCase();


        if (loanStatus === "PENDING") {

            html += `

                <div class="document-upload-form">

                    <div class="form-row">

                        <div class="form-group">

                            <label>Document Type</label>

                            <select id="uploadDocType">
                                <option value="ID_PROOF">ID Proof</option>
                                <option value="INCOME_PROOF">Income Proof</option>
                                <option value="ADDRESS_PROOF">Address Proof</option>
                                <option value="BANK_STATEMENT">Bank Statement</option>
                                <option value="PROPERTY_PAPERS">Property Papers</option>
                                <option value="OTHER">Other</option>
                            </select>

                        </div>

                        <div class="form-group">

                            <label>File</label>

                            <input type="file" id="uploadDocFile" accept=".pdf,.jpg,.jpeg,.png">

                        </div>

                        <button
                            type="button"
                            class="primary-btn upload-btn"
                            onclick="uploadLoanDocument()">

                            <i class="fa-solid fa-upload"></i>
                            Upload

                        </button>

                    </div>

                    <div id="uploadDocMessage"></div>

                </div>

            `;

        }


        if (
            !Array.isArray(documents) ||
            documents.length === 0
        ) {

            html += `

                <p>
                    No documents uploaded.
                </p>

            `;

        }

        else {

            html += `

                <div class="document-list">

            `;


            documents.forEach(
                function (doc) {

                    const status =
                        doc.verificationStatus ||
                        doc.status ||
                        "PENDING";

                    const fileUrl =
                        BACKEND_ROOT + "/" + doc.filePath;


                    html += `

                        <div class="document-card">


                            <div>

                                <strong>

                                    ${escapeHtml(
                                        doc.documentType ||
                                        "Document"
                                    )}

                                </strong>


                                <small>

                                    ${escapeHtml(
                                        doc.fileName ||
                                        ""
                                    )}

                                </small>


                                ${
                                    doc.remarks
                                        ? `<small class="doc-remarks">${escapeHtml(doc.remarks)}</small>`
                                        : ""
                                }

                            </div>


                            <div class="document-card-actions">

                                <a
                                    class="view-doc-link"
                                    href="${fileUrl}"
                                    target="_blank"
                                    rel="noopener noreferrer">

                                    <i class="fa-solid fa-eye"></i>
                                    View

                                </a>

                                <span class="doc-status doc-status-${String(status).toLowerCase()}">

                                    ${escapeHtml(
                                        status
                                    )}

                                </span>

                            </div>


                        </div>

                    `;

                }
            );


            html += `
                </div>
            `;

        }


        html += `
            </div>
        `;


        container.innerHTML =
            html;


    } catch (error) {

        console.error(
            "Documents Error:",
            error
        );


        container.innerHTML = `

            <div class="error-message">

                <i class="fa-solid fa-triangle-exclamation"></i>

                ${escapeHtml(
                    error.message
                )}

            </div>

        `;

    }

}


/* =========================================================
   UPLOAD DOCUMENT
   ========================================================= */

async function uploadLoanDocument() {

    const typeSelect =
        document.getElementById(
            "uploadDocType"
        );

    const fileInput =
        document.getElementById(
            "uploadDocFile"
        );

    const messageBox =
        document.getElementById(
            "uploadDocMessage"
        );


    if (!currentLoanId || !typeSelect || !fileInput) {
        return;
    }


    const file =
        fileInput.files && fileInput.files[0];


    if (!file) {

        if (messageBox) {
            messageBox.innerHTML =
                `<div class="form-message error">Please choose a file to upload.</div>`;
        }

        return;

    }


    const formData = new FormData();

    formData.append("loanId", currentLoanId);
    formData.append("documentType", typeSelect.value);
    formData.append("file", file);


    if (messageBox) {
        messageBox.innerHTML =
            `<div class="form-message">Uploading...</div>`;
    }


    try {

        const response =
            await fetch(
                `${API}/loan-documents/upload`,
                {
                    method: "POST",
                    body: formData
                }
            );


        const responseText =
            await response.text();

        let data = null;

        try {
            data = responseText ? JSON.parse(responseText) : null;
        } catch (e) {
            // Non JSON response.
        }


        if (!response.ok) {

            const message =
                (data && (data.message || data.error)) ||
                "Document upload failed.";

            throw new Error(message);

        }


        if (messageBox) {
            messageBox.innerHTML =
                `<div class="form-message success">Document uploaded successfully.</div>`;
        }


        fileInput.value = "";


        // Refresh the document list to show the new upload.
        loadDocuments();


    } catch (error) {

        console.error(
            "Upload Document Error:",
            error
        );

        if (messageBox) {
            messageBox.innerHTML =
                `<div class="form-message error">${escapeHtml(error.message)}</div>`;
        }

    }

}


/* =========================================================
   OPEN APPLY MODAL
   ========================================================= */

function openLoanModal(
    type
) {

    const modal =
        document.getElementById(
            "loanModal"
        );


    if (!modal) {
        return;
    }


    modal.classList.add(
        "show"
    );


    if (type) {

        const loanType =
            document.getElementById(
                "loanType"
            );


        if (loanType) {

            loanType.value =
                type;

        }

    }


    toggleIncomeRequirement();

}


/* =========================================================
   CLOSE APPLY MODAL
   ========================================================= */

function closeLoanModal() {

    const modal =
        document.getElementById(
            "loanModal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }


    const form =
        document.getElementById(
            "loanForm"
        );


    if (form) {

        form.reset();

    }


    const message =
        document.getElementById(
            "formMessage"
        );


    if (message) {

        message.textContent =
            "";

        message.className =
            "form-message";

    }


    toggleIncomeRequirement();

}


/* =========================================================
   CLOSE DETAILS MODAL
   ========================================================= */

function closeDetailsModal() {

    const modal =
        document.getElementById(
            "detailsModal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }


    currentLoanId =
        null;

}


/* =========================================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
   ========================================================= */

window.addEventListener(
    "click",
    function (event) {

        const loanModal =
            document.getElementById(
                "loanModal"
            );


        const detailsModal =
            document.getElementById(
                "detailsModal"
            );


        if (
            event.target ===
            loanModal
        ) {

            closeLoanModal();

        }


        if (
            event.target ===
            detailsModal
        ) {

            closeDetailsModal();

        }

    }
);


/* =========================================================
   MESSAGE
   ========================================================= */

function showMessage(
    message,
    type
) {

    const element =
        document.getElementById(
            "formMessage"
        );


    if (!element) {

        alert(message);

        return;

    }


    element.textContent =
        message;


    element.className =
        "form-message " +
        type;

}


/* =========================================================
   CURRENCY
   ========================================================= */

function currency(
    value
) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return "₹0.00";

    }


    const number =
        Number(value);


    if (
        isNaN(number)
    ) {

        return "₹0.00";

    }


    return number.toLocaleString(
        "en-IN",
        {
            style: "currency",
            currency: "INR"
        }
    );

}


/* =========================================================
   DATE
   ========================================================= */

function formatDate(
    value
) {

    if (!value) {

        return "-";

    }


    const date =
        new Date(value);


    if (
        isNaN(
            date.getTime()
        )
    ) {

        return String(value);

    }


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* =========================================================
   SET TEXT
   ========================================================= */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value;

    }

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHtml(
    value
) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}