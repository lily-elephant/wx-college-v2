// component/bannerdetail/bannerDetail.js
import {config} from '../../config.js'

Component({
  /**
   * 组件的属性列表
   */
  options: { multipleSlots: true },
  properties: {
    bannerdetail: {
      type: Array,
      value: []
    },
    hidden: {
      type: Boolean,
      type: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    globalimgeurl: config.imgeurl
  },

  /**
   * 组件的方法列表
   */
  methods: {
    listenerVideo: function (e) {
      console.log(e.detail.errMsg);
    },
    back(){
      this.triggerEvent('back', {})
    }
  }
})
