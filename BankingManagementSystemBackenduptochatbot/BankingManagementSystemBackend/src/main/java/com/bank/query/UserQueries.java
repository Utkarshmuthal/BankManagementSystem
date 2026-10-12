package com.bank.query;

public final class UserQueries {

    private UserQueries() {
        // Prevent object creation
    }

    public static final String FIND_USER_BY_EMAIL =
            "SELECT id,email,password,role,status FROM users WHERE email=?";

    public static final String SAVE_USER = """
            INSERT INTO users(email,password,role,status)
            VALUES(?,?,?,?)
            RETURNING id
            """;

    public static final String UPDATE_EMAIL = """
            UPDATE users
            SET email = ?
            WHERE id = ?
            """;

    public static final String DELETE_USER = """
            DELETE FROM users
            WHERE id = ?
            """;

    public static final String UPDATE_STATUS = """
            UPDATE users
            SET status = ?
            WHERE id = ?
            """;

    public static final String REGISTER_CUSTOMER_USER = """
            INSERT INTO users(
                email,
                password,
                role,
                status
            )
            VALUES(?,?,?,?)
            RETURNING id
            """;

    public static final String UPDATE_USER_STATUS = """
            UPDATE users
            SET status=?
            WHERE id=?
            """;

    public static final String FIND_CUSTOMER_ID_BY_USER_ID = """
            SELECT customer_id
            FROM customer_profiles
            WHERE user_id = ?
            """;

    public static final String FIND_EMPLOYEE_ID_BY_USER_ID = """
            SELECT employee_id
            FROM employee
            WHERE user_id = ?
            """;

    public static final String UPDATE_PASSWORD = """
            UPDATE users
            SET password = ?
            WHERE id = ?
            """;
    
    public static final String FIND_USER_BY_ID = """
            SELECT id,
                   email,
                   password,
                   role,
                   status
            FROM users
            WHERE id = ?
            """;
    
    
}