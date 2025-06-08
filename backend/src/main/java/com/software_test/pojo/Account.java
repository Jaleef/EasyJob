package com.software_test.pojo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@NoArgsConstructor
@AllArgsConstructor
public class Account {
    private Integer id;           // 主键，无符号整型
    public String account;     // 账号
    private String password;   // 密码
    public String userId;          // 用户ID
    private Date createTime;
    private Date updateTime;  
}
