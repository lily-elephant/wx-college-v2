// component/search/index.js
import { isToken } from '../../utils/common.js'
import { config } from '../../config.js'
import { paginationBev } from '../behaviors/pagination.js'
import { CourseModel } from '../../models/course.js'

const courseModel = new CourseModel()
const maximum = 10 // 记录最大历史搜索条数
Component({
  behaviors: [paginationBev],
  /**
   * 组件的属性列表
   */
  properties: {
    isOnline: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    course: [],
    pageindex: 1,
    loading: false,
    resultFlag: false, // 搜索结果显示与否
    globalimgeurl: config.imgeurl,
    value: '',
    historyArr: wx.getStorageSync('history')
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    // 点击完成搜索
    search(e){
      if (!e.detail.value){
        wx.showToast({
          title: '搜索条件不可为空',
        })
        return
      }
      this.setData({
        resultFlag: true,
        value: e.detail.value
      })
      this.getSearchList(this.data.value);
      if (!wx.getStorageSync('history')){
        this.setData({
          historyArr: []
        })
      }else{
        if (this.data.historyArr.indexOf(e.detail.value) > -1) {
          return
        }
      }
      this.data.historyArr.unshift(e.detail.value)
      if (this.data.historyArr.length > maximum) {
        this.data.historyArr.pop()
      }
      wx.setStorageSync('history', this.data.historyArr)
      this.setData({
        historyArr: wx.getStorageSync('history')
      })
    },
    // 进入在线培训详情
    goDetail(e) {
      this.triggerEvent('godetail', e.currentTarget.dataset.ccid);
    },
    // 点击购买
    goBuy(e) {
      this.triggerEvent('buy', e.currentTarget.dataset);
    },
    //获取在线培训
    getSearchList(q) {
      // Promise的方式
      // this.data.loading = true;
      courseModel.getSearchResult(q).then(res => {
        this.setData({
          course: res.data.data
        })
        // this.setMoreData(res.data.data);
        // this.setTotal(res.data.count);
        // this.data.loading = false;
      })
    },
    // 加载更多在线培训课程
    // _loadMore() {
    //   if (this.data.loading) {
    //     return
    //   }
    //   if (this.hasMore()) {
    //     this.data.pageindex += 1
    //     this.getSearchList(this.data.pageindex, this.data.value)
    //   }
    // },
    
    // 点击标签
    onTag(e){
      this.setData({
        value: e.detail.label,
        resultFlag: true
      })
      this.getSearchList(this.data.value)
    },
    // 点击取消
    cancel(){
      this.setData({
        course: [],
        value: '',
        resultFlag: false
      })
      this.triggerEvent('close', {})
    },
  }
})
