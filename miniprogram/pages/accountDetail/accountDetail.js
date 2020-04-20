// miniprogram/pages/accountDetail/accountDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * @method 删除按钮点击事件
   */
  delAccount() {
    wx.showModal({
      content: '删除后无法恢复,是否删除?',
      confirmText: '删除',
      confirmColor: '#fa5151',
      success: res => {
        if (res.confirm) {
          console.log('用户点击确定')
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
  }
})