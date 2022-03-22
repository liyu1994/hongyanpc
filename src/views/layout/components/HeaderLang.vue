<template>
  <el-dropdown
    size="small"
    placement="bottom"
    @command="onChangeLocale"
  >
    <div class="admin-mr btn-text icon">
      <svg-icon icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="language in $languages"
        :key="language.value"
        :command="language.value"
      >
        <admin-icon
          :name="$i18n.locale === language.value ? 'dot-circle-o' : 'circle-o'"
          class="admin-mr-5"
        />
        {{ language.label }}
      </el-dropdown-item>
      <!-- <el-dropdown-item v-for="(item, index) in list" :key="index" :disabled="activeSetting.label===item.label" :command="item.label">{{ item.name }}</el-dropdown-item> -->
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import localeMixin from '@/locales/mixin.js'

export default {
  mixins: [localeMixin]
}

// import { mapState, mapGetters, mapActions } from 'vuex'

// export default {
//   computed: {
//     ...mapState('admin/lang', [
//       'list'
//     ]),
//     ...mapGetters('admin/lang', [
//       'activeSetting'
//     ])
//   },
//   methods: {
//     ...mapActions('admin/lang', [
//       'set'
//     ]),
//     handleSetLanguage(lang) {
//       this.set(lang)
//         .then(() => {
//           this.$i18n.locale = lang
//         })
//     }
//   }
// }
</script>

<style>
</style>
