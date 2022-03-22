import { mapGetters } from 'vuex'
import adminHome from './admin'

export default {
  name: 'home',
  components: { adminHome },
  data() {
    return {
      currentRole: 'adminHome'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'adminHome'
    }
  },
  mounted() {
    this.$nextTick(() => {
      // console.log(this.$refs)
    })
  },
  render(h) {
    return h('admin-container', [
      h('div', {
        class: 'home-container'
      }, [
        h(this.currentRole, {
          ref: 'component',
          props: {
            id: null
          }
        })
      ])
    ])
  }
}
