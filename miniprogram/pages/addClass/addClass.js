Page({
  data: {
    newClass: {
      icon: "1",
      name: ""
    }
  },
  /**
   * @hook 页面加载时,获取当前路由参数
   */
  onLoad(options) {
    console.log(options.type);
  },
  /**
   * 实现数据双向绑定
   * @hook 顶部分类名称input输入事件
   */
  handleInputChange(e) {
    setTimeout(()=> {
      this.setData({
        'newClass.name': e.detail.value
      })
    }, 200);
  },
  /**
   * 调用云函数啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
   * @method 底部添加分类事件
   */
  addClass() {
    let pages = getCurrentPages();
    let { options } = pages.pop();
    let type = options.type;   // 获取路由参数type
    console.log(type);

    let newClass = this.data.newClass;
    console.log(newClass.name);
    if (!type) {
      wx.showToast({
        title: '出错啦,请返回上一页重新进入',
        icon: 'none',
      })
      return;
    }
    if (!newClass.name) {
      wx.showToast({
        title: '请输入分类名称',
        icon: 'none',
      })
      return;
    }
    if (!newClass.icon) {
      wx.showToast({
        title: '请输入分类图标',
        icon: 'none',
      })
      return;
    }
    console.log("调用云函数");
    wx.navigateBack();    // 返回上一页
  }
})