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
  const { openid } = event;

  let res = await db.collection('_welcomeConfig')
    .where({
      openid: "o8Hls5RluXwV-Hktw2CNiiIEFe2M"
    })
    .get();

  return {
    data: res.data[0].config
  }
}