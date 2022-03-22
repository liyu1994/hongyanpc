<template>
  <div class="message-container">
    <div class="toggle-msg">
      <div class="tab" @click="toggleMsg">
        <img v-show="!isMsg" class="pic" :src="msg_clock2">
        <img v-show="isMsg" class="pic" :src="msg_clock">
        <div class="title"><span>待做事项</span></div>
        <div class="amount">(23)</div>
      </div>
    </div>
    <div :class="{ 'tab-content': true, 'tab-content-width': isMsg }">
      <scroll-bar v-show="isMsg" class="right-sidebar-container">
        <div class="sidebar-title">待做事项</div>
        <div>
          <router-link v-if="goodsCheck" :to="{ path: '/bill/goods' }" class="sidebar-message">
            <div class="icon"><svg-icon icon-class="todo_icon01" /></div>
            <div class="text">待受理订单</div>
            <div class="amount">1</div>
          </router-link>
          <div v-else class="sidebar-message">
            <div class="icon"><svg-icon icon-class="todo_icon01" /></div>
            <div class="text">待受理订单</div>
            <div class="amount">2</div>
          </div>
          <router-link v-if="pickCheck" :to="{ path: '/bill/pick' }" class="sidebar-message">
            <div class="icon"><svg-icon icon-class="todo_icon02" /></div>
            <div class="text">待提货</div>
            <div class="amount">3</div>
          </router-link>
          <div v-else class="sidebar-message">
            <div class="icon"><svg-icon icon-class="todo_icon02" /></div>
            <div class="text">待提货</div>
            <div class="amount">4</div>
          </div>
          <router-link v-if="stowageCheck" :to="{ path: '/bill/stowage' }" class="sidebar-message">
            <div class="icon"><svg-icon icon-class="todo_icon03" /></div>
            <div class="text">待配载</div>
            <div class="amount">5</div>
          </router-link>
          <div v-else class="sidebar-message">
            <div class="icon"><svg-icon icon-class="todo_icon03" /></div>
            <div class="text">待配载</div>
            <div class="amount">6</div>
          </div>
          <router-link v-if="stowageCheck" :to="{ path: '/bill/stowage', query: { status: 'AL_PLAN' } }" class="sidebar-message">
            <div class="icon"><svg-icon icon-class="todo_icon04" /></div>
            <div class="text">待发货</div>
            <div class="amount">7</div>
          </router-link>
          <div v-else class="sidebar-message">
            <div class="icon"><svg-icon icon-class="todo_icon04" /></div>
            <div class="text">待发货</div>
            <div class="amount">8</div>
          </div>
          <router-link v-if="deliveryCheck" :to="{ path: '/bill/delivery' }" class="sidebar-message">
            <div class="icon dispatching"><svg-icon icon-class="todo_icon05" /></div>
            <div class="text">待配送</div>
            <div class="amount">9</div>
          </router-link>
          <div v-else class="sidebar-message">
            <div class="icon dispatching"><svg-icon icon-class="todo_icon05" /></div>
            <div class="text">待配送</div>
            <div class="amount">10</div>
          </div>
          <router-link v-if="signCheck" :to="{ path: '/bill/sign' }" class="sidebar-message">
            <div class="icon"><svg-icon icon-class="todo_icon06" /></div>
            <div class="text">待签收</div>
            <div class="amount">11</div>
          </router-link>
          <div v-else class="sidebar-message">
            <div class="icon"><svg-icon icon-class="todo_icon06" /></div>
            <div class="text">待签收</div>
            <div class="amount">12</div>
          </div>
        </div>

        <div class="sidebar-title sidebar-title-abnormal">异常处理</div>
        <div>
          <router-link v-if="signCheck" :to="{ path: '/bill/sign', query: { status: 'ABNORMAL' } }" class="sidebar-message">
            <div class="icon"><svg-icon icon-class="todo_icon07" /></div>
            <div class="text">回单逾期</div>
            <div class="amount amount-abnormal">13</div>
          </router-link>
          <div v-else class="sidebar-message">
            <div class="icon"><svg-icon icon-class="todo_icon07" /></div>
            <div class="text">回单逾期</div>
            <div class="amount amount-abnormal">14</div>
          </div>
          <router-link v-if="consignmentCheck" :to="{ path: '/bill/consignment', query: { status: 'AL_BILLED', date: 'true' } }" class="sidebar-message">
            <div class="icon"><svg-icon icon-class="todo_icon08" /></div>
            <div class="text">超期警报</div>
            <div class="amount amount-abnormal">15</div>
          </router-link>
          <div v-else class="sidebar-message">
            <div class="icon"><svg-icon icon-class="todo_icon08" /></div>
            <div class="text">超期警报</div>
            <div class="amount amount-abnormal">16</div>
          </div>
          <div class="sidebar-message">
            <div class="icon"><svg-icon icon-class="todo_icon09" /></div>
            <div class="text">异常警报</div>
            <div class="amount amount-abnormal">17</div>
          </div>
          <div class="sidebar-message">
            <div class="icon dispatching"><svg-icon icon-class="todo_icon11" /></div>
            <div class="text">资金异常</div>
            <div class="amount amount-abnormal">18</div>
          </div>
        </div>
      </scroll-bar>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ScrollBar from '@/components/ScrollBar'
