/*
 *  作者：li
 *  时间：2019-04-26
 *  描述：环信配制
 */

// 安装并引入环信SDK
require('./webim.config.js')
import Easemob from 'Easemob'

// 创建连接
const $conn = new Easemob.im.Connection({
  isMultiLoginSessions: Easemob.im.config.isMultiLoginSessions,
  https: typeof Easemob.im.config.https === 'boolean' ? Easemob.im.config.https : location.protocol === 'https:',
  url: Easemob.im.config.xmppURL,
  heartBeatWait: Easemob.im.config.heartBeatWait,
  autoReconnectNumMax: Easemob.im.config.autoReconnectNumMax,
  autoReconnectInterval: Easemob.im.config.autoReconnectInterval,
  apiUrl: Easemob.im.config.apiURL,
  isAutoLogin: true
})

export default {
  install(Vue, options) {
    // 把链接对象扩展给Vue实例属性(以后可以用this.$imconn代表环信链接对象)
    Vue.prototype.$easemob = Easemob
    Vue.prototype.$imconn = $conn
  }
}
