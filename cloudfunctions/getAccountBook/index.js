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
  let { date, dateType, type, previous = 1, groupBy = "date", sortBy = "date" } = event;
  let dateArr = date.split("-")

  let accountList = [];
  for (let l = 0; l < previous; l++) {
    let regexp = dateArr.map(n => ("" + n).padStart(2, "0")).slice(0, dateType).join("-");

    let list = [];
    const countResult = await db.collection('accountBook')
      .where({
        openid,
        type,
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
          type,
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
    accountData = lodash.groupBy(list, groupBy);

    list = [];
    Object.keys(accountData).forEach((key, index) => {
      list[index] = {
        [groupBy]: key,
        list: accountData[key],
        incomeAmount: lodash.reduce(lodash.filter(accountData[key], { 'type': 2 }), (sum, n) => add(sum, n.num), 0),
        outlayAmount: lodash.reduce(lodash.filter(accountData[key], { 'type': 1 }), (sum, n) => add(sum, n.num), 0)
      }
    })
    console.log(list);
    if (sortBy === "date") {    // 按时间排序
      list = list.sort((a, b) => b.date.split("-")[2] - a.date.split("-")[2]);
    } else if (sortBy === "outlayAmount") {    // 按支出排序
      list = list.sort((a, b) => b[sortBy] - a[sortBy]);
    }
    console.log(list);
    if (dateType === 3) {   // 筛选时间为日时
      accountList = list[0];   // 可能问题,待修改         !!!
    } else {
      accountList.push({   // 筛选时间为年,月时
        month: Number(dateArr[1]),
        list: list,
        incomeAmount: lodash.reduce(list, (sum, n) => add(sum, n.incomeAmount), 0),
        outlayAmount: lodash.reduce(list, (sum, n) => add(sum, n.outlayAmount), 0)
      })
    }
    dateArr[dateType - 1]--;
  }
  console.log(accountList);
  return accountList;
}

// 解决浮点型加法精度丢失问题
function add(arg1, arg2) {
  let r1, r2, m
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}