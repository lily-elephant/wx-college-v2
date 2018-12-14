import { HTTP } from '../utils/http.js'

class CertificateModel extends HTTP {
  getCertList(){
    return this.request({
      url: 'getCertificate',
      method: 'POST'
    })
  }
}

export {
  CertificateModel
}