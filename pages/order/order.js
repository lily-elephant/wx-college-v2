// pages/order/order.js
import { StudyModel } from '../../models/study.js'
const studyModel = new StudyModel();
const app = getApp();
Page({
  data: {
    tabsArr: ['已购买', '已浏览'],
    currentTab: 0, // 默认显示第一个
    isbuy: 0,  //[0：待支付；1：已支付]
    finishList: [], // 已支付
    historyArr: [], // 已浏览历史记录
    globalimgeurl: app.globalData.imgeurl,
    isOnline: wx.getStorageSync('isOnline'),
    payFlag: false,
    price: null,
    payList: [],
  },
  // tab切换
  tabsHandle: function(e){
    let that = this;
    that.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    if(that.data.currentTab == 1){
      wx.getStorage({
        key: 'visited',
        success: function (res) {
          let arr = [];
          res.data[0].films.forEach((item) => {
            arr.unshift(item.data)
          })
          that.setData({
            historyArr: arr
          })
          console.log(that.data.historyArr)
        },
        fail: function (res) {
          console.log(res.data)
          wx.showToast({
            title: '您还没有浏览记录',
            icon: 'none'
          })
        }
      })
    }
  },
  // 点击购买
  buy(e) {
    console.log(e)
    this.setData({
      payFlag: true,
      price: e.detail.price,
      cid: e.detail.cid
    })
  },
  // 取消
  cancel() {
    this.setData({
      payFlag: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(){
    this.getOrderList(1);
  },
  onShow: function (options) {
    var that = this;
    that.setData({
      isLogin:wx.getStorageSync('token')
    })
  },
  //加载订单
  getOrderList(isbuy){
    if (wx.getStorageSync("token")) {
      studyModel.getPayedList(isbuy).then(res => {
        if (res.data.code == 200){
          if (res.data.data != null) {
            for (var i = 0; i < res.data.data.length; i++) {
              res.data.data[i].create_time = res.data.data[i].create_time.substring(0, res.data.data[i].create_time.length - 2)
              res.data.data[i].update_time = res.data.data[i].update_time.substring(0, res.data.data[i].update_time.length - 2)
            }
          }
          this.setData({
            finishList: res.data.data
          })
        }
      })
    } else {
      wx.showToast({
        title: '您还未登录',
      })
    }
  },
  //删除
  deleteOrder:function(e){
    var that = this;
    let ocid = e.currentTarget.dataset.ocid
    if(wx.getStorageSync('token')){
      wx.request({
        url: app.globalData.url + 'deletecourse',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Token': wx.getStorageSync('token')
        },
        data: {
          ocid:ocid
        },
        success:function(res){
          if(res.data.code == 200){
            wx.showToast({
              title: '删除成功！',
              icon:'success'
            })
            that.getOrderList(0)
          }
        }
      })
    }
  },
  // 
  gojump(e){
    wx.navigateTo({
      url: '../coursedetail/coursedetail?cid=' + e.currentTarget.dataset.cid 
    })
  }
})