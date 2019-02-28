// pages/online/online.js
import { ExamModel } from '../../models/exam.js'
import { config } from '../../config.js'
const examModel = new ExamModel();

const app = getApp();
Page({
  data: {
    // 考试科目数据
    objectArray:[],
    index: 0, // 默认第一个
    count:'',
    ccid:''
  },
  /**
   * 选择考试科目
   */ 
  bindPickerChange: function (e) {
    var that = this;
    let _index = e.detail.value;
    let _ccid = that.data.objectArray[_index]['ccid'];
    this.setData({
      index: _index,
      ccid: _ccid
    })
    console.log(that.data.ccid)
    that._getExamCount(that.data.ccid);
  },
  /**
   * 去考试
   */
  goExam(){
    var that = this;
    let index = that.data.index;
    wx.navigateTo({
      url: '../answercard/answercard?ccid=' + that.data.ccid 
            + '&count=' + that.data.count 
            + '&name=' + that.data.objectArray[index]['name']
    })
  },
  // 获取考试题目数目
  _getExamCount(){
    examModel.getExamCount(this.data.ccid).then(res => {
      if(res.data.code == config.errorok){
        let data = res.data.data;
        this.setData({
          count: data.count,
          single: data.single,
          multiple: data.multiple
        })
      }
    })
  },
  // 获取考试科目下拉列表
  getExamList(){
    examModel.getExamSelect().then(res => {
      if (res.data.code == 200) {
        let _data = res.data.data;
        let _objectArray = [];
        if (_data.length) {
          for (let i = 0; i < _data.length; i++) {
            let obj = {};
            obj.ccid = _data[i]['ccid'];
            obj.name = _data[i]['name'];
            _objectArray.push(obj);
          }
          this.setData({
            objectArray: _objectArray,
            ccid: _data[0]['ccid']
          })
          this._getExamCount();
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getExamList();
  }
})