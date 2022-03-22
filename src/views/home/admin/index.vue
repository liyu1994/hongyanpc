<template>
  <div class="home_warp">
    <div class="card-list" flex="main:justify">
      <div class="item" flex-box="1">
        <div class="title">今日订单</div>
        <div class="number">{{ baseData.todayOrderNum }}</div>
        <div class="tip">较上日<i v-if="baseData.compareOrderNum < 0" class="el-icon-bottom" /><i v-if="baseData.compareOrderNum > 0" class="el-icon-top" />{{ Math.abs(baseData.compareOrderNum) }}</div>
      </div>
      <div class="item" flex-box="1">
        <div class="title">历史订单数</div>
        <div class="number">{{ baseData.allOrderNum }}</div>
      </div>
      <div class="item" flex-box="1">
        <div class="title">今日成交额（元）</div>
        <div class="number">{{ baseData.todayTurnover }}</div>
        <div class="tip">较上日<i v-if="baseData.compareTurnover < 0" class="el-icon-bottom" /><i v-if="baseData.compareTurnover > 0" class="el-icon-top" />{{ Math.abs(baseData.compareTurnover) }}</div>
      </div>
      <div class="item" flex-box="1">
        <div class="title">总成交额（元）</div>
        <div class="number">{{ baseData.allTurnover }}</div>
      </div>
    </div>
    <div class="chart-wrap" flex="dir:top">
      <div class="title" flex-box="0">近七日成交额</div>
      <div flex-box="1">
        <line-chart :chart-data="chartData" />
      </div>
    </div>
  </div>

</template>

<script>
import LineChart from './components/LineChart'
import { getOrderStatistics } from '@/api/admin'

export default {
  name: 'Index',
  components: {
    LineChart
  },
  data() {
    return {
      baseData: {},
      chartData: {
        list: []
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      getOrderStatistics().then(res => {
        this.baseData = res.data
        this.chartData.list = res.data.dayStatisticsVoList.map(item => {
          return [item.createDay, item.turnover]
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.card-list {
  margin-top: -10px;
  .item {
    box-sizing: border-box;
    height: 159px;
    padding: 29px 0 0 35px;
    color: #fff;
    .title {
      font-size: 16px;
    }
    .number {
      font-size: 42px;
      margin-top: 5px;
    }
  }
  .item:nth-of-type(1) {
    background: url(~@/assets/imgs/bg_order_today@2x.png);
    background-size: 100% 100%;
  }
   .item:nth-of-type(2) {
    background: url(~@/assets/imgs/bg_order_total@2x.png);
    background-size: 100% 100%;
  }
   .item:nth-of-type(3) {
    background: url(~@/assets/imgs/bg_turnover_today@2x.png);
    background-size: 100% 100%;
  }
   .item:nth-of-type(4) {
    background: url(~@/assets/imgs/bg_turnover_total@2x.png);
    background-size: 100% 100%;
  }
}
.chart-wrap {
  height: 378px;
  background: #fff;
  border-radius: 4px;
  padding-top: 18px;
  .title {
    color: #333;
    font-size: 18px;
    font-size: 500;
    padding: 0px 26px;
    position: relative;
    &::before {
      content: '';
      width: 4px;
      height: 14px;
      display: block;
      background: #1C62CB;
      position: absolute;
      left: 18px;
      top: 3px;
    }
  }
}
</style>
