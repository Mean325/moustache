const time = require("../../utils/utils.js");

const app = getApp()

Page({
  data: {
    todayAmount: 0,   // 今日总额
    monthAmount: 0,   // 本月总额
    todayBill: [],    // 今日账单
    monthBill: [],    // 本月账单
    boxHeight: 0,   // 今日信息view高度,用于计算bill__today高度,使第一屏只显示今日信息
  },
  onLoad() {
    this.getTodayBoxHeight();
    this.getTodayBill();
  },
  onShow() {
    this.getTodayBill();
  },
  /**
   * 
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
   * 
   * @method 获取今日账单列表
   */
  getTodayBill() {
    let timestamp = new Date().getTime();
    let date = time.formatTime(timestamp).split(' ')[0];   // 获取当前日期

    const db = wx.cloud.database();
    db.collection('accountBook').where({
      date
    }).get({
      success: res => {
        console.log(res);
        let data = res.data;
        if (data.length) {
          let amount = 0;
          data.forEach(item => {
            amount += Number(item.num);
          })
          this.setData({
            todayAmount: amount,
            todayBill: res.data.slice(0, 3)
          })
        }
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  /**
   * 跳转到账目详情页
   * @method 账单条目点击事件
   */
  toDetail() {
    wx.navigateTo({
      url: '/pages/accountDetail/accountDetail'
    })
  }
})
