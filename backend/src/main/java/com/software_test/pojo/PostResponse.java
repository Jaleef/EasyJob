package com.software_test.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostResponse {
    String post_id;
    String title;
    String user_name;
    String post_time;
    String content;
 List<PostResponse> posts;
}
