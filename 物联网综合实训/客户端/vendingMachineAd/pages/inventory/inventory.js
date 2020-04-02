var app = getApp();
import Toast from '../../vant/toast/toast'
import Dialog from '../../vant/dialog/dialog'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    drinkList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '库存控制'
    })
    this.queryAllDrink()
  },

  onShow:function(){
    this.queryAllDrink()
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
  addNum: function(e) {
    wx.navigateTo({
      url: "/pages/addNum/addNum?id=" + e.currentTarget.dataset.index
    })
    //console.log(e.currentTarget.dataset.index)
  },
  deleteDrink: function(e) {
    //console.log(e.currentTarget.dataset.index)
    Dialog.confirm({
      //title: '标题',
      message: '是否确认下架该商品'
    }).then(() => {
      wx.request({
          url: 'https://crmdfq.cn/deleteDrink',
          method: 'GET',
          data: {
            openid: app.globalData.openid,
            id: e.currentTarget.dataset.index,
            controlKind: "下架",
            parameter: '',
            category: 2
          },
          header: {
            'content-type': 'application/json'
          },
          success: res => {
            Toast('下架成功')
            this.queryAllDrink()
          },
          fail: err => {
            Toast('下架失败')
            console.log(err)
          }
        })
       
      // on confirm
    }).catch(() => {
      // on cancel
    });
  },
})