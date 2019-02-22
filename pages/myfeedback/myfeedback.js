import { MeModel } from '../../models/me.js'

const meModel = new MeModel()
var app = getApp()
Page({
  data: {
    list: []
  },

  onLoad: function () {
    this.getList();
  },
  // 获取反馈列表
  getList(){
    meModel.getFeedback().then(res => {
      if (res.data.code == 200) {
        this.setData({
          list: res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.message,
          icon: "none"
        })
      }
    })
  }
})