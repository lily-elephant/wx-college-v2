// component/catalog/index.js
import {
  config
} from '../../config.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    course: {
      type: Array,
      value: []
    },
    isOnline: {
      type: Boolean,
      value: true
    }
  },
  lifetimes:{
    attached(){
      
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    globalimgeurl: config.imgeurl,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    detail(e){
      let cid = e.currentTarget.dataset.cid;
      wx.navigateTo({
        url: '../coursedetail/coursedetail?cid=' + cid
      })
    },
    pay(e){
      const price = e.currentTarget.dataset.price
      const state = e.currentTarget.dataset.state
      if (price == 0 ||  state== 0 || !state){
        this.detail(e)
        return
      }
      this.triggerEvent('pay', e.currentTarget.dataset)
    }
  }
})
