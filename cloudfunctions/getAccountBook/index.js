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
  let { date, dateType } = event;

  if (dateType === 1) {   // 年
    date = date.split("/")[0];
  } else if (dateType === 2) {    // 月
    date = date.split("/").slice(0, 2).join("/");
  } else if (dateType === 3) { }    // 日
  
  return await db.collection('accountBook')
    .orderBy('time', 'desc')
    .where({
      openid: wxContext.OPENID,
      date: db.RegExp({
        regexp: date,
        options: 'i',
      })
    })
    .get()  // 获取符合当前日期的账目数据根据时间戳降序
}