import { MeModel } from '../../models/me.js'
const meModel = new MeModel()
var app = getApp()
Page({
  data: {
    infos: []
  },
  // 点击信息
  readTap (e) {
    let id = e.currentTarget.dataset.id,
      types = e.currentTarget.dataset.type,
      idx = e.currentTarget.dataset.index;
    if(this.data.infos[idx].isread == 1){
      return
    }
    meModel.onInfo(id, types).then(res => {
      if (res.data.code == 200) {
        this.data.infos[idx].isread = 1;
        this.setData({
          infos: this.data.infos
        })
      }
    })
  },
  // 获取列表
  getInfo(){
    meModel.getInfoList().then(res => {
      this.setData({
        infos: res.data.data
      })
    })
  },
  onLoad: function (options) {
    this.getInfo();
  },
})