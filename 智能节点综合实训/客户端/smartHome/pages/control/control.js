var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    permission:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '控制系统' })  
    wx.request({
      url: 'https://crmdfq.cn/queryPermission',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      data: {
        openid: app.globalData.openid
      },
      success: res => {
        //console.log(res.data)
        this.setData({
          permission: res.data
        })
      },
      fail: err => {
        console.log(err)
      }
    })

  },

  navigateToDoor: function (e) {
    wx.navigateTo({
      url: '../door/door',
      success: function () {
        //console.log(1)
      }
    })
  },
  navigateToLamp: function (e) {
    wx.navigateTo({
      url: '../lamp/lamp',
      success: function () {
        //console.log(1)
      }
    })
  },
  navigateToCurtain: function (e) {
    wx.navigateTo({
      url: '../curtain/curtain',
      success: function () {
        //console.log(1)
      }
    })
  },
  navigateToAir: function (e) {
    wx.navigateTo({
      url: '../airCond/airCond',
      success: function () {
        //console.log(1)
      }
    })
  },
})