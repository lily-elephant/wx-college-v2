//获取应用实例
const app = getApp()
var util = require("../../utils/util.js");
// import {HTTP} from '../../utils/http.js'
// let http = new HTTP(); // 实例化对象
import { config } from '../../config.js'
import { TrainModel} from '../../models/train.js'
import { CertificateModel } from '../../models/certificate.js'
import { CommonModel } from '../../models/common.js'
import { random, isToken } from '../../utils/common.js'

const trainModel = new TrainModel();
const certificateModel = new CertificateModel();
const commonModel = new CommonModel();

Page({
  data: {
    // banner信息
    bannerDetail: [],
    bannerFlag: false,
    trainFlag: false,
    searchFlag: false,
    train: [], //实操培训
    isOnline: true,
    payFlag: 0, // 未付
    money: null, //支付的钱数
    payShowFlag: false, // 在线培训pay弹出层
    payTrainFlag: false, // 训练营pay弹出层
    price: null, // 价格
    ccid: null, // ccid
    otid: null, // otid
    globalimgeurl: config.imgeurl,
    homeTab: ['在线培训', '管家训练营', '晋级体系'], //tab栏
    currentTab: 0, // 默认第一个tab 
    name: '', //搜索课程名字
    certificates: [],
    loading: false,
    more: '', // 加载更多在线培训
    refresh: '', // 刷新
    upSystem: [], // 晋级体系数据
    noticeFlag: false, // notice
    infos: [
      { label: '张阿姨刚刚和雇主王先生在平台签约' },
      { label: '李阿姨刚刚和雇主张先生在平台签约' },
      { label: '宋阿姨刚刚和雇主白先生在平台签约' }
    ]
  },
  closeNotice(){
    this.setData({
      noticeFlag: true
    })
  },
  // 测试使用Promise.all获取数据
  getAllData() {
    Promise.all([courseModel.getCourse(this.data.pageindex), trainModel.getTrainList()]).then(res => {
      console.log(res, 'res')
    })
  },
  //事件处理函数
  tabsClick: function(e) {
    this.data.currentTab = e.currentTarget.dataset.idx;
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  
  // 点击搜索
  searchTap(){
    this.setData({
      searchFlag: true
    })
  },
  // 关闭搜索层
  close(){
    this.setData({
      searchFlag: false
    })
  },
  // 点击banner显示详情
  banner(e) {
    if (!e.detail.article) {
      return;
    }
    let article = JSON.parse(e.detail.article)
    this.setData({
      bannerDetail: article,
      bannerFlag: true
    })
  },
  // 隐藏banner详情
  back() {
    this.setData({
      bannerFlag: false,
      trainFlag: false
    })
  },
  // 进入在线培训详情
  goDetail(e){
    wx.navigateTo({
      url: '../courselist/courselist?ccid=' + e.detail,
    })
  },
  // 实操培训
  offlineTrain(){
    trainModel.getTrainList().then(res => {
      if(res.data.data){
        this.setData({
          train: res.data.data
        })
      }else{
        wx.showToast({
          title: '暂无数据'
        })
      }
    })
  },
  // 进入实操培训详情
  trainDetail(e){
    if (!e.detail.des) {
      return;
    }
    let article = JSON.parse(e.detail.des)
    console.log(article)
    this.setData({
      trainFlag: true,
      bannerDetail: article,
      payFlag: e.detail.payflag,
      money: e.detail.money,
      otid: e.detail.otid
    })
  },
  // 在线培训支付弹出层
  goBuy(e){
    if(!isToken()){
      wx.navigateTo({
        url: '../login/login',
      })
    }else{
      this.setData({
        payShowFlag: true,
        price: e.detail.discount,
        ccid: e.detail.ccid
      })
    }
  },
  // 实操培训支付弹出层
  payTrain(e){
    if (!isToken()) {
      wx.navigateTo({
        url: '../login/login',
      })
    } else {
      this.setData({
        payTrainFlag: true,
        price: e.currentTarget.dataset.discount,
      })
    }
  },
  // 关闭弹出层
  cancel: function () {
    this.setData({
      payTrainFlag: false,
      payShowFlag: false
    })
  },
  //获取合格证书
  getCertificate() {
    certificateModel.getCertList().then((res) => {
      this.setData({
        certificates: res.data.data
      })
    })
  },
  
  
  // 获取isOnline
  getVersionInfo() {
    commonModel.getVersionInfo().then((res) => {
      // console.log(res)
      wx.setStorageSync("isOnline", res.data.data.online)
      this.setData({
        isOnline: wx.getStorageSync("isOnline")
      })
    })
  },

  onLoad: function() {
    // this.getAllData();
    //通过接口拿到isonline字段，若为ture 则为正式环境 显示正常购买逻辑，若为false 则为测试环境，隐藏所有购买相关操作 ，根据版本号对接口明定义，过审后改接口 返回值数据永久性变为ture ，不改变 。
    this.getVersionInfo();
    this.offlineTrain(); // 实操培训
    this.getCertificate(); // 合格证书
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      refresh: random(16)
    })
    this.onLoad()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.currentTab == 0) {
      this.setData({
        more: random(16)
      })
    }
  },
  
  // 改变需求
  change: function() {
    if (isToken()) {
      wx.navigateTo({
        url: '../basetest/basetest',
      })
    } else {
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },
  onShow: function () {

  }
})