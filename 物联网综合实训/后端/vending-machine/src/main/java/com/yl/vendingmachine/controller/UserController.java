package com.yl.vendingmachine.controller;

import com.yl.vendingmachine.bean.Administrator;
import com.yl.vendingmachine.bean.User;
import com.yl.vendingmachine.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
public class UserController {
    Date createDate = new Date();
    SimpleDateFormat createDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Autowired
    UserMapper userMapper;

    @RequestMapping("userLogin")
    public void insertUserByOpenid(String openid){
        if(userMapper.getUserCountByOpenid(openid)==0){
            User user=new User();
            user.setOpenid(openid);
            user.setCreateTime(createDateFormat.format(createDate));
            user.setBalance(100);
            userMapper.insertUserByOpenid(user);
        }
    }

    @RequestMapping("adLogin")
    public void insertAdByOpenid(String openid){
        if(userMapper.getAdCountByOpenid(openid)==0){
            Administrator administrator=new Administrator();
            administrator.setOpenid(openid);
            administrator.setCreateTime(createDateFormat.format(createDate));
            userMapper.insertAdByOpenid(administrator);
        }
    }
    @RequestMapping("queryBalance")
    public User getUserByOpenid(String openid){
        return userMapper.getUserByOpenid(openid);
    }
}
