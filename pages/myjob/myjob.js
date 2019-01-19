import { JobModel } from '../../models/job.js'
const jobModel = new JobModel()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabHeader: ['我的简历', '已收藏职位', '已应聘职位'],
    currentTab: 1,
    applyedArr: [], // 已应聘数组
    collectArr: [], // 已收藏数组
    experiences: [
      { label: '工作经验1' },
      { label: '工作经验工作经验工作经验' },
      { label: '工作经验工作经验工作经验' },
    ], // 工作经验
  },
  // 事件函数
  tabHandle(e) {
    let idx = e.currentTarget.dataset.idx;
    this.setData({
      currentTab: idx
    })
    // if(this.data.currentTab == 1){
    //   this._getMyApply();
    // }
  },
  // 获取我的求职列表
  _getMyApply() {
    jobModel.getMyJob().then(res => {
      if (res.data.code == 200) {
        if (res.data.data != undefined) {
          if (!res.data.data) {
            res.data.data = []
          }
          let list = res.data.data;
          this.data.applyedArr = this.data.applyedArr.concat(list)
          this.setData({
            applyedArr: this.data.applyedArr
          })
        } else {
          wx.showToast({
            title: '没有更多数据',
          })
        }
      }
    })
  },
  // 获取收藏数据
  _getMyCollect() {
    jobModel.getMyJob().then(res => {
      if (res.data.code == 200) {
        if (res.data.data != undefined) {
          if (!res.data.data) {
            res.data.data = []
          }
          let list = res.data.data;
          this.data.collectArr = this.data.collectArr.concat(list)
          this.setData({
            collectArr: this.data.collectArr
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
  collectJob(e) {
    let value = e.detail.val ? false : true;
    let msg = e.detail.val ? '取消收藏' : '收藏成功'
    wx.showToast({
      title: msg,
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getMyApply();
    this._getMyCollect();
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

