/**
 * BANK MANAGEMENT SYSTEM - ADMIN LOAN MANAGEMENT JS
 * File: webapp/assets/js/adminLoan.js
 *
 * Read-only oversight page for admins. Approve/reject stays with
 * employees (employee/loans.jsp) -- this page only lists and
 * lets the admin drill into a loan's assessment + EMI schedule.
 *
 * Matches:
 *   GET /api/loans
 *   GET /api/loans/{loanId}/assessment
 *   GET /api/loan-emis/loan/{loanId}
 */

// Same dynamic backend detection pattern as admindashboard.js,
// but pointed at the real /api root (LoanController is mapped
// at /api/loans, not /api/admin/loans).
const LOAN_BACKEND_PORT = '8082';
const LOAN_API_ROOT = window.location.port === LOAN_BACKEND_PORT
    ? '/api'
    : `http://localhost:${LOAN_BACKEND_PORT}/api`;

let allLoansData = [];

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('loan-table-body')) {
        fetchAllLoans();
    }
});

/* =========================================================
   FETCH + STATS
   ========================================================= */

async function fetchAllLoans() {
    const tbody = document.getElementById('loan-table-body');
    if (!tbody) return;

    tbody.innerHTML = `
        <tr>
            <td colspan="10" style="text-align:center; padding:24px; color:#64748b;">
                <i class="fa-solid fa-spinner fa-spin"></i> Connecting to ${LOAN_API_ROOT}/loans...
            </td>
        </tr>`;

    try {
        const response = await fetch(`${LOAN_API_ROOT}/loans`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });

        const text = await response.text();
        const data = text ? JSON.parse(text) : [];

        if (!response.ok) {
            throw new Error((data && (data.message || data.error)) || 'Unable to load loans.');
        }

        allLoansData = Array.isArray(data) ? data : [];
        updateLoanStats(allLoansData);
        renderLoansTable(allLoansData);

    } catch (error) {
        console.error('Fetch loans error:', error);
        tbody.innerHTML = `
            <tr>
                <td colspan="10" style="text-align:center; padding:24px; color:#ef4444;">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    ${escapeHtml(error.message)}
                </td>
            </tr>`;
    }
}

function updateLoanStats(loans) {
    const byStatus = status =>
        loans.filter(l => String(l.status || '').toUpperCase() === status);

    const pending = byStatus('PENDING').length;
    const active = byStatus('ACTIVE').length + byStatus('APPROVED').length;
    const rejected = byStatus('REJECTED').length;

    const disbursed = loans.reduce((sum, l) => {
        const approved = Number(l.approvedAmount);
        return sum + (Number.isFinite(approved) ? approved : 0);
    }, 0);

    const outstanding = loans.reduce((sum, l) => {
        const totalPayable = Number(l.totalPayable);
        if (!Number.isFinite(totalPayable)) return sum;
        // Approximation without pulling every EMI schedule:
        // outstanding = totalPayable - (emiAmount * completed months so far).
        // We don't know completed months here, so for closed/rejected
        // loans there is nothing outstanding, and for the rest we show
        // the full payable amount minus nothing already paid (safe upper bound).
        const status = String(l.status || '').toUpperCase();
        if (status === 'CLOSED' || status === 'REJECTED' || status === 'PENDING') return sum;
        return sum + totalPayable;
    }, 0);

    setText('stat-total-loans', loans.length);
    setText('stat-pending-loans', pending);
    setText('stat-active-loans', active);
    setText('stat-rejected-loans', rejected);
    setText('stat-disbursed-amount', formatCurrency(disbursed));
    setText('stat-outstanding-amount', formatCurrency(outstanding));
}

/* =========================================================
   TABLE RENDER + FILTER/SEARCH
   ========================================================= */

