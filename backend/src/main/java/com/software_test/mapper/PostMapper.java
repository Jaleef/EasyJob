package com.software_test.mapper;

import com.software_test.pojo.PostResponse;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

// 帖子表的Mapper接口
public interface PostMapper {
    // 查询所有帖子
    @Select("SELECT * FROM posts")
    List<PostResponse> selectAllPosts();

    // 根据账号查询用户的帖子
    @Select("""
        SELECT * FROM posts 
        WHERE user_id = (
            SELECT user_id FROM users 
            WHERE account_id = (
                SELECT id FROM accounts WHERE account = #{account}
            )
        )
    """)
    List<PostResponse> selectPostsByAccount(@Param("account") String account);


    // 根据帖子 ID 查询帖子详情
    @Select("SELECT * FROM posts WHERE post_id = #{postId}")
    PostResponse selectPostDetailById(@Param("postId") Long postId);

    // 新增帖子
   @Insert("INSERT INTO posts (title, content) VALUES (#{title}, #{content})")
    int insertPost(@Param("title") String title, @Param("content") String content);
    
   // 更新帖子内容
    @Update("UPDATE posts SET title = #{title}, content = #{content} WHERE post_id = #{postId} AND user_id = #{userId}")
    int updatePostByAccountAndId(@Param("postId") Long postId, @Param("userId") Long userId, @Param("title") String title, @Param("content") String content);
    // 删除帖子
    @Delete("DELETE FROM posts WHERE post_id = #{postId} AND user_id = #{userId}")
    int deletePostByAccountAndId(@Param("postId") Long postId, @Param("userId") Long userId);
}