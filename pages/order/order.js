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
    pageindex: 1,
    loading: false,
  },
  // tab切换
  getHistory(){
    var that = this;
    wx.getStorage({
      key: 'visited',
      success: function (res) {
        console.log(res, 'res')
        console.log(res.data, 'resdata')
        let arr = [];
        // res.data.forEach(data => {
        //   data.films.forEach((item) => {
        //     arr.unshift(item.data)
        //   })
        // })
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
  },
  tabsHandle: function(e){
    let that = this;
    that.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    if(that.data.currentTab == 1){
      this.getHistory();
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
    // this.getHistory()
  },
  //加载订单
  getOrderList(isbuy){
    if (wx.getStorageSync("token")) {
      this.data.loading = true;
      studyModel.getPayedList(isbuy,this.data.pageindex).then(res => {
        if (res.data.code == 200){
          this.data.loading = false;
          this.data.count = res.data.count;
          let list = res.data.data;
          this.data.finishList = this.data.finishList.concat(list)
          this.setData({
            finishList: this.data.finishList
          })
        }
      })
    } else {
      wx.showToast({
        title: '您还未登录',
      })
    }
  },
  onPullDownRefresh() {
    this.data.pageindex = 1;
    this.data.finishList = []
    this.getOrderList();
  },
  onReachBottom() {
    if (this.data.loading) {
      return
    }
    if (this.data.finishList.length < this.data.count) {
      this.data.pageindex += 1
      this.getOrderList()
    } else {
      wx.showToast({
        title: '没有更多数据',
        icon: 'none'
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