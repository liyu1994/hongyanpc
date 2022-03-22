<template>
  <div
    class="admin-error-log-list__expand"
    :class="className"
  >
    <p class="admin-error-log-list__expand-title">{{ title }}</p>
    <p class="admin-error-log-list__expand-value">{{ value === '' ? '无数据' : value }}</p>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'log'
    },
    title: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    className() {
      return this.type === 'log' ? 'admin-error-log-list__expand--log' : 'admin-error-log-list__expand--error'
    }
  }
}
</script>
