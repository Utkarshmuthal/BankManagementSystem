package com.bank.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.dto.response.AdminDashboardResponse;
import com.bank.repository.AdminDashboardRepository;
import com.bank.service.AdminDashboardService;

@Service
public class AdminDashboardServiceImpl
        implements AdminDashboardService {


    @Autowired
    private AdminDashboardRepository adminDashboardRepository;


    @Override
    public AdminDashboardResponse getDashboardData() {

        return adminDashboardRepository.getDashboardData();

    }
}