package com.yl.smarthome.mapper;

import com.yl.smarthome.bean.User;

import java.util.ArrayList;

public interface UserMapper {
    public void insertMember(User user);

    public int getCountByCard(String card);

    public void updateUser(User user);

    public User getMyInfoByOpenid(String opendi);

    public ArrayList<User> getMember();

    public String getCardByOpenid(String openid);

    public void deleteMember(String card);
}
