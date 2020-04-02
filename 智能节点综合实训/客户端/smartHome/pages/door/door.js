var app = getApp();
import Toast from '../../vant/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({ title: '门禁系统' })  
    this.queryDoor()
  },

  queryDoor:function(){
    wx.request({
      url: 'https://crmdfq.cn/queryEquipment',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      data: {
        category:1
      },
      success: res => {
        console.log(res)
        this.setData({
          doorList: res.data
        })
      },
      fail: err => {
        console.log(err)
      }
    })

  },

  openDoor: function(e) {
    console.log(e.currentTarget.dataset.index)
    wx.request({
      url: 'https://crmdfq.cn/insertDoor',
      method: 'GET',
      data: {
        openid: app.globalData.openid,
        kind:0,
        id: e.currentTarget.dataset.index
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        if (res.data == 0) {
          Toast('门已损坏')
        } else {
          Toast('门已打开')
        }
        this.queryDoor()
      },
      fail: err => {
        Toast('关闭失败')
        console.log(err)
      }
    })
  },

  closeDoor: function(e) {
    console.log(e.currentTarget.dataset.index)
    wx.request({
      url: 'https://crmdfq.cn/insertDoor',
      method: 'GET',
      data: {
        openid: app.globalData.openid,
        kind:1,
        id: e.currentTarget.dataset.index
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        if (res.data == 0) {
          Toast('门已损坏')
        } else {
          Toast('门已关闭')
        }
        this.queryDoor()
        console.log(res)
      },
      fail: err => {
        Toast('打开失败')
        console.log(err)
      }
    })

  }


})