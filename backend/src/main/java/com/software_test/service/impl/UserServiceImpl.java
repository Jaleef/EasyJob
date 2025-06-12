package com.software_test.service.impl;

import com.software_test.service.UserService;
import com.software_test.pojo.UserResponse;
import com.software_test.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public UserResponse updatePostByAccountAndId(String account, Long postId, String title, String content) {
        userMapper.updatePostByAccountAndId(account, postId, title, content);
        // 可根据实际需求返回更新后的帖子信息
        return new UserResponse();
    }

    @Override
    public UserResponse deletePostByAccountAndId(String account, Long postId) {
        userMapper.deletePostByAccountAndId(account, postId);
        // 可根据实际需求返回删除结果
        return new UserResponse();
    }

    @Override
    public UserResponse getMainPagePostsByAccount(String account) {
        // 假设数据库返回的是用户信息（如有帖子列表需求建议单独定义返回类型）
        com.software_test.pojo.User user = userMapper.selectSelfPageInfo(account);
        if (user == null) {
            return new UserResponse();
        }
        UserResponse response = new UserResponse();
        response.account = account;
        response.user_name = user.getName();
        response.email = user.getUsername(); // 如有 email 字段请替换为 user.getEmail()
        response.user_img = ""; // 如有头像字段请补全
        return response;
    }

    @Override
    public UserResponse getSelfPageInfo(String account) {
        com.software_test.pojo.User user = userMapper.selectSelfPageInfo(account);
        if (user == null) {
            return new UserResponse();
        }
        UserResponse response = new UserResponse();
        response.account = account;
        response.user_name = user.getName();
        response.email = user.getUsername(); // 如有 email 字段请替换为 user.getEmail()
        response.user_img = ""; // 如有头像字段请补全
        return response;
    }

    @Override
    public UserResponse updateSelfInfo(String account, String user_name, String email, MultipartFile resume, MultipartFile image) {
        String user_img = "";
        String resume_path = "";

        try {
            // 1. 保存图片
            if (image != null && !image.isEmpty()) {
                String imgDir = "uploads/images/";
                String imgName = account + "_" + System.currentTimeMillis() + "_" + image.getOriginalFilename();
                java.io.File imgFile = new java.io.File(imgDir + imgName);
                imgFile.getParentFile().mkdirs(); // 确保目录存在
                image.transferTo(imgFile);
                user_img = imgDir + imgName;
            }

            // 2. 保存简历
            if (resume != null && !resume.isEmpty()) {
                String resumeDir = "uploads/resumes/";
                String resumeName = account + "_" + System.currentTimeMillis() + "_" + resume.getOriginalFilename();
                java.io.File resumeFile = new java.io.File(resumeDir + resumeName);
                resumeFile.getParentFile().mkdirs(); // 确保目录存在
                resume.transferTo(resumeFile);
                resume_path = resumeDir + resumeName;
            }
        } catch (Exception e) {
            // 发生异常时可记录日志并返回错误
            e.printStackTrace();
            throw new RuntimeException("文件保存失败");
        }

        // 更新数据库
        userMapper.updateSelfInfo(account, user_name, email, user_img, resume_path);

        // 返回结果
        UserResponse response = new UserResponse();
        response.account = account;
        response.user_name = user_name;
        response.email = email;
        response.user_img = user_img;
        return response;
    }
}
