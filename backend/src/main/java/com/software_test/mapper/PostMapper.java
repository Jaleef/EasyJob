package com.software_test.mapper;

import com.software_test.pojo.PostResponse;
import org.apache.ibatis.annotations.Param;
import java.util.List;

// 帖子表的Mapper接口
public interface PostMapper {
    // 查询所有帖子
    List<PostResponse> selectAllPosts();

    // 根据账号查询该用户的所有帖子
    List<PostResponse> selectPostsByAccount(@Param("account") String account);

    // 根据帖子ID查询帖子详情
    PostResponse selectPostDetailById(@Param("id") Long id);

    // 新增帖子
    int insertPost(@Param("title") String title, @Param("content") String content);
}
