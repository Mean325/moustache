// components/bookkeepTypeBar/bookkeepTypeBar.js
Component({
  options: {
    multipleSlots: true,    // 启用多slot支持
  },
  properties: {

  },
  data: {
    types: [
      {
        name: "支出",
        type: 1
      },
      {
        name: "收入",
        type: 2
      },
    ],
    activeType: 1,
  },
  methods: {
    selectType(e) {
      let type = e.currentTarget.dataset.type;
      if (type !== this.data.activeType) {
        this.setData({
          activeType: type
        })
        this.triggerEvent('changeType', type);
      }
    },
  }
})
