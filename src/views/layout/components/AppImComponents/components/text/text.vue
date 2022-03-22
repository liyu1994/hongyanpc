<!-- 文本输入框 -->
<template>
  <div class="text">
    <div class="emoji">
      <i class="el-icon-picture-outline" @click="showImgUpload" />
      <input id="img-upload-input" ref="img-upload-input" class="img-upload-input" type="file" accept="image/png,image/jpg,image/jpeg,image/gif,image/bmp" @change="handleUpload">
      <img class="smile-icon" :src="smileIcon" @click="showEmoji=!showEmoji">
      <transition name="showbox">
        <div v-show="showEmoji" class="emojiBox">
          <li v-for="(value, name) in emojis" :key="value">
            <img :src="'/static/images/faces/'+ value" :data="name" @click="content += name">
          </li>
        </div>
      </transition>
    </div>
    <textarea ref="text" v-model="content" maxlength="200" @keyup="onKeyup" @click="showEmoji=false" />
    <div class="send" @click="send">
      <span>发送(enter)</span>
    </div>
    <transition name="appear">
      <div v-show="warn" class="warn">
        <div class="description">不能发送空白信息</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import smileIcon from '../../assets/images/smile.png'
export default {
  data() {
    return {
      smileIcon: smileIcon, // 笑脸图片地址
      content: '', // 输入框内容
      frequency: 0,
      emojis: {}, // 表情图片库信息
      showEmoji: false, // 表情框是否显示
      warn: false // 提示框是否隐藏
    }
  },
  computed: {
    ...mapState('admin/im', [
      'selectedFrienId'
    ]),
    ...mapGetters([
      'selectedChat',
      'getChatData'
    ])
  },
  watch: {
    // 在选择其它对话的时候 聚焦输入框
    selectedFrienId() {
      setTimeout(() => {
        this.$refs.text.focus()
      }, 0)
    },
    // 当输入框中的值为空时 弹出提示  并在一秒后消失
    content() {
      if (this.content === '') {
        if (this.frequency === 0) {
          this.warn = true
          this.frequency++
          setTimeout(() => {
            this.warn = false
          }, 1000)
        }
      }
    }
  },
  // 在进入的时候 聚焦输入框
  mounted() {
    this.emojis = this.$easemob.im.utils.EmotionPicData
    this.$refs.text.focus()
  },
  methods: {
    // 按回车发送信息
    onKeyup(e) {
      if (e.keyCode === 13) {
        this.send()
      }
    },
    // 点击发送按钮发送信息
    send() {
      if (this.content.length <= 1) {
        this.warn = true
        this.content = ''
        setTimeout(() => {
          this.warn = false
        }, 1000)
      } else {
        var messageItem = {
          user: this.selectedFrienId,
          message: this.content
        }
        this.$store.dispatch('admin/im/imSendTextMessage', messageItem)
        // this.set(messageItem)
        this.content = ''
      }
    },
    // 调用IM文件上传
    handleUpload(e) {
      const imgItem = {
        user: this.selectedFrienId,
        fileInputId: e.target.id
      }
      this.$store.dispatch('admin/im/imSendImgMessage', imgItem)
    },
    // 点击上传图片按钮
    showImgUpload() {
      this.$refs['img-upload-input'].click()
    }
  }
}
</script>

<style lang="stylus" scoped>
.text
  position: relative
  height: 171px
  background: #fff
  border-bottom: 1px solid #e7e7e7
  .emoji
    position: relative
    width: 100%
    height: 40px
    line-height: 40px
    font-size: 12px
    padding: 0 15px
    box-sizing: border-box
    color: #7c7c7c
    .img-upload-input
      opacity: 0
    .icon-look
      cursor: pointer
      &:hover
        color: #1aad19
    .el-icon-picture-outline
      font-size: 22px
      position: relative
      top: -3px
    .smile-icon
      position: absolute
      left: 43px
    .emojiBox
      position: absolute
      display: flex
      flex-wrap: wrap
      top: -160px
      left: -100px
      width: 280px
      height: 150px
      padding: 5px
      background-color: #fff
      border: 1px solid #d1d1d1
      border-radius: 2px
      box-shadow:0 1px 2px 1px #d1d1d1
      &.showbox-enter-active, &.showbox-leave-active
        transition: all .5s
      &.showbox-enter,&.showbox-leave-active
        opacity: 0
      li
        list-style: none
        width: 28px
      img
        width: 25px
        heigth 25px
  textarea
    box-sizing: border-box
    padding: 0 15px
    height: 80px
    width: 100%
    border: none
    outline: none
    font-family: "Micrsofot Yahei"
    resize: none
  .send
    position: absolute
    bottom: 16px
    right: 16px
    width: 90px
    height: 30px
    line-height: 30px
    box-sizing: border-box
    text-align: center
    border: 1px solid #e5e5e5
    border-radius: 3.2px
    background: #0C8BEF
    font-size: 14px
    color: #f3f3f3
    &:hover
      background: #4CA1F6
  .warn
    position: absolute
    bottom: 50px
    right: 10px
    width: 110px
    height: 30px
    line-height: 30px
    font-size: 12px
    text-align: center
    border: 1px solid #bdbdbd
    border-radius: 4px
    box-shadow:0 1px 5px 1px #bdbdbd
    &.appear-enter-active, &.appear-leave-active
      transition: all 1s
    &.appear-enter,&.appear-leave-active
      opacity: 0
    &:before
      content: " "
      position: absolute
      top: 100%
      right: 20px
      border: 7px solid transparent
      border-top-color: #fff
      filter:drop-shadow(1px 3px 2px #bdbdbd)
</style>
