package com.software_test.service.impl;

import com.software_test.pojo.PostResponse;
import com.software_test.service.PostService;
import com.software_test.mapper.PostMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service    
public class PostServiceImpl implements PostService {

    @Autowired
    private PostMapper postMapper;

    @Override
    public PostResponse getMainPagePosts() {
        List<PostResponse> posts = postMapper.selectAllPosts();
        PostResponse response = new PostResponse();
        response.posts = posts;
        return response;
    }

    @Override
    public PostResponse getPostDetailById(Long id) {
        return postMapper.selectPostDetailById(id);
    }

    @Override
    public PostResponse savePost(String title, String content) {
        postMapper.insertPost(title, content);
        // 可根据实际需求返回新建的帖子详情或空对象
        return new PostResponse();
    }

    @Override
    public PostResponse getMainPagePostsByAccount(String account) {
        List<PostResponse> posts = postMapper.selectPostsByAccount(account);
        PostResponse response = new PostResponse();
        response.posts = posts;
        return response;
    }
}
