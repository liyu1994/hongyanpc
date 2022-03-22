<!-- 消息框 -->
<template>
  <div class="message">
    <header class="header">
      <div class="friendname">{{ selectedFrienId }}</div>
    </header>
    <div ref="list" class="message-wrapper">
      <ul v-if="getChatData">
        <li v-for="(item, index) in getChatData" :key="item.id" class="message-item">
          <div v-if="item.time" class="time"><span>{{ item.time | time }}</span></div>
          <div v-else />
          <!-- ‘上次聊到这里’ 分隔 -->
          <div v-if="item.type=='division'" class="division">
            <span v-show="index!=(getChatData.length-1)" class="division-text">上次聊到这里</span>
          </div>
          <div v-else class="main" :class="{ self: item.own }">
            <!-- 头像 -->
            <img class="avatar" width="32" height="32" :src="item.own ? imgHead : imgCustomer">
            <!-- 文本 -->
            <div v-if="item.type=='text'" class="content content-text">
              <div class="text" v-html="replaceContent(item.content)" />
            </div>
            <!-- 图片 -->
            <div v-else-if="item.type=='picture'" class="content content-img">
              <div class="picture">
                <img :src="item.url" class="chat-img" :name="item.name" @click="showImg(item.url)">
              </div>
            </div>
            <!-- 语音 -->
            <div v-else-if="item.type=='audio'" class="content content-audio">
              <div class="audio">
                <my-audio :audio-src="item.url" />
                <!-- <img :src="item.url" class="chat-img" :name="item.name" @click="showImg(item.url)"/> -->
              </div>
            </div>
            <div v-else>{{ JSON.stringify(item) }} {{ index }} {{ getChatData.length-1 }} {{ item.type=='division' && index!=(getChatData.length-1) }}</div>
          </div>
        </li>
      </ul>
    </div>

    <big-img v-show="bigImgVisible" :img-src="imgSrc" @clickit="bigImgVisible=false" />
  </div>
</template>

<script>
import BScroll from 'better-scroll'
// import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
// import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import dayjs from 'dayjs'
import { mapGetters, mapState } from 'vuex'
import imgCustomer from '../../assets/images/img_head.png'
import imgHead from '../../assets/images/img_customer.png'
import router from '@/router'
import myAudio from './components/audio'

