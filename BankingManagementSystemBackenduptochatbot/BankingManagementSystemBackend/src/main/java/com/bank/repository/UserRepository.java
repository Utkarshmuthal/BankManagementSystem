package com.bank.repository;


import com.bank.entity.User;


public interface UserRepository {


    User findByEmail(String email);
    Long save(User user);
    void updateEmail(Long userId, String email);
    void delete(Long userId);
    void updateStatus(Long userId, String status);
    Long registerCustomerUser(User user);
    int updateUserStatus(Long userId, String status);
    Long findCustomerIdByUserId(Long userId);
    void updatePassword(Long userId, String password);
}