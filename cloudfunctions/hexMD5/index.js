// 云函数入口文件
var md5 = require('./md5.js');    // 引入md5加密

const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const { str } = event;

  return md5.hexMD5(str);
}