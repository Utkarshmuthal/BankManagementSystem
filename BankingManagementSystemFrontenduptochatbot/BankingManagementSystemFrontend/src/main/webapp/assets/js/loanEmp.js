/* =========================================================
   PRIMEBANK - EMPLOYEE LOAN MODULE
   Matches:
   GET    /api/loans
   GET    /api/loans/{loanId}
   GET    /api/loans/{loanId}/assessment
   POST   /api/loans/{loanId}/assessment
   PUT    /api/loans/{loanId}/assessment
   PUT    /api/loans/{loanId}/approve?interestRate=
   PUT    /api/loans/{loanId}/reject?rejectionReason=
   ========================================================= */

const LOAN_API = "http://localhost:8082/api/loans";

let allLoans = [];
let selectedLoan = null;
let selectedAssessment = null;
let currentFilter = "ALL";

document.addEventListener("DOMContentLoaded", loadLoans);

async function loadLoans() {
    const tbody = document.getElementById("loanTableBody");
    if (!tbody) return;

    tbody.innerHTML = `
        <tr><td colspan="9" class="loading-row">
            <i class="fa-solid fa-spinner fa-spin"></i> Loading loan applications...
        </td></tr>`;

    try {
        const response = await fetch(LOAN_API, {
            method: "GET",
            credentials: "include",
            headers: { "Accept": "application/json" }
        });

        const data = await readJson(response);
        if (!response.ok) throw new Error(getError(data, "Unable to load loans."));

        allLoans = Array.isArray(data) ? data : [];
        updateStatistics();
        displayLoans();
    } catch (error) {
        console.error(error);
        showMessage(error.message, "error");
        tbody.innerHTML = `
            <tr><td colspan="9" class="loading-row error-row">
                <i class="fa-solid fa-triangle-exclamation"></i>
                ${escapeHtml(error.message)}
            </td></tr>`;
    }
}

function updateStatistics() {
    const count = status => allLoans.filter(l =>
        String(l.status || "").toUpperCase() === status).length;

    setText("totalLoans", allLoans.length);
    setText("pendingLoans", count("PENDING"));
    setText("approvedLoans", count("APPROVED"));
    setText("activeLoans", count("ACTIVE"));
    setText("rejectedLoans", count("REJECTED"));
}

function filterLoans(status, button) {
    currentFilter = status;
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    if (button) button.classList.add("active");
    displayLoans();
}

function searchLoans() {
    displayLoans();
}

function displayLoans() {
    let loans = [...allLoans];

    if (currentFilter !== "ALL") {
        loans = loans.filter(loan => {
            const status = String(loan.status || "").toUpperCase();
            return currentFilter === "APPROVED"
                ? status === "APPROVED" || status === "ACTIVE"
                : status === currentFilter;
        });
    }

    const query = (document.getElementById("loanSearch")?.value || "").trim().toLowerCase();

    if (query) {
        loans = loans.filter(loan =>
            String(loan.loanId ?? "").toLowerCase().includes(query) ||
            String(loan.customerId ?? "").toLowerCase().includes(query) ||
            String(loan.loanType ?? "").toLowerCase().includes(query) ||
            String(loan.purpose ?? "").toLowerCase().includes(query)
        );
    }

    renderLoans(loans);
}

