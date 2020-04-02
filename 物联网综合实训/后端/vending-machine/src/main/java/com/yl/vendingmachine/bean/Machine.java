package com.yl.vendingmachine.bean;

public class Machine {
    int status;
    int coldTemperature;
    int hotTemperature;

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getColdTemperature() {
        return coldTemperature;
    }

    public void setColdTemperature(int coldTemperature) {
        this.coldTemperature = coldTemperature;
    }

    public int getHotTemperature() {
        return hotTemperature;
    }

    public void setHotTemperature(int hotTemperature) {
        this.hotTemperature = hotTemperature;
    }

}
