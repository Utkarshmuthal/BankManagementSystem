package com.bank.repositoryImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.dao.EmptyResultDataAccessException;
import com.bank.entity.User;
import com.bank.repository.UserRepository;
import com.bank.query.UserQueries;

@Repository
public class UserRepositoryImpl implements UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

     @Override
    public Long save(User user) {

        return jdbcTemplate.queryForObject(

                UserQueries.SAVE_USER,

                Long.class,

                user.getEmail(),
                user.getPassword(),
                user.getRole(),
                user.getStatus()
        );
    }

    @Override
    public void updateEmail(Long userId, String email) {

        jdbcTemplate.update(
                UserQueries.UPDATE_EMAIL,
                email,
                userId
        );
    }

    @Override
    public void delete(Long userId) {

        jdbcTemplate.update(
                UserQueries.DELETE_USER,
                userId
        );
    }

    @Override
    public void updateStatus(Long userId, String status) {

        jdbcTemplate.update(
                UserQueries.UPDATE_STATUS,
                status,
                userId
        );
    }

    @Override
    public Long registerCustomerUser(User user) {

        return jdbcTemplate.queryForObject(

                UserQueries.REGISTER_CUSTOMER_USER,

                Long.class,

                user.getEmail(),
                user.getPassword(),
                user.getRole(),
                user.getStatus()
        );
    }

    @Override
    public int updateUserStatus(Long userId, String status) {

        return jdbcTemplate.update(

                UserQueries.UPDATE_USER_STATUS,

                status,
                userId
        );
    }

    @Override
    public Long findCustomerIdByUserId(Long userId) {

        try {

            return jdbcTemplate.queryForObject(
                    UserQueries.FIND_CUSTOMER_ID_BY_USER_ID,
                    Long.class,
                    userId
            );

        } catch (Exception e) {

            return null;
        }
    }

    @Override
    public Long findEmployeeIdByUserId(Long userId) {

        try {

            return jdbcTemplate.queryForObject(
                    UserQueries.FIND_EMPLOYEE_ID_BY_USER_ID,
                    Long.class,
                    userId
            );

        } catch (Exception e) {

            return null;
        }
    }

    @Override
    public void updatePassword(Long userId, String password) {

        jdbcTemplate.update(

                UserQueries.UPDATE_PASSWORD,

                password,
                userId
        );
    }
    @Override
    public User findById(Long userId) {

        try {

            return jdbcTemplate.queryForObject(

                    UserQueries.FIND_USER_BY_ID,

                    new Object[]{userId},

                    (rs, rowNum) -> {

                        User user = new User();

                        user.setId(
                                rs.getLong("id")
                        );

                        user.setEmail(
                                rs.getString("email")
                        );

                        user.setPassword(
                                rs.getString("password")
                        );

                        user.setRole(
                                rs.getString("role")
                        );

                        user.setStatus(
                                rs.getString("status")
                        );

                        return user;
                    }
            );

        } catch (Exception e) {

            return null;
        }
    }
    @Override
    public User findByEmail(String email) {

        try {
            return jdbcTemplate.queryForObject(
                UserQueries.FIND_USER_BY_EMAIL,
                new Object[]{email},
                (rs, rowNum) -> {

                    User user = new User();

                    user.setId(rs.getLong("id"));
                    user.setEmail(rs.getString("email"));
                    user.setPassword(rs.getString("password"));
                    user.setRole(rs.getString("role"));
                    user.setStatus(rs.getString("status"));

                    return user;
                }
            );

        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
    @Override
    public boolean existsByEmail(String email) {

        String sql = """
                SELECT COUNT(*)
                FROM users
                WHERE LOWER(email) = LOWER(?)
                """;

        Integer count = jdbcTemplate.queryForObject(
                sql,
                Integer.class,
                email
        );

        return count != null && count > 0;
    }
    
}