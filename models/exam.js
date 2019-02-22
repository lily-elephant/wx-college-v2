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
  // 获取摸底考试列表数据
  getBaseExamList(){
    return this.request({
      url: 'exam/baseExamlist',
      method: 'POST',
    })
  }
  // 保存摸底考试答案
  saveExam(answer){
    return this.request({
      url: 'exam/addresults',
      method: 'POST',
      data: {
        answer: answer
      },
    })
  }
  // 个人信息测试test
  getPersonalityExam(){
    return this.request({
      url: 'getPersonalityTest',
      method: 'POST'
    })
  }
  // 保存个人信息测试test
  savePersonalityExam(result){
    return this.request({
      url: 'savePersonalityAnswer',
      data: {
        result: result
      },
      method: 'POST'
    })
  }
  // 个人信息测试test2列表
  getPersonalityExamTwo(){
    return this.request({
      url: 'getSixteenTest',
      method: 'POST'
    })
  }
  // 保存个人信息测试test2
  savePersonalityExamTwo(result) {
    return this.request({
      url: 'savePersonalityAnswerTwo',
      data: {
        result: result
      },
      method: 'POST'
    })
  }
}

export {
  ExamModel
}