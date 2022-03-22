import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import router from '@/router'
import store from '@/store'
import util from '@/libs/util'

// 创建一个错误
function errorCreat(msg) {
  const err = new Error(msg)
  errorLog(err)
  throw err
}

// 记录和显示错误
function errorLog(err) {
  // 添加到日志
  store.dispatch('admin/log/add', {
    type: 'error',
    err,
    info: '数据请求异常'
  })
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.danger('>>>>>> Error >>>>>>')
    console.log(err)
  }
  // 显示提示
  Message({
    message: err.message,
    type: 'error',
    duration: 3 * 1000,
    showClose: true
  })
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(config => {
  // 在请求发送之前做一些处理
  // if (!(/^https:\/\/|http:\/\//.test(config.url))) {}
  const token = util.getToken()
  if (token && token !== 'undefined') {
    // config.headers['Authorization'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['Authorization'] = token
  }
  // 请求头中添加参数
  if (process.env.VUE_APP_HEADERS === 'true') {
    config.headers['repeater'] = 'web'
  }
  config.headers['Language'] = router.app.$i18n.locale
  if (config.method === 'get') {
    if (typeof config.params === 'string' || config.params === undefined) {
      config.params = {}
    }
    config.params['t'] = new Date().getTime()
  }
  return config
}, error => {
  // 发送失败
  console.log(error)
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data || {}
    // jsonp接口做处理
    if (dataAxios.hasOwnProperty('success')) {
      if (dataAxios['success']) {
        dataAxios.status = 200
      } else {
        dataAxios.status = 999999
        dataAxios.message = dataAxios.errMsg
      }
    }
    // 这个状态码是和后端约定的
    const { status } = dataAxios
    // 根据 status 进行判断
    if (status === undefined) {
      return Promise.reject('error')
    } else {
      // 有 status 代表这是一个后端接口 可以进行进一步的判断
      switch (status) {
        case 200:
          return dataAxios
        case 5006:
          return dataAxios
        case 30401:
          // token失效
          if (process.env.VUE_APP_EMPLOYEES === 'true') {
            MessageBox.alert(`${dataAxios.message}`, {
              type: 'error',
              showClose: false,
              // showConfirmButton: false,
              closeOnClickModal: false,
              closeOnPressEscape: false,
              callback: action => {
                // window.location.href = 'about:blank'
                // window.close()
                store.dispatch('admin/account/LogOut', { vm: router.app, confirm: false })
              }
            })
          } else {
            store.dispatch('admin/account/LogOut', { vm: router.app, confirm: false })
          }
          return Promise.reject('error')
        // errorCreat(`${dataAxios.message}: ${response.config.url}`)
        // break
        default:
          // 不是正确的 code
          // errorCreat(`${dataAxios.message}: ${response.config.url}`)
          errorCreat(`${dataAxios.message}`)
          break
      }
    }
    /* if (res.status !== 200) {
      if (res.status === 40301) {
        store.dispatch('LogOut').then(() => {
          location.reload()
        })
      } else {
        Message({
          message: res.message || '访问数据错误',
          type: 'error',
          duration: 2 * 1000
        })
        return Promise.reject('error')
      }
    } else {
      return response.data
    } */
  },
  /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   */
  //  const res = response.data;
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       });
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload();// 为了重新实例化vue-router对象 避免bug
  //           });
  //         })
  //       }
  //       return Promise.reject('error');
  //     } else {
  //       return response.data;
  //     }
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录'; break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
    }
    // if (error.response.status === 401) {
    //   // token失效
    //   store.dispatch('admin/account/LogOut', { vm: router.app, confirm: false })
    //   return Promise.reject('error')
    // }
    errorLog(error)
    return Promise.reject(error)
  }
)

export default service
