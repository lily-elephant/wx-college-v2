import {HTTP} from '../utils/http.js'

class PayModel extends HTTP {
  // 获取余额
  payPop(){
    return this.request({
      url: 'getbalance',
      method: 'POST'
    })
  }
  // 购买模块
  payConfirm(money, ccid){
    return this.request({
      url: 'consume',
      data: {
        money: money * 100,
        transactionid: '0',
        businesstype: '购买模块',
        cid: '0',
        ccid: ccid
      },
      method: 'POST'
    })
  }
  // 购买实操培训
  payTrain(money, otid){
    return this.request({
      url: 'consume',
      data: {
        money: money * 100,
        transactionid: otid,
        businesstype: '实操培训',
        cid: '0',
        ccid: '0'
      }
    })
  }
}

export { 
  PayModel 
}