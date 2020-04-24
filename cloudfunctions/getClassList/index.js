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
  // const { type } = event;

  let res = [];
  for (let l = 1; l < 3; l++) {
    // 查询当前用户是否有该类型的自定义分类列表
    let classList = await db.collection('classList')
      .where({
        openid: wxContext.OPENID,
        type: l
      })
      .get();
    if (classList.data.length) { // 查询到数据时返回自定义分类数组
      res.push(classList.data[0].list);
    } else { // 查询不到数据时返回默认分类数组
      let list = await db.collection('_classList')
        .where({
          type: l
        })
        .get();
      console.log(list.data);
      res.push(list.data);
    }
  }
  return {
    data: res
  };
}