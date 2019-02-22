// pages/registerone/registerone.js
import { validatePhone } from '../../utils/common.js'
import { MeModel } from '../../models/me.js'

const meModel = new MeModel()
var app = getApp();
Page({
  data: {
    navCode: null,
    navName: null,
    phone: null,
    verifycode: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      registertype: options.registertype
    })
    if (this.data.registertype == 0) {
      this.data.navName = '注册';
    } else if (this.data.registertype == 1) {
      this.data.navName = '忘记密码';
    } else {
      this.data.navName = '修改密码';
    }
    wx.setNavigationBarTitle({
      title: this.data.navName //页面标题为路由参数
    })
  },
  getPhone: function(e){
    this.data.phone = e.detail.value;
  },
  /**
   * 直接登录
   */
  goLogin: function(){
    wx.redirectTo({
      url: '../login/login'
    })
  },
  /**
   * 下一步
   */
  next(){
    if(validatePhone(this.data.phone)){
      meModel.getVerifyCode(this.data.phone, this.data.registertype)
      .then(res =>{
        if (res.data.code == 200) {
          wx.showToast({
            title: '验证码已发送',
          })
          var hash = res.data.data.hash;
          var tamp = res.data.data.tamp;
          switch (this.data.registertype){
            case 0:
              wx.navigateTo({     //注册
                url: '../register/register?phone=' + this.data.phone + '&registertype=0&hash=' + hash + '&tamp=' + tamp
              })
              break;
            case 1:
              wx.navigateTo({    //表示找回密码
                url: '../findpwd/findpwd?registertype=1&phone=' + this.data.phone + '&hash=' + hash + '&tamp=' + tamp
              })
              break;
            case 2:
              wx.navigateTo({    //表示修改密码
                url: '../findpwd/findpwd?registertype=1&phone=' + this.data.phone + '&hash=' + hash + '&tamp=' + tamp
              })
              break;
            default:
              break;
          }
        } else if (res.data.code == 402) {
          wx.showToast({
            title: '验证码已过期',
            icon: "none"
          })
        } else if (res.data.code == 405) {
          wx.showToast({
            title: '发送失败',
            icon: "none"
          })
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      })
    }
  }
})