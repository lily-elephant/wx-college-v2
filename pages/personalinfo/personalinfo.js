import { getAges } from '../../utils/common.js'
import { MeModel } from '../../models/me.js'

const meModel = new MeModel()
const app = getApp();
Page({
  data: {
    age:'',
    person:{},
    tabsArr: ['基本信息','考试信息','获得证书','人格测试'],
    currentTab: 0,
    // getTime: '2018-06-18', //获得证书时间
    exams: [],   //考试信息
    globalimgeurl: app.globalData.imgeurl,
    phone:'',
    name:''  
  },
  goTest:function(e){
    //console.log(e.currentTarget.dataset.cansubmit)
    if ("yse" == e.currentTarget.dataset.cansubmit ){
      wx.navigateTo({
        url: '../psersonalityTest/psersonalityTest',
      })
    }
  },
  goTest2: function (e) {
    //console.log(e.currentTarget.dataset.cansubmit)
    if ("yse" == e.currentTarget.dataset.cansubmit) {
      wx.navigateTo({
        url: '../psersonalityTest2/psersonalityTest2',
      })
    }
  },
  // 编辑
  goNeed: function(e){
    var person = e.currentTarget.dataset.person
    wx.navigateTo({
      url: '../editMyInfo/editMyInfo?idcard=' + person.idcard 
      + '&sex=' + person.sex
      + '&address1=' + person.address1
        + '&address2=' + person.address2
        + '&address3=' + person.address3
      + '&education=' + person.education
      + '&brief=' + person.brief 
      + '&username=' + person.username
        + '&marry=' + person.marry
        + '&isdrive=' + person.isdrive
        + '&describe=' + person.describes
        + '&nativeplace=' + person.nativeplace
        + '&nowsalary=' + person.nowsalary
        + '&workdate=' + person.workdate
      + '&salary=' + person.salary,
    })
  },
  // 点击tab切换
  tabHandle: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    if(this.data.currentTab == 1){
      this.examInfo();
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      phone:options.phone,
      name:options.name
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow(){
    this.getAuthInfo();
  },
  // 获取auth
  getAuthInfo(){
    meModel.getAuth().then(res => {
      if (res.data.data) {
        var _person = res.data.data;
        this.getCertificateList(res.data.data.id)
        var _age = getAges(_person.idcard);
        _person['age'] = _age;
        if (!_person['headimageurl']) {
          _person['headimageurl'] = '../../asset/img/logo.png'
        } else {
          _person['headimageurl'] = this.data.globalimgeurl + _person['headimageurl']
        }
        this.setData({
          person: _person
        })
      }
    })
  },
  // 获取证书
  getCertificateList(hkid) {
    meModel.getCertificate(hkid).then(res => {
      this.setData({
        certificatelist: res.data.data
      })
    })
  },
  //考试信息
  examInfo:function(){
    meModel.getExam().then(res => {
      this.setData({
        exams: res.data.data
      })
    })
  }
})