package com.yl.vendingmachine.controller;

import com.yl.vendingmachine.bean.ControlRecord;
import com.yl.vendingmachine.bean.Machine;
import com.yl.vendingmachine.mapper.MachineMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

@RestController
public class MachineController {


    @Autowired
    MachineMapper machineMapper;
    @RequestMapping("queryMachineStatus")
    public Machine getMachine(){
        return machineMapper.getMachine();
    }

    @RequestMapping("changeStatus")
    public void changeStatus(int flag,String openid,String controlKind,String parameter,int category){
        if(flag==1){
            machineMapper.opendMachine();
        }else{
            machineMapper.closeMachine();
        }
        insertControlRecord(openid,controlKind,parameter,category);
    }

    @RequestMapping("updateCold")
    public void changeCold(int coldTemperature,String openid,String controlKind,String parameter,int category){
        machineMapper.changeCold(coldTemperature);
        insertControlRecord(openid,controlKind,parameter,category);
    }

    @RequestMapping("updateHot")
    public void changeHot(int hotTemperature,String openid,String controlKind,String parameter,int category){
        machineMapper.changeHot(hotTemperature);
        insertControlRecord(openid,controlKind,parameter,category);
    }

    @RequestMapping("addDrink")
    public void addDrinkById(int id,int addNum,String openid,String controlKind,String parameter,int category){
        System.out.println("id:"+id+",addNum:"+addNum);
        String drinkName=machineMapper.getDrinkNameById(id);
        machineMapper.addDrinkById(id,addNum);
        insertControlRecord(openid,controlKind+drinkName,parameter,category);

    }

    @RequestMapping("deleteDrink")
    public void deleteDrinkById(int id,String openid,String controlKind,String parameter,int category){
        String drinkName=machineMapper.getDrinkNameById(id);
        machineMapper.deleteDrinkById(id);
        insertControlRecord(openid,controlKind+drinkName,parameter,category);
    }

    @RequestMapping("queryControlHistory")
    public ArrayList<ControlRecord> getControHistoryByOpenid(String openid){
        return machineMapper.getControlHistoryByOpenid(openid);
    }

    public void insertControlRecord(String openid,String controlKind,String parameter,int category){
        Date createDate = new Date();
        SimpleDateFormat createDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        ControlRecord controlRecord=new ControlRecord();
        controlRecord.setOpenid(openid);
        controlRecord.setControlKind(controlKind);
        controlRecord.setParameter(parameter);
        controlRecord.setCategory(category);
        controlRecord.setTime(createDateFormat.format(createDate));
        machineMapper.insertControlRecord(controlRecord);
    }

}
