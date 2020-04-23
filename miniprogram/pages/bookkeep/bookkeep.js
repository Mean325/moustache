const utils = require("../../utils/utils.js");

const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookkeep: {
      num: 0,   // 金额
      type: 1,    // 账目类型,1为支出,2为收入
      category: "1",    // 账目分类id
      remark: ""    // 备注
    },    // 记账数据
    hasDot: false,    // 是否有小数点,防止用户多次输入小数点
    classList: [],    // 记账分类列表
  },
  onLoad(options) {
    let { categoryList } = app.globalData;
    
    this.setData({
      categoryList: categoryList,
      'bookkeep.category': categoryList[0]._id
    })
    let _id = options._id;
    if (_id) {
      let { activeAccountDetail } = app.globalData;
      let { categoryName, openid, categoryIcon, ...data } = activeAccountDetail;
      console.log(_id);
      this.setData({
        bookkeep: { ...data }
      })
    }
  },
  /**
   * @method 选中分类事件
   */
  selectCategory(e) {
    let _id = e.currentTarget.dataset.id;
    this.setData({
      'bookkeep.category': _id
    });
  },
  /**
   * @method 记账分类右侧日历点击事件
   */
  chooseDate() {
    console.log("选择日期");
  },
  /**
   * @method 选中分类事件
   */
  handleInputChange(e) {
    setTimeout(() => {
      this.setData({
        'bookkeep.remark': e.detail.value
      })
    }, 200);
  },
  /**
   * num末尾追加当前点击的数字
   * @method 自定义数字键盘按钮点击事件
   */
  tapKey(e) {
    var x = e.currentTarget.dataset.key
    if (x == '.') {
      if (this.data.hasDot) return
      this.setData({
        hasDot: true
      })
    }
    this.setData({
      'bookkeep.num': this.data.bookkeep.num == '0' ? x : this.data.bookkeep.num + x
    })
  },
  /**
   * 调用云函数添加当前交易
   * @method 自定义数字键盘确认按钮点击事件
   */
  tapSubmit() {
    let data = this.data.bookkeep;
    data.updateTime = new Date().getTime();
    data.num = Math.floor(data.num * 100) / 100;
    if (!data.date) {
      data.date = utils.getDate();
    }
    wx.cloud.callFunction({
      name: 'bookkeep',
      data: data
    })
    .then(res => {
      console.log(res);
      wx.showToast({
        title: '已记一笔',
      })
      wx.navigateBack();
    })
    .catch(err => {
      wx.showToast({
        icon: 'none',
        title: '记账失败'
      })
      console.error(err)
    })
  },
  /**
   * @method 删除按钮点击事件
   */
  tapDel() {
    let data = this.data.bookkeep;
    if (data.num == '0') return;
    if (data.num[data.num.length - 1] == '.') {
      this.setData({
        hasDot: false
      })
    }
    this.setData({
      'bookkeep.num': data.num.length == 1 ? '0' : data.num.substring(0, data.num.length - 1)
    })
  },
  /**
   * @method 自定义数字键盘 - 清除按钮点击事件
   */
  tapClear() {
    this.setData({
      'bookkeep.num': '0',
      hasDot: false
    })
  }
})