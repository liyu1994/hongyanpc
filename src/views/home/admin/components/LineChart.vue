<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/plugin/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        // if (this.chart && this.$route.name === 'Home') {
        this.chart.resize()
        // }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    }

    // 监听侧边栏的变化
    // const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    // this.sidebarElm = document.getElementsByClassName('admin-theme-container-aside')[0]
    // this.sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
    // sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHanlder)
    }
  },
  methods: {
    setOptions({ list } = {}) {
      this.chart.setOption({
        // color: [this.color],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            show: true,
            // formatter: function(val) {
            //   return dayjs(val).format('M') + '月'
            // },
            textStyle: {
              color: 'rgba(0, 0, 0, 0.65)',
              fontSize: 12
            }
            // rotate:40
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#E7E7E7'
            }
          },
          axisTick: {
            show: true
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#EDEDED',
              width: 2,
              type: 'solid'
            }
          }
        },
        grid: {
          left: 25,
          right: 32,
          bottom: 10,
          top: 38,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: '#666666',
              type: 'solid'
            }
          },
          textStyle: {
            color: '#333',
            fontSize: 10
          },
          backgroundColor: '#fff',
          extraCssText: 'box-shadow: 0px 4px 16px 0px rgba(139, 147, 167, 0.25);',
          // formatter: function(params) {
          //   const data = params[0]
          //   const { seriesName, axisValue, value } = data
          //   return `<div style="color:#999;font-size:12px">${axisValue}</div><div style="color:#333;font-size:14px;margin-top:8px">${seriesName} : <span style="font-size:18px;">${value[1]}</span></div>`
          // },
          padding: [10]
        },
        yAxis: {
          name: '元',
          nameTextStyle: {
            color: '#999999',
            fontSize: 12,
            // verticalAlign: 'top',
            align: 'left',
            padding: [10, 0, -2, -15]
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: 'rgba(0, 0, 0, 0.65)',
              fontSize: 12
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#eee'
            }
          },
          splitArea: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#F4F4F4',
              width: 2,
              type: 'dashed'
            }
          }
        },
        series: [
          {
            name: '七日成交额',
            data: list,
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              normal: {
                borderColor: '#ffffff',
                borderWidth: 2,
                color: '#1D7DFE',
                lineStyle: {
                  color: '#1D7DFE',
                  width: 2
                // type: 'dashed'
                },
                areaStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0,
                      color: 'rgba(29,125,254,1)' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'rgba(29,125,254,0)' // 100% 处的颜色
                    }
                    ],
                    global: false // 缺省为 false
                  }
                }
              }
            },
            barWidth: 6,
            emphasis: {
              itemStyle: {
                color: '#fff',
                borderColor: 'orange',
                borderWidth: 4,
                shadowColor: 'rgba(0,0,0,0.10)',
                shadowOffsetX: 2,
                shadowOffsety: 2,
                shadowBlur: 4
              }
            }
          }
        ]
      }, true)
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
