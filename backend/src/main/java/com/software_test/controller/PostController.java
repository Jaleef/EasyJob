package com.software_test.controller;

import com.software_test.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import com.software_test.pojo.Result;
import java.util.Map;

@RestController
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping("/home")
    public Result getMainPage(@RequestParam(value = "account", required = false) String account) {
        // 如果account为null，返回所有帖子；否则返回该账号下的帖子
        Result result = Result.success(postService.getMainPagePostsByAccount(account));
        return result;
    }

    @GetMapping("/home/{id}")
    public Result getPostDetail(@PathVariable("id") Long id) {
        Result result = Result.success(postService.getPostDetailById(id));
        return result;
    }

    @PostMapping("/home/upload")
    public Result uploadPost(@RequestBody Map<String, String> params) {
        String title = params.get("title");
        String content = params.get("content");
        Result result = Result.success(postService.savePost(title, content));
        return result;
    }



}
