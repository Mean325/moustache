var lodash = require('./lodash.js');    // 引入lodash

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
  const openid = wxContext.OPENID;
  let { date, dateType, previous = 1 } = event;
  let dateArr = date.split("-")

  let accountList = [];
  for (let l = 0; l < previous; l++) {
    let regexp = dateArr.slice(0, dateType).join("-");

    let list = [];
    const countResult = await db.collection('accountBook')
      .where({
        openid,
        date: db.RegExp({
          regexp: regexp,
          options: 'i',
        })
      })
      .count();
    const total = countResult.total;   // 取出集合记录总数
    console.log(total);
    // 计算需分几次取

    const batchTimes = Math.ceil(total / MAX_LIMIT);
    console.log("需要多少次:" + batchTimes);
    for (let i = 0; i < batchTimes; i++) {
      const promise = await db.collection('accountBook')
        .where({
          openid,
          date: db.RegExp({
            regexp: regexp,
            options: 'i',
          })
        })
        .skip(i * MAX_LIMIT)
        .limit(MAX_LIMIT)
        .get();
      list.push(promise.data);
      console.log(list);
    }
    console.log(list);
    if (list.length) list = list.reduce((acc, cur) => {
      return acc.concat(cur)
    })
    console.log(list);
    accountData = lodash.groupBy(list, 'date');

    list = [];
    Object.keys(accountData).forEach((key, index) => {
      list[index] = {
        date: key,
        list: accountData[key],
        incomeAmount: lodash.reduce(lodash.filter(accountData[key], { 'type': 2 }), (sum, n) => sum + n.num, 0),
        outlayAmount: lodash.reduce(lodash.filter(accountData[key], { 'type': 1 }), (sum, n) => sum + n.num, 0)
      }
    })
    console.log(list);
    if (dateType === 3) {   // 筛选时间为日时
      accountList = list[0];   // 可能问题,待修改         !!!
    } else {
      accountList.push({   // 筛选时间为年,月时
        month: Number(dateArr[1]),
        list: list,
        incomeAmount: lodash.reduce(list, (sum, n) => sum + n.incomeAmount, 0),
        outlayAmount: lodash.reduce(list, (sum, n) => sum + n.outlayAmount, 0)
      })
    }
    dateArr[dateType - 1]--;
  }
  console.log(accountList);
  return accountList;
}