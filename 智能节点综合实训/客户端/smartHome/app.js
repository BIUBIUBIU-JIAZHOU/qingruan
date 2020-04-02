App({
  onLaunch() {
    wx.cloud.init({
      env: 'release-818bbf',
      traceUser: true,
    })
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.systeminfo = res
        this.globalData.isIPhoneX = /iphonex/gi.test(res.model.replace(/\s+/, ''))
      },
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })

        }
        var that = this
        wx.login({
          success: function (e) {
            //console.log(e)
            wx.getUserInfo({
              success: function (res) {
                //console.log(res)
                //that.globalData.userInfo = res.userInfo
                typeof cb == "function" && cb(that.globalData.userInfo)
              }
            })
            //util.getOpenId(e.code)
            wx.request({
              url: 'https://crmdfq.cn/login',
              method: 'POST',
              data: {
                code: e.code
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: res => {
                //console.log(res.data.openid)
                that.globalData.openid = res.data.openid
              },
              fail: err => {
                console.log(err.errMsg)
              }
            })
          }
        })

      }
    })
  },
  globalData: {
    userInfo: null,
    // 是否保持常亮，离开小程序失效
    keepscreenon: false,
    systeminfo: {},
    isIPhoneX: false,
    key: 'd276a8da41544b069ec49b444dc53b9c',
    weatherIconUrl: 'https://cdn.heweather.com/cond_icon/',
    requestUrl: {
      weather: 'https://free-api.heweather.com/s6/weather',
      hourly: 'https://free-api.heweather.com/s6/weather/hourly',
    },
    openid: '',
    level: ''
  },
})