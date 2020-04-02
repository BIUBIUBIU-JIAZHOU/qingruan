var app = getApp();
import Toast from '../../vant/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curtainList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '窗帘系统' })  
    this.queryCurtain()
  },

  queryCurtain: function () {
    wx.request({
      url: 'https://crmdfq.cn/queryEquipment',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      data: {
        category: 3
      },
      success: res => {
        console.log(res)
        this.setData({
          curtainList: res.data
        })
      },
      fail: err => {
        console.log(err)
      }
    })

  },

  openCurtain: function (e) {
    console.log(e.currentTarget.dataset.index)
    wx.request({
      url: 'https://crmdfq.cn/insertCurtain',
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
          Toast('窗帘已损坏')
        } else {
          Toast('窗帘已打开')
        }
        this.queryCurtain()
      },
      fail: err => {
        Toast('关闭失败')
        console.log(err)
      }
    })
  },

  closeCurtain: function (e) {
    console.log(e.currentTarget.dataset.index)
    wx.request({
      url: 'https://crmdfq.cn/insertCurtain',
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
          Toast('窗帘已损坏')
        } else {
          Toast('窗帘已关闭')
        }
        this.queryCurtain()
        console.log(res)
      },
      fail: err => {
        Toast('打开失败')
        console.log(err)
      }
    })

  }


})