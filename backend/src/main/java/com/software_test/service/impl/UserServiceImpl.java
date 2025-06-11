package com.software_test.service.impl;

import com.software_test.service.UserService;
import org.springframework.stereotype.Service;

import com.software_test.pojo.UserResponse;
import org.springframework.web.multipart.MultipartFile;
@Service
public class UserServiceImpl implements UserService  {

    @Override
    public UserResponse updatePostByAccountAndId(String account, Long postId, String title, String content) {
        // TODO
        UserResponse userResponse = new UserResponse();
        return userResponse;
    }

    @Override
    public UserResponse deletePostByAccountAndId(String account, Long postId) {
        // TODO 
        UserResponse userResponse = new UserResponse();
        return userResponse;
    }

    @Override
    public UserResponse getMainPagePostsByAccount(String account) {
        // TODO 
        UserResponse userResponse = new UserResponse();
        return userResponse;
    }

    @Override
    public UserResponse getSelfPageInfo(String account) {
        // TODO: 实际应查数据库获取用户信息
        UserResponse userResponse = new UserResponse();
        return userResponse;
    }

    @Override
    public UserResponse updateSelfInfo(String account, String user_name, String email, MultipartFile resume, MultipartFile image) {
        // 1. 保存文件到本地或云存储，获取文件URL或路径
        // 2. 更新数据库用户信息
        UserResponse userResponse = new UserResponse();
        return userResponse;
    }

}
