// pages/courselist/courselist.js
import {
  CourseList
} from '../../models/courselist.js'
import {
  isToken
} from '../../utils/common.js'

const courseList = new CourseList();

const app = getApp();
Page({
  data: {
    globalimgeurl: app.globalData.imgeurl,
    pagecount: 2,
    pageindex: 1,
    course: [],
    payFlag: false,
    price: null,
    tabList: ['目录', '介绍'],
    currentTab: 0, // 当前tab为目录
    cid: null,
    ccid: null,
    //当前ccid ismust状态 
    ismust: '',
    loading: false,
  },
  // 目录介绍切换
  tabsHandle: function(e) {
    this.data.currentTab = e.currentTarget.dataset.idx;
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  // 跳转去考试
  goExam: function() {
    if (!isToken()) {
      wx.navigateTo({
        url: '../login/login',
      })
    } else {
      const _course = this.data.course;
      //判断该ccid 是否未必学课程 若不是 判断是否有题目后 跳转考试
      // 若为必学ccid  判断所有cid 为已经学完 
      if (this.data.ismust == 0) {
        if (this.data.abstract['istest'] == '0') {
          wx.showToast({
            title: '该课程暂时没有题目！',
            icon: 'none'
          })
        } else {
          wx.navigateTo({
            url: '../online/online',
          })
        }
      } else {
        let isJump = true;
        for (let i = 0; i < _course.length; i++) {
          if (_course[i]['islearn'] == 0) {
            wx.showToast({
              title: '还未学完所有课程！',
              icon: 'none'
            })
            isJump = false
          }
        }
        if (isJump) {
          wx.navigateTo({
            url: '../online/online',
          })
        }
      }
    }
  },
  // 点击购买
  buy(e) {
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
  onLoad: function(options) {
    this.setData({
      isOnline: wx.getStorageSync("isOnline"),
      ccid: options.ccid
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this._getCatalogList();
  },
  // 监听用户下拉动作
  onPullDownRefresh() {
    this.data.pageindex = 1;
    this.data.course = []
    this._getCatalogList();
  },
  // 监听用户上拉动作
  onReachBottom() {
    if (this.data.loading) {
      return
    }
    if(this.data.course.length < this.data.count){
      this.data.pageindex += 1
      this._getCatalogList()
    }else {
      wx.showToast({
        title: '没有更多数据',
        icon: 'none'
      })
    }
  },
  // 获取课程目录介绍及头图
  _getCatalogList() {
    this.data.loading = true;
    courseList.getCatalogList(this.data.ccid, this.data.pageindex, this.data.pagecount).then((res) => {
      this.data.loading = false;
      this.data.count = res.data.count;
      let intro = JSON.parse(res.data.ortherdata[0].articlecontent);
      let abstract = res.data.ortherdata[0]
      let list = res.data.data;
      this.data.course = this.data.course.concat(list)
      this.setData({
        course: this.data.course,
        intro: intro,
        abstract: abstract,
        ismust: abstract.ismust
      })
    })
  },
})