import store from '@/store'
import util from '@/libs/util'

export default {
  install(Vue, options) {
    Vue.config.errorHandler = function(err, vm, info, a) {
      Vue.nextTick(() => {
        store.dispatch('admin/log/add', {
          type: 'error',
          err,
          vm,
          info
        })
        // console.error(err, info)
        // 只在开发模式下打印 log
        if (process.env.NODE_ENV === 'development') {
          util.log.capsule('Admin', 'ErrorHandler', 'danger')
          util.log.danger('>>>>>> 错误信息 >>>>>>')
          console.log(info)
          util.log.danger('>>>>>> Vue 实例 >>>>>>')
          console.log(vm)
          util.log.danger('>>>>>> Error >>>>>>')
          console.log(err)
        }
      })
    }
  }
}
