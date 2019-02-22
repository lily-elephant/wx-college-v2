import {HTTP} from '../utils/http.js'

class StudyModel extends HTTP{
  getPayedList(isbuy, pageindex){
    return this.request({
      url: 'getHKOrderList',
      data: {
        pageindex: pageindex,
        pagecount: 10,
        isbuy: isbuy
      },
      method: 'POST'
    })
  }
}

export {
  StudyModel
}