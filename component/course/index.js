// component/course/index.js
import {
  config
} from '../../config.js'
import {
  paginationBev
} from '../behaviors/pagination.js'
import {
  CourseModel
} from '../../models/course.js'
const courseModel = new CourseModel();

Component({
  options: {
    multipleSlots: true
  }, // 使用slot
  behaviors: [paginationBev], // behaviors只能在自定义组件中使用
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: '_loadMore'
    },
    refresh: {
      type: String,
      observer: '_refresh'
    },
    isOnline: {
      type: Boolean,
      value: false
    }
  },
  lifetimes: {
    attached() {
      this.onLoadCourse(this.data.pageindex)
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    pageindex: 1, //当前页
    globalimgeurl: config.imgeurl,
    loading: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goDetail(e) {
      //触发点击事件，把course id传过去
      this.triggerEvent('godetail', e.currentTarget.dataset.ccid);
    },
    //获取在线培训
    onLoadCourse(pageindex) {
      // 普通方式
      // http.request({
      //   url: 'course/coursecatagorylist',
      //   method: 'POST',
      //   data: {
      //     pageindex: pageindex,
      //     pagecount: 10
      //   },
      //   success: (res) => {
      //     console.log(res)
      //   }
      // })
      // Promise的方式
      this._locked();
      courseModel.getCourse(pageindex).then(res => {
        this.setMoreData(res.data.data);
        this.setTotal(res.data.count);
        this._unLocked()
        // if (res.data.data){ // if条件根据是否还有数据来判断是否继续加载
        // let list = res.data.data;
        // this.data.course = this.data.course.concat(list)
        // this.setData({
        //   course: this.data.course,
        //   total: res.data.count
        // })
        // }
        // else {
        //   wx.showToast({
        //     title: '没有更多数据',
        //   })
        // }
      })
    },
    // 加载更多在线培训课程
    _loadMore() {
      if (this._isLocked()) {
        return
      }
      if (this.hasMore()) {
        this.data.pageindex += 1
        this.onLoadCourse(this.data.pageindex)
      }
    },
    // 刷新
    _refresh(){
      if(this.properties.refresh){
        this.data.pageindex = 1;
        this.data.course = []; // 先置空，然后重新填充
        this.onLoadCourse(this.data.pageindex);
      }
    },
    // 加锁
    _locked(){
      this.data.loading = true;
    },
    _unLocked(){
      this.data.loading = false;
    },
    _isLocked(){
      this.data.loading ? true: false
    },
    // 点击购买
    goBuy(e){
      this.triggerEvent('buy', e.currentTarget.dataset);
    }
  }
})