function renderLoans(loans) {
    const tbody = document.getElementById("loanTableBody");
    if (!tbody) return;

    tbody.innerHTML = "";

    if (!loans.length) {
        tbody.innerHTML = `
            <tr><td colspan="9" class="loading-row">
                <i class="fa-solid fa-folder-open"></i>
                No loan applications found.
            </td></tr>`;
        return;
    }

    loans.forEach(loan => {
        const status = String(loan.status || "PENDING").toUpperCase();
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><strong>#${escapeHtml(loan.loanId ?? "-")}</strong></td>
            <td><span class="customer-badge"><i class="fa-solid fa-user"></i> #${escapeHtml(loan.customerId ?? "-")}</span></td>
            <td>${formatLoanType(loan.loanType)}</td>
            <td><strong>${formatCurrency(loan.requestedAmount)}</strong></td>
            <td>${loan.tenureMonths != null ? escapeHtml(loan.tenureMonths) + " Months" : "-"}</td>
            <td><span class="loan-purpose" title="${escapeHtml(loan.purpose || "")}">${escapeHtml(loan.purpose || "-")}</span></td>
            <td>${formatDate(loan.applicationDate)}</td>
            <td><span class="loan-status ${getStatusClass(status)}">${escapeHtml(status)}</span></td>
            <td>
                <button type="button" class="review-btn" onclick="reviewLoan(${Number(loan.loanId)})">
                    <i class="fa-solid fa-eye"></i> Review
                </button>
            </td>`;
        tbody.appendChild(row);
    });
}

async function reviewLoan(loanId) {
    try {
        selectedLoan = await apiGet(`${LOAN_API}/${loanId}`);

        setText("modalLoanTitle", `Loan #${selectedLoan.loanId}`);
        displayLoanDetails(selectedLoan);
        clearAssessmentForm();
        await loadAssessment(loanId);
        setupDecisionButtons(selectedLoan);

        const modal = document.getElementById("loanReviewModal");
        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

function displayLoanDetails(loan) {
    const container = document.getElementById("loanDetails");
    container.innerHTML = [
        reviewItem("Loan ID", "#" + (loan.loanId ?? "-")),
        reviewItem("Customer ID", "#" + (loan.customerId ?? "-")),
        reviewItem("Loan Type", formatLoanType(loan.loanType)),
        reviewItem("Requested Amount", formatCurrency(loan.requestedAmount)),
        reviewItem("Approved Amount", formatCurrency(loan.approvedAmount)),
        reviewItem("Interest Rate", loan.interestRate != null ? loan.interestRate + "%" : "-"),
        reviewItem("Tenure", loan.tenureMonths != null ? loan.tenureMonths + " Months" : "-"),
        reviewItem("EMI", formatCurrency(loan.emiAmount)),
        reviewItem("Application Date", formatDate(loan.applicationDate)),
        reviewItem("Approval Date", formatDate(loan.approvalDate)),
        reviewItem("Status", escapeHtml(loan.status || "-")),
        reviewItem("Purpose", escapeHtml(loan.purpose || "-"), true),
        reviewItem("Rejection Reason", escapeHtml(loan.rejectionReason || "-"), true)
    ].join("");
}

async function loadAssessment(loanId) {
    const badge = document.getElementById("assessmentModeBadge");

    try {
        const response = await fetch(`${LOAN_API}/${loanId}/assessment`, {
            method: "GET",
            credentials: "include",
            headers: { "Accept": "application/json" }
        });

        if (response.status === 404 || response.status === 500) {
            selectedAssessment = null;
            badge.textContent = "New assessment";
            badge.className = "assessment-badge new";
            showAssessmentMessage("No assessment found. Enter the assessment details and save them.", "info");
            return;
        }

        const data = await readJson(response);
        if (!response.ok) throw new Error(getError(data, "Unable to load assessment."));

        selectedAssessment = data;
        fillAssessmentForm(data);
        badge.textContent = "Existing assessment";
        badge.className = "assessment-badge existing";
        clearAssessmentMessage();
    } catch (error) {
        selectedAssessment = null;
        badge.textContent = "New assessment";
        badge.className = "assessment-badge new";
        showAssessmentMessage(error.message, "error");
    }
}

function clearAssessmentForm() {
    const form = document.getElementById("assessmentForm");
    if (form) form.reset();

    setText("assessmentDti", "—");
    setText("assessmentRiskScore", "—");
    setText("assessmentRiskCategory", "—");
    setText("assessmentStatus", "—");

    const badge = document.getElementById("assessmentModeBadge");
    if (badge) {
        badge.textContent = "Loading...";
        badge.className = "assessment-badge";
    }
    clearAssessmentMessage();
}

function fillAssessmentForm(a) {
    setValue("monthlyIncome", a.monthlyIncome);
    setValue("monthlyExpenses", a.monthlyExpenses);
    setValue("existingEmi", a.existingEmi);
    setValue("proposedEmi", a.proposedEmi);
    setValue("employmentMonths", a.employmentMonths);
    setValue("repaymentSource", a.repaymentSource);
    setValue("repaymentCapacity", a.repaymentCapacity);
    setValue("backgroundCheck", a.backgroundCheck);
    setValue("remarks", a.remarks);

    setText("assessmentDti", a.debtToIncome != null ? a.debtToIncome + "%" : "—");
    setText("assessmentRiskScore", a.riskScore ?? "—");
    setText("assessmentRiskCategory", a.riskCategory || "—");
    setText("assessmentStatus", a.assessmentStatus || "—");
}

async function saveAssessment() {
    if (!selectedLoan) return;

    const income = Number(document.getElementById("monthlyIncome").value);
    if (!Number.isFinite(income) || income <= 0) {
        showAssessmentMessage("Monthly income must be greater than 0.", "error");
        return;
    }

    const capacity = document.getElementById("repaymentCapacity").value;
    const background = document.getElementById("backgroundCheck").value;

    if (!capacity || !background) {
        showAssessmentMessage("Repayment capacity and verification status are required.", "error");
        return;
    }

    const payload = {
        loanId: selectedLoan.loanId,
        monthlyIncome: income,
        monthlyExpenses: numberOrNull("monthlyExpenses"),
        existingEmi: numberOrNull("existingEmi"),
        proposedEmi: numberOrNull("proposedEmi"),
        employmentMonths: integerOrNull("employmentMonths"),
        repaymentSource: valueOrNull("repaymentSource"),
        repaymentCapacity: capacity,
        backgroundCheck: background,
        remarks: valueOrNull("remarks"),
        assessmentStatus: "PENDING"
    };

    try {
        const method = selectedAssessment ? "PUT" : "POST";
        const response = await fetch(`${LOAN_API}/${selectedLoan.loanId}/assessment`, {
            method,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await readJson(response);
        if (!response.ok) throw new Error(getError(data, "Unable to save assessment."));

        selectedAssessment = data;
        fillAssessmentForm(data);

        const badge = document.getElementById("assessmentModeBadge");
        badge.textContent = "Saved assessment";
        badge.className = "assessment-badge existing";

        showAssessmentMessage("Assessment saved successfully. You can now proceed with the final decision.", "success");
        setupDecisionButtons(selectedLoan);
    } catch (error) {
        console.error(error);
        showAssessmentMessage(error.message, "error");
    }
}

function setupDecisionButtons(loan) {
    const container = document.getElementById("loanActionButtons");
    const decision = document.getElementById("decisionSection");
    const status = String(loan.status || "").toUpperCase();

    if (status !== "PENDING") {
        if (decision) decision.style.display = "none";
        container.innerHTML = `<button type="button" class="secondary-btn" onclick="closeLoanModal()">Close</button>`;
        return;
    }

    if (decision) decision.style.display = "block";

    container.innerHTML = `
        <button type="button" class="secondary-btn" onclick="closeLoanModal()">Close</button>
        <button type="button" class="reject-btn" onclick="rejectSelectedLoan()">
            <i class="fa-solid fa-xmark"></i> Reject
        </button>
        <button type="button" class="approve-btn" onclick="approveSelectedLoan()">
            <i class="fa-solid fa-check"></i> Approve Loan
        </button>`;
}

async function approveSelectedLoan() {
    if (!selectedLoan) return;

    if (!selectedAssessment) {
        alert("Please create and save the loan assessment first.");
        return;
    }

    const background = String(selectedAssessment.backgroundCheck || "").toUpperCase();
    const capacity = String(selectedAssessment.repaymentCapacity || "").toUpperCase();
    const risk = String(selectedAssessment.riskCategory || "").toUpperCase();

    if (background !== "VERIFIED") {
        alert("Approval requires Background / Document Verification = VERIFIED.");
        return;
    }

    if (risk === "HIGH") {
        alert("This loan is HIGH risk and cannot be approved by the backend.");
        return;
    }

    if (capacity === "POOR") {
        alert("This loan has POOR repayment capacity and cannot be approved.");
        return;
    }

    const input = document.getElementById("interestRate");
    const interestRate = Number(input.value);

    if (!Number.isFinite(interestRate) || interestRate <= 0) {
        alert("Please enter a valid interest rate.");
        input.focus();
        return;
    }

    if (!confirm(`Approve Loan #${selectedLoan.loanId} at ${interestRate}% interest rate?`)) return;

    try {
        const response = await fetch(
            `${LOAN_API}/${selectedLoan.loanId}/approve?interestRate=${encodeURIComponent(interestRate)}`,
            {
                method: "PUT",
                credentials: "include",
                headers: { "Accept": "application/json" }
            }
        );

        const data = await readJson(response);
        if (!response.ok) throw new Error(getError(data, "Loan approval failed."));

        showMessage("Loan approved successfully.", "success");
        closeLoanModal();
        await loadLoans();
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

async function rejectSelectedLoan() {
    if (!selectedLoan) return;

    const reason = prompt("Enter rejection reason:");
    if (reason === null) return;

    if (!reason.trim()) {
        alert("Rejection reason is required.");
        return;
    }

    if (!confirm(`Reject Loan #${selectedLoan.loanId}?`)) return;

    try {
        const response = await fetch(
            `${LOAN_API}/${selectedLoan.loanId}/reject?rejectionReason=${encodeURIComponent(reason.trim())}`,
            {
                method: "PUT",
                credentials: "include",
                headers: { "Accept": "application/json" }
            }
        );

        const data = await readJson(response);
        if (!response.ok) throw new Error(getError(data, "Loan rejection failed."));

        showMessage("Loan rejected successfully.", "success");
        closeLoanModal();
        await loadLoans();
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

function closeLoanModal() {
    const modal = document.getElementById("loanReviewModal");
    if (modal) {
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
    }
    selectedLoan = null;
    selectedAssessment = null;
}

window.addEventListener("click", function(event) {
    const modal = document.getElementById("loanReviewModal");
    if (modal && event.target === modal) closeLoanModal();
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") closeLoanModal();
});

/* ---------------- helpers ---------------- */

async function apiGet(url) {
    const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: { "Accept": "application/json" }
    });
    const data = await readJson(response);
    if (!response.ok) throw new Error(getError(data, "Request failed."));
    return data;
}

async function readJson(response) {
    const text = await response.text();
    if (!text) return null;
    try { return JSON.parse(text); }
    catch { return { message: text }; }
}

function getError(data, fallback) {
    return data?.message || data?.error || fallback;
}

function numberOrNull(id) {
    const value = document.getElementById(id)?.value;
    if (value === "" || value == null) return null;
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
}

function integerOrNull(id) {
    const value = document.getElementById(id)?.value;
    if (value === "" || value == null) return null;
    const n = Number(value);
    return Number.isInteger(n) ? n : null;
}

function valueOrNull(id) {
    const value = document.getElementById(id)?.value;
    return value === "" ? null : value;
}

function setValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value ?? "";
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

function reviewItem(label, value, wide = false) {
    return `
        <div class="review-item ${wide ? "review-wide" : ""}">
            <span>${escapeHtml(label)}</span>
            <strong>${value}</strong>
        </div>`;
}

function formatLoanType(type) {
    const types = {
        PERSONAL: "Personal Loan",
        HOME: "Home Loan",
        EDUCATION: "Education Loan",
        CAR: "Car Loan",
        BUSINESS: "Business Loan"
    };
    const key = String(type || "").toUpperCase();
    return escapeHtml(types[key] || type || "-");
}

function formatCurrency(value) {
    if (value === null || value === undefined || value === "") return "—";
    const number = Number(value);
    if (!Number.isFinite(number)) return "—";
    return number.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2
    });
}

function formatDate(value) {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return escapeHtml(String(value));
    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

function getStatusClass(status) {
    switch (String(status).toUpperCase()) {
        case "PENDING": return "pending";
        case "APPROVED": return "approved";
        case "ACTIVE": return "active";
        case "REJECTED": return "rejected";
        default: return "default";
    }
}

function showMessage(message, type) {
    const box = document.getElementById("loanMessage");
    if (!box) return;
    box.className = `employee-loan-message ${type || ""}`;
    box.textContent = message || "";
}

function showAssessmentMessage(message, type) {
    const box = document.getElementById("assessmentMessage");
    if (!box) return;
    box.className = `assessment-message ${type || ""}`;
    box.textContent = message || "";
}

function clearAssessmentMessage() {
    const box = document.getElementById("assessmentMessage");
    if (box) {
        box.className = "assessment-message";
        box.textContent = "";
    }
}

function escapeHtml(value) {
    if (value === null || value === undefined) return "";
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
