import {HTTP} from '../utils/http.js'

class TrainModel extends HTTP {
  getTrainList(){
    return this.request({
      url: 'getOfflineTraining',
      data: {},
      method: 'POST'
    })
  }
}

export {
  TrainModel
}