import Toast from '../../vant/toast/toast'
import Dialog from '../../vant/dialog/dialog';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({ title: '家庭成员' })  
    wx.request({
      url: 'https://crmdfq.cn/queryMember',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res)
        //console.log(res.data)
        this.setData({
          memberList: res.data
        })
        console.log(this.data.memberList)
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  navigateToAddMem: function(e) {
    if (app.globalData.level != 0) {
      Toast('您没有权限添加新成员')
    } else {
      wx.navigateTo({
        url: '../addMember/addMember',
        success: function() {
          //console.log(1)
        }
      })
    }
  },
  deleteMember: function(e) {
    if (app.globalData.level != 0) {
      Toast('您没有权限删除该成员')
    } else {
      Dialog.confirm({
        //title: '标题',
        message: '确认删除该成员吗'
      }).then(() => {
        wx.request({
          url: 'https://crmdfq.cn/deleteMember',
          method: 'GET',
          data: {
            card: e.currentTarget.dataset.index
          },
          header: {
            'content-type': 'application/json'
          },
          success: res => {
            Toast('删除成功')
            this.onLoad()
          },
          fail: err => {
            console.log(err)
          }
        })
        // on confirm
      }).catch(() => {
        // on cancel
      });
    }
  }
})