import Toast from '../../vant/toast/toast'
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({ title: '绑定每门禁卡' })  
  },
  cardConfirm: function(e) {
    this.setData({
      card: e.detail.value
    })
    //console.log(e.detail.value)
  },

  sendCard: function(e) {
    console.log(this.data.card)
    console.log(app.globalData.openid)
    wx.request({
      url: 'https://crmdfq.cn/user',
      method: 'GET',
      data: {
        card: this.data.card,
        openid: app.globalData.openid,
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res)
        if(res.data==0){
          Toast('此卡无效，请重新输入')
        }else{
          Toast('绑定成功')
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  }

})