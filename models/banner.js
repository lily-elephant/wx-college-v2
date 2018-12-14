import {HTTP} from '../utils/http.js'

class BannerModel extends HTTP { // 类，需要new以后去使用
  getBannerList(){
    return this.request({
      url: 'source/bannerlist',
      data: {
        product: 'BUTLER',
        pageindex: 1,
        pagecount: 3
      },
      method: 'POST'
    })
  }
}

export {
  BannerModel
}