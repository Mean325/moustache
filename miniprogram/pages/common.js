const delAccount = (accountId, func) => {
  wx.cloud.callFunction({
    name: 'delAccount',
    data: {
      _id: accountId
    }
  })
    .then(res => {
      console.log(res);
      if (res.result.stats.removed === 1) {
        wx.showToast({
          title: '删除成功'
        })
        wx.vibrateShort();
        func();
      }
    })
    .catch(console.error)
}

module.exports = {
  delAccount
}
