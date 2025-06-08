package com.software_test.service;


import org.springframework.web.multipart.MultipartFile;
import com.software_test.pojo.UserResponse;
public interface UserService {

    UserResponse updatePostByAccountAndId(String account, Long postId, String title, String content);
    UserResponse deletePostByAccountAndId(String account, Long postId);  
    UserResponse getMainPagePostsByAccount(String account);
    UserResponse getSelfPageInfo(String account);
    UserResponse updateSelfInfo(String account, String user_name, String email, MultipartFile resume, MultipartFile image);
} 
