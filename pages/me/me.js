var app = getApp()
var util = require("../../utils/util.js");
import { MeModel } from '../../models/me.js';

const meModel = new MeModel();

Page({
  data: {
    name: '', // 雇主姓名
    imgUrl: '', // 头像
    phoneNum: '',
    isShow:true, // 电话号码
    globalimgeurl: app.globalData.imgeurl,
  },
  //判断是否登录未登录登录
  goLogin: function () {
    if (!wx.getStorageSync("token")) {
      util.isToken()
    }
  },
  // 更换头像
  // changeAvatar: function(){
  //   if (wx.getStorageSync("token")) {                            
  //     wx.chooseImage({
  //       count: 1, // 默认9
  //       sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //       sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //       success: function (res) {
  //         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //         var tempFilePaths = res.tempFilePaths
  //       }
  //     })
  //   } else {
  //     util.isToken()
  //   }
    
  //},
  // 进入个人信息
  goInfo: function(){
    var that = this;
    if (wx.getStorageSync("token")) {
      wx.navigateTo({
        url: '../personalinfo/personalinfo?phone=' + that.data.phoneNum +'&name=' + that.data.name,
      })
    } else {
      util.isToken()
    }
    
  },
  // 进入我的钱包
  goWallet: function(){
    if (wx.getStorageSync("token")) {
      wx.navigateTo({
        url: '../wallet/wallet',
      })
    } else {
      util.isToken()
    }
    
  },
  // 进入我的消息
  goMyinfo: function(){
    if (wx.getStorageSync("token")) {
      wx.navigateTo({
        url: '../myinfo/myinfo',
      })
    } else {
      util.isToken()
    }
    
  },
  //进入面试订单
  goOrder: function () {
    if (wx.getStorageSync("token")) {
      wx.navigateTo({
        url: '../myjob/myjob',
      })
    } else {
      util.isToken()
    }

  },
  
  // 进入意见反馈
  goFeedback: function () {
    if (wx.getStorageSync("token")) {
      wx.navigateTo({
        url: '../feedback/feedback',
      })
    } else {
      util.isToken()
    }
    
  },
  // 进入关于我们
  goAboutus: function () {
    wx.navigateTo({
      url: '../aboutus/aboutus',
    })
  },
  // 进入修改密码
  goChangepwd: function () {
    if (wx.getStorageSync("token")) {
      wx.navigateTo({
        url: '../identify/identify?registertype=2',
      })
    } else {
      util.isToken()
    }
    
  },
  // 退出
  logout: function () {
    var that = this
    wx.showModal({
      title: '温馨提示',
      content: '退出后不会删除任何历史数据，下次登录依然可以使用本账号。',
      success: function (res) {
        if (res.confirm) {
          // 清除登录状态
          wx.clearStorageSync('token');
          wx.setStorageSync('loadData', true)
          that.goLogin()
        }
      }
    })
  },
  getUserInfo(e){
    console.log(e)
  },
  onShow: function () {
    var that = this;
    if (wx.getStorageSync('token')) {
      that.data.isShow = false
      this.auth()
    } else {
      that.data.isShow = true
      that.setData({
        name: "未登录",
        phoneNum: "未登录",
        imgUrl: "../../asset/img/logo.png",
        isShow: that.data.isShow
      })
    }
  },
  //获取用户基本信息
  auth: function () {
    meModel.getAuth().then(res => {
      if (res.data.data.headimageurl) {
        this.data.imgUrl = this.data.globalimgeurl + res.data.data.headimageurl
      }else{
        that.setData({
          imgUrl: '../../asset/img/logo.png',
        })
      }
      this.setData({
        name: res.data.data.name,
        phoneNum: res.data.data.username,
        imgUrl: this.data.imgUrl,
        isShow: this.data.isShow
      })
    })
  } 
})