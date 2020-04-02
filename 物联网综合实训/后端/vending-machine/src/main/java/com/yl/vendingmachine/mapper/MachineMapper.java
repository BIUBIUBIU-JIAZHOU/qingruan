package com.yl.vendingmachine.mapper;

import com.yl.vendingmachine.bean.ControlRecord;
import com.yl.vendingmachine.bean.Machine;

import java.util.ArrayList;

public interface MachineMapper {
    public Machine getMachine();

    public void opendMachine();

    public void closeMachine();

    public void changeCold(int coldTemperature);

    public void changeHot(int hotTemperature);

    public void addDrinkById(int id, int addNum);

    public String getDrinkNameById(int id);

    public void deleteDrinkById(int id);

    public void insertControlRecord(ControlRecord controlRecord);

    public ArrayList<ControlRecord> getControlHistoryByOpenid(String openid);
}
