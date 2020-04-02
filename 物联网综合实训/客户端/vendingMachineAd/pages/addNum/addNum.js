import Toast from '../../vant/toast/toast'
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    value: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.id)
    this.setData({
      id: options.id
    })
    wx.setNavigationBarTitle({ title: '补货' })
  },

  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      value: event.detail
    })
  },
  addNum: function(e) {
    console.log(this.data.value)
    if (this.data.value == '') {
      Toast('添加失败，输入不能为空')
    } else {
      wx.request({
          url: 'https://crmdfq.cn/addDrink',
          method: 'GET',
          data: {
            openid: app.globalData.openid,
            addNum: this.data.value,
            id: this.data.id,
            controlKind: "添加",
            parameter: this.data.value,
            category: 2
          },
          header: {
            'content-type': 'application/json'
          },
          success: res => {
            Toast('添加成功')
          },
          fail: err => {
            Toast('添加失败')
            console.log(err)
          }
        })
    }
  }
})