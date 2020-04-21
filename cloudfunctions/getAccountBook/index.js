// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  traceUser: true,
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  let { date, dateType } = event;

  if (dateType === 1) {   // 年
    date = date.split("/")[0];
  } else if (dateType === 2) {    // 月
    date = date.split("/").slice(0, 2).join("/");
  } else if (dateType === 3) { }    // 日
  
  return await db.collection('accountBook')
    .where({
      date: db.RegExp({
        regexp: date,
        options: 'i',
      })
    })
    .get()
}