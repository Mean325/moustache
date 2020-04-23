/**
 * 格式化日期加时间
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/**
 * 格式化日期
 */
const formatDate = (time) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, month, day].map(formatNumber).join('-')
};

/**
 * 时间补齐2位
 */
const formatNumber = n => {
  return n.toString().padStart(2, "0")
}

/**
 * 获得年
 */
const getYear = () => new Date().getFullYear();

/**
 * 获得月
 */
const getMonth = () => {
  var m = new Date().getMonth() + 1;
  return formatNumber(m);
}

/**
 * 获得日
 */
const getDay = () => {
  return new Date().getDate();
}

/**
 * 获得当前日期
 */
const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, month, day].map(formatNumber).join('-')
}

/**
 * 获得礼拜几
 */
const getWeek = (d) => {
  let date;
  if (d) {
    date = new Date(d);
  } else {
    date = new Date();
  }
  var weekday = new Array(7)
  weekday[0] = "周日"
  weekday[1] = "周一"
  weekday[2] = "周二"
  weekday[3] = "周三"
  weekday[4] = "周四"
  weekday[5] = "周五"
  weekday[6] = "周六"
  return weekday[date.getDay()];
}

module.exports = {
  formatTime,
  formatDate,
  getDate,
  getWeek,
  getYear,
  getMonth,
  getDay
};