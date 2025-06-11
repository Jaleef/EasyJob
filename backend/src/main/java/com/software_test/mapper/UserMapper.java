package com.software_test.mapper;

import com.software_test.pojo.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * User表的Mapper接口
 */
@Mapper
public interface UserMapper {

    // 插入用户
    @Insert("INSERT INTO user (name, username, password, create_time, update_time, phone, gender, company, job) " +
            "VALUES (#{name}, #{username}, #{password}, #{createTime}, #{updateTime}, #{phone}, #{gender}, #{company}, #{job})")
    int insertUser(User user);

    // 根据ID删除用户
    @Delete("DELETE FROM user WHERE id = #{id}")
    int deleteUserById(Integer id);

    // 更新用户信息
    @Update("UPDATE user SET name=#{name}, username=#{username}, password=#{password}, create_time=#{createTime}, " +
            "update_time=#{updateTime}, phone=#{phone}, gender=#{gender}, company=#{company}, job=#{job} WHERE id=#{id}")
    int updateUser(User user);

    // 根据ID查询用户
    @Select("SELECT * FROM user WHERE id = #{id}")
    User selectUserById(Integer id);

    // 查询所有用户
    @Select("SELECT * FROM user")
    List<User> selectAllUsers();

    // 根据用户名查询用户（常用于登录）
    @Select("SELECT * FROM user WHERE username = #{username}")
    User selectUserByUsername(String username);
}