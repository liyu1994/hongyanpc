<!-- 好友列表 -->
<template>
  <div class="msglist">
    <ul>
      <li v-for="item in getDisplayRos" :key="item.name" class="sessionlist" :class="{ active: item.name === selectedFrienId }" @click="selectSession(item.name)">
        <div class="list-left">
          <img class="avatar" :src="imgHead" width="44" height="44" :alt="item.name">
          <span v-show="isShowRedPoint(item)" class="red-point" />
        </div>
        <div class="list-right">
          <p class="name">{{ item.name }}</p>
          <span v-if="item.time" class="time">{{ item.time | time }}</span>
          <p class="lastmsg" v-html="replaceContent(item.content)" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import dayjs from 'dayjs'
import imgHead from '../../assets/images/img_head.png'
export default {
  data() {
    return {
      imgHead: imgHead // 头像图片链接
    }
  },
  computed: {
    ...mapState('admin/im', [
      'selectedFrienId',
      'newsRoles'
    ]),
    ...mapGetters('admin/im', [
      'getRosData',
      'getDisplayRos'
    ]),
    // 是否显示小红点
    isShowRedPoint: (vm) => (item) => {
      return item.name !== vm.$store.state.admin.im.selectedFrienId && vm.$store.state.admin.im.newsRoles.indexOf(item.name) !== -1
    }
  },
  filters: {
    // 将日期过滤为 hour:minutes 如果不是今日聊天 只显示日期
    time(date) {
      const month = date.split(' ')[0]
      const minutes = date.split(' ')[1]
      if (month === dayjs().format('YYYY-MM-DD')) {
        return minutes.slice(0, 5)
      } else {
        return month
      }
    }
  },
  methods: {
    // 点击好友列表 切换对话好友
    async selectSession(name) {
      // 在新信息列表中去掉自己
      this.$store.commit('admin/im/updateNewsRoles', this.selectedFrienId)
      await this.$store.dispatch('admin/im/deleteDbDevision', this.selectedFrienId)
      this.$store.dispatch('admin/im/changeSelectedFriend', name)
    },
    //  在发送信息之后，将输入的内容中委托单的部分，加入点击链接，属于表情的部分替换成emoji图片标签
    //  再经过v-html 渲染成真正的图片
    replaceContent(content) {
      return this.$easemob.im.utils.parseEmoji(content)
    }
  }
}
</script>

<style lang="stylus" scoped>
.msglist
  height: 540px
  overflow-y: auto
  ul
    padding: 0
    margin: 0
  .sessionlist
    display: flex
    padding: 9px 12px 11px 12px
    height: 44px
    transition: background-color .1s
    // font-size: 0
    &:hover
      background-color: rgb(220,220,220)
    &.active
      background-color: #cccccc
    .list-left
      width: 52px
    .avatar
      border-radius: 2px
      margin-right: 12px
    .red-point
      position: relative
    .red-point::before
      content: " "
      border: 4px solid red
      border-radius: 4px
      position: absolute
      z-index: 1000
      left: -17px
      top: -35px
    .list-right
      position: relative
      flex: 1
      margin-top: 4px
      .name
        display: inline-block
        vertical-align: top
        font-size: 14px
        color: #333333
        margin: 0
      .time
        float: right
        color: #999
        font-size: 10px
        vertical-align: top
      .lastmsg
        position: absolute
        font-size: 12px
        width: 140px
        height: 18px
        line-height: 18px
        bottom: 4px
        overflow: hidden
        white-space:nowrap
        text-overflow:ellipsis
        color: #666666
        margin: 5px 0 0 0
        >>> .emoji
          width: 18px
</style>
