<template>
  <div class="el-input el-input--medium">
    <input
      ref="input"
      type="text"
      :readonly="disabled"
      :disabled="disabled"
      :value="value"
      :maxlength="isMaxLength"
      :placeholder="isPlaceholder"
      :class="[{'el-input__inner': isDefaultCss}, isCss]"
      autoComplete="off"
      style="ime-mode:disabled"
      onpaste="return true"
      ondrop="return true"
      ondragenter="return true"
      ondragstart="return true"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown($event)"
      @input="handleModelInput"
    >
    <div class="suffix">
      <slot>{{ append }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CleaveInput',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    isPlaceholder: {
      type: String,
      default: ''
    },
    // 设置class
    isCss: {
      type: String,
      default: ''
    },
    // 启用默认class
    isDefaultCss: {
      type: Boolean,
      default: true
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 小数位，默认二位
    isDecimal: {
      type: Number,
      default: 2
    },
    isMaxLength: {
      type: Number,
      default: 8
    },
    // 最大值
    isMax: {
      type: Number,
      default: 0
    },
    // 最小值
    isMin: {
      type: Number,
      default: 0
    },
    // 允许0
    isZero: {
      type: Boolean,
      default: false
    },
    append: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      initValue: this.value
    }
  },
  computed: {
    platforms: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    handleFocus(event) {
      this.$emit('focus', event)
    },
    handleBlur(event) {
      // 失焦验证
      // const prop = this.$parent.prop
      // if (prop) this.$parent.form.validateField(prop)
      // this.$el.querySelector('input').value = this.value ? Number(this.value) : ''
      // this.$emit('input', this.value ? Number(this.value).toString() === 'NaN' ? '' : Number(this.value) : '')
      // this.value = this.value ? (Number(this.value).toString() === 'NaN' ? '' : Number(this.value)) : this.isZero ? this.value : ''

      this.$emit('input', this.value)
      const obj = event.target || event.srcElement
      // obj.value = this.isMax && this.value > this.isMax ? this.isMax : this.value
      obj.value = this.value ? (Number(this.value).toString() === 'NaN' ? '' : Number(this.value)) : this.isZero ? this.value : ''
      if (obj.value !== '') {
        if (this.isMax && obj.value > this.isMax) {
          obj.value = this.isMax
        }
        if (this.isMin && obj.value < this.isMin) {
          obj.value = this.isMin
        }
      }

      this.platforms = obj.value
      if (this.$parent.$options.componentName === 'ElFormItem') {
        this.$parent.$emit('el.form.blur', [this.value])
      }
      this.$emit('blur', event)
    },
    handleKeydown(event) {
      const isFullStop = key => {
        return (key === 190 || key === 110) && this.isDecimal !== 0
      }
      const isNumber = key => {
        return (key >= 48 && key <= 57) || (key >= 96 && key <= 105)
      }
      const key = window.event ? event.keyCode : event.which
      const obj = event.target || event.srcElement
      const value = obj.value.toString()
      // 过滤非数字字符
      if (!isNumber(key) && !event.shiftKey && !event.ctrlKey && !isFullStop(key) && key !== 13 && key !== 9 && key !== 8 && key !== 46 && key !== 37 && key !== 39) event.preventDefault()
      // 防止第一位输入小数点
      if (!value) {
        if (isFullStop(key)) event.preventDefault()
      }
      // 防止输入多个0
      if (value.length !== 0 && Number(value) === 0 && value.indexOf('.') === -1 && (key === 48 || key === 96)) event.preventDefault()
    },
    handleModelInput(event) {
      const obj = event.target || event.srcElement
      const value = obj.value.toString()
      const val = value
        .replace(/[^\d.]/g, '')
        .replace(/\./g, '.')
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
        .replace(new RegExp('^(\\-)*(\\d+)\\.(\\d{' + this.isDecimal + '}).*$', ''), '$1$2.$3')
      /* if (val.charAt(0) === '.') {
        val = parseFloat(val) || ''
      } */
      obj.value = val
      this.$emit('input', obj.value)
      if (this.$parent.$options.componentName === 'ElFormItem') {
        this.$parent.$emit('el.form.change', [obj.value])
      }
      this.$emit('change', obj.value)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
input[type='text']:disabled {
  background-color: #f5f7fa;
  color: #c0c4cc;
  cursor: not-allowed;
}
 .el-input--medium{
    position: relative;
    .suffix{
      position: absolute;
      right: 10px;
      top: 10px;
      color: #c0c4cc;
      font-size: 12px;
    }
  }
</style>
