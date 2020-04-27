// miniprogram/pages/tools/tools.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: {
      onItemTap: 'onGridItemTap',
      list: [{
        icon: '/images/tools/AA.png',
        title: '搜索条目',
        entitle: 'Collapse',
        page: '/page/biz/pages/collapse/index',
      }, {
        icon: '/images/tools/AA.png',
        title: 'AA算账',
        entitle: 'Dropdown',
        page: '/page/biz/pages/dropdown/index',
      }, {
        icon: '/images/tools/AA.png',
        title: '汇率转换',
        entitle: 'ErrorView',
        page: '/page/biz/pages/error-view/index',
      }, {
        icon: '/images/tools/AA.png',
        title: '宫格',
        entitle: 'Grid',
        page: '/page/biz/pages/grid/index',
      }, {
        icon: '/images/tools/AA.png',
        title: '列表',
        entitle: 'List',
        page: '/page/biz/pages/list/index',
      }, {
        icon: '/images/tools/AA.png',
        title: '标签',
        entitle: 'Tag',
        page: '/page/biz/pages/tag/index',
      }],
    },
  },
  onShow() {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showModal({
      title: '通知',
      content: '工具页面还在开发中',
      showCancel: false
    })
  },
  onGridItemTap(e) {
    const page = this.data.arr.list[e.currentTarget.dataset.index].page;
    console.log(page);
    // wx.navigateTo({ url: page });
  },
})