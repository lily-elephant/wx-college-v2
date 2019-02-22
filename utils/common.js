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

// 验证是否是手机号
const validatePhone = function(num){
  let myreg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
  if (!myreg.test(num)) {
    wx.showToast({
      title: '请输入有效的手机号码！',
      duration: 2000
    })
    return false;
  }else{ 
    return true;
  }
}

// 根据身份证计算年龄
const getAges = function (identityCard){
  var len = (identityCard + "").length;
  if (len == 0) {
    return 0;
  } else {
    if ((len != 15) && (len != 18)) {
      return 0;
    }
  }
  var strBirthday = "";
  if (len == 18) {
    strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
  }
  if (len == 15) {
    strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
  }
  //时间字符串里，必须是“/”
  var birthDate = new Date(strBirthday);
  var nowDateTime = new Date();
  var age = nowDateTime.getFullYear() - birthDate.getFullYear();
  //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
  if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
// 校验
const isNull = function(val, msg){
  if (!val){
    wx.showToast({
      title: msg,
      icon: 'none'
    })
    return false
  }else{
    return true
  }
}

export {
  random,
  isToken,
  validatePhone,
  getAges,
  isNull
}