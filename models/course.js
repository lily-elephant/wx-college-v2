import { HTTP } from '../utils/http.js'

class CourseModel extends HTTP {
  getCourse(pageindex, q){
    return this.request({
      url: 'course/coursecatagorylist',
      data: {
        pageindex: pageindex,
        pagecount: 3,
        name: q
      },
      method: 'POST'
    })
  }
}

export {
  CourseModel
}