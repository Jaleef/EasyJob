package com.software_test.service.impl;

import com.software_test.pojo.PostResponse;
import com.software_test.service.PostService;

import org.springframework.stereotype.Service;


@Service    
public class PostServiceImpl implements PostService {

    @Override
    public PostResponse   getMainPagePosts() {
        //todo 从数据库获取帖子列表 
        PostResponse postResponse = new PostResponse();
        return postResponse;
    }

    @Override
    public PostResponse getPostDetailById(Long id) {
        // todo: 实际应查数据库
        PostResponse postResponse = new PostResponse();
        return postResponse;
    }

    @Override
    public PostResponse savePost(String title, String content) {
        // todo: 实际应保存到数据库
        PostResponse postResponse = new PostResponse();
        return postResponse;
    }

    @Override
    public PostResponse getMainPagePostsByAccount(String account) {
        // todo: 实际应从数据库获取
        PostResponse postResponse = new PostResponse();
        return postResponse;
    }

}