import msg_clock from '@/assets/images/clock.png'
import msg_clock2 from '@/assets/images/clock.gif'

export default {
  name: 'AppMessage',
  components: { ScrollBar },
  data() {
    return {
      msg_clock,
      msg_clock2,
      isMsg: false
    }
  },
  computed: {
    ...mapState('admin/page', ['routers']),
    goodsCheck() {
      return this.checkUrl('goods')
    },
    pickCheck() {
      return this.checkUrl('pick')
    },
    stockCheck() {
      return this.checkUrl('stock')
    },
    outsourceCheck() {
      return this.checkUrl('outsource')
    },
    distributionCheck() {
      return this.checkUrl('distribution')
    },
    stowageCheck() {
      return this.checkUrl('stowage')
    },
    consignmentCheck() {
      return this.checkUrl('consignment')
    },
    deliveryCheck() {
      return this.checkUrl('delivery')
    },
    signCheck() {
      return this.checkUrl('sign')
    }
  },
  mounted() {
    document.documentElement.addEventListener('mousedown', this.handleUpClose, true)
  },
  beforeDestroy() {
    document.documentElement.removeEventListener('mousedown', this.handleUpClose, true)
  },
  methods: {
    checkUrl(name) {
      var obj = []
      this.routers.forEach((item, index) => {
        if (item.children && item.children.length >= 0) {
          obj = obj.concat(item.children)
        }
      })
      if (obj.some(v => v.code === name)) {
        return true
      } else {
        return false
      }
    },
    toggleMsg() {
      this.isMsg = !this.isMsg
    },
    handleUpClose(e) {
      const target = e.target || e.srcElement
      const regex = new RegExp('handle-([trmbl]{2})', '')
      if (!this.$el.contains(target) && !regex.test(target.className)) {
        if (this.isMsg) {
          this.isMsg = false
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.message-container {
  height: calc(100vh - 60px);
  position: fixed;
  top: 60px;
  right: 0;
  z-index: 1999;
  .toggle-msg {
    .tab {
      position: absolute;
      top: 40%;
      left: -38px;
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
    .right-sidebar-container {
      background-color: #ffffff;
      .sidebar-title {
        height: 42px;
        line-height: 42px;
        font-size: 14px;
        color: #999999;
        text-align: right;
        padding-right: 10px;
        &.sidebar-title-abnormal {
          height: 36px;
          line-height: 36px;
        }
      }
      .sidebar-message {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        height: 56px;
        /*cursor: pointer;*/
        &:hover {
          background-color: #edf2f8;
          .text {
            color: #0b8bef;
          }
        }
        .icon {
          color: #a2a7b0;
          width: 32px;
          text-align: center;
          font-size: 20px;
          &.dispatching {
            font-size: 25px;
          }
        }
        .text {
          color: #606266;
          width: 151px;
          text-indent: 10px;
          font-size: 15px;
        }
        .amount {
          width: 32px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          font-size: 12px;
          color: #ffffff;
          background-color: #46b692;
          &.amount-abnormal {
            background-color: #f98700;
          }
        }
      }
    }
  }
  .tab-content-width {
    width: 215px;
  }
}
</style>
