import Toast from '../../vant/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card: '',
    obey: '',
    level:'',
    index:'',
    array: ['管理员', '用户'],
    objectArray: [
      {
        id: 0,
        name: '管理员'
      },
      {
        id: 1,
        name: '用户'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '添加新成员' })  
    this.setData({
      //sex: '',
      index: 0
    })
  },

  cardConfirm: function (e) {
    this.setData({
      card: e.detail.value
    })
    //console.log(e.detail.value)
  },

  obeyConfirm: function (e) {
    this.setData({
      obey: e.detail.value
    })
    //console.log(e.detail.value)
  },

  PickerChange(e) {
    this.setData({
      index: e.detail.value
    })

    //console.log('picker发送选择改变，携带值为', e.detail.value)
  },

  sendEPC: function (e) {
    if (this.data.index == 0) {
      this.setData({
        level: 0
      })
    } else {
      this.setData({
        level: 1
      })
    }
    console.log(this.data.level)
    if (this.data.value == '') {
      console.log(0);
    } else {
      wx.request({
        url: 'https://crmdfq.cn/addMember',
        method: 'GET',
        data: {
          card: this.data.card,
          obey: this.data.obey,
          position: this.data.array[this.data.index],
          level:this.data.level
        },
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          Toast('添加成功')
          console.log(res)
        },
        fail: err => {
          console.log(err)
        }
      })
    }
  }
})