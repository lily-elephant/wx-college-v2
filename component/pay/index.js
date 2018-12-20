// component/pay/index.js
import { PayModel } from "../../models/pay.js"
const payModel = new PayModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ccid: {
      type: String,
      value: ''
    },
    price: {
      type: String
    },
    otid: {
      type: String,
      value: ''
    },
    cid: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    enoughFlag: true,
    remaining: null,
  },
  lifetimes: {
    attached: function () {
      this.getPayPop();
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 弹出支付弹出层
    getPayPop() {
      payModel.payPop().then((res) => {
        this.setData({
          remaining: res.data.data/100
        })
        // 余额大于价格
        if (this.data.remaining > parseFloat(this.properties.price)){
          this.setData({
            enoughFlag: true
          })
        }else{
          this.setData({
            enoughFlag: false
          })
        }
      })
    },
    // 点击确认支付或者充值
    confirm(){
      if (!this.data.enoughFlag){
        this.cancel();
        wx.navigateTo({
          url: '../recharge/recharge', // 跳转到充值页
        })
      }else{
        let price = parseFloat(this.properties.price);
        if (this.properties.ccid){
          payModel.payConfirm(price, this.properties.ccid).then((res) => {
            wx.showToast({
              title: '购买成功',
            })
            this.cancel();
          })
        }
        if(this.properties.otid){
          payModel.payTrain(price, this.properties.otid).then((res) => {
            wx.showToast({
              title: '购买成功',
            })
            this.cancel();
          })
        }
        if (this.properties.cid) {
          console.log(this.properties.cid)
          return
          payModel.payCourseUnit(price, this.properties.cid).then((res) => {
            wx.showToast({
              title: '购买成功',
            })
            this.cancel();
          })
        }
      }
    },
    // 点击取消
    cancel(){
      this.triggerEvent('cancel', {})
    }
  }
})
