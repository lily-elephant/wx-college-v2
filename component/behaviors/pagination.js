const paginationBev = Behavior({
  data: {
    course: [],
    total: null
  },
  methods:{
    setMoreData(dataArray){
      const tempArray = this.data.course.concat(dataArray)
      this.setData({
        course: tempArray
      })
    },
    setTotal(total){
      this.data.total = total
    },
    hasMore(){
      if (this.data.course.length >= this.data.total){
        wx.showToast({
          title: '没有更多数据',
          icon: 'none'
        })
        return false
      }else{
        return true
      }
    }
  }
})
export {
  paginationBev
}