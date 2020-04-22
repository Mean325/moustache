// 记一笔账云函数

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
  const { num, type, category, remark, time } = event;
  let result;

  await db.collection('accountBook').add({
    data: {
      openid: wxContext.OPENID,
      num,
      type,
      category,
      remark,
      time
    },
    success(res) { //成功打印消息
      console.log('记账成功', res);
      result = {
        message: "记账成功",
        code: 200
      }
    },
    fail(res) { //存入数据库失败
      console.log('记账失败', res);
      result = {
        message: "记账失败",
        code: 400
      }
      //云函数更新
    }
  })
  return result;
}