package com.yl.vendingmachine.mapper;

import com.yl.vendingmachine.bean.Administrator;
import com.yl.vendingmachine.bean.User;

public interface UserMapper {
    public int getUserCountByOpenid(String openid);
    public int getAdCountByOpenid(String openid);

    public void insertUserByOpenid(User user);
    public void insertAdByOpenid(Administrator administrator);

    public User getUserByOpenid(String openid);
}
