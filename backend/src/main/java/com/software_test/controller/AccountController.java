package com.software_test.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import com.software_test.pojo.Account;
import com.software_test.service.impl.AccountServiceImpl;
import com.software_test.pojo.Result;

import lombok.extern.slf4j.Slf4j;



@Slf4j
@RestController
public class AccountController {

    @Autowired
    private AccountServiceImpl accountService;

    @PostMapping("/login")
    public Result login(@RequestBody Account account) {
        // 只调用service，具体逻辑交给service处理
        Result result = Result.success(accountService.login(account));
        return result;
    }

    @PostMapping("/register")
    public Result register(@RequestBody Account account) {
        Result result = Result.success(accountService.register(account));
        return result;
    }
}