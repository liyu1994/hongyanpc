export default {
  bind(el, binding, vnode) {
    const onClick = function() {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, 500)
      }
    }
    if (el._v_onClick) el.removeEventListener('click', el._v_onClick)
    el._v_onClick = onClick
    el.addEventListener('click', el._v_onClick)
  },
  unbind(el) {
    el.removeEventListener('click', el._v_onClick)
    delete el._v_onClick
  }
}
