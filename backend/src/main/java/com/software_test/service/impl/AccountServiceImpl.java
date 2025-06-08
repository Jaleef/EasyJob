package com.software_test.service.impl;

import com.software_test.service.AccountService;
import com.software_test.pojo.Account;
import org.springframework.stereotype.Service;


import com.software_test.pojo.Result;
import com.software_test.pojo.AccountResponse;

@Service
public class AccountServiceImpl implements AccountService {



    @Override
    public Result login(Account account) {
        AccountResponse response = new AccountResponse();
        //todo 进行用户登录验证等
        
        return Result.success(response);
    }

    @Override
    public Result register(Account account) {
        AccountResponse response = new AccountResponse();
        //todo 进行用户注册等
        return Result.success(response);
    }

}
