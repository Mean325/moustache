// AA记账 - 添加/编辑团队

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
  const { name } = event;

  const res = await db.collection('AA_item').add({
    data: {
      createTime: new Date().getTime(),
      name
    }
  });
  if (res._id) {
    console.log('添加团队成功')
    console.log(res);
    await db.collection('AA_user_item').add({
      data: {
        _openid: wxContext.OPENID,
        _itemId: res._id
      }
    })
      .then(resq => {
        console.log('用户与团队管理表创建成功')
        console.log(resq);
        return resq;
      })
  }
}