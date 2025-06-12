package com.software_test.service;


import org.springframework.web.multipart.MultipartFile;
import com.software_test.pojo.UserResponse;
public interface UserService {

    public UserResponse updatePostByAccountAndId(String account, Long postId, String title, String content);
    public UserResponse deletePostByAccountAndId(String account, Long postId);  
    public UserResponse getMainPagePostsByAccount(String account);
    public UserResponse getSelfPageInfo(String account);
    public UserResponse updateSelfInfo(String account, String user_name, String email, MultipartFile resume, MultipartFile image);
} 
