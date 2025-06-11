package com.software_test.mapper;

import com.software_test.pojo.Account;
import org.apache.ibatis.annotations.*;
import java.util.List;

/**
 * Account表的Mapper接口
 */
@Mapper
public interface AccountMapper {

    // 插入账户
    @Insert("INSERT INTO account (accunt, password, u_id) VALUES (#{accunt}, #{password}, #{uId})")
    int insertAccount(Account account);

    // 根据ID删除账户
    @Delete("DELETE FROM account WHERE id = #{id}")
    int deleteAccountById(Integer id);

    // 更新账户信息
    @Update("UPDATE account SET accunt=#{accunt}, password=#{password}, u_id=#{uId} WHERE id=#{id}")
    int updateAccount(Account account);

    // 根据ID查询账户
    @Select("SELECT * FROM account WHERE id = #{id}")
    Account selectAccountById(Integer id);

    // 查询所有账户
    @Select("SELECT * FROM account")
    List<Account> selectAllAccounts();

    // 根据账号查询账户（可用于登录等场景）
    @Select("SELECT * FROM account WHERE account = #{account}")
    Account getAccount(String account);
}
