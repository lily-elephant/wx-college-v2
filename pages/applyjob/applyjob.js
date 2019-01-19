import { JobModel } from '../../models/job.js'
const jobModel = new JobModel()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobArr: [],
  },

  // 获取我的求职列表
  _getMyjob() {
    jobModel.getMyJob().then(res => {
      if (res.data.code == 200) {
        if (res.data.data != undefined) {
          if (!res.data.data) {
            res.data.data = []
          }
          let list = res.data.data;
          this.data.jobArr = this.data.jobArr.concat(list)
          this.setData({
            jobArr: this.data.jobArr
          })
        } else {
          wx.showToast({
            title: '没有更多数据',
          })
        }
      }
    })
  },
  // 点击收藏
  collectJob(e){
    let value = e.detail.val ? false: true;
    let msg = e.detail.val ? '取消收藏' : '收藏成功'
    wx.showToast({
      title: msg,
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getMyjob();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})