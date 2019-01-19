// component/study/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    collectFlag: Boolean
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
    collect(){
      this.triggerEvent('collect', {
        val: this.properties.collectFlag
      })
    }
  }
})
