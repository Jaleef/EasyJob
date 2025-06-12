package com.software_test.mapper;

import com.software_test.pojo.Account;
import org.apache.ibatis.annotations.*;
import java.util.List;

/**
 * Account表的Mapper接口
 */
@Mapper
public interface AccountMapper {
    // 根据账号查找用户
    Account selectByAccount(@Param("account") String account);

    // 插入新用户
    int insertAccount(Account account);

}
