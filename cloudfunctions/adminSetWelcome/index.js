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
  const { config, openid } = event;

  // 查询当前用户是否有自定义分类列表
  let res = await db.collection('_welcomeConfig')
    .where({
      openid: wxContext.OPENID || openid
    })
    .get();

  if (res.data.length) {   // 查询到数据时,修改
    await db.collection('_welcomeConfig').doc(res.data[0]._id).update({
      data: {
        config
      },
      success: res => {
        onsole.log('保存成功', res)
        return {
          message: "保存成功",
          res
        }
      },
      fail: err => {
        message: "保存失败"
      }
    })
  } else {   // 查询不到数据时,新增
    await db.collection('_welcomeConfig').add({
      data: {
        openid: wxContext.OPENID || openid,
        config
      },
      success: res => { //成功打印消息
        console.log('保存成功', res)
        return {
          message: "保存成功",
          res
        }
      },
      fail: res => { //存入数据库失败
        message: "保存失败"
      }
    })
  }
}