function renderLoansTable(loans) {
    const tbody = document.getElementById('loan-table-body');
    if (!tbody) return;

    if (!loans.length) {
        tbody.innerHTML = `
            <tr>
                <td colspan="10" style="text-align:center; padding:24px; color:#64748b;">
                    <i class="fa-solid fa-folder-open"></i> No loan applications found.
                </td>
            </tr>`;
        setText('loan-showing-count', 'Showing 0 loans');
        return;
    }

    tbody.innerHTML = loans.map(loan => {
        const status = String(loan.status || 'PENDING').toUpperCase();
        return `
            <tr>
                <td><strong>#${escapeHtml(loan.loanId ?? '-')}</strong></td>
                <td>#${escapeHtml(loan.customerId ?? '-')}</td>
                <td>${formatLoanType(loan.loanType)}</td>
                <td>${formatCurrency(loan.requestedAmount)}</td>
                <td>${formatCurrency(loan.approvedAmount)}</td>
                <td>${loan.interestRate != null ? loan.interestRate + '%' : '-'}</td>
                <td>${formatCurrency(loan.emiAmount)}</td>
                <td>${formatDate(loan.applicationDate)}</td>
                <td><span class="status-badge ${statusClass(status)}">${escapeHtml(status)}</span></td>
                <td>
                    <div class="action-btns">
                        <button class="action-btn btn-view" title="View details"
                                onclick="openLoanDetailModal(${Number(loan.loanId)})">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
    }).join('');

    setText('loan-showing-count', `Showing ${loans.length} loan${loans.length === 1 ? '' : 's'}`);
}

function filterLoansTable() {
    const query = (document.getElementById('loanSearchInput')?.value || '').trim().toLowerCase();
    const statusFilter = document.getElementById('loanStatusFilter')?.value || '';
    const typeFilter = document.getElementById('loanTypeFilter')?.value || '';

    let filtered = [...allLoansData];

    if (statusFilter) {
        filtered = filtered.filter(l => String(l.status || '').toUpperCase() === statusFilter);
    }

    if (typeFilter) {
        filtered = filtered.filter(l => String(l.loanType || '').toUpperCase() === typeFilter);
    }

    if (query) {
        filtered = filtered.filter(l =>
            String(l.loanId ?? '').toLowerCase().includes(query) ||
            String(l.customerId ?? '').toLowerCase().includes(query)
        );
    }

    renderLoansTable(filtered);
}

/* =========================================================
   READ-ONLY DETAIL MODAL (Application + Assessment + EMI)
   ========================================================= */

async function openLoanDetailModal(loanId) {
    const modal = document.getElementById('loan-detail-modal');
    if (!modal) return;

    const loan = allLoansData.find(l => Number(l.loanId) === Number(loanId));
    if (!loan) return;

    setText('loan-modal-title', `Loan #${loan.loanId} - ${formatLoanType(loan.loanType)}`, true);

    renderApplicationDetails(loan);

    const assessmentBox = document.getElementById('loan-detail-assessment');
    const emiBox = document.getElementById('loan-detail-emi');

    assessmentBox.innerHTML = `<div class="loan-empty-note"><i class="fa-solid fa-spinner fa-spin"></i> Loading assessment...</div>`;
    emiBox.innerHTML = `<div class="loan-empty-note"><i class="fa-solid fa-spinner fa-spin"></i> Loading EMI schedule...</div>`;

    modal.classList.add('active');

    await Promise.all([
        loadAssessmentSummary(loanId),
        loadEmiSummary(loanId)
    ]);
}

function renderApplicationDetails(loan) {
    const container = document.getElementById('loan-detail-application');
    if (!container) return;

    const status = String(loan.status || '-').toUpperCase();

    container.innerHTML = [
        detailItem('Loan ID', '#' + (loan.loanId ?? '-')),
        detailItem('Customer ID', '#' + (loan.customerId ?? '-')),
        detailItem('Loan Type', formatLoanType(loan.loanType)),
        detailItem('Status', `<span class="status-badge ${statusClass(status)}">${escapeHtml(status)}</span>`),
        detailItem('Requested Amount', formatCurrency(loan.requestedAmount)),
        detailItem('Approved Amount', formatCurrency(loan.approvedAmount)),
        detailItem('Interest Rate', loan.interestRate != null ? loan.interestRate + '%' : '-'),
        detailItem('Tenure', loan.tenureMonths != null ? loan.tenureMonths + ' Months' : '-'),
        detailItem('EMI Amount', formatCurrency(loan.emiAmount)),
        detailItem('Total Payable', formatCurrency(loan.totalPayable)),
        detailItem('Application Date', formatDate(loan.applicationDate)),
        detailItem('Approval Date', formatDate(loan.approvalDate)),
        detailItem('Purpose', escapeHtml(loan.purpose || '-')),
        detailItem('Rejection Reason', escapeHtml(loan.rejectionReason || '-'))
    ].join('');
}

function detailItem(label, value) {
    return `
        <div class="loan-detail-item">
            <span>${escapeHtml(label)}</span>
            <strong>${value}</strong>
        </div>`;
}

async function loadAssessmentSummary(loanId) {
    const box = document.getElementById('loan-detail-assessment');
    if (!box) return;

    try {
        const response = await fetch(`${LOAN_API_ROOT}/loans/${loanId}/assessment`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });

        if (response.status === 404 || response.status === 500) {
            box.innerHTML = `<div class="loan-empty-note">No assessment has been created for this loan yet.</div>`;
            return;
        }

        const text = await response.text();
        const a = text ? JSON.parse(text) : null;

        if (!response.ok || !a) {
            box.innerHTML = `<div class="loan-empty-note">No assessment has been created for this loan yet.</div>`;
            return;
        }

        box.innerHTML = `
            <div class="loan-detail-grid">
                ${detailItem('Monthly Income', formatCurrency(a.monthlyIncome))}
                ${detailItem('Debt To Income', a.debtToIncome != null ? a.debtToIncome + '%' : '-')}
                ${detailItem('Repayment Capacity', escapeHtml(a.repaymentCapacity || '-'))}
                ${detailItem('Background Check', escapeHtml(a.backgroundCheck || '-'))}
                ${detailItem('Risk Score', a.riskScore ?? '-')}
                ${detailItem('Risk Category', escapeHtml(a.riskCategory || '-'))}
            </div>`;

    } catch (error) {
        box.innerHTML = `<div class="loan-empty-note">No assessment has been created for this loan yet.</div>`;
    }
}

async function loadEmiSummary(loanId) {
    const box = document.getElementById('loan-detail-emi');
    if (!box) return;

    try {
        const response = await fetch(`${LOAN_API_ROOT}/loan-emis/loan/${loanId}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });

        const text = await response.text();
        const emis = text ? JSON.parse(text) : [];

        if (!response.ok || !Array.isArray(emis) || emis.length === 0) {
            box.innerHTML = `<div class="loan-empty-note">No EMI schedule yet (loan is not active).</div>`;
            return;
        }

        const paidCount = emis.filter(e => String(e.status).toUpperCase() === 'PAID').length;
        const pct = Math.round((paidCount / emis.length) * 100);

        const rows = emis.map(e => `
            <tr>
                <td>${e.emiNumber ?? '-'}</td>
                <td>${formatDate(e.dueDate)}</td>
                <td>${formatCurrency(e.emiAmount)}</td>
                <td><span class="status-badge ${statusClass(String(e.status || '').toUpperCase())}">${escapeHtml(e.status || '-')}</span></td>
            </tr>`).join('');

        box.innerHTML = `
            <div class="emi-progress-wrap">
                <div class="emi-progress-bar"><div class="emi-progress-fill" style="width:${pct}%;"></div></div>
                <span class="emi-progress-text">${paidCount}/${emis.length} paid (${pct}%)</span>
            </div>
            <div class="loan-mini-table-wrapper">
                <table class="loan-mini-table">
                    <thead>
                        <tr><th>#</th><th>Due Date</th><th>Amount</th><th>Status</th></tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>`;

    } catch (error) {
        box.innerHTML = `<div class="loan-empty-note">No EMI schedule yet (loan is not active).</div>`;
    }
}

function closeLoanDetailModal() {
    const modal = document.getElementById('loan-detail-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

window.addEventListener('click', (event) => {
    const modal = document.getElementById('loan-detail-modal');
    if (modal && event.target === modal) closeLoanDetailModal();
});

/* =========================================================
   HELPERS
   ========================================================= */

function statusClass(status) {
    switch (status) {
        case 'PENDING': return 'status-pending';
        case 'APPROVED':
        case 'ACTIVE': return 'status-active-loan';
        case 'REJECTED': return 'status-rejected';
        case 'CLOSED': return 'status-closed';
        case 'OVERDUE': return 'status-overdue';
        case 'PAID': return 'status-active-loan';
        default: return 'status-pending';
    }
}

function formatLoanType(type) {
    const types = {
        PERSONAL: 'Personal Loan',
        HOME: 'Home Loan',
        EDUCATION: 'Education Loan',
        CAR: 'Car Loan',
        BUSINESS: 'Business Loan'
    };
    const key = String(type || '').toUpperCase();
    return escapeHtml(types[key] || type || '-');
}

function formatCurrency(value) {
    if (value === null || value === undefined || value === '') return '—';
    const number = Number(value);
    if (!Number.isFinite(number)) return '—';
    return number.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2
    });
}

function formatDate(value) {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return escapeHtml(String(value));
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

function escapeHtml(value) {
    if (value === null || value === undefined) return '';
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}