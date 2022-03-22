<template>
  <div class="message-container">
    <div
      v-show="isMsg"
      @click="toggleMsg"
    >
      <div class="head" />
      <div class="admin-drawer-mask" />
    </div>

    <div :class="{ 'tab-content': true, 'tab-content-width': isMsg }">
      <scroll-bar
        v-show="isMsg"
        class="right-sidebar-container"
      >
        <div class="sidebar-title">全部系统</div>
        <div
          v-for="(item,index) in appList"
          :key="index"
        >
          <div
            :to="{ path:item.path}"
            class="sidebar-message"
            @click="clickTo(item)"
          >
            <div class="icon">
              <img
                :src="item.iconImage"
                alt=""
              ></div>
            <div class="text">{{ item.name }}</div>
          </div>
        </div>
        <div class="border" />
        <div>
          <div
            v-for="(item,index) in defaultList"
            :key="index+item.name"
          >
            <div
              :to="{ path:item.path}"
              class="sidebar-message"
              @click="clickTo(item)"
            >
              <div class="icon">
                <img
                  :src="item.iconImage"
                  alt=""
                ></div>
              <div class="text">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </scroll-bar>
    </div>
  </div>
</template>

<script>
import ScrollBar from '@/components/ScrollBar'

export default {
  name: 'AppMenuBar',
  components: { ScrollBar },
  props: {
    sidebarForm: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isMsg: false,
      appList: [

      ],
      defaultList: [{ name: '系统', path: '/Index', iconImage: '/static/images/appIcon/btn_administrators.png' }]
    }
  },
  methods: {
    toggleMsg() {
      this.isMsg = !this.isMsg
    },
    clickTo(item) {
      this.isMsg = !this.isMsg
      this.$router.push({ path: item.path })
    },
    // 初始数据
    init() {
      this.toggleMsg()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.admin-drawer-mask {
  height: calc(100vh - 60px);
  top: 60px;
}
.head {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  z-index: 2000;
}
.border {
  margin: 10px 0 !important;
}
.message-container {
  height: calc(100vh - 60px);
  position: fixed;
  top: 60px;
  left: 0;
  z-index: 1999;
  .toggle-msg {
    .tab {
      position: absolute;
      top: 40%;
      right: -38px;
      background-color: #f1595d;
      width: 38px;
      height: 138px;
      border-radius: 6px 0px 0px 6px;
      text-align: center;
      cursor: pointer;
      .pic {
        padding-top: 10px;
      }
      .title {
        /*-webkit-writing-mode: vertical-rl;
				writing-mode: vertical-rl;*/
        font-size: 14px;
        text-align: center;
        color: #ffffff;
        span {
          display: block;
          white-space: initial;
          width: 14px;
          padding-left: 12px;
          letter-spacing: 2px;
        }
      }
      .amount {
        color: #ffffff;
        padding-top: 3px;
        text-align: center;
        font-size: 14px;
      }
    }
  }
  .tab-content {
    width: 0;
    overflow: hidden;
    position: relative;
    background: #ffffff;
    height: 100%;
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.1);
    transition: width 0.28s;
    z-index: 9999;
    .right-sidebar-container {
      background-color: #ffffff;
      .sidebar-title {
        margin: 30px 20px 20px;
        font-size: 14px;
        color: #999999;
        text-align: left;
        padding-right: 10px;
        &.sidebar-title-abnormal {
          height: 36px;
          line-height: 36px;
        }
      }
      .sidebar-message {
        position: relative;
        display: flex;
        flex: 1;
        padding: 10px 20px;
        height: 32px;
        line-height: 32px;
        cursor: pointer;
        &:hover {
          background-color: #f5f5f5;
          &:after {
            $w: 10px;
            position: absolute;
            left: 0;
            top: 10px;
            content: '';
            height: 32px;
            width: 3px;
            background: #d33a31;
            border-radius: 0 $w $w 0;
          }
        }
        .icon {
          color: #a2a7b0;
          width: 32px;
          height: 32px;
          text-align: center;
          font-size: 20px;
          img {
            width: 32px;
            height: 32px;
          }
        }
        .text {
          color: #333;
          width: 151px;
          text-indent: 10px;
          font-size: 16px;
        }
      }
    }
  }
  .tab-content-width {
    width: 250px;
  }
}
</style>
