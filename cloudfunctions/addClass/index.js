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
  const { type, icon, name, _id } = event;

  // 查询当前用户是否有自定义分类列表
  let res = await db.collection('classList')
    .where({
      openid: wxContext.OPENID,
      type: type
    })
    .get();   // 查询到数据时返回自定义分类数组
  console.log(res);
  let list;
  if (res.data.length) {   // 查询到数据时
    list = res.data[0].list;
    list.push({
      type,
      icon,
      name,
      _id
    })    // 插入新的分类
  } else {   // 查询不到数据时查询默认分类数组
    _list = await db.collection('_classList')
      .where({
        type: type
      })
      .get();
    console.log(_list);
    _list.data.push({
      type,
      icon,
      name,
      _id
    })    // 插入新的分类
    list = _list.data;
  }

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