// component/share/index.js
import {
  config
} from '../../config.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    coursePicture: String,
    courseName: String,
    courseBrief: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    url: config.imgeurl,
    tempFilePath: null,
    showCanvas: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 取消
    cancel() {
      this.triggerEvent('cancelshare', {})
    },
    
    sharePic() {
      let name = this.properties.courseName;
      let brief = this.properties.courseBrief;
      let picture = this.data.url + this.properties.coursePicture;
      this.triggerEvent('share', {
        name: name,
        brief: brief,
        picture: picture
      })
    },

  }
})