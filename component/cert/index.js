// component/certificates/index.js
import {config} from "../../config.js"

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    certificates: {
      type: Array
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    globalimgeurl: config.imgeurl,
    currentIndex: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 证书左按钮
    leftTap: function () {
      this.data.currentIndex--;
      if (this.data.currentIndex < 0) {
        this.data.currentIndex = 0;
      }
      this.setData({
        currentIndex: this.data.currentIndex
      })
    },
    // 证书右按钮
    rightTap: function () {
      this.data.currentIndex++;
      if (this.data.currentIndex > (this.properties.certificates.length - 1)) {
        this.data.currentIndex = this.properties.certificates.length - 1
      }
      this.setData({
        currentIndex: this.data.currentIndex
      })
    },
  }
})
