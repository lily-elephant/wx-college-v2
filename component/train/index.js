// component/train/index.js
import { config } from '../../config.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isOnline: {
      type: Boolean,
      value: false
    },
    train: {
      type: Object,
      value: {}
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
    goTrain(){
      this.triggerEvent('traindetail', this.properties.train)
    }
  }
})
