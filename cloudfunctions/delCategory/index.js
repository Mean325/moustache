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
  const { _id, type } = event;


  // 查询当前用户是否有该类型的自定义分类列表
  let classList = await db.collection('classList')
    .where({
      openid: wxContext.OPENID,
      type
    })
    .get();
  let list = classList.data[0].list;
  if (list.length) { // 查询到数据时返回自定义分类数组
    console.log(list);
  } else { // 查询不到数据时返回默认分类数组
    let res = await db.collection('_classList')
      .where({
        type: l
      })
      .get();
    list = res.data;
    console.log(list);
  }

  let index = list.findIndex(n => n._id === _id);
  console.log(index);
  if (index > -1) {
    list.splice(index, 1);
  }   // 删除数组中的该条数据

  const saveRes = await cloud.callFunction({
    name: 'saveClassList',
    data: {
      type,
      list,
      openid: wxContext.OPENID
    }
  })    // 保存新的数组
  console.log(saveRes)
  return saveRes.result;
}