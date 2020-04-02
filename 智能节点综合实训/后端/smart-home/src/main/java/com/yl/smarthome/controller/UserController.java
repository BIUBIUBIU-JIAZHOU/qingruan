package com.yl.smarthome.controller;

import com.yl.smarthome.bean.User;
import com.yl.smarthome.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

@RestController
public class UserController {
    private static final String ADMINI="https://crmdfq.cn/img/guanliyuan.png";
    private static final String MEMBER="https://crmdfq.cn/img/chengyuan.png";

    @Autowired
    UserMapper userMapper;
    @RequestMapping("/addMember")
    public void insertMember(String card,String obey,String position,String level){
        User user=new User();
        Date createDate = new Date();
        SimpleDateFormat createDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println(createDateFormat.format(createDate));
        user.setCreateTime(createDateFormat.format(createDate));
        user.setDoorCard(card);
        user.setPosition(position);
        user.setObey(obey);
        user.setLevel(level);
        if(level.equals(0)){
            user.setImg(ADMINI);
        }else{
            user.setImg(MEMBER);
        }
        userMapper.insertMember(user);
    }
    @RequestMapping("/user")
    public int inserUser(String openid,String card){
        User user=new User();
        user.setOpenid(openid);
        user.setDoorCard(card);
        if(userMapper.getCountByCard(card)!=0){
            userMapper.updateUser(user);
            return 1;
        }else{
            return 0;
        }
    }
    @RequestMapping("/queryMyInfo")
    public User getMyInfoByOpenid(String openid){
        return userMapper.getMyInfoByOpenid(openid);
    }
    @RequestMapping("/queryMember")
    public ArrayList<User> getMember(){
        return userMapper.getMember();
    }
    @RequestMapping("/queryCard")
    public String getCardByOpenid(String openid){
        return userMapper.getCardByOpenid(openid);
    }

    @RequestMapping("/deleteMember")
    public void deleteMember(String card){
        userMapper.deleteMember(card);
    }
}
