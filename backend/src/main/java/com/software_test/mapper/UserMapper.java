package com.software_test.mapper;

import com.software_test.pojo.User;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.annotations.Param;

/**
 * User表的Mapper接口
 */
@Mapper
public interface UserMapper {

    // 根据账号和帖子ID更新帖子
    int updatePostByAccountAndId(@Param("account") String account, @Param("postId") Long postId, @Param("title") String title, @Param("content") String content);

    // 根据账号和帖子ID删除帖子
    int deletePostByAccountAndId(@Param("account") String account, @Param("postId") Long postId);

    // 根据账号获取用户信息（用于主页和个人信息页）
    User selectSelfPageInfo(@Param("account") String account);

    // 更新个人信息（含简历、头像路径）
    int updateSelfInfo(@Param("account") String account, @Param("user_name") String user_name, @Param("email") String email, @Param("user_img") String user_img, @Param("resume_path") String resume_path);
}