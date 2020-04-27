const commonJs = require("../common/common.js");
const utils = require("../../../utils/utils.js");

const app = getApp()

Page({
  data: {
    detail: {}
  },
  onShow(options) {
    let detail = getApp().globalData.activeAccountDetail;
    console.log(detail.updateTime);
    detail.formatTime = utils.formatTime(detail.updateTime);
    this.setData({
      detail
    })
  },
  /**
   * 调用公共方法删除
   * @method 删除按钮点击事件
   */
  delAccount() {
    commonJs.delAccount(this.data.detail._id, this.handleDelAccount);
  },
  /**
   * @method 编辑按钮点击事件
   */
  editAccount() {
    let _id = this.data.detail._id;
    wx.navigateTo({
      url: `/pages/bookkeep/bookkeep?_id=${ _id }`,
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