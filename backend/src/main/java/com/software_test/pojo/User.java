package com.software_test.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 用户信息实体类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Integer id;              // 用户ID
    private String name;             // 姓名
    private String username;         // 用户名
    private String password;         // 密码
    private LocalDateTime createTime;// 创建时间
    private LocalDateTime updateTime;// 更新时间
    private String phone;            // 电话
    private Integer gender;          // 性别（0/1/2等）
    private String company;          // 公司
    private String job;              // 职位
}