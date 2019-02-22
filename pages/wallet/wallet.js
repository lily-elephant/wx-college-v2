import { MeModel } from '../../models/me.js'

const meModel = new MeModel()
var app = getApp() 
Page({
  data: {
    remaining: 0
  },

  // 进入交易明细
  goTrade: function(){
    wx.navigateTo({
      url: '../trade/trade',
    })
  },
  // 进入充值
  goRecharge: function(){
    wx.navigateTo({
      url: '../recharge/recharge',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBalance()
    this.setData({
      isOnline: wx.getStorageSync("isOnline")
    })
  },
  getBalance() {
    meModel.getRemaining().then(res => {
      this.setData({
        remaining: res.data.data / 100
      })
    })
  },

})