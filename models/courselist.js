import {HTTP} from '../utils/http.js'

class CourseList extends HTTP {
  getCatalogList(ccid, pageindex, pagecount){
    return this.request({
      url: 'course/courselist',
      data: {
        ccid: ccid,
        pageindex: pageindex,
        pagecount: pagecount
      },
      method: 'POST'
    })
  }
  
}
export {
  CourseList
}