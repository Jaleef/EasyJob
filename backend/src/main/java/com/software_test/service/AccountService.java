package com.software_test.service;

import com.software_test.pojo.Account;
import com.software_test.pojo.Result;
public interface AccountService {
    public Result login(Account account);
    public Result register(Account account);
}
