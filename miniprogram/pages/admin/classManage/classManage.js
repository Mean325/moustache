let listData = [
  {
    dragId: "item0",
    title: "餐饮",
    bookkeepNum: 1,
    images: "/images/class/hanbao.png",
    icon: "icon-baomihua",
    fixed: false
  },
  {
    dragId: "item1",
    title: "日用",
    bookkeepNum: 1,
    images: "/images/class/canju.png",
    fixed: false
  },
  {
    dragId: "item2",
    title: "交通",
    bookkeepNum: 0,
    images: "/images/class/huoguo.png",
    fixed: false
  },
  {
    dragId: "item3",
    title: "娱乐",
    bookkeepNum: 0,
    images: "/images/class/dangao.png",
    fixed: false
  },
  {
    dragId: "item4",
    title: "服饰",
    bookkeepNum: 0,
    images: "/images/class/dianying.png",
    fixed: false
  },
  {
    dragId: "item5",
    title: "美容",
    bookkeepNum: 0,
    images: "/images/class/jiandao-.png",
    fixed: false
  },
  {
    dragId: "item6",
    title: "书籍",
    bookkeepNum: 0,
    images: "/images/class/xuegao.png",
    fixed: false
  },
  {
    dragId: "item7",
    title: "母婴",
    bookkeepNum: 0,
    images: "/images/class/jiandao-.png",
    fixed: false
  },
  {
    dragId: "item8",
    title: "数码",
    bookkeepNum: 0,
    images: "/images/class/switch.png",
    fixed: false
  },
  {
    dragId: "item9",
    title: "旅行",
    bookkeepNum: 0,
    images: "/images/class/kafei.png",
    fixed: false
  },
  {
    dragId: "item10",
    title: "宠物",
    bookkeepNum: 0,
    images: "/images/class/kafei.png",
    fixed: false
  },
  {
    dragId: "item11",
    title: "住房",
    bookkeepNum: 0,
    images: "/images/class/kafei.png",
    fixed: false
  },
  {
    dragId: "item12",
    title: "医疗",
    bookkeepNum: 0,
    images: "/images/class/kafei.png",
    fixed: false
  },
  {
    dragId: "item13",
    title: "通讯",
    bookkeepNum: 0,
    images: "/images/class/kafei.png",
    fixed: false
  }
];

Page({
  data: {
    activeType: 1,    // 当前分类类型,1为支出,2为收入
    listData: [],
    pageMetaScrollTop: 0,
    scrollTop: 0,
  },
  onLoad() {
    this.drag = this.selectComponent('#drag');
    // 模仿异步加载数据
    setTimeout(() => {
      this.getClassList();
      this.drag.init();
    }, 1000)
  },
  /**
   * 调用云函数adminClassList获取
   * @method 获取分类列表数据
   */
  getClassList() {
    wx.cloud.callFunction({
      name: 'adminClassList',
      data: {
        type: "1"
      }
    })
      .then(res => {
        console.log(res.result.data);
        this.setData({
          listData: res.result.data
        });
      })
      .catch(console.error)
  },
  sortEnd(e) {
    console.log("sortEnd", e.detail.listData)
    this.setData({
      listData: e.detail.listData
    });
  },
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
  itemClick(e) {
    console.log(e);
  },
  toggleFixed(e) {
    let key = e.currentTarget.dataset.key;

    let { listData } = this.data;

    listData[key].fixed = !listData[key].fixed

    this.setData({
      listData: listData
    });

    this.drag.init();
  },
  scroll(e) {
    this.setData({
      pageMetaScrollTop: e.detail.scrollTop
    })
  },
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