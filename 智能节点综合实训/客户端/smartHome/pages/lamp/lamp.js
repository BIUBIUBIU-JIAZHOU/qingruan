var app = getApp();
import Toast from '../../vant/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lampList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '照明系统' })  
    this.queryLamp()
  },

  queryLamp: function () {
    wx.request({
      url: 'https://crmdfq.cn/queryEquipment',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      data: {
        category: 2
      },
      success: res => {
        console.log(res)
        this.setData({
          lampList: res.data
        })
      },
      fail: err => {
        console.log(err)
      }
    })

  },

  openLamp: function (e) {
    console.log(e.currentTarget.dataset.index)
    wx.request({
      url: 'https://crmdfq.cn/insertLamp',
      method: 'GET',
      data: {
        openid: app.globalData.openid,
        kind: 0,
        id: e.currentTarget.dataset.index
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res)
        if(res.data==0){
          Toast('灯已损坏')
        }else{
          Toast('灯已打开')
        }
        this.queryLamp()
      },
      fail: err => {
        Toast('关闭失败')
        console.log(err)
      }
    })
  },

  closeLamp: function (e) {
    console.log(e.currentTarget.dataset.index)
    wx.request({
      url: 'https://crmdfq.cn/insertLamp',
      method: 'GET',
      data: {
        openid: app.globalData.openid,
        kind: 1,
        id: e.currentTarget.dataset.index
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        if (res.data == 0) {
          Toast('灯已损坏')
        } else {
          Toast('灯已关闭')
        }
        this.queryLamp()
      },
      fail: err => {
        Toast('打开失败')
        console.log(err)
      }
    })

  }


})