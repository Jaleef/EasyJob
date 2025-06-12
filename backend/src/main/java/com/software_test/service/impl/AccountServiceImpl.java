package com.software_test.service.impl;

import com.software_test.service.AccountService;
import com.software_test.pojo.Account;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.software_test.pojo.Result;
import com.software_test.pojo.AccountResponse;
import com.software_test.utils.JwtUtil;
import com.software_test.mapper.AccountMapper;
@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountMapper accountMapper;

    @Override
    public Result login(Account account) {
        Account dbAccount = accountMapper.selectByAccount(account.getAccount());
        if (dbAccount == null) {
            return Result.error("账号不存在");
        }
        if (!dbAccount.getPassword().equals(account.getPassword())) {
            return Result.error("密码错误");
        }
        // 登录成功，生成JWT
        AccountResponse response = new AccountResponse();
        response.token = JwtUtil.generateToken(account.getAccount());
        response.tryCount = 1;
        return Result.success(response);
    }

    @Override
    public Result register(Account account) {
        Account dbAccount = accountMapper.selectByAccount(account.getAccount());
        if (dbAccount != null) {
            return Result.error("账号已存在");
        }
        int rows = accountMapper.insertAccount(account);
        if (rows <= 0) {
            return Result.error("注册失败");
        }
        AccountResponse response = new AccountResponse();
        response.token = JwtUtil.generateToken(account.getAccount());
        response.tryCount = 0;
        return Result.success(response);
    }
}
