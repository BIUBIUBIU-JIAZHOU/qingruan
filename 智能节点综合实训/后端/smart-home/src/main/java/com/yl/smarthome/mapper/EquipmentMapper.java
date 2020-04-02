package com.yl.smarthome.mapper;

import com.yl.smarthome.bean.Equipment;
import com.yl.smarthome.bean.Record;

import java.util.ArrayList;

public interface EquipmentMapper {
    public ArrayList<Equipment> getEquipmentByCategory(int category);

    public String getStateById(int id);

    public void openEquipmentById(int id,String time);
    public void closeEquipmentById(int id,String time);

    public String getCardByOpenid(String openid);

    public String getEquipmentByid(int id);

    public void insertRecord(Record record);

    public int getCardCountByOpenid(String openid);
}
