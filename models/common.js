import {HTTP} from '../utils/http.js'
import {config} from '../config.js'

class CommonModel extends HTTP {
  getVersionInfo(){
    return this.request({
      url: config.versionCode,
      method: 'POST'
    })
  }
}

export {
  CommonModel
}