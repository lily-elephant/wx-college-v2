var app = getApp()
import { MeModel } from '../../models/me.js'

const meModel = new MeModel();
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail() 
  },
  getDetail() {
    meModel.getBill().then(res => {
      this.setData({
        list: res.data.data
      })
    })
  }
})