import { HTTP } from '../utils/http.js'

class JobModel extends HTTP{
  getMyJob(){
    return this.request({
      url: 'order/interviewlist',
      data: {
        pageindex: 1,
        pagecount: 10
      },
      method: 'POST'
    })
  }
}

export {
  JobModel
}