package com.software_test.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostResponse {
    public  String post_id;
    public  String title;
    public  String user_name;
    public  String post_time;
    public  String content;
    public  List<PostResponse> posts;
}
