// miniprogram/pages/tools/AA/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        alpha: "A",
        subItems: [
          {
            name: "aa"
          },
          {
            name: "ab"
          }
        ]
      },
      {
        alpha: "B",
        subItems: [
          {
            name: "bd"
          },
          {
            name: "bb"
          }
        ]
      },
      {
        alpha: "D",
        subItems: [
          {
            name: "dd"
          },
          {
            name: "db"
          }
        ]
      },
      {
        alpha: "F",
        subItems: [
          {
            name: "fd"
          },
          {
            name: "fb"
          }
        ]
      },
      {
        alpha: "我",
        subItems: [
          {
            name: "我d",
            id: "aaaa123"
          },
          {
            name: "我b"
          }
        ]
      },
      {
        alpha: "Z",
        subItems: [
          {
            name: "zd"
          },
          {
            name: "zb"
          }
        ]
      },
      {
        alpha: "S",
        subItems: [
          {
            name: "sd"
          },
          {
            name: "sb"
          }
        ]
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onChoose(e) {
    console.log(e)
  }
})