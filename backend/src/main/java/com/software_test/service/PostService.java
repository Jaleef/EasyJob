package com.software_test.service;

import com.software_test.pojo.PostResponse;

public interface PostService {
    PostResponse getMainPagePosts();
    PostResponse getPostDetailById(Long id);
    PostResponse savePost(String title, String content);
    PostResponse getMainPagePostsByAccount(String account);

} 
