// pages/coursedetail/coursedetail.js
import { CourseModel } from '../../models/course.js'
import { getToday, getTime } from '../../utils/util.js'
const courseModel = new CourseModel();
const app = getApp();
Page({
  data: {
    visitCount: '../../asset/img/visited.png',
    shoppingCar: '../../asset/img/shoppingcar.png',
    payFlag: false,
    course: [],
    globalimgeurl: app.globalData.imgeurl,
    showCanvas:true,
    money:0,
    isbuy:'',
    videoContext:'',
    privilege: '登录',
    cid:null,
    loadingFlag: false, //加载中
    showModalStatus: false,
  },
  // 购买
  buy(){
    this.setData({
      payFlag: true
    })
  },
  cancel: function () {
    this.setData({
      payFlag: false
    })
  },
  // 生成海报
  share(e) {
    this.setData({
      showModalStatus: false,
      loadingFlag: true,
    })
    console.log(e)
    var name = e.detail.name;
    var brief = e.detail.brief;
    var picture = e.detail.picture
    console.log(picture)
    var that = this 
    wx.downloadFile({
      url: picture,
      success: function(res) {
        console.log(res)
        let briefArray = [];
        //为了防止过长，分割字符串,每行18个
        for (let i = 0; i < brief.length / 18; i++) {
          if (i > 2) {
            break;
          }
          if(i == 2 ){
            briefArray.push(brief.substr(i * 18, 18) + "...");
          }else{
            briefArray.push(brief.substr(i * 18, 18));
          }
        }

        if (res.statusCode === 200) {
          //先创建一个画布
          const ctx = wx.createCanvasContext("mycanvans")
          //填充背景色
          ctx.fillStyle = '#fff';
          ctx.fillRect(0, 0, 300, 300)
          //将图片转化为画布
          ctx.drawImage(res.tempFilePath, 0, 0, 300, 150)

          // 作者名称
          ctx.setFillStyle('#333333')  // 文字颜色：黑色
          ctx.setFontSize(16)         // 文字字号：16px
          ctx.fillText(name, 16,180)

          var yOffset = 210;
          briefArray.forEach(function (value) {
            ctx.setFontSize(12);
            ctx.setFillStyle('#666666');
            ctx.fillText(value, 16, yOffset);
            yOffset += 25;
          });

          ctx.stroke()
          ctx.drawImage("../../asset/img/qrcode.jpg", 234, 234, 50, 50)
          //ctx.draw()
          that.setData({
            showCanvas: false
          })
          //成功执行，draw方法中进行回调
          ctx.draw(true, function () {
            //console.log("draw callback success")
            //保存临时图片
            wx.canvasToTempFilePath({
              x: 0,
              y: 0,
              width: 300,
              height: 300,
              destWidth: 300,
              destHeight: 300,
              canvasId: 'mycanvans',
              success: function (res) {
                that.setData({
                  loadingFlag: false
                })
                console.log("get tempfilepath(success) is:",)
                that.data.tempFilePath = res.tempFilePath
              },
              fail: function () {
                console.log('get tempfilepath is fail')
              }
            })
          })
        }
      }
    })
  },
  close(){
    this.setData({
      showCanvas: true
    })
  },
  //显示对话框
  showModal: function() {
    this.animationFn(()=> {
      this.setData({
        showModalStatus: true
      })
    })
  },
  //隐藏对话框
  cancelShare() {
    this.animationFn(null, ()=> {
      this.setData({
        showModalStatus: false
      })
    })
  },
  // animation动画
  animationFn(showFn, hideFn) {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export()
    })
    showFn && showFn();
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
      hideFn && hideFn();
    }.bind(this), 200)
  },
  //去登录
  gologin:function(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  // 生命周期
  onLoad: function (options){
    this.setData({
      isOnline: wx.getStorageSync("isOnline")
    })
    this.data.cid = options.cid
  },
  onShow: function() {
    var that = this;
    that.setData({
      show01: false,
      show02: true,
    })
    this.getDetail()
  },
  getDetail(){
    courseModel.getCourseDetail(this.data.cid).then(res => {
      if (res.data.code == 200) {
        this.data.money = res.data.data[0].money
        this.data.isbuy = res.data.data[0].isbuy
        const article = JSON.parse(res.data.data[0].article)
        this.setData({
          course: res.data.data[0],
          article: article
        })
        // 如果token存在，即已登录状态，才储存浏览历史
        if (wx.getStorageSync("token")){
          let that = this
          let date = getToday()
          let time = getTime()
          let historyArr = []
          if (!wx.getStorageSync('visited')) {
            let now_data = {
              time: time,
              data: that.data.course
            }
            // 今天的数据，没有时插入
            let sub_data = {
              date: date,
              films: []
            }
            sub_data.films.push(now_data)
            historyArr.unshift(sub_data)
            wx.setStorage({
              key: 'visited',
              data: historyArr,
              success: function (res) {
                console.log(res)
                console.log('----set----')
              }
            })
            return
          }
          wx.getStorage({
            key: 'visited',
            success: function (res) {
              historyArr = res.data
              console.log('----获取缓存----')
              console.log(res.data)
              // 当前的数据
              let now_data = {
                time: time,
                data: that.data.course
              }
              // 今天的数据，没有时插入
              let sub_data = {
                date: date,
                films: []
              }
              sub_data.films.push(now_data)
              if (historyArr.length == 0) { // 判断是否为空
                console.log('----为空插入----')
                historyArr.unshift(sub_data)
              } else if ((historyArr[0].date == date)) { //判断第一个是否为今天
                console.log('----今日插入----')
                console.log(historyArr[0].films.length)
                for (var i = 0; i < historyArr[0].films.length; i++) {
                  // 如果存在则删除，添加最新的
                  if (historyArr[0].films[i].data.cid == that.data.course.cid) {
                    historyArr[0].films.splice(i, 1)
                  }
                }
                historyArr[0].films.push(now_data)
              } else { // 不为今天(昨天)插入今天的数据
                console.log('----昨日插入今日----')
                historyArr.unshift(sub_data)
              }
              wx.setStorage({
                key: 'visited',
                data: historyArr,
                success: function (res) {
                  console.log(res)
                  console.log('----设置成功----')
                }
              })
              console.log(historyArr)
            },
            fail: function (res) {
              console.log('----获取失败----')
              console.log(res)
            }
          })
        }
      }
    })
  },
  // 是否登录 && 是否购买  
  // 否 视频时长设置为10秒 
  //  播放成功回调后   未登录 提示登录  未购买 提示购买   
  //
  listenPlay:function(e){
    var currentTime = e.detail.currentTime ; 
    var duration = e.detail.duration; 
    if (duration >= 10 && currentTime > 10){
      this.isHasRole()
    } else if (duration < 10 && currentTime > (duration/2)){
      this.isHasRole()
    }
  },
  //是否是收费资源  是登录   否继续观看    登录   是否已经购买 购买 播放  否则去购买  
  isHasRole:function(){
    var that = this 
    if(that.data.money != 0){
      if (!wx.getStorageSync('token')) {
        console.log("去登录")
        this.data.videoContext.pause(); 
        that.setData({
          show01: true,
          show02: false,
          privilege: '登录' 
        })
      }else{
        if(that.data.isbuy == 1){
          console.log("购买")
          this.data.videoContext.pause(); 
          that.setData({
            show01: true,
            show02: false,
            privilege: '购买'
          })
        }else{
          that.setData({
            show01: false,
            show02: true,
          })
        }
      }
    }else{
      that.setData({
        show01: false,
        show02: true,
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(res) {
    this.data.videoContext = wx.createVideoContext('myVideo')
  },

})