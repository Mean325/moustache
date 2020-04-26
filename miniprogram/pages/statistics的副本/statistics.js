const utils = require("../../utils/utils.js");
const app = getApp();

Page({
  mixins: [require('../../mixin/themeChanged')],
  data: {
    selectedDate: "",   // 选中的月份,用于查询月账单
    selectedDateArr: [],    // 选中的月份数组,仅用于页面展示
    daysData: [],   // 每日金额数据,用于渲染到日历中
    calendar: null,
    calendarConfig: {
      // 配置内置主题
      theme: 'elegant',
      defaultDay: true,
      markToday: '今',
      highlightToday: true,
      onlyShowCurrentMonth: true,
      hideHeadOnWeekMode: true,
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.bindDateChange({
      detail: {
        value: utils.getDate()
      }
    })
    this.getMonthAccount();
  },
  /**
   * @hook 日历渲染后事件
   */
  afterCalendarRender() {
    const todoLabels = this.calendar.getTodoLabels('#calendar');
    this.calendar.setTodoLabels({
      // 待办点标记设置
      pos: 'bottom', // 待办点标记位置 ['top', 'bottom']
      dotColor: '#40', // 待办点标记颜色
      circle: false, // 待办圆圈标记设置（如圆圈标记已签到日期），该设置与点标记设置互斥
      showLabelAlways: true, // 点击时是否显示待办事项（圆点/文字），在 circle 为 true 及当日历配置 showLunar 为 true 时，此配置失效
      days: this.data.daysData
    });
  },
  /**
   * @method 日历日期点击事件
   */
  dayClick: function (event) {
    console.log(event.detail);
  },
  /**
   * 获取当前月份的月账单
   * @hook 日期改变事件钩子
   */
  bindDateChange(e) {
    let value = e.detail.value;
    this.setData({
      selectedDate: value,
      selectedDateArr: value.split("-")
    })
    this.getMonthAccount();
  },
  /**
   * @method 获取月账单数据
   */
  getMonthAccount() {
    let date = this.data.selectedDate;

    wx.cloud.callFunction({
      name: 'getAccountBook',
      data: {
        date,
        dateType: 2,  // 日期类型,1为年,2为月,3为日
      }
    })
      .then(res => {
        let result = res.result;
        console.log(result);
        let list = result[0].list;
        console.log(list);
        let data = [];
 
        list.forEach(day => {
          let arr = day.date.split("-").map(n => Number(n));
          data.push({
            year: arr[0],
            month: arr[1],
            day: arr[2],
            todoText: "-" + day.outlayAmount
          })
        })
        console.log(data);
        this.setData({
          daysData: data
        })
        this.afterCalendarRender();
      })
      .catch(console.error)
  }
})