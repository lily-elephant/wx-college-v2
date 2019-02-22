var app = getApp()
import { MeModel } from '../../models/me.js'

const meModel = new MeModel();

Page({
  /**
   * 生命周期函数--监听页面加载
   */
  data: {
    details: {}
  },
  onLoad: function (options) {
    this.getDetail()
  },
  getDetail () {
    meModel.getAboutUs().then(res => {
      var obj = JSON.parse(res.data.data[0].content);
      this.setData({
        details: obj
      })
    })
  },

})