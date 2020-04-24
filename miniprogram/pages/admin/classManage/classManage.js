Page({
  data: {
    activeType: 1,    // 当前分类类型,1为支出,2为收入
    listData: [],
    pageMetaScrollTop: 0,
    scrollTop: 0,
  },
  /**
   * @hook 进入该页面时获取分类列表
   */
  onShow() {
    this.getClassList();
  },
  /**
   * 调用云函数adminClassList获取
   * @method 获取分类列表数据
   */
  getClassList() {
    this.drag = this.selectComponent('#drag');
    wx.cloud.callFunction({
      name: 'adminClassList',
      data: {}
    })
      .then(res => {
        let datas = res.result.data;
        console.log(datas);
        datas.forEach(data => {
          data.forEach(item => {
            // item.dragId = `item${ index }`;
            item.bookkeepNum = 0;
            item.fixed = false;
          })
        })
        this.setData({
          listData: datas
        });

        this.drag.init();   // 拖动列表初始化
      })
      .catch(console.error)
  },
  /**
   * 赋值给activeType,并重新获取分类列表
   * @hook 顶部分类类型组件改变事件
   */
  handleTypeChange(e) {
    let value = e.detail;
    this.setData({
      activeType: value
    })
  },
  /**
   * 保存改变后的数据
   * @hook 数组拖动排序结束事件
   */
  sortEnd(e) {
    console.log("sortEnd", e.detail.listData)
    this.setData({
      listData: e.detail.listData
    });
  },
  /**
   * @hook 数组拖动排序改变事件
   */
  change(e) {
    console.log("change", e.detail.listData)
  },
  // sizeChange(e) {
  //   wx.pageScrollTo({ scrollTop: 0 })
  //   this.setData({
  //     size: e.detail.value
  //   });
  //   this.drag.init();
  // },
  /**
   * @hook 数组item点击事件
   */
  itemClick(e) {
    console.log(e);
  },
  // toggleFixed(e) {
  //   let key = e.currentTarget.dataset.key;

  //   let { listData } = this.data;

  //   listData[key].fixed = !listData[key].fixed

  //   this.setData({
  //     listData: listData
  //   });

  //   this.drag.init();
  // },
  // scroll(e) {
  //   this.setData({
  //     pageMetaScrollTop: e.detail.scrollTop
  //   })
  // },
  // 页面滚动
  onPageScroll(e) {
    this.setData({
      scrollTop: e.scrollTop
    });
  },
  /**
   * 携带当前记账类型参数,跳转到添加分类页面
   * @method 添加分类按钮点击事件
   */
  addClass() {
    let type = this.data.activeType;
    wx.navigateTo({
      url: `/pages/admin/addClass/addClass?type=${ type }`,
    })
  },
})