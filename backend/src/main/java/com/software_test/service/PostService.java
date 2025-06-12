package com.software_test.service;

import com.software_test.pojo.PostResponse;

public interface PostService {
   public PostResponse getMainPagePosts();
    public PostResponse getPostDetailById(Long id);
    public PostResponse savePost(String title, String content);
    public PostResponse getMainPagePostsByAccount(String account);

} 
