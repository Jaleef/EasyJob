package com.software_test.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    public  String account;
    public  String user_name;
    public  String email;
    public  String user_img;
}
