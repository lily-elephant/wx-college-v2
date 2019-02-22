import { ExamModel } from '../../models/exam.js'

const examModel = new ExamModel()
var app = getApp();
Page({
  data: {
    questionList: '',
    eid: '',
    oid: '',
    answerList: []

  },
  jobTap: function(e) {
    for (var i = 0; i < this.data.answerList.length; i++) {
      if (this.data.answerList[i].eid == e.currentTarget.dataset.eid) {
        this.data.answerList.splice(i, 1)
      }
    }
    var obj = {
      eid: e.currentTarget.dataset.eid,
      oid: e.detail.value
    }
    this.data.answerList.push(obj)
  },
  // 点击多选
  checkboxChange: function (e) {
    for (let i = 0; i < this.data.answerList.length; i++) {
      if (this.data.answerList[i].eid == e.currentTarget.dataset.eid) {
        this.data.answerList.splice(i, 1)
      }
    }
    var obj = {
      eid: e.currentTarget.dataset.eid,
      oid: (e.detail.value).join(',')
    }
    this.data.answerList.push(obj);
  },
  /**
   * 提交
   */
  submit() {
    if (wx.getStorageSync('token')) {
      examModel.saveExam(JSON.stringify(this.data.answerList)).then(res => {
        if (res.data.code == 200) {
          wx.switchTab({
            url: '../index/index'
          })
          wx.showToast({
            title: '保存成功',
            icon: "success"
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: "none"
          })
        }
      })
    } else {
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },
  // 获取数据
  getBaseExam(){
    examModel.getBaseExamList().then(res => {
      if (res.data.data.length != 0) {
        this.setData({
          questionList: res.data.data,
          eid: res.data.data[0].eid
        })
      } else {
        wx.showToast({
          title: '暂无数据',
          icon: 'none',
          duration: 5000
        })
        wx.switchTab({
          url: '../index/index',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getBaseExam()
  }
})