<template>
  <el-button class="admin-mr btn-text can-hover" type="text" @click="handleClick">
    <admin-icon name="search" style="font-size: 18px;" />
  </el-button>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>
