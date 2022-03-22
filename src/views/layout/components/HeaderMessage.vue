<template>
  <div>
    <el-tooltip
      effect="dark"
      content="消息"
      placement="bottom"
    >
      <el-button
        class="admin-ml-0 admin-mr btn-text can-hover"
        type="text"
        @click="goUrl()"
      >
        <el-badge :value="num" :max="99" class="item">
          <svg-icon icon-class="message" />
        </el-badge>
      </el-button>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 100
    }
  },
  methods: {
    goUrl() {
      this.$router.push({ 'name': 'UserInfoMessage' })
    }
  }
}
</script>
