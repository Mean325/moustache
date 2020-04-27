const utils = require("../../utils/utils.js");
const app = getApp();

Page({
  mixins: [require('../../mixin/themeChanged')],
  data: {
    selectedDate: "",   // 选中的月份,用于查询月账单
    selectedDateArr: [],    // 选中的月份数组,仅用于页面展示
    activeType: 1,    // 账目类型,1为支出,2为收入
    outlayAmount: 0,    // 支出总额
    incomeAmount: 0,    // 收入总额
    categorylist: [],    // 账单条目分类列表
  },
  onShow(options) {
    this.bindDateChange({
      detail: {
        value: utils.getDate()
      }
    })
  },
  /**
   * 获取当前月份的月账单
   * @hook 日期改变事件钩子
   */
  bindDateChange(e) {
    let value = e.detail.value;
    this.setData({
      selectedDate: value,
      selectedDateArr: value.split("-")
    })
    this.getMonthAmount();
    this.getMonthAccount();
  },
  /**
   * 因getMonthAccount方法只获取对应支出/收入的数据,导致另一个amount为0
   * @method 获取月账单总金额
   */
  getMonthAmount() {
    let date = this.data.selectedDate;
    wx.cloud.callFunction({
      name: 'getAccountBook',
      data: {
        date,
        dateType: 2,  // 日期类型,1为年,2为月,3为日
      }
    })
      .then(res => {
        let result = res.result[0];
        let list = result.list;
        console.log(list);
        this.setData({
          outlayAmount: result.outlayAmount,
          incomeAmount: result.incomeAmount
        })
        // }
      })
      .catch(console.error)
  },
  /**
   * @method 获取月支出/收入账单数据
   */
  getMonthAccount() {
    let date = this.data.selectedDate;
    let type = this.data.activeType;

    wx.cloud.callFunction({
      name: 'getAccountBook',
      data: {
        date,
        dateType: 2,  // 日期类型,1为年,2为月,3为日
        type,    // 数据类型
        groupBy: "category",    // 按分类分组
        sortBy: "outlayAmount"    // 按支出金额排序
      }
    })
      .then(res => {
        let result = res.result[0];
        let list = result.list;
        console.log(list);
        // let data = res.result.list;
        // if (list.length) {
          let categoryList = app.globalData.categoryList;
          list.forEach(item => {
            let category = categoryList[type - 1].find(n => item.category === n._id);
            if (category) {
              item.categoryName = category.name;
              item.categoryIcon = category.icon;
              let typeName = (type === 1 ? "outlayAmount" : "incomeAmount");
              item.amount = item[typeName];
              item.scale = (item.amount / result[typeName] * 100).toFixed(2);
            }
          })
          this.setData({
            // outlayAmount: result.outlayAmount,
            // incomeAmount: result.incomeAmount,
            categorylist: list
          })
        // }
      })
      .catch(console.error)
  },
  /**
   * @method 改变当前的Type - 收入/支出
   */
  changeType() {
    this.setData({
      activeType: this.data.activeType === 1 ? 2 : 1
    })
    this.getMonthAccount();
  }
})