package com.software_test.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    private Long id;                // 主键
    private Long userId;            // 用户ID
    private LocalDateTime createTime; // 创建时间
    private LocalDateTime updateTime; // 更新时间
    private String name;            // 名称
    private String text;            // 内容
    private String job;             // 职位
    private LocalDateTime begin;    // 开始时间
    private LocalDateTime end;      // 结束时间
}
