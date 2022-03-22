<template>
  <div class="date-picker-container">
    <!-- 开始日期 -->
    <div class="date-picker-item">
      <!-- <label>{{ startPlaceholder }}</label> -->
      <el-date-picker
        v-model="date[0]"
        type="date"
        :placeholder="startPlaceholder"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        :editable="false"
        :clearable="false"
        :picker-options="startPickerOptions"
        @change="handleDateChanged"
      />
    </div>
    {{ centerPlaceholder }}
    <!-- 结束日期 -->
    <div class="date-picker-item">
      <!-- <label>{{ endPlaceholder }}</label> -->
      <el-date-picker
        v-model="date[1]"
        type="date"
        :placeholder="endPlaceholder"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        :editable="false"
        :clearable="false"
        :picker-options="endPickerOptions"
        @change="handleDateChanged"
      />
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
  name: 'DatePicker',
  props: {
    date: {
      type: Array,
      default: () => {
        return []
      }
    },
    centerPlaceholder: {
      type: String,
      default: '-'
    },
    startPlaceholder: {
      type: String,
      default: '开始日期'
    },
    endPlaceholder: {
      type: String,
      default: '结束日期'
    }
  },
  computed: {
    startPickerOptions() {
      const endDate = this.date[1]
      if (!endDate) {
        return false
      }
      return {
        disabledDate(time) {
          const currentTime = new Date(`${dayjs(time).format('YYYY-MM-DD')} 00:00:00`)
          const endTime = new Date(`${dayjs(endDate).format('YYYY-MM-DD')} 00:00:00`)
          return currentTime.getTime() > endTime.getTime()
        }
      }
    },
    endPickerOptions() {
      const startDate = this.date[0]
      if (!startDate) {
        return false
      }
      return {
        disabledDate(time) {
          const currentTime = new Date(`${dayjs(time).format('YYYY-MM-DD')} 00:00:00`)
          const startTime = new Date(`${dayjs(startDate).format('YYYY-MM-DD')} 00:00:00`)
          return currentTime.getTime() < startTime.getTime()
        }
      }
    }
  },
  methods: {
    handleDateChanged() {
      this.$emit('change')
    }
  }
}
</script>
<style lang="scss" scoped>
.date-picker-container {
  display: inline-block;
  vertical-align: top;
  color: #606266;
  .date-picker-item {
    display: inline-block;
    vertical-align: top;
    label {
      font-size: 14px;
    }
  }
  /deep/ .el-input {
    width: 150px;
  }
  /deep/ .el-input__inner {
    width: 150px;
    height: 32px;
    line-height: 32px;
    padding-right: 10px;
  }

  /deep/ .el-input__icon {
    // color: #0070f5;
    position: relative;
    top: 1px;
  }
  /deep/ .el-range-separator {
    top: -2px;
    position: relative;
  }
}
</style>
