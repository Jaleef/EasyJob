package com.software_test.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.web.bind.annotation.RestController;

import com.software_test.utils.UserContextUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.Map;

import com.software_test.service.UserService;
import com.software_test.service.PostService;
import com.software_test.pojo.Result;
@RestController
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private PostService postService;

    @GetMapping("/mypost")
    public Result getMyPosts() {
        String account = UserContextUtil.getCurrentAccount();
        // 根据account查询用户信息
        Result result = Result.success(postService.getMainPagePostsByAccount(account));
        return result;
    }

    @PostMapping("/mypost/{id}/change")
    public Result changeMyPost(
        @PathVariable("id") Long postId,
        @RequestBody Map<String, String> params) {
        String account = UserContextUtil.getCurrentAccount();
        String title = params.get("title");
        String content = params.get("content");
        Result result = Result.success(userService.updatePostByAccountAndId(account, postId, title, content));

        return result;
        
    }


    @PostMapping("/mypost/{id}/delete")
    public Result deleteMyPost(@PathVariable("id") Long postId) {
        String account = UserContextUtil.getCurrentAccount();
        Result result = Result.success(userService.deletePostByAccountAndId(account, postId));
        return result;
    }

    @GetMapping("/profile")
    public Result getSelfPage() {
        String account = UserContextUtil.getCurrentAccount();
        Result result = Result.success(userService.getSelfPageInfo(account));
        return result;
    }

    @PostMapping("/profiile/submit")
    public Result submitSelfInfo(
        @RequestParam String account,
        @RequestParam String user_name,
        @RequestParam String email,
        @RequestPart("resume") MultipartFile resume, // PDF文件
        @RequestPart("image") MultipartFile image    // 图片文件
    ) {
        Result result = Result.success(userService.updateSelfInfo(account, user_name, email, resume, image));
        return result;
    }
}
