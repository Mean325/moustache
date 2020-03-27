let listData = [
  {
    dragId: "item0",
    title: "分类1",
    description: "1条记录",
    images: "/images/console-entrance.png",
    fixed: false
  },
  {
    dragId: "item1",
    title: "分类1",
    description: "1条记录",
    images: "/images/console-entrance.png",
    fixed: false
  },
  {
    dragId: "item2",
    title: "分类2",
    description: "1条记录",
    images: "/images/console-entrance.png",
    fixed: false
  },
  {
    dragId: "item3",
    title: "分类3",
    description: "1条记录",
    images: "/images/console-entrance.png",
    fixed: false
  },
  {
    dragId: "item4",
    title: "分类4",
    description: "1条记录",
    images: "/images/console-entrance.png",
    fixed: false
  },
  {
    dragId: "item5",
    title: "分类5",
    description: "1条记录",
    images: "/images/console-entrance.png",
    fixed: false
  },
  {
    dragId: "item6",
    title: "分类6",
    description: "1条记录",
    images: "/images/console-entrance.png",
    fixed: false
  },
  {
    dragId: "item7",
    title: "分类7",
    description: "1条记录",
    images: "/images/console-entrance.png",
    fixed: false
  },
  {
    dragId: "item8",
    title: "分类8",
    description: "1条记录",
    images: "/images/console-entrance.png",
    fixed: false
  },
  {
    dragId: "item9",
    title: "分类9",
    description: "1条记录",
    images: "/images/console-entrance.png",
    fixed: false
  }
];

Page({
  data: {
    size: 1,
    listData: [],
    pageMetaScrollTop: 0,
    scrollTop: 0,
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
  sizeChange(e) {
    wx.pageScrollTo({ scrollTop: 0 })
    this.setData({
      size: e.detail.value
    });
    this.drag.init();
  },
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
  onLoad() {
    this.drag = this.selectComponent('#drag');
    // 模仿异步加载数据
    setTimeout(() => {
      this.setData({
        listData: listData
      });
      this.drag.init();
    }, 1000)
  },
  addClass() {
    let type = this.data.activeType;
    wx.navigateTo({
      url: `/pages/addClass/addClass?type=${ type }`,
    })
  }
})