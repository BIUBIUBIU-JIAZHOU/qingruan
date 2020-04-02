var app = getApp();
import Toast from '../../vant/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:'',
    reserveStatus:'',
    controlKind:'',
    flag:'',
    coldTemperature:'',
    hotTemperature:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryMachineStatus()
    wx.setNavigationBarTitle({ title: '状态控制' })
  },

  queryMachineStatus: function () {
    wx.request({
      url: 'https://crmdfq.cn/queryMachineStatus',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res)
        if(res.data.status==1){
          this.setData({
            status: "正在售卖",
            reserveStatus: "停止售卖",
            flag:1
          })
        }else{
          this.setData({
            status: "停止售卖",
            reserveStatus: "开始售卖",
            flag:0
          })
        }
        this.setData({
          coldTemperature:res.data.coldTemperature,
          hotTemperature:res.data.hotTemperature
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  adjustCold(event) {
    console.log(event.detail);
    this.setData({
      coldTemperature:event.detail
    })
  },
  adjustHot(event) {
    console.log(event.detail);
    this.setData({
      hotTemperature: event.detail
    })
  }, 
  changeStatus: function (e) {
    if(this.data.status=="正在售卖"){
      this.setData({
        status:"停止售卖",
        reserveStatus:"开始售卖",
        controlKind:"关闭售货机",
        flag:0
      })
    }else{
      this.setData({
        status: "正在售卖",
        reserveStatus: "停止售卖",
        controlKind: "开启售货机",
        flag:1
      })
    }
    wx.request({
      url: 'https://crmdfq.cn/changeStatus',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      data:{
        flag:this.data.flag,
        openid: app.globalData.openid,
        controlKind: this.data.controlKind,
        parameter:'',
        category:1
      },
      success: res => {
        Toast('设置成功')
      },
      fail: err => {
        Toast('设置失败')
        console.log(err)
      }
    })
    //console.log(e.currentTarget.dataset.index)
  }, 
  sendCold: function (e) {
    wx.request({
      url: 'https://crmdfq.cn/updateCold',
      method: 'GET',
      data: {
        coldTemperature: this.data.coldTemperature,
        openid: app.globalData.openid,
        controlKind: "调节冷饮温度为",
        parameter: this.data.coldTemperature,
        category: 3
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        Toast('设置成功')
      },
      fail: err => {
        Toast('设置失败')
        console.log(err)
      }
    })
    //console.log(e.currentTarget.dataset.index)
  }, 
  sendHot: function (e) {
    wx.request({
      url: 'https://crmdfq.cn/updateHot',
      method: 'GET',
      data: {
        hotTemperature: this.data.hotTemperature,
        openid: app.globalData.openid,
        controlKind: "调节热饮温度为",
        parameter: this.data.hotTemperature,
        category: 3
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        Toast('设置成功')
      },
      fail: err => {
        Toast('设置失败')
        console.log(err)
      }
    })
    //console.log(e.currentTarget.dataset.index)
  }
})