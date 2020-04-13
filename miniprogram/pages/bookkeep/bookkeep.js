const time = require("../../utils/utils.js");


Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookkeep: {
      num: 0,   // 金额
      type: 1,    // 账目类型,1为支出,2为收入
      category: 1,    // 账目分类id
      remark: ""
    },    // 记账数据
    // 键盘
    hasDot: false // 防止用户多次输入小数点
  },
  onLoad(options) {

  },
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
   * @method 自定义数字键盘确认按钮事件
   */
  tapSubmit() {
    // 用户已提交
    console.log('res =', this.data.num)
    // wx.cloud.callFunction({
    //   // 云函数名称
    //   name: 'add',
    //   // 传给云函数的参数
    //   data: {
    //     num: this.data.num
    //   }
    // })
    // .then(res => {
    //   console.log(res)
    // })
    // .catch(console.error)
    let data = this.data.bookkeep;
    data.time = new Date().getTime();
    data.date = time.formatTime(data.time).split(' ')[0];
    const db = wx.cloud.database()
    db.collection('accountBook').add({
      data,
      success: res => {
        wx.showToast({
          title: '已记一笔',
        })
        wx.navigateBack();
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '记账失败'
        })
        console.error(err)
      }
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
   * @method 自定义数字键盘 - 清楚按钮点击事件
   */
  tapClear() {
    this.setData({
      'bookkeep.num': '0',
      hasDot: false
    })
  }
})