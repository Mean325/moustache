const commonJs = require("../common.js");

const app = getApp()

Page({
  data: {
    detail: {}
  },
  onShow(options) {
    this.setData({
      detail: getApp().globalData.activeAccountDetail
    })
  },
  /**
   * 调用公共方法删除
   * @method 删除按钮点击事件
   */
  delAccount() {
    wx.showModal({
      content: '删除后无法恢复,是否删除?',
      confirmText: '删除',
      confirmColor: '#fa5151',
      success: res => {
        if (res.confirm) {
          commonJs.delAccount(this.data.detail._id, this.handleDelAccount);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * @method 编辑按钮点击事件
   */
  editAccount() {
    wx.navigateTo({
      url: '/pages/bookkeep/bookkeep',
    })
  },
  /**
   * @hook 删除账目成功事件
   */
  handleDelAccount() {
    wx.showToast({
      title: '删除成功',
    })
    wx.navigateBack();
  }
})