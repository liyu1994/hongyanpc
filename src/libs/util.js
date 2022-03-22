import cookies from './util.cookies'
import db from './util.db'
import log from './util.log'
import route from './util.route'
import crypto from 'crypto'
import sjcl from './util.sjcl'

const util = {
  route,
  cookies,
  db,
  log
}

/**
 * @description cloneObj深拷贝
 * @param {object} obj 拷贝对像
 */
util.cloneObj = function(obj) {
  var newObj = {}
  if (obj instanceof Array) {
    newObj = []
  }
  for (var key in obj) {
    var val = obj[key]
    newObj[key] = typeof val === 'object' ? util.cloneObj(val) : val
  }
  return newObj
}

/* json 返回指定列*/
util.getParamValues = function(name, arr) {
  const ret = []
  for (var i = 0, len = arr.length; i < len; i++) {
    ret.push(arr[i][name])
  }
  return ret
}

/**
 * @description 生成GUID 全局唯一标识符
 */
util.getGuid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * @description 获取token
 */
util.getToken = function() {
  // 生成 token 示例
  const tokenKey = cookies.get('tokenKey')
  const tokenId = cookies.get('tokenId')
  const userId = cookies.get('userId')
  if (!tokenKey || !tokenId || !userId) {
    return ''
  }
  var hmac = new sjcl.misc.Hmac(tokenKey)// 服务器返回的tokenKey;
  // uid :当前用户id
  // tid :服务器返回的tokenId
  // rid :随机字符串 (不能重复,可以考虑本机 ip + 当前时间戳 + 随机字符串)
  // ts : 当前时间戳
  // hash:生成签名
  // var param = 'uid=' + userId + '&tid=' + tokenId + '&rid=' + RndNum(5) + '&ts=' + (new Date()).getTime()
  var param = 'uid=' + userId + '&tid=' + tokenId + '&rid=' + util.guid(64, false, 16) + '&ts=' + (new Date()).getTime()
  var tokens = param + '&hash=' + sjcl.codec.base64.fromBits(hmac.encrypt(param))
  // tokens = 'uid=USER19011800016001U000&tid=0d97d690-a89a-4492-bfd9-ab3a26877d06&rid=81593&ts=1548747072796&hash=MqBplo82IfXun/IkaTAERHTotsvHZiRJQ6zIb1lYSng='
  return tokens
}

/**
 * @description 保存token
 * @param {String} token
 */
util.setToken = function(params) {
  cookies.set('tokenId', params.tokenId)
  cookies.set('tokenKey', params.tokenKey)
  cookies.set('userId', params.userId)
  cookies.set('name', params.userName)
  cookies.set('userRoleType', params.userRoleType)
}

/**
 * @description 清除token
 */
util.removeToken = function() {
  cookies.remove('tokenId')
  cookies.remove('tokenKey')
  cookies.remove('userId')
  cookies.remove('name')
  cookies.remove('userRoleType')
}

/**
 * @description 获取用户ID
 */
util.getUserID = function() {
  return cookies.get('userId')
}

/**
 * 生成随机数
 * @param {} n  随机数位数
 */
// function RndNum(n) {
//   var rnd = ''
//   for (var i = 0; i < n; i++) { rnd += Math.floor(Math.random() * 10) }
//   return rnd
// }

/**
 * @description el-form，error聚焦定位
 * @param {Object} param { vm: vue }
 */
util.formElementsFocus = function({ vm = '' } = {}) {
  setTimeout(() => {
    if (typeof vm !== 'object') return
    const $form = vm.$el.querySelector('.is-error')
    const $div = vm.$el.querySelector('.admin-container-full__body')
    $div && $div.scrollTo(0, $form.offsetTop || 0)
    $form.querySelector('input') && $form.querySelector('input').focus()
    $form.querySelector('textarea') && $form.querySelector('textarea').focus()
  }, 200)
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function(titleText) {
  const processTitle = process.env.VUE_APP_TITLE || '管理后台'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function(url) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'admin-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('admin-link-temp'))
}

/**
 * @description md5加密
 */
util.md5 = function(data) {
  const hash = crypto.createHash('md5').update(data).digest('hex')
  return hash
}
util.isNumber = function(val) {
  return !isNaN(parseFloat(val))
}
util.formatNumber = function(num) {
  num = num.toFixed(this.decimals)
  num += ''
  const x = num.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? this.decimal + x[1] : ''
  const rgx = /(\d+)(\d{3})/
  const separator = ','
  if (separator && !this.isNumber(separator)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + separator + '$2')
    }
  }
  return x1 + x2
}
/**
 * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier)
 * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
 * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
 * v-for的时候,推荐使用后端返回的id而不是循环的index
 * @param {Number} len uuid的长度
 * @param {Boolean} firstU 将返回的首字母置为"u"
 * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
 */
util.guid = function(len = 32, firstU = true, radix = null) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid = []
  radix = radix || chars.length

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    let r
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift()
    return 'u' + uuid.join('')
  } else {
    return uuid.join('')
  }
}

export default util
