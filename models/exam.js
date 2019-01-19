import { HTTP } from '../utils/http.js'

class ExamModel extends HTTP{
  getExamCount(ccid){
    return this.request({
      url: 'course/gettestcontent',
      data: {
        ccid: ccid
      },
      method: 'POST'
    })
  }
  getExamCatagory(){
    
  }
}

export {
  ExamModel
}