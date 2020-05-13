const utils = require("../../../../../utils/utils.js");
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isDialogShow: false,
    form: {
      name: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  showModal() {
    this.setData({
      isDialogShow: true
    })
  },
  tapDialogButton(e) {
    console.log(e);
    if (e.detail.index === 1) {
      console.log("创建");
      this.addItem();
    }
    this.setData({
      isDialogShow: false
    })
  },
  /**
 * 实现数据双向绑定
 * @hook 顶部分类名称input输入事件
 */
  handleInputChange(e) {
    this.setData({
      'form.name': e.detail.value
    })
  },
  /**
   * 调用云函数AA_addItem新增用户默认分类
   * @method 底部添加分类事件
   */
  addItem: utils.throttle(function () {
    let pages = getCurrentPages();
    let { options } = pages.pop();
    let type = Number(options.type);   // 获取路由参数type

    let { name } = this.data.form;
    if (!name) {
      wx.showToast({
        title: '请输入团队名称',
        icon: 'none',
      })
      return;
    }
    wx.cloud.callFunction({
      name: 'AA_addItem',
      data: {
        name
      }
    })
      .then(res => {
        console.log(res);
        wx.showToast({
          title: '创建成功',
          icon: 'none',
        })
        // wx.navigateBack();    // 返回上一页
      })
      .catch(console.error)
  }, 1000)
})