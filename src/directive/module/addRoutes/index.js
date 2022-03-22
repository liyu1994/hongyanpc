import util from '@/libs/util.js'

export default {
  bind(el, binding, vnode) {
    const onClick = function() {
      // 参数
      const opts = Object.assign({}, binding.value)
      if (el._v_query) opts['query'] = el._v_query
      util.route.setRoutes(opts)
    }
    if (el._v_onClick) el.removeEventListener('click', el._v_onClick)
    el._v_onClick = onClick
    el.addEventListener('click', el._v_onClick)
  },
  update(el, binding) {
    if (binding.arg === 'query') {
      el._v_query = binding.value
    }
  },
  unbind(el) {
    el.removeEventListener('click', el._v_onClick)
    delete el._v_onClick
  }
}
