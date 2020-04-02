package com.yl.vendingmachine.mapper;

import com.yl.vendingmachine.bean.Drink;
import com.yl.vendingmachine.bean.ShopRecord;

import java.util.ArrayList;

public interface DrinkMapper {
    public ArrayList<Drink> getDrink();

    public void buyDrink(int id);

    public void insertShopRecord(ShopRecord shopRecord);

    public ArrayList<ShopRecord> getShopHistoryByOpenid(String openid);

    public void spendToBuy(String openid,int spend);
}
