<template>
  <!-- <draggable class="drop-box1" :options="options" :value="list1" @input="handleListChange($event, 'left')" @end="handleEnd($event, 'left')"> -->
  <div class="im-container">
    <div v-if="isShowIM" class="content">
      <div :class="isPlay === true ? 'im-icon shake':'im-icon'">
        <img :src="imIcon" width="48" @click="handelToggle">
        <span v-show="isShowRedPoint" class="red-point" />
      </div>
      <div v-show="dialogVisible">
        <div>
          <i class="el-icon-close close-icon" @click="handelToggle" />
          <chat />
        </div>
      </div>
    </div>
  </div>
  <!-- </draggable> -->
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import chat from './AppImComponents/chat/chat'
import imIcon from './AppImComponents/assets/images/img_imicon.png'
// import util from '@/libs/util.js'
// import draggable from 'vuedraggable'
// import mycard from './AppImComponents/mycard/mycard'

export default {
  name: 'AppIm',
  components: {
    chat
    // mycard,
    // draggable
  },
  data() {
    return {
      isShowIM: false, // 是否显示IM模块
      imIcon: imIcon // 右下角通信图标
    }
  },
  computed: {
    ...mapState('admin/im', [
      'newsRoles',
      'selectedFrienId',
      'isPlay',
      'dialogVisible'
    ]),
    ...mapState('admin/account', [
      'userId'
    ]),
    isShowRedPoint() {
      return this.newsRoles.length > 1 || (this.newsRoles.length === 1 && !this.dialogVisible)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions('admin/im', [
      'imConnect',
      'imLogin',
      'imRosList'
    ]),
    ...mapMutations('admin/im', [
      'updateNewsRoles',
      'setDialogVisible'
    ]),
    // 初始化页面
    init() {
      // 判断用户是否可以登录，成功的话，初始化环信消息监听，否则，隐藏IM模块
      const userId = 'USER19032300002002U000' // util.cookies.get('userId')
      this.imLogin(userId).then(async() => {
        this.isShowIM = true
        // 加载好友列表
        await this.imRosList()
        // 环信链接信息监听
        await this.imConnect()
      }).catch(() => {
        this.isShowIM = false
      })
    },
    // 控制IM对话窗显示隐藏
    handelToggle() {
      this.setDialogVisible(!this.dialogVisible)
      if (!this.dialogVisible) {
        // 更新当前对话好友
        this.updateNewsRoles(this.selectedFrienId)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// 抖动动画
@keyframes tada {
  0% { transform:rotate(-1deg); }
  10%,20% { transform: rotate(-5deg); }
  30%,50%,70%,90% { transform:rotate(5deg); }
  40%,60%,80% { transform:rotate(-5deg); }
  100% { transform:rotate(0); }
}
.im-container {
  position: fixed;
  pointer-events: auto;
  bottom: 100px;
  right: 200px;
  height: 600px;
  margin: 0;
  box-sizing: border-box;
  background-color: #FFF;
  box-shadow: 1px 1px 50px rgba(0,0,0,.3);
  // 为何设置为这么大，因为echarts的tooltip设置的值为七个9，不能比他小
  z-index: 9999999;
  * {
    display: inline-block;
    *display:inline;
    *zoom:1;
    box-sizing: content-box;
    vertical-align:top;
    font-size: 14px;
  }
  .content {
    white-space: nowrap;
    display: flex;
    cursor: pointer;
    .im-icon {
      position: fixed;
      bottom: 36px;
      right: 36px;
      transition:All 0.4s;
      opacity:1;
      :hover{
        opacity: 0.7;
      }
      .red-point{
        position: relative;
      }
      .red-point::before{
        content: " ";
        border: 4px solid red;
        border-radius: 4px;
        position: absolute;
        z-index: 1000;
        left: -12px;
      }
    }
    .shake{
      animation: tada 1s .2s ease both;
    }
    .close-icon {
      font-size: 20px;
      position: absolute;
      right: 15px;
      top: 15px;
    }
    .icon {
      font-size: 35px;
      color: red;
      vertical-align: middle;
      border-radius: 100%;
    }
    .user-name {
      width: auto;
      max-width: 120px;
      padding-left: 5px;
      font-size: 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
