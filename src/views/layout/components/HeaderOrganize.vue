<template>
  <div v-if="info.organizationVOList.length>1">
    <el-select
      v-model="organizationId"
      placeholder=""
      @change="changeOrg"
    >
      <el-option
        v-for="(item,index) in info.organizationVOList"
        :key="index"
        :label="item.orgName"
        :value="item.orgId"
      />
    </el-select>
  </div>
</template>

<script>
// import { setOrgId } from '@/api/admin/system/organize'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'HeaderUser',
  data() {
    return {
      list: [],
      organizationId: ''
    }
  },
  computed: {
    ...mapState('admin/org', ['orgId', 'orgList']),
    ...mapState('admin/user', ['info'])
  },
  created() {
    const orgId = this.info.defaultOrganizationId
    this.organizationId = orgId
    this.set(orgId)
    // if (this.orgId === '') {
    //   const orgId = this.info.organizationVOList !== null ? this.info.organizationVOList[0].orgId : ''
    //   this.organizationId = orgId
    //   this.set(orgId)
    // } else {
    //   this.organizationId = this.orgId
    // }
  },
  methods: {
    ...mapActions('admin/org', ['set']),
    ...mapMutations('admin/page', ['keepAliveClean']),
    ...mapActions('admin/page', ['closeAll']),
    changeOrg() {
      // setOrgId({
      //   orgId: this.organizationId,
      //   employeeNum: this.info.empNo
      // }).then(response => {
      //   this.refreshRouter()
      // })
      // this.set(this.organizationId)
    },
    refreshRouter() {
      const _this = this
      this.$nextTick(() => {
        _this.$router.replace('/home')
        _this.$router.go(0)
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.btn-text {
  font-size: 14px !important;
}
</style>
