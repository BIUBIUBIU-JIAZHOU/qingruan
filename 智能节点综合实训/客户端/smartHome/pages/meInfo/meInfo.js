var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    position:'',
    obey:'',
    card:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '个人信息' })  
    wx.request({
      url: 'https://crmdfq.cn/queryMyInfo',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      data: {
        openid: app.globalData.openid
      },
      success: res => {
        console.log(res)
        //console.log(res.data)
        this.setData({
          position:res.data.position,
          obey:res.data.obey,
          card:res.data.doorCard
        })
        //console.log(this.data.bookList)
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  
})