const time = require("../../utils/utils.js");


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
    this.getClassList();
  },
  /**
   * 调用云函数adminClassList获取
   * @method 获取分类列表
   */
  getClassList() {
    wx.cloud.callFunction({
      name: 'getClassList',
      data: {
        type: this.data.bookkeep.type
      }
    })
      .then(res => {
        let classList = res.result.data;
        console.log(classList);
        this.setData({
          classList,
          'bookkeep.category': classList[0]._id
        });   // 复制分类列表,并选中第一个
      })
      .catch(console.error)
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
    // 用户已提交
    let data = this.data.bookkeep;
    data.time = new Date().getTime();
    data.num = Math.floor(data.num * 100) / 100;
    wx.cloud.callFunction({
      name: 'bookkeep',
      data: data
    })
    .then(res => {
      console.log(res);
      wx.showToast({
        title: '已记一笔',
      })
      wx.vibrateShort();
      wx.navigateBack();
    })
    .catch(err => {
      wx.showToast({
        icon: 'none',
        title: '记账失败'
      })
      console.error(err)
    })
    // let data = this.data.bookkeep;
    // data.time = new Date().getTime();
    // data.date = time.formatTime(data.time).split(' ')[0];
    // data.num = Math.floor(data.num * 100) / 100;
    // const db = wx.cloud.database()
    // db.collection('accountBook').add({
    //   data,
    //   success: res => {
    //     console.log(res);
    //     wx.showToast({
    //       title: '已记一笔',
    //     })
    //     wx.vibrateShort();
    //     wx.navigateBack();
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '记账失败'
    //     })
    //     console.error(err)
    //   },
      
    // })
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