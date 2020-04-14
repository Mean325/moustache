// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  traceUser: true,
})
const db = cloud.database()
const _ = db.command


// 云函数入口函数
exports.main = async (event, context) => {
  const { type, icon, name } = event;

  // 查询当前用户是否有自定义分类列表
  let res = await db.collection('classList')
    .where({
      openid: wxContext.OPENID,
      type: type
    })
    .get();   // 查询到数据时返回自定义分类数组
  
  if (res.data.length) {   // 查询到数据时
    let data = res.data[0].list
    data.push({
      type,
      icon,
      name
    })    // 插入新的分类
    // 保存新的数组
  } else {   // 查询不到数据时查询默认分类数组
    res = await db.collection('_classList')
      .where({
        type: type
      })
      .get();
    res.data.push({
      type,
      icon,
      name
    })    // 插入新的分类
    // 保存新的数组
  }
}