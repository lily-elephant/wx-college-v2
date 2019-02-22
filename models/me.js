import { HTTP } from '../utils/http.js'

class MeModel extends HTTP{
  /**个人信息相关api**/
  // 获取auth信息
  getAuth(){
    return this.request({
      url: 'auth',
      data: {},
      method: 'POST',
    })
  }
  // 获取证书
  getCertificate(hkid){
    return this.request({
      url: 'housekeeper/certificatelist',
      data: {
        hkid: hkid
      },
      method: 'POST',
    })
  }
  // 获取考试信息
  getExam(){
    return this.request({
      url: 'exam/getEaxmRecord',
      method: 'POST',
    })
  }
  // 保存编辑后的个人信息
  saveInfo(data){
    return this.request({
      url: 'housekeeper/editHousekeeperInfo',
      data: {
        username: data.username,
        idcard: data.idcard,
        sex: data.sex,
        marry: data.marry,
        isdrive: data.isdrive,
        address1: data.address1,
        address2: data.address2,
        address3: data.address3,
        education: data.education,
        brief: data.brief,
        nativeplace: data.nativeplace,
        describes: data.describe,
        salary: data.salary,
        nowsalary: data.nowsalary,
        workdate: data.workdate
      },
      method: 'POST',
    })
  }
  // 获取关于我们
  getAboutUs(){
    return this.request({
      url: 'source/articlelist',
      data:{
        name: '关于我们',
        pageindex: 1,
        pagecount: 1
      },
      method: 'POST'
    })
  }
  // 获取账户余额
  getRemaining(){
    return this.request({
      url: 'getbalance',
      method: 'POST'
    })
  }
  // 获取交易明细
  getBill(){
    return this.request({
      url: 'getbill',
      method: 'POST'
    })
  }
  // 获取充值金额list
  getMoneyList(){
    return this.request({
      url: 'getChargePropertices',
      method: 'POST'
    })
  }
  // 充值最后一步
  getPay(openid, money){
    return this.request({
      url: 'wxPay',
      data: {
        openid: openid,
        money: money * 100,
        productBrief: "充值",
        transactionid: '0',
        businesstype: '充值',
        osid: '0',
      },
      method: 'POST'
    })
  }
  // 获取系统消息
  getInfoList() {
    return this.request({
      url: 'myNotice',
      method: 'POST'
    })
  }
  // 点击系统消息修改未读状态
  onInfo(id, types){
    return this.request({
      url: 'noticeIsRead',
      data: {
        id: id,
        type: types
      },
      method: 'POST'
    })
  }
  // 提交反馈意见
  submitFeedback(comment){
    return this.request({
      url: 'submitFeedback',
      data: {
        comment: comment
      },
      method: 'POST'
    })
  }
  // 获取反馈列表
  getFeedback() {
    return this.request({
      url: 'myFeedback',
      method: 'POST'
    })
  }
  // 注册获取验证码
  getVerifyCode(phonenumber, registertype){
    return this.request({
      url: 'user/getverifycode',
      data: {
        username: phonenumber,
        usertype: 'BUTLER',
        registertype: registertype
      },
      method: 'POST'
    })
  }
  

}

export {
  MeModel
}