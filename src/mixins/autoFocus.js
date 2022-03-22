export default {
  data() {
    return {
      // 获取需要聚焦的所有元素
      allFocusEls: [],
      // 当前聚焦元素的索引
      currentIndex: 1,
      // 如果action为next,则聚焦到下一个输入框，如果action为prev,则聚焦到上一个输入框
      currentAction: 'next'
    }
  },
  async mounted() {
    /*
     * 控制自动聚焦监听
     */
    // document.querySelector('body').addEventListener('keydown', this.focusCtrl, false)
    /*
     * 计算form元素
     * 聚焦默认元素
     */
    await this.$nextTick(() => {
      setTimeout(() => {
        this.getAllFocusEls()
      }, 200)
    })
  },
  async activated() {
    /*
     * 控制自动聚焦监听，keep-alive切换
     */
    await document.querySelector('body').addEventListener('keydown', this.focusCtrl, false)
    await setTimeout(() => {
      this.autoFocus(this.currentIndex)
    }, 200)
  },
  beforeDestroy() {
    /*
     * 注销监听
     */
    // document.querySelector('body').removeEventListener('keydown', this.focusCtrl, false)
  },
  deactivated() {
    /*
     * 注销监听，keep-alive切换
     */
    document.querySelector('body').removeEventListener('keydown', this.focusCtrl, false)
  },
  methods: {
    /*
     * 控制自动聚焦执行
     * 表单select，blur事件，自动聚焦时隐藏下拉框选项菜单
     */
    focusCtrl(e) {
      const current = this.currentIndex
      const key = window.event ? e.keyCode : e.which
      if (key === 13 || key === 39) {
        this.currentAction = 'next'
        this.focusModules(current)
        e.preventDefault()
      } else if (key === 37) {
        this.currentAction = 'prev'
        this.focusModules(current)
        e.preventDefault()
      }
    },
    /*
     * 聚焦行为控制
     * next 聚焦到下一个元素
     * prev 聚焦到上一个元素
     */
    focusModules(index) {
      const focusLen = this.allFocusEls.length
      const action = this.currentAction
      switch (action) {
        case 'next': // 如果action为next,则聚焦到下一个输入框
          if (index >= focusLen - 1) {
            index = 0
          } else {
            index++
          }
          // this.currentAction = 'next'
          break
        case 'prev': // 如果action为prev,则聚焦到上一个输入框
          if (index <= 0) {
            index = focusLen - 1
          } else {
            index--
          }
          // this.currentAction = 'prev'
          break
      }
      // input disabled属性处理
      if (this.allFocusEls[index].disabled) {
        this.focusModules(index)
        return false
      }
      this.autoFocus(index)
    },
    /*
     * 获取需要聚焦的所有元素
     */
    getAllFocusEls() {
      const form = document.getElementsByTagName('form')
      // console.log(document.forms)
      const elements = []
      let index = 0
      const _that = this
      for (var i = 0; i < form.length; i++) {
        const item = form[i]
        for (var e = 0; e < item.length; e++) {
          /* if (item[e].className.indexOf('el-button--mini') !== -1) {
            break
          }
          if (item[e].type === 'file') {
            break
          } */
          item[e].setAttribute('data-index', index)
          item[e].onfocus = function() {
            _that.currentIndex = this.dataset.index
          }
          index++
          elements.push(item[e])
        }
      }
      this.allFocusEls = elements || []
    },
    /*
     * 表单元素聚焦
     */
    autoFocus(index) {
      // bus总线，其他组件select做失焦处理
      this.$bus.emit('form-elements-blur')
      this.allFocusEls[index].focus()
      // this.allFocusEls[index].select()
      // 判断焦点是否相同
      if (document.activeElement !== this.allFocusEls[index]) {
        this.focusModules(index)
        return false
      }
      // 设置input光标位置
      if (document.activeElement.tagName === 'INPUT' && document.activeElement.type === 'text') {
        this.allFocusEls[index].selectionEnd = this.allFocusEls[index].value.length
      }
    }
  }
}
