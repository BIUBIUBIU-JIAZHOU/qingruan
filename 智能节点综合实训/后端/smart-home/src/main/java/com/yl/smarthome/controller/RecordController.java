package com.yl.smarthome.controller;

import com.yl.smarthome.bean.Record;
import com.yl.smarthome.mapper.RecordMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class RecordController {
    @Autowired
    RecordMapper recordMapper;
    @RequestMapping("/queryRecord")
    public ArrayList<Record> getAllRecord(){
        return recordMapper.getAllRecord();
    }
}
