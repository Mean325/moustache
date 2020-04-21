const time = require("../../utils/utils.js");
const commonJs = require("../common.js");

const app = getApp()

Page({
  data: {
    todayAmount: 0,   // 今日总额
    monthAmount: 0,   // 本月总额
    todayBill: [],    // 今日账单
    monthBill: [],    // 本月账单
    boxHeight: 0,   // 今日信息view高度,用于计算bill__today高度,使第一屏只显示今日信息

    slideButtons: [{
      type: 'warn',
      text: '删除'
    }],   // 左滑删除组件
  },
  // onLoad() {
  //   this.getTodayBoxHeight();
  //   this.getTodayBill();
  // },
  onShow() {
    this.getAccountBook();
  },
  /**
   * 分别获取今日账单和月账单,用于数据显示
   * @method 获取账单列表
   */
  getAccountBook() {
    this.getTodayBill();
    this.getMonthBill();
  },
  /**
   * @method 获取今日账单列表
   */
  getTodayBill() {
    let timestamp = new Date().getTime();
    let date = time.formatTime(timestamp).split(' ')[0];   // 获取当前日期

    wx.cloud.callFunction({
      name: 'getAccountBook',
      data: {
        date,
        dateType: 3,  // 日期类型,1为年,2为月,3为日 
      }
    })
      .then(res => {
        let data = res.result.data;
        console.log(data);
        if (data.length) {
          let amount = 0;
          let categoryList = app.globalData.categoryList;
          data.forEach(item => {
            amount += item.num;
            item.categoryName = categoryList.find(n => item.category === n._id).name;
          })
          this.setData({
            todayAmount: amount,
            todayBill: data.slice(0, 3)
          })
          this.getTodayBoxHeight();
        }
      })
      .catch(console.error)
  },
  /**
   * @method 获取今日信息盒子高度
   */
  getTodayBoxHeight() {
    //创建节点选择器
    var query = wx.createSelectorQuery();
    query.select('.bill__today').boundingClientRect(res => {
      console.log(res);
      this.setData({
        boxHeight: res.height
      })
    }).exec();
  },
  /**
   * @method 获取本月账单列表
   */
  getMonthBill() {
    let timestamp = new Date().getTime();
    let date = time.formatTime(timestamp).split(' ')[0];   // 获取当前日期

    wx.cloud.callFunction({
      name: 'getAccountBook',
      data: {
        date,
        dateType: 2,  // 日期类型,1为年,2为月,3为日 
      }
    })
      .then(res => {
        let data = res.result.data;
        console.log(data);
        if (data.length) {
          let amount = 0;
          let categoryList = app.globalData.categoryList;
          data.forEach(item => {
            amount += item.num;
            item.categoryName = categoryList.find(n => item.category === n._id).name;
          })
          this.setData({
            monthAmount: amount,
            monthBill: data
          })
          this.getTodayBoxHeight();
        }
      })
      .catch(console.error)
  },
  /**
   * 跳转到账目详情页
   * @method 账单条目点击事件
   */
  toDetail() {
    wx.navigateTo({
      url: '/pages/accountDetail/accountDetail'
    })
  },
  delAccount(e) {
    let id = e.currentTarget.dataset.id;
    commonJs.delAccount(id, this.getAccountBook);
  }
})
