// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  traceUser: true,
})
const db = cloud.database()
const _ = db.command
const MAX_LIMIT = 100

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

  let timestamps = [];
  console.log(timeType);
  if (timeType === 1) {   // 年
    date.setMonth(0);
    for (let i = 0; i < previous; i++) {
      timestamps[i] = [date.setDate(1 - i), date.setYear(year + 1 - i) - 1000];
    }
    console.log(timestamps);
  } else if (timeType === 2) {    // 月
    //  const monthDay = new Date(year, month, 0).getDate();
    date.setDate(1);
    for (let i = 0; i < previous; i++) {
      timestamps[i] = [date.setMonth(month - i), date.setMonth(month + 1 - i) - 1000];
    }
    console.log(timestamps);
  } else if (timeType === 3) {
    timestamps[0] = [date.setDate(day - previous), date.setDate(day + 1) - 1000];
    console.log(timestamps);
  }    // 日

  // 取出集合记录总数
  console.log(timestamps[0][0]);
  console.log(timestamps[timestamps.length - 1][1]);
  const countResult = await db.collection('accountBook')
    .where({
      openid: wxContext.OPENID,
      time: _.gte(timestamps[timestamps.length - 1][0]).and(_.lte(timestamps[0][1]))
    })
    .count();
  const total = countResult.total;
  console.log(total);
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100);
  console.log(batchTimes);
  // 承载所有读操作的 promise 的数组
  const accountList = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('accountBook').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    accountList.push(promise)
  }
  let aa = await Promise.all(accountList);
  console.log(aa);
  // 等待所有
  return (await Promise.all(accountList)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })
}