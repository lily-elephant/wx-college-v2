// component/poster/index.js
import {
  config
} from '../../config.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    coursePicture: String,
    courseName: String,
    courseBrief: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    url: config.imgeurl,
    tempFilePath: null,
    showCanvas: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 保存到系统相册
    save: function () {
      var that = this
      //将图片保存在系统相册中(应先获取权限，)
      wx.saveImageToPhotosAlbum({
        filePath: that.data.tempFilePath,
        success(res) {
          that.setData({
            showCanvas: true,
            sharebtn: true
          })
          wx.showToast({
            title: '保存成功',
          })
        },
        fail: function () {
          wx.showToast({
            title: '保存失败',
            icon: 'none'
          })
        }
      })
    },
    // 关闭保存系统相册
    close() {
      this.setData({
        showCanvas: true
      })
    },
    share(){
      let name = this.properties.courseName;
      let brief = this.properties.courseBrief;
      let picture = this.data.url + this.properties.coursePicture;
      var that = this
      wx.downloadFile({
        url: picture,
        success: function (res) {
          console.log(res)
          // var ben_brief = ""
          // if (brief.length >= 50){
          //   ben_brief = brief.slice(0, 50) + "..."
          // }else{
          //   ben_brief = brief 
          // }

          let briefArray = [];
          //为了防止过长，分割字符串,每行18个
          for (let i = 0; i < brief.length / 18; i++) {
            if (i > 2) {
              break;
            }
            if (i == 2) {
              briefArray.push(brief.substr(i * 18, 18) + "...");
            } else {
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
            //ctx.setTextAlign('center')    // 文字居中
            ctx.setFillStyle('#333333') // 文字颜色：黑色
            ctx.setFontSize(16) // 文字字号：22px
            ctx.fillText(name, 16, 180)

            //ctx.setFillStyle('#666666')  // 文字颜色：黑色
            //ctx.setFontSize(12)
            //ctx.fillText(ben_brief, 16, 210)

            var yOffset = 210;
            briefArray.forEach(function (value) {
              ctx.setFontSize(12);
              ctx.setFillStyle('#666666');
              //canvasCtx.setTextAlign('left');
              ctx.fillText(value, 16, yOffset);
              yOffset += 25;
            });


            ctx.stroke()
            ctx.drawImage("../../asset/img/qrcode.jpg", 234, 234, 50, 50)
            // ctx.draw()
            that.setData({
              showCanvas: false
            })
            this.triggerEvent('post', {})
            //成功执行，draw方法中进行回调
            ctx.draw(true, function () {
              console.log("draw callback success")
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
                  //console.log("get tempfilepath(success) is:",)
                  that.data.tempFilePath = res.tempFilePath
                  that.setData({
                    sharebtn: false
                  })
                },
                fail: function () {
                  //console.log('get tempfilepath is fail')
                }
              })
            })
          }
        }
      })
    }
  }
})
