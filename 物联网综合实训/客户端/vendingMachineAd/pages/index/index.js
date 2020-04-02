var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    permission: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '自动售货机' })

  },

  navigateToStatus: function (e) {
    wx.navigateTo({
      url: '../machineStatus/machineStatus',
      success: function () {
        //console.log(1)
      }
    })
  },
  navigateToInventory: function (e) {
    wx.navigateTo({
      url: '../inventory/inventory',
      success: function () {
        //console.log(1)
      }
    })
  },
})