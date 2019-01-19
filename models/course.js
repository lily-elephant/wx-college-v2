import { HTTP } from '../utils/http.js'

class CourseModel extends HTTP {
  getCourse(pageindex){
    return this.request({
      url: 'course/coursecatagorylist',
      data: {
        pageindex: pageindex,
        pagecount: 10,
      },
      method: 'POST'
    })
  }
  getCourseDetail(cid) {
    return this.request({
      url: 'course/getcoursedetail',
      data: {
        cid: cid
      },
      method: 'POST'
    })
  }
  getSearchResult(name){
    return this.request({
      url: 'course/serachcoursecatagorylist',
      data: {
        name: name,
        pageindex: 1,
        pagecount: 10000
      },
      method: 'POST'
    })
  }
}

export {
  CourseModel
}