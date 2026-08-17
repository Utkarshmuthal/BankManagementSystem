/**
 * BANK MANAGEMENT SYSTEM - ADMIN DASHBOARD & EMPLOYEE MANAGEMENT JS
 * File: webapp/assets/js/admindashboard.js
 */

// DYNAMICALLY DETECT BACKEND URL (Supports same server & separate Tomcat/Spring Boot server)
const BACKEND_PORT = '8082'; // Change to your Spring Boot port if different
const API_BASE_URL = window.location.port === BACKEND_PORT 
    ? '/api/admin' 
    : `http://localhost:${BACKEND_PORT}/api/admin`;

let editingEmployeeId = null;

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('employee-table-body')) {
        setupEmployeeTableActions();
        fetchEmployees();
    }
});

async function fetchEmployees() {
    const tableBody = document.getElementById('employee-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = `
        <tr>
            <td colspan="10" style="text-align: center; padding: 24px; color: #64748b;">
                <i class="fa-solid fa-spinner fa-spin" style="font-size: 20px; margin-right: 8px;"></i> Connecting to ${API_BASE_URL}/employees...
            </td>
        </tr>`;

    try {
        const response = await fetch(`${API_BASE_URL}/employees`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        const employeesList = result.data ? result.data : (Array.isArray(result) ? result : []);

        renderEmployeesTable(employeesList);
        updateEmployeeStats(employeesList);

    } catch (error) {
        console.error('Error connecting to backend API:', error);
        tableBody.innerHTML = `
            <tr>
                <td colspan="10" style="text-align: center; padding: 24px; color: #ef4444;">
                    <i class="fa-solid fa-triangle-exclamation"></i> Backend Connection Failed.<br>
                    <small style="color: #64748b; font-size: 11px;">
                        Target: ${API_BASE_URL}/employees<br>
                        Error: ${error.message}. Ensure Spring Boot backend is running & @CrossOrigin is enabled.
                    </small>
                </td>
            </tr>`;
    }
}

function renderEmployeesTable(employees) {
    const tableBody = document.getElementById('employee-table-body');
    const showingCount = document.getElementById('showing-count');
    
    if (showingCount) {
        showingCount.innerText = `Showing ${employees.length} Employee${employees.length !== 1 ? 's' : ''}`;
    }

    if (!employees || employees.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="10" style="text-align: center; padding: 30px; color: #64748b;">
                    No employees found in database. Click <strong>+ Add Employee</strong> to create one.
                </td>
            </tr>`;
        return;
    }

    let rowsHTML = '';
    employees.forEach((emp, index) => {
        const empId = emp.employeeId || emp.id || (index + 1);
        const empCode = emp.employeeCode || `EMP${String(empId).padStart(3, '0')}`;
        const fullName = (emp.firstName || '') + ' ' + (emp.lastName || '');
        const email = emp.email || 'N/A';
        const mobile = emp.mobile || 'N/A';
        const designation = emp.designation || 'N/A';
        const branch = emp.branch || 'Main Branch';
        
        const formattedSalary = emp.salary ? '₹ ' + Number(emp.salary).toLocaleString('en-IN') : '₹ 0';
        
        const isStatusActive = emp.status === 'Active' || emp.status === 'ACTIVE' || emp.active === true || emp.status === true;
        const statusBadgeHTML = isStatusActive 
            ? `<span class="status-badge status-active">Active</span>`
            : `<span class="status-badge status-inactive">Inactive</span>`;

        rowsHTML += `
            <tr>
                <td>${index + 1}</td>
                <td><strong>${empCode}</strong></td>
                <td>${escapeHTML(fullName.trim() || 'N/A')}</td>
                <td>${escapeHTML(email)}</td>
                <td>${escapeHTML(mobile)}</td>
                <td>${escapeHTML(designation)}</td>
                <td>${escapeHTML(branch)}</td>
                <td>${formattedSalary}</td>
                <td>${statusBadgeHTML}</td>
                <td>
                    <div class="action-btns">
                        <button class="action-btn btn-edit" title="Edit Employee"
                                data-action="edit" data-id="${empId}">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button class="action-btn btn-delete" title="Delete Employee"
                                data-action="delete" data-id="${empId}" data-name="${escapeHTML(fullName.trim())}">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                        <button class="action-btn" title="Toggle Status" style="background:#f1f5f9; color:#475569;"
                                data-action="toggle" data-id="${empId}" data-active="${isStatusActive}">
                            <i class="fa-solid fa-power-off"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
    });

    tableBody.innerHTML = rowsHTML;
}

/**
 * ONE delegated click listener for every Edit / Delete / Toggle button.
 * Reads the employee id/name/status from data-* attributes instead of
 * building them into an onclick="..." string - this is what avoids the
 * "name has an apostrophe -> broken JS string -> button does nothing"
 * bug that inline onclick handlers had.
 */
function setupEmployeeTableActions() {
    const tableBody = document.getElementById('employee-table-body');
    if (!tableBody) return;

    tableBody.addEventListener('click', (event) => {
        const btn = event.target.closest('button[data-action]');
        if (!btn) return;

        const action = btn.dataset.action;
        const id = Number(btn.dataset.id);

        if (action === 'edit') {
            openEditEmployeeModal(id);
        } else if (action === 'delete') {
            deleteEmployee(id, btn.dataset.name || '');
        } else if (action === 'toggle') {
            toggleEmployeeStatus(id, btn.dataset.active === 'true');
        }
    });
}

function updateEmployeeStats(employees) {
    const totalEl = document.getElementById('stat-total-employees');
    const activeEl = document.getElementById('stat-active-employees');
    const inactiveEl = document.getElementById('stat-inactive-employees');
    const branchesEl = document.getElementById('stat-total-branches');

    if (!totalEl) return;

    const total = employees.length;
    const activeCount = employees.filter(emp => emp.status === 'Active' || emp.status === 'ACTIVE' || emp.active === true || emp.status === true).length;
    const inactiveCount = total - activeCount;
    const uniqueBranches = new Set(employees.map(e => e.branch).filter(Boolean));

    totalEl.innerText = total;
    if (activeEl) activeEl.innerText = activeCount;
    if (inactiveEl) inactiveEl.innerText = inactiveCount;
    if (branchesEl) branchesEl.innerText = uniqueBranches.size || 1;
}

function openAddEmployeeModal() {
    editingEmployeeId = null;
    document.getElementById('modal-title').innerText = 'Add New Employee';
    document.getElementById('employee-form').reset();
    
    const passwordGroup = document.getElementById('password-group');
    if (passwordGroup) {
        passwordGroup.style.display = 'block';
        document.getElementById('password').required = true;
    }

    const modal = document.getElementById('employee-modal');
    if (modal) modal.classList.add('active');
}

async function openEditEmployeeModal(employeeId) {
    editingEmployeeId = employeeId;
    document.getElementById('modal-title').innerText = 'Edit Employee Details';
    
    const passwordGroup = document.getElementById('password-group');
    if (passwordGroup) {
        passwordGroup.style.display = 'none';
        document.getElementById('password').required = false;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/employees/${employeeId}`);
        if (!response.ok) throw new Error('Failed to fetch employee details');

        const result = await response.json();
        const emp = result.data ? result.data : result;

        document.getElementById('firstName').value = emp.firstName || '';
        document.getElementById('lastName').value = emp.lastName || '';
        document.getElementById('email').value = emp.email || '';
        document.getElementById('mobile').value = emp.mobile || '';
        document.getElementById('designation').value = emp.designation || '';
        document.getElementById('salary').value = emp.salary || '';
        document.getElementById('branch').value = emp.branch || '';

        const modal = document.getElementById('employee-modal');
        if (modal) modal.classList.add('active');

    } catch (error) {
        console.error('Error loading employee for edit:', error);
        alert('Could not fetch employee details from server.');
    }
}

