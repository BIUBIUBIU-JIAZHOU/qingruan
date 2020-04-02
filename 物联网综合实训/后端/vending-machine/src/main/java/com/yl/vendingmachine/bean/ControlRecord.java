package com.yl.vendingmachine.bean;

public class ControlRecord {
    String openid;
    String controlKind;
    String parameter;
    int category;
    String time;

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    public String getControlKind() {
        return controlKind;
    }

    public void setControlKind(String controlKind) {
        this.controlKind = controlKind;
    }

    public String getParameter() {
        return parameter;
    }

    public void setParameter(String parameter) {
        this.parameter = parameter;
    }

    public int getCategory() {
        return category;
    }

    public void setCategory(int category) {
        this.category = category;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

}
