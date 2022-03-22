import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('admin/user', ['elements', 'menus'])
  },
  methods: {
    // 按钮权限
    permission(val) {
      // return process.env.NODE_ENV === 'production_XXX' ? this.elements[val] : true
      // return process.env.NODE_ENV === 'development' ? this.elements[val] : true
      // 生产环境才执行
      return process.env.VUE_APP_PERMISSION === 'true' ? this.elements[val] : true
    }
  }
}