function closeEmployeeModal() {
    const modal = document.getElementById('employee-modal');
    if (modal) modal.classList.remove('active');
}

async function handleSaveEmployee(event) {
    event.preventDefault();

    const submitBtn = document.getElementById('btn-save-employee');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Saving...`;

    const payload = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        mobile: document.getElementById('mobile').value.trim(),
        designation: document.getElementById('designation').value.trim(),
        salary: parseFloat(document.getElementById('salary').value) || 0,
        branch: document.getElementById('branch').value.trim()
    };

    if (!editingEmployeeId) {
        payload.password = document.getElementById('password').value;
    }

    const url = editingEmployeeId 
        ? `${API_BASE_URL}/employees/${editingEmployeeId}`
        : `${API_BASE_URL}/employees`;

    const method = editingEmployeeId ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok && (result.status === true || response.status === 200 || response.status === 201)) {
            closeEmployeeModal();
            fetchEmployees();
            alert(editingEmployeeId ? 'Employee updated successfully!' : 'Employee created successfully!');
        } else {
            alert(result.message || 'Operation failed. Please check backend logs.');
        }

    } catch (error) {
        console.error('Error saving employee:', error);
        alert('Failed to connect to backend server: ' + error.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

async function deleteEmployee(employeeId, employeeName) {
    if (!confirm(`Are you sure you want to delete employee "${employeeName}"?`)) return;

    try {
        const response = await fetch(`${API_BASE_URL}/employees/${employeeId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchEmployees();
            alert('Employee deleted successfully!');
        } else {
            const result = await response.json();
            alert(result.message || 'Failed to delete employee.');
        }
    } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Server error while deleting employee.');
    }
}

async function toggleEmployeeStatus(employeeId, currentIsActive) {
    const newStatus = currentIsActive ? 'INACTIVE' : 'ACTIVE';
    
    try {
        const response = await fetch(`${API_BASE_URL}/employees/${employeeId}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });

        if (response.ok) {
            fetchEmployees();
        } else {
            const result = await response.json();
            alert(result.message || 'Failed to update status.');
        }
    } catch (error) {
        console.error('Error updating status:', error);
        alert('Server error while updating status.');
    }
}

function filterEmployeesTable(query) {
    const trs = document.querySelectorAll('#employee-table-body tr');
    const filterVal = query.toLowerCase();
    trs.forEach(tr => {
        const text = tr.innerText.toLowerCase();
        tr.style.display = text.includes(filterVal) ? '' : 'none';
    });
}

function escapeHTML(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        if (confirm("Are you sure you want to logout?")) {

            // Remove stored login details
            sessionStorage.removeItem("userId");
            sessionStorage.removeItem("role");

            // Or clear all session storage
            // sessionStorage.clear();

            // Go to login page
            window.location.href = "../login.jsp";

        }

    });

}
