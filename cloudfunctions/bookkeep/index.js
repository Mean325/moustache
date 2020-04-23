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
  let { _id, num, type, category, remark, date, updateTime } = event;

  let result;
  if (_id) {    // 含_id时,更新数据库该条数据
    await db.collection('accountBook').doc(_id).update({
      data: {
        openid: wxContext.OPENID,
        num,
        type,
        category,
        remark,
        date,
        updateTime
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
  } else {    // 不含_id时,新增该条数据
    if (!_id) {   // 当账目没有_id时,判断为新增,根据time和openid生成_id
      let res = await cloud.callFunction({
        name: 'hexMD5',
        data: {
          str: updateTime + wxContext.OPENID
        }
      })
      _id = res.result;
    }
    console.log(_id);
    await db.collection('accountBook').add({
      data: {
        _id,
        openid: wxContext.OPENID,
        num,
        type,
        category,
        remark,
        date,
        updateTime
      },
      success: res => {   // 成功打印消息
        console.log('记账成功', res);
        result = {
          message: "记账成功",
          code: 200
        }
      },
      fail: res => {    // 存入数据库失败
        console.log('记账失败', res);
        result = {
          message: "记账失败",
          code: 400
        }
      }
    })
  }

  // // 根据time查找对应的月账本
  // const date = new Date(time);
  // const year = date.getFullYear();
  // const month = date.getMonth();
  // const day = date.getDate();
  // console.log(year + "/" + month);
  // const _accountBook = await db.collection('accountBook')
  //   .where({
  //     openid: wxContext.OPENID,
  //     date: year + "/" + month
  //   })
  //   .get();
  // console.log(_accountBook);
  // let accountBook = _accountBook.data[0];
  // console.log(accountBook);
  // accountEntry = {
  //   num,
  //   category,
  //   remark,
  //   time,
  //   _id
  // }     // 新增/改动的账目对象

  // if (accountBook) {   // 已有账本时
  //   let list = accountBook.list;
  //   console.log(1);
  //   let index = list.findIndex(n => n._id === _id);
  //   console.log(index);
  //   if (index >= 0) {   // 已有该_id数据时,修改数据
  //     list[index] = accountEntry;
  //   } else {   // 没有该_id数据时,新增数据
  //     list.push(accountEntry);
  //   }
  //   console.log(accountBook._id);
  //   await db.collection('accountBook').doc(accountBook._id).update({
  //     data: {
  //       list: list
  //     },
  //     success: res => {
  //       onsole.log('记账成功', res)
  //       return {
  //         message: "记账成功",
  //         res
  //       }
  //     },
  //     fail: err => {
  //       message: "记账失败"
  //     }
  //   })
  // } else {   // 没有有账本时,新建账本并添加数据
  //   console.log(2);
  //   await db.collection('accountBook').add({
  //     data: {
  //       openid: wxContext.OPENID,
  //       type,
  //       date: year + "/" + month,
  //       list: [accountEntry]
  //     },
  //     success: res => {   // 成功打印消息
  //       console.log('记账成功', res);
  //       result = {
  //         message: "记账成功",
  //         code: 200
  //       }
  //     },
  //     fail: res => {    // 存入数据库失败
  //       console.log('记账失败', res);
  //       result = {
  //         message: "记账失败",
  //         code: 400
  //       }
  //       //云函数更新
  //     }
  //   })
  // }
  return result;
}