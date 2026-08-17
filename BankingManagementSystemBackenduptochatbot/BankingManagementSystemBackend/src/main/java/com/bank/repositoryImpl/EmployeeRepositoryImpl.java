package com.bank.repositoryImpl;

import java.util.List;
import com.bank.dto.request.EmployeeProfileUpdateRequest;
import com.bank.dto.response.EmployeeProfileResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.bank.dto.request.EmployeeProfileUpdateRequest;
import com.bank.dto.response.EmployeeProfileResponse;
import com.bank.dto.response.EmployeeResponse;
import com.bank.entity.Employee;
import com.bank.repository.EmployeeRepository;

@Repository
public class EmployeeRepositoryImpl implements EmployeeRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // ==========================
    // Create Employee
    // ==========================
    @Override
    public void save(Employee employee) {

        String sql = """
                INSERT INTO employee
                (user_id,
                 first_name,
                 last_name,
                 mobile,
                 designation,
                 salary,
                 branch)
                VALUES(?,?,?,?,?,?,?)
                """;

        jdbcTemplate.update(
                sql,
                employee.getUserId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getMobile(),
                employee.getDesignation(),
                employee.getSalary(),
                employee.getBranch());
    }

    // ==========================
    // Update Employee
    // ==========================
    @Override
    public void update(Employee employee) {

        String sql = """
                UPDATE employee
                SET first_name=?,
                    last_name=?,
                    mobile=?,
                    designation=?,
                    salary=?,
                    branch=?
                WHERE employee_id=?
                """;

        jdbcTemplate.update(
                sql,
                employee.getFirstName(),
                employee.getLastName(),
                employee.getMobile(),
                employee.getDesignation(),
                employee.getSalary(),
                employee.getBranch(),
                employee.getEmployeeId());
    }

    // ==========================
    // Delete Employee
    // ==========================
    @Override
    public void delete(Long employeeId) {

        String sql = "DELETE FROM employee WHERE employee_id=?";

        jdbcTemplate.update(sql, employeeId);
    }

    // ==========================
    // Search Employee By Id
    // ==========================
   
    @Override
    public Employee findById(Long employeeId) {

        String sql = """
                SELECT employee_id,
                       user_id,
                       first_name,
                       last_name,
                       mobile,
                       designation,
                       salary,
                       branch,
                       profile_image
                FROM employee
                WHERE employee_id=?
                """;

        List<Employee> employees =
                jdbcTemplate.query(

                        sql,

                        new Object[]{employeeId},

                        (rs, rowNum) -> {

                            Employee employee =
                                    new Employee();

                            employee.setEmployeeId(
                                    rs.getLong("employee_id")
                            );

                            employee.setUserId(
                                    rs.getLong("user_id")
                            );

                            employee.setFirstName(
                                    rs.getString("first_name")
                            );

                            employee.setLastName(
                                    rs.getString("last_name")
                            );

                            employee.setMobile(
                                    rs.getString("mobile")
                            );

                            employee.setDesignation(
                                    rs.getString("designation")
                            );

                            employee.setSalary(
                                    rs.getDouble("salary")
                            );

                            employee.setBranch(
                                    rs.getString("branch")
                            );

                            employee.setProfileImage(
                                    rs.getString("profile_image")
                            );

                            return employee;
                        }
                );

        if (employees.isEmpty()) {
            return null;
        }

        return employees.get(0);
    }
    // ==========================
    // View All Employees
    // ==========================
    @Override
    public List<Employee> findAll() {

        String sql = """
                SELECT employee_id,
                       user_id,
                       first_name,
                       last_name,
                       mobile,
                       designation,
                       salary,
                       branch
                FROM employee
                ORDER BY employee_id
                """;

        return jdbcTemplate.query(

                sql,

                (rs, rowNum) -> {

                    Employee employee = new Employee();

                    employee.setEmployeeId(rs.getLong("employee_id"));
                    employee.setUserId(rs.getLong("user_id"));
                    employee.setFirstName(rs.getString("first_name"));
                    employee.setLastName(rs.getString("last_name"));
                    employee.setMobile(rs.getString("mobile"));
                    employee.setDesignation(rs.getString("designation"));
                    employee.setSalary(rs.getDouble("salary"));
                    employee.setBranch(rs.getString("branch"));

                    return employee;

                });

    }

    @Override
    public List<EmployeeResponse> getAllEmployees() {

        String sql = """
            SELECT
                e.employee_id,
                e.user_id,
                e.first_name,
                e.last_name,
                u.email,
                e.mobile,
                e.designation,
                e.salary,
                e.branch,
                u.role,
                u.status
            FROM employee e
            INNER JOIN users u
            ON e.user_id = u.id
            ORDER BY e.employee_id
            """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> {

            EmployeeResponse response = new EmployeeResponse();

            response.setEmployeeId(rs.getLong("employee_id"));
            response.setUserId(rs.getLong("user_id"));
            response.setFirstName(rs.getString("first_name"));
            response.setLastName(rs.getString("last_name"));
            response.setEmail(rs.getString("email"));
            response.setMobile(rs.getString("mobile"));
            response.setDesignation(rs.getString("designation"));
            response.setSalary(rs.getDouble("salary"));
            response.setBranch(rs.getString("branch"));
            response.setRole(rs.getString("role"));
            response.setStatus(rs.getString("status"));

            return response;

        });

    }
    @Override
    public EmployeeResponse getEmployeeById(Long employeeId) {

        String sql = """
            SELECT
                e.employee_id,
                e.user_id,
                e.first_name,
                e.last_name,
                u.email,
                e.mobile,
                e.designation,
                e.salary,
                e.branch,
                u.role,
                u.status
            FROM employee e
            INNER JOIN users u
            ON e.user_id = u.id
            WHERE e.employee_id = ?
            """;

        return jdbcTemplate.queryForObject(

                sql,

                new Object[]{employeeId},

                (rs, rowNum) -> {

                    EmployeeResponse response = new EmployeeResponse();

                    response.setEmployeeId(rs.getLong("employee_id"));
                    response.setUserId(rs.getLong("user_id"));
                    response.setFirstName(rs.getString("first_name"));
                    response.setLastName(rs.getString("last_name"));
                    response.setEmail(rs.getString("email"));
                    response.setMobile(rs.getString("mobile"));
                    response.setDesignation(rs.getString("designation"));
                    response.setSalary(rs.getDouble("salary"));
                    response.setBranch(rs.getString("branch"));
                    response.setRole(rs.getString("role"));
                    response.setStatus(rs.getString("status"));

                    return response;
                });

    }

    @Override
    public EmployeeProfileResponse getEmployeeProfile(Long employeeId) {

        String sql = """
                SELECT
                    e.employee_id,
                    e.user_id,
                    e.first_name,
                    e.last_name,
                    e.mobile,
                    e.designation,
                    e.salary,
                    e.branch,
                    e.profile_image,
                    u.email,
                    u.role,
                    u.status
                FROM employee e
                INNER JOIN users u
                    ON e.user_id = u.id
                WHERE e.employee_id = ?
                """;

        return jdbcTemplate.queryForObject(

                sql,

                new Object[]{employeeId},

                (rs, rowNum) -> {

                    EmployeeProfileResponse response =
                            new EmployeeProfileResponse();

                    response.setEmployeeId(
                            rs.getLong("employee_id")
                    );

                    response.setUserId(
                            rs.getLong("user_id")
                    );

                    response.setFirstName(
                            rs.getString("first_name")
                    );

                    response.setLastName(
                            rs.getString("last_name")
                    );

                    response.setMobile(
                            rs.getString("mobile")
                    );

                    response.setDesignation(
                            rs.getString("designation")
                    );

                    response.setSalary(
                            rs.getDouble("salary")
                    );

                    response.setBranch(
                            rs.getString("branch")
                    );

                    response.setProfileImage(
                            rs.getString("profile_image")
                    );

                    response.setEmail(
                            rs.getString("email")
                    );

                    response.setRole(
                            rs.getString("role")
                    );

                    response.setAccountStatus(
                            rs.getString("status")
                    );

                    return response;
                }
        );
    }

    @Override
    public int updateEmployeeProfile(
            Long employeeId,
            EmployeeProfileUpdateRequest request) {

        String sql = """
                UPDATE employee
                SET first_name = ?,
                    last_name = ?,
                    mobile = ?
                WHERE employee_id = ?
                """;

        return jdbcTemplate.update(
                sql,
                request.getFirstName(),
                request.getLastName(),
                request.getMobile(),
                employeeId
        );
    }

    @Override
    public int updateEmployeeProfileImage(
            Long employeeId,
            String profileImage) {

        String sql = """
                UPDATE employee
                SET profile_image = ?
                WHERE employee_id = ?
                """;

        return jdbcTemplate.update(
                sql,
                profileImage,
                employeeId
        );
    }
}