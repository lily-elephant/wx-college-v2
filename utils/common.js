const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const random = function generatMixed(n){
  var result = "";
  for(var i = 0; i<n; i++){
    var id = Math.ceil(Math.random() * 35)
    result+=chars[id]
  }
  return result;
}

//判断是否携带token
const isToken = function(){
  return wx.getStorageSync('token') ? true : false
}

export {
  random,
  isToken
}