window.goWTD = function(id) {
  if (id) {
    // router.app
    router.app.$addRoute({ 'name': 'bills-limitorder-detail', 'query': { 'id': id }})
  }
}
export default {
  components: {
    myAudio
    // DynamicScroller,
    // DynamicScrollerItem
  },
  data() {
    return {
      time: 300,
      BS: null, // 滚动元素存储
      imgHead: imgHead,
      imgCustomer: imgCustomer,
      bigImgVisible: false,
      imgSrc: '' // 点击查看图片的源
    }
  },
  computed: {
    ...mapGetters('admin/im', [
      'getChatData'
    ]),
    ...mapState('admin/im', [
      'selectedFrienId',
      'dialogVisible'
    ])
  },
  watch: {
    dialogVisible(newVlue, oldValue) {
      if (newVlue) {
        if (!this.BS) {
          this.scrollInit()
        }
        this.scrollToBottom()
      }
    }
  },
  mounted() {
    //  在页面加载时让信息滚动到最下面
    // setTimeout(() => { this.$refs.list.scrollTop = this.$refs.list.scrollHeight }, 0)
    // this.scrollInit()
    // console.log(this.getChatData.length)
    // console.log(this.$refs.list.scrollTop)
    // console.log(this.$refs.list.scrollHeight)
    this.$nextTick(() => {
      this.scrollInit()
    })
  },
  beforeDestroy() {
    this.scrollDestroy()
  },
  updated() {
    // this.scrollToBottom()
    // setTimeout(() => { this.$refs.list.scrollTop = this.$refs.list.scrollHeight }, 0)
    // console.log('update', this.getChatData.length)
    this.$nextTick(() => {
      this.scrollToBottom()
    })
  },
  filters: {
    // 将日期过滤为：如果是今日聊天 hour:minutes 否则 YYYY-MM-DD
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
    //  在发送信息之后，将输入的内容中委托单的部分，加入点击链接，属于表情的部分替换成emoji图片标签
    //  再经过v-html 渲染成真正的图片
    replaceContent(content) {
      const bills = content.match(/WTD[0-9]{14}/g)
      bills && bills.length && bills.forEach(element => {
        content = content.replace(element, `<a style="color:#4CA1F6;text-decoration:underline;" onClick="goWTD('${element}')">${element}</a>`)
      })
      return this.$easemob.im.utils.parseEmoji(content)
    },
    // 显示大图
    showImg(url) {
      this.imgSrc = url
      this.bigImgVisible = true
    },
    scrollInit() {
      this.BS = new BScroll(this.$refs.list, {
        mouseWheel: true,
        click: true,
        bounce: false,
        momentum: false,
        scrollbar: {
          fade: false,
          interactive: false
        }
      })
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    },
    scrollDestroy() {
      try {
        this.BS.destroy()
      } catch (e) {
        delete this.BS
        this.BS = null
      }
    },
    scrollToBottom() {
      // setTimeout(() => { this.$refs.list.scrollTop = this.$refs.list.scrollHeight }, 0)
      this.BS.refresh()
      // console.log(this.$refs.list)
      // console.log(this.$refs.list.scrollHeight, this.$refs.list.offsetHeight)
      this.$nextTick(() => {
        this.BS.scrollTo(0, -this.$refs.list.scrollHeight + this.$refs.list.offsetHeight, this.time)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.scroller
  height: 100%
.message
  width: 100%
  height: 478px
  background: #f3f3f3
  border-bottom: 1px solid #e7e7e7;
  .header
    height: 63px
    padding: 20px 0 0 16px
    box-sizing: border-box
    border-bottom: 1px solid #e7e7e7
    .friendname
      font-size: 18px
      color: #333
  .message-wrapper
    height: 414px
    padding: 10px 15px
    box-sizing: border-box
    overflow-y: hidden
    position: relative
    ul
      padding: 0
      margin: 0
    .message-item
      display: block
      // padding-top: 7px
      // padding-bottom: 22px
    .message
      margin-bottom: 15px
    .time
      width: 100%
      font-size: 12px
      margin: 0 auto
      margin-bottom: 22px
      text-align: center
      span
        display: inline-block
        padding: 4px 6px
        color: #fff
        border-radius: 3px
        background-color: #dcdcdc
        margin-top: 22px
    .division
      text-align: center
      margin-top: 19px
      margin-bottom: 15px
      .division-text
        font-size: 12px
        color: #666666
        &::before, &::after
          content: '';
          width: 48px;
          height: 1px;
          display: inline-block;
          margin-bottom: 2px;
          margin: 0 6px 2px 6px;
          border-top: 1px solid #666666
    .main
      .avatar
        float: left
        border-radius: 3px
      .content
        display: inline-block
        margin-left: 10px
        position: relative
        padding: 6px 10px
        max-width: 330px
        min-height: 32px
        box-sizing: border-box
        text-align: left
        word-break: break-all
        white-space: normal
        border-radius: 4px
        background-color: #ffffff
        .chat-img
            max-width: 200px
            max-height: 300px
        &:before
          content: " "
          position: absolute
          top: 12px
          right: 100%
          border: 6px solid transparent
          border-right-color: #ffffff
      .content-img
        padding: 0
    .self
      text-align: right
      .avatar
        float: right
        margin-left:15px
      .content-img
        &:before
          right: -12px
          vertical-align: middle
          border-right-color: transparent
          border-left-color: #ffffff
      .content-text
        min-height: 36px
        line-height: 24px
        background-color: #4CA1F6
        color: #fff
        font-size: 14px
        &:before
          right: -12px
          vertical-align: middle
          border-right-color: transparent
          border-left-color: #4CA1F6
</style>
