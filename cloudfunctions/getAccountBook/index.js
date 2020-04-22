// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  traceUser: true,
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  let { time, timeType, previous = 0 } = event;

  const date = new Date(time);
  date.setHours(0);
  date.setSeconds(0);
  date.setMinutes(0);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  let timestamps;
  if (timeType === 1) {   // 年
    date.setMonth(0);
    timestamps = [date.setDate(1 - previous), date.setYear(year + 1) - 1000];
    console.log(timestamps);
  } else if (timeType === 2) {    // 月
    const monthDay = new Date(year, month, 0).getDate();
    date.setDate(1);
    timestamps = [date.setMonth(month - previous), date.setMonth(month + 1) - 1000];
    console.log(timestamps);
  } else if (timeType === 3) {
    timestamps = [date.setDate(day - previous), date.setDate(day + 1) - 1000];
    console.log(timestamps);
  }    // 日

  return await db.collection('accountBook')
    .orderBy('time', 'desc')
    .where({
      openid: wxContext.OPENID,
      time: _.gte(timestamps[0]).and(_.lte(timestamps[1]))
    })
    .get()  // 获取符合当前日期的账目数据根据时间戳降序
}