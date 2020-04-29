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
            name: "aa",
            id: 1
          },
          {
            name: "ab",
            id: 2
          }
        ]
      },
      {
        alpha: "B",
        subItems: [
          {
            name: "bd",
            id: 3
          },
          {
            name: "bb",
            id: 4
          }
        ]
      },
      {
        alpha: "D",
        subItems: [
          {
            name: "dd",
            id: 5
          },
          {
            name: "db",
            id: 6
          }
        ]
      },
      {
        alpha: "F",
        subItems: [
          {
            name: "fd",
            id: 7
          },
          {
            name: "fb",
            id: 8
          }
        ]
      },
      {
        alpha: "我",
        subItems: [
          {
            name: "我d",
            id: 9
          },
          {
            name: "我b",
            id: 10
          }
        ]
      },
      {
        alpha: "Z",
        subItems: [
          {
            name: "zd",
            id: 11
          },
          {
            name: "zb",
            id: 12
          }
        ]
      },
      {
        alpha: "S",
        subItems: [
          {
            name: "sd",
            id: 13
          },
          {
            name: "sb",
            id: 14
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
    const { item, alphaIndex, subItemIndex } = e.detail;
    item.isSelected = !item.isSelected;
    this.setData({
      [`list[${ alphaIndex }].subItems[${ subItemIndex }]`]: item
    })
  }
})