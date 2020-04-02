import Toast from '../../vant/toast/toast'
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '操作记录' })
    this.queryRecord()
  },

  queryRecord: function () {
    wx.request({
      url: 'https://crmdfq.cn/queryControlHistory',
      method: 'GET',
      data:{
        openid:app.globalData.openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res.data)
        this.setData({
          recordList: res.data
        })
        console.log(this.data.recordList)
      },
      fail: err => {
        console.log(err)
      }
    })

  },
})