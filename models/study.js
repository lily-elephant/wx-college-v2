import {HTTP} from '../utils/http.js'

class StudyModel extends HTTP{
  getPayedList(isbuy){
    return this.request({
      url: 'getHKOrderList',
      data: {
        pageindex: 1,
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