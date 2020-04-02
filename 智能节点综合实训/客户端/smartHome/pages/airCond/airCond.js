var app = getApp();
import Toast from '../../vant/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    airList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '空调系统' })  
    this.queryAir()
  },

  queryAir: function () {
    wx.request({
      url: 'https://crmdfq.cn/queryEquipment',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      data: {
        category: 4
      },
      success: res => {
        console.log(res)
        this.setData({
          airList: res.data
        })
      },
      fail: err => {
        console.log(err)
      }
    })

  },

  openAir: function (e) {
    console.log(e.currentTarget.dataset.index)
    wx.request({
      url: 'https://crmdfq.cn/insertAir',
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
        if (res.data == 0) {
          Toast('空调已损坏')
        } else {
          Toast('空调已打开')
        }
        this.queryAir()
      },
      fail: err => {
        Toast('关闭失败')
        console.log(err)
      }
    })
  },

  closeAir: function (e) {
    console.log(e.currentTarget.dataset.index)
    wx.request({
      url: 'https://crmdfq.cn/insertAir',
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
          Toast('空调已损坏')
        } else {
          Toast('空调已关闭')
        }
        this.queryAir()
        console.log(res)
      },
      fail: err => {
        Toast('打开失败')
        console.log(err)
      }
    })

  }


})