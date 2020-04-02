package com.yl.vendingmachine.controller;

import com.yl.vendingmachine.bean.Drink;
import com.yl.vendingmachine.bean.ShopRecord;
import com.yl.vendingmachine.mapper.DrinkMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

@RestController
public class DrinkController {
    Date createDate = new Date();
    SimpleDateFormat createDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Autowired
    DrinkMapper drinkMapper;

    @RequestMapping("queryAllDrink")
    public ArrayList<Drink> getDrink(){
        return drinkMapper.getDrink();
    }

    @RequestMapping("insertDrink")
    public void insertDrink(String openid,String drinkName,int spend,int id){
        ShopRecord shopRecord=new ShopRecord();
        shopRecord.setOpenid(openid);
        shopRecord.setDrinkName(drinkName);
        shopRecord.setSpend(spend);
        shopRecord.setTime(createDateFormat.format(createDate));
        drinkMapper.buyDrink(id);
        drinkMapper.insertShopRecord(shopRecord);
        drinkMapper.spendToBuy(openid,spend);
    }

    @RequestMapping("queryShopHistory")
    public ArrayList<ShopRecord> getShopHistoryByOpenid(String openid){
        return drinkMapper.getShopHistoryByOpenid(openid);
    }
}
