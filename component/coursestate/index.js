// component/coursestate/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isOnline:{
      type: Boolean,
      value: true
    },
    isBuy: {
      type: Number,
      value: 0
    },
    cid:{
      type: String,
      value: ''
    },
    price: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    pay(e) {
      const price = this.properties.price
      const state = this.properties.isBuy
      const cid = this.properties.cid
      if (price == 0 || state == 0 || !state) {
        wx.navigateTo({
          url: '../coursedetail/coursedetail?cid=' + cid
        })
        return
      }
      this.triggerEvent('pay', e.currentTarget.dataset)
    }
  }
})
