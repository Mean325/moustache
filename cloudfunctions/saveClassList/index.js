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
  const { list } = event;

  // 查询当前用户是否有自定义分类列表
  let data = await db.collection('classList')
    .where({
      openid: wxContext.OPENID,
    })
    .get();

  if (data) {   // 查询到数据时,修改
    await db.collection('classList').doc(data._id).update({
      data: {
        list
      },
      success: res => {
        onsole.log('更改成功', res)
        return {
          message: "更改成功",
          res
        }
      },
      fail: err => {
        message: "更改失败"
      }
    })
  } else {   // 查询不到数据时,新增
    await db.collection('classList').add({
      data: {
        openid: wxContext.OPENID,
        list
      },
      success: res => { //成功打印消息
        console.log('更改成功', res)
        return {
          message: "更改成功",
          res
        }
      },
      fail: res => { //存入数据库失败
        message: "更改失败"
      }
    })
  }
}