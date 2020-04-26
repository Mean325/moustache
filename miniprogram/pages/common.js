const delAccount = (accountId, func) => {
  wx.showModal({
    content: '删除后无法恢复,是否删除?',
    confirmText: '删除',
    confirmColor: '#fa5151',
    success: res => {
      if (res.confirm) {
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
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}

module.exports = {
  delAccount
}
