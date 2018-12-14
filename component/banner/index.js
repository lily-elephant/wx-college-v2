// component/banner/index.js
import {config} from '../../config.js'
import { BannerModel } from '../../models/banner.js'

const bannerModel = new BannerModel();

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    bannerArr: [],
    indicatorDots: true, // 显示指示点
    autoplay: true, // 自动切换
    interval: 5000, // 切换时间间隔
    duration: 500, // 滑动动画时长
    globalimgeurl: config.imgeurl,
  },
  lifetimes: {
    attached: function () {
      this.bannerList();
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 获取banner改写
    bannerList() {
      bannerModel.getBannerList().then((res) => {
        if (res.data.data) {
          this.setData({
            bannerArr: res.data.data
          })
        } else {
          wx.showToast({
            title: '没有更多数据'
          })
        }
      })
    },
    // 点击banner跳转，传递banner详情信息
    jump(e){
      console.log(e)
      this.triggerEvent('banner',e.currentTarget.dataset.detail)
    }
    
  }
})
