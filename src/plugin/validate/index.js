export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 中文验证*/
export function validateZh(str) {
  const reg = /^[\u4e00-\u9fa5]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 密码验证*/
export function validatPassword(str) {
  const reg = /^(\w){6,12}$/
  return reg.test(str)
}

/* 密码验证*/
export function validPass(str) {
  const reg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d_]{6,16}$/
  return reg.test(str)
}

/* 手机验证*/
export function validatPhone(str) {
  const reg = /^1[3-9][0-9]{9}$/
  return reg.test(str)
}

/* 座机验证*/
export function validatPhoneNumber(str) {
  const reg = /^(?:0[1-9][0-9]{1,2}-)?[2-8][0-9]{6,7}$/
  return reg.test(str)
}

/* 邮政编码验证*/
export function validatPostcode(str) {
  const reg = /^[1-9]\d{5}$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/* 身份证验证*/
export function validatCardNo(card) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(card)
}

/* 车牌验证*/
export function validatTruckNumber(truckNo) {
  const reg = /^[\u4e00-\u9fa5]{1}[a-zA-Z]{1}[a-zA-Z_0-9]{4}[a-zA-Z_0-9_\u4e00-\u9fa5]$/
  // const reg1 = /^[\u4e00-\u9fa5]{1}[0-9]{2}[a-zA-Z_0-9]{5}$/
  return reg.test(truckNo)
}

// 英文字母和数字
export function isvalidateTextNumber(rule, value, callback) {
  const reg = /^[0-9a-zA-Z]*$/g
  if (!reg.test(value)) {
    callback(new Error())
  } else {
    callback()
  }
}

/* 手机和座机验证*/
export function validatMobilePhone(rule, value, callback) {
  const reg = /(^1[3-9][0-9]{9}$)|(^(?:0[1-9][0-9]{1,2}-)?[2-8][0-9]{6,7}$)/
  // const reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
  if (value !== null && value !== '') {
    if (!reg.test(value)) {
      callback(new Error())
    } else {
      callback()
    }
  } else {
    callback()
  }
}

