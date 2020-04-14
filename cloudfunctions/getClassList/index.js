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
  const { type } = event;

  // 查询当前用户是否有自定义分类列表
  let res = await db.collection('classList')
    .where({
      openid: wxContext.OPENID,
      type: type
    })
    .get();

  if (res.data.length) {   // 查询到数据时返回自定义分类数组
    return {
      data: res.data[0].list
    };
  } else {   // 查询不到数据时返回默认分类数组
    return await db.collection('_classList')
      .where({
        type: type
      })
      .get();
  }
}