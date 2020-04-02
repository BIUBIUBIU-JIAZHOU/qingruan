package com.yl.smarthome.controller;

import com.yl.smarthome.bean.Equipment;
import com.yl.smarthome.bean.Record;
import com.yl.smarthome.mapper.EquipmentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;


@RestController
public class EquipmentController {

    @Autowired
    EquipmentMapper equipmentMapper;

    @RequestMapping("/queryEquipment")
    public ArrayList<Equipment> getEquipmentByCategory(int category) {
        return equipmentMapper.getEquipmentByCategory(category);
    }

    @RequestMapping("/insertDoor")
    public int insertDoorByOpenid(String openid, int kind, int id) {
        return insertRecord(openid, kind, id);
    }

    @RequestMapping("/insertLamp")
    public int insertLampByOpenid(String openid, int kind, int id) {
        return insertRecord(openid, kind, id);

    }

    @RequestMapping("/insertCurtain")
    public int insertCurtainByOpenid(String openid, int kind, int id) {
        return insertRecord(openid, kind, id);

    }

    @RequestMapping("/insertAir")
    public int insertAirByOpenid(String openid, int kind, int id) {
        return insertRecord(openid, kind, id);
    }

    @RequestMapping("/queryPermission")
    public int getCardCountByOpenid(String openid){
        if(equipmentMapper.getCardCountByOpenid(openid)!=0){
            return 1;
        }else{
            return 0;
        }
    }

    public int insertRecord(String openid, int kind, int id) {
        if (equipmentMapper.getStateById(id).equals("损坏")) {
            return 0;
        } else {
            if (kind == 0) {
                Date createDate = new Date();
                SimpleDateFormat createDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                equipmentMapper.openEquipmentById(id, createDateFormat.format(createDate));

                Record record = new Record();
                record.setCard(equipmentMapper.getCardByOpenid(openid));
                record.setEquipment(equipmentMapper.getEquipmentByid(id));
                record.setOperation("开启");
                record.setTime(createDateFormat.format(createDate));

                equipmentMapper.insertRecord(record);
            } else {
                Date createDate = new Date();
                SimpleDateFormat createDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                equipmentMapper.closeEquipmentById(id, createDateFormat.format(createDate));
                Record record = new Record();
                record.setCard(equipmentMapper.getCardByOpenid(openid));
                record.setEquipment(equipmentMapper.getEquipmentByid(id));
                record.setOperation("关闭");
                record.setTime(createDateFormat.format(createDate));

                equipmentMapper.insertRecord(record);

            }
            return 1;
        }

    }

}
