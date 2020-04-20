let iconList = [
  "/images/class/baomihua.png",
  "/images/class/canyin.png",
  "/images/class/dangao.png",
  "/images/class/diannao.png",
  "/images/class/dianying.png",
  "/images/class/duanxiu.png",
  "/images/class/hanbao.png",
  "/images/class/huoguo.png",
  "/images/class/jiandao.png",
  "/images/class/jianshen.png",
  "/images/class/kafei.png",
  "/images/class/lifa.png",
  "/images/class/qunzi.png",
  "/images/class/shuben.png",
  "/images/class/shutiao.png",
  "/images/class/switch.png",
  "/images/class/xuegao.png",
  "/images/class/yaowan.png",
  "/images/class/youxiji-1.png",
  "/images/class/youxiji-2.png",
];

const md5 = require('./../../utils/md5.js');    // 引入md5加密

Page({
  data: {
    iconList: [],   // 图标列表
    activeClass: {
      iconIndex: 0,
      icon: iconList[0],
      name: ""
    }   // 当前active的分类
  },
  /**
   * @hook 页面加载时,获取当前路由参数
   */
  onLoad(options) {
    console.log(options.type);
    this.setData({
      iconList
    });
  },
  /**
   * 实现数据双向绑定
   * @hook 顶部分类名称input输入事件
   */
  handleInputChange(e) {
    setTimeout(() => {
      this.setData({
        'activeClass.name': e.detail.value
      })
    }, 200);
  },
  /**
   * 修改当前icon数据
   * @method 图标点击事件
   */
  selectIcon(e) {
    let { icon, iconIndex } = e.currentTarget.dataset;
    this.setData({
      'activeClass.icon': icon,
      'activeClass.iconIndex': iconIndex
    })
  },
  /**
   * 调用云函数adminAddClass新增用户默认分类
   * @method 底部添加分类事件
   */
  addClass() {
    let pages = getCurrentPages();
    let { options } = pages.pop();
    let type = Number(options.type);   // 获取路由参数type
    console.log(type);

    let time = new Date().getTime();
    let _id = md5.hexMD5(time);   // 与微信云储存保持一致

    let { name, icon } = this.data.activeClass;
    console.log(name);
    if (!type) {
      wx.showToast({
        title: '出错啦,请返回上一页重新进入',
        icon: 'none',
      })
      return;
    }
    if (!name) {
      wx.showToast({
        title: '请输入分类名称',
        icon: 'none',
      })
      return;
    }
    if (!icon) {
      wx.showToast({
        title: '请输入分类图标',
        icon: 'none',
      })
      return;
    }
    console.log("调用云函数");
    wx.cloud.callFunction({
      name: 'addClass',
      data: {
        type,
        name,
        icon,
        _id
      }
    })
      .then(res => {
        console.log(res);
        wx.showToast({
          title: '添加成功',
          icon: 'none',
        })
        wx.navigateBack();    // 返回上一页
      })
      .catch(console.error)
  }
})