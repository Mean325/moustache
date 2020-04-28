var amap = require('../../utils/amap-wx.js');   // 引入高德地图

const app = getApp()

Page({
  mixins: [require('../../libs/Mixins.js')],
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),    // 判断小程序的API，回调，参数，组件等是否在当前版本可用
    weather: {},    // 天气数据
    config: {},   // 启动页配置
    statusBarHeight: getApp().globalData.deviceInfo.statusBarHeight,   // 获取全局变量的导航栏高度
  },
  onLoad(options) {
    this.getWelcomeConfig();
    this.getWeather();
    this.getSetting();
    this.getCategoryList();   // 获取用户分类列表
  },
  /**
   * 调用云函数getWelcomeConfig获取
   * @method 获取启动页配置
   */
  getWelcomeConfig() {
    wx.cloud.callFunction({
      name: 'getWelcomeConfig',
      data: {}
    })
      .then(res => {
        let data = res.result.data;
        console.log(res);
        this.setData({
          config: data
        });
      })
      .catch(console.error)
  },
  /**
   * @method 获取分类列表
   */
  getCategoryList() {
    app.getCategoryList()
      .then(res => {
        wx.switchTab({
          url: '/pages/index/index',
        })
      })
  },
  /**
   * 高德地图api
   * @method 获取当前天气
   */
  getWeather() {
    var amapFun = new amap.AMapWX({ key: 'a4a2d92da0b8a0b8ecbe699ef4e76426' });
    amapFun.getWeather({
      success: res => {
        console.log(res)
        this.setData({
          weather: res.liveData
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  /**
   * 当userInfo可以被获取时,保存到userInfo
   * @method 获取用户设置
   */
  getSetting() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {    // 用户已授权
          wx.getUserInfo({
            success: res => {
              console.log(res)
              this.setData({
                userInfo: res.userInfo
              })
            },
            complete: res => {
              this.getOpenid();
            }
          });
        } else {
          this.getOpenid();
        }
      }
    });
  },
  /**
   * 调用云函数login
   * @method 获取用户openid
   */
  getOpenid() {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        this.setData({
          'userInfo.openid': res.result.openid
        })
        app.globalData.userInfo = this.data.userInfo;
      },
      fail: err => {
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        })
      }
    })
  },
})