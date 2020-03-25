// miniprogram/pages/statistics/statistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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

  },
  afterCalendarRender() {
    const todoLabels = this.calendar.getTodoLabels('#calendar');
    this.calendar.setTodoLabels({
      // 待办点标记设置
      pos: 'bottom', // 待办点标记位置 ['top', 'bottom']
      dotColor: '#40', // 待办点标记颜色
      circle: false, // 待办圆圈标记设置（如圆圈标记已签到日期），该设置与点标记设置互斥
      showLabelAlways: true, // 点击时是否显示待办事项（圆点/文字），在 circle 为 true 及当日历配置 showLunar 为 true 时，此配置失效
      days: [
        {
          year: 2020,
          month: 3,
          day: 26,
          todoText: '待办'
        }
      ]
    });
  },
  dayClick: function (event) {
    console.log(event.detail);
  }
})