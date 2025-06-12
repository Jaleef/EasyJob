package com.software_test.mapper;

import com.software_test.pojo.User;
import org.apache.ibatis.annotations.*;

/**
 * User表的Mapper接口
 */
@Mapper
public interface UserMapper {

    
    @Update("""
        UPDATE posts 
        SET title = #{title}, content = #{content} 
        WHERE post_id = #{postId} AND user_id = (
            SELECT user_id FROM users WHERE account_id = (
                SELECT id FROM accounts WHERE account = #{account}
            )
        )
    """)
    int updatePostByAccountAndId(@Param("account") String account, @Param("postId") Long postId, 
                                @Param("title") String title, @Param("content") String content);

    // 根据账号和帖子ID删除帖子
    @Delete("""
        DELETE FROM posts 
        WHERE post_id = #{postId} AND user_id = (
            SELECT user_id FROM users WHERE account_id = (
                SELECT id FROM accounts WHERE account = #{account}
            )
        )
    """)
    int deletePostByAccountAndId(@Param("account") String account, @Param("postId") Long postId);


    // 根据账号获取用户信息
    @Select("""
        SELECT * FROM users WHERE account_id = (
            SELECT id FROM accounts WHERE account = #{account}
        )
    """)
    User selectSelfPageInfo(@Param("account") String account);


    // 更新用户个人信息
        @Update("""
        UPDATE users 
        SET user_name = #{user_name}, email = #{email}, user_img = #{user_img}, resume_path = #{resume_path} 
        WHERE account_id = (
            SELECT id FROM accounts WHERE account = #{account}
        )
    """)
    int updateSelfInfo(@Param("account") String account, @Param("user_name") String user_name, 
                    @Param("email") String email, @Param("user_img") String user_img, 
                    @Param("resume_path") String resume_path);

}