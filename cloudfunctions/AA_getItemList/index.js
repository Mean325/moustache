// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  traceUser: true,
})
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let res = [];
  // for (let l = 1; l < 3; l++) {
    let list = await db.collection('AA_user_item')
      .where({
        _openid: wxContext.OPENID
      })
      .get();
    console.log(list.data);
    res.push(list.data);
  // }
  return {
    data: res
  };
}