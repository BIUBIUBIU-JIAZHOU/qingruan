var app = getApp();
import Toast from '../../vant/toast/toast'
import Dialog from '../../vant/dialog/dialog'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    drinkList: [],
    status:'',
    hotTemperature:'',
    coldTemperature:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '自动售货机'
    })
    this.queryAllDrink()
    this.queryMachineStatus()
  },
  onShow:function(){
    this.queryAllDrink()
    this.queryMachineStatus()
  },
  queryMachineStatus: function () {
    wx.request({
      url: 'https://crmdfq.cn/queryMachineStatus',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res)
        if (res.data.status == 1) {
          this.setData({
            status: "正在售卖",
          })
        } else {
          this.setData({
            status: "停止售卖",
          })
        }
        this.setData({
          coldTemperature: res.data.coldTemperature,
          hotTemperature: res.data.hotTemperature
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  queryAllDrink: function() {
    wx.request({
      url: 'https://crmdfq.cn/queryAllDrink',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res)
        this.setData({
          drinkList: res.data
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  buyDrink: function(e) {
    console.log(e.currentTarget.dataset)
    console.log(e.currentTarget.dataset.drinkname)
    if (e.currentTarget.dataset.nownum < 1) {
      Toast('存货不足，请购买其它饮料')
    } else {
      Dialog.confirm({
        //title: '标题',
        message: '是否确认购买'
      }).then(() => {
        wx.request({
          url: 'https://crmdfq.cn/insertDrink',
          method: 'GET',
          data: {
            openid: app.globalData.openid,
            drinkName: e.currentTarget.dataset.drinkname,
            spend: e.currentTarget.dataset.price,
            id: e.currentTarget.dataset.index
          },
          header: {
            'content-type': 'application/json'
          },
          success: res => {
            Toast('购买成功')
            this.queryAllDrink()
          },
          fail: err => {
            Toast('购买失败')
            console.log(err)
          }
        })
        // on confirm
      }).catch(() => {
        // on cancel
      });
    }
  },
})