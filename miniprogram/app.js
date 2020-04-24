require('./libs/Mixins.js');

const themeListeners = [];

App({
  globalData: {
    userInfo: {},   // 用户信息
    theme: 'dark', // 主题颜色: light/dark
    deviceInfo: {},   // 设备信息

    categoryList: [],    // 用户分类列表
    activeAccountDetail: {},    // 当前显示的账目详情
  },
  themeChanged(theme) {
    this.globalData.theme = theme;
    themeListeners.forEach((listener) => {
      listener(theme);
    });
  },
  watchThemeChange(listener) {
    if (themeListeners.indexOf(listener) < 0) {
      themeListeners.push(listener);
    }
  },
  unWatchThemeChange(listener) {
    const index = themeListeners.indexOf(listener);
    if (index > -1) {
      themeListeners.splice(index, 1);
    }
  },
  onLaunch() {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.globalData = {};
    this.getDeviceInfo();   // 获取设备信息
  },
  /**
   * @method 获取设备信息
   */
  getDeviceInfo() {
    wx.getSystemInfo({
      success: res => {
        this.globalData.deviceInfo = res;
      }
    })
  },
  /**
   * @method 保存记账分类列表
   */
  setCategoryList(obj) {
    console.log(obj);
    this.globalData.categoryList = obj;
  },
  /**
   * @method 设置当前活跃的账目详情
   */
  setActiveAccountDetail(obj) {
    console.log(obj);
    this.globalData.activeAccountDetail = obj;
  }
})
