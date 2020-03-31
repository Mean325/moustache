const time = require("../../utils/utils.js");

const app = getApp()

Page({
  data: {
    todayAmount: 0,   // 今日总额
    monthAmount: 0,   // 本月总额
    todayBill: [],    // 今日账单
    monthBill: [],    // 本月账单
  },
  onLoad() {
    this.getTodayBill();
  },
  onShow() {
    this.getTodayBill();
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
  }
})
