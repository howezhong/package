<template>
  <section class="calendar-container">
    <!-- 头部 -->
    <header class="calendar-header">
      <div class="calendar-header-item">
        <div class="calendar-panel">
          <div class="calendar-prev" @click="beforeMonth">
            <svg
              :stroke="stroke"
              :stroke-width="strokeWidth"
              fill="none" height="38"
              stroke-linecap="round" stroke-linejoin="round"
              viewBox="0 0 24 24" width="38" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </div>
          <div class="calendar-year-month" @click="selectYearMonth">{{year}}年{{month}}月</div>
          <div class="calendar-next" @click="afterMonth">
            <svg
              :stroke="stroke"
              :stroke-width="strokeWidth"
              fill="none" height="38"
              stroke-linecap="round" stroke-linejoin="round"
              viewBox="0 0 24 24" width="38" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </div>
        <div class="calendar-today" v-if="hasToday" @click="jumpToday">今日</div>
      </div>
      <div class="calendar-left__fence"></div>
      <div class="calendar-right__fence"></div>
    </header>

    <!-- date -->
    <div class="calendar-main">
      <div class="calendar-week">
        <div class="week" v-for="(week, i) in weeks" :key="i">{{week}}</div>
      </div>
      <div class="calender-week-date">
        <div class="calender-week-date-row" v-for="(item, i) in days" :key="`row-${i}`">
          <div class="calender-week-date-column"
            v-for="(day, i) in item" :key="`column-${i}`" @click="selectDay(day)">
            <template v-if="day.date!==0">
              <span class="date" :class="{selected:day.selected,clock:day.clock}" 
                :style="day.selected?styles:''">{{day.date}}</span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { isHave, oneToTwoInArray, forEach } from '@/common/js/tool.js'

export default {
  name: 'Calendar',
  props: {
    // 图片颜色
    stroke: {
      type: String,
      default: '#ffffff'
    },
    dateClock:{
      type:Array,
      default: () => []
    },
    // 图标大小
    strokeWidth: {
      type: Number,
      default: 1
    },
    // 是否显示今日按钮
    hasToday: {
      type: Boolean,
      default: true
    },
    dateYear: Number,
    dateMonth: Number,
    // 星期
    weeks: {
      type: Array,
      default: () => ['日', '一', '二', '三', '四', '五', '六'],
      validator (val) {
        if (val) {
          return val.length === 7 || val.length === 0
        }
        return true
      }
    },
    // 日期背景色
    dayColor: {
      type: String,
      default: '#2FC28C'
    }
  },
  data () {
    return {
      year: this.dateYear,
      month: this.dateMonth,
      date: null, // 今天是几号
      days: [],
      months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    }
  },
  created () {
    // 初始化日历
    this.getDate()
    this.render(`${this.year}-${this.month}-${this.date}`)
  },
  watch: {
    dateYear (n, o) {
      this.year = n
      this.render(`${this.year}-${this.month}-${this.date}`)
    },
    dateMonth (n, o) {
      this.month = n
      this.render(`${this.year}-${this.month}-${this.date}`)
    },
    dateClock (n, o) {
      if (n) {
        this.render(`${this.year}-${this.month}-${this.date}`)
      }
    }
  },
  computed: {
    styles () {
      return {
        backgroundColor: this.dayColor
      }
    },
    clockList () {
      let arr=[],arrClock=[]
      this.dateClock.forEach(v=>{
        arr.push(v.split('-'))
      })
      for(let i=0;i<arr.length;i++){
        if(this.year==arr[i][0]&&this.month==arr[i][1]){
          arrClock.push(arr[i][2])
        }
      }
      return arrClock
    }
  },
  methods: {
    render (time) {
      // 此为了兼容iOS, 不处理weekFirstday会拿不到
      let timeArr = time.split('-');
      const DATE = new Date(time)
      // 当月份第一天,setDate()方法根据本地时间来指定一个日期对象的天数, 如果是0, 那么日期就会被设置为上个月的最后一天
      DATE.setDate(1);
      let firstDay = DATE.getDate(); // 或者 new Date(this.year, this.month, 1).getDate()

      // 当月份最后一天(共有几天)
      let lastDay = new Date(this.year, this.month, 0).getDate();
      // 当月第一天是星期几
      let weekFirstday = new Date(this.year, timeArr[1]-1, 1).getDay()
      let weekLastDay = new Date(this.year, this.month, 0).getDay()

      let res = []
      // 上月天数补零, 如果要展示上个月的天数另行处理
      for (let i = 0; i < parseInt(weekFirstday, 10); i++) {
        res.push({
          'month': this.month - 1,
          'date': 0,
          'selected': false,
          'clock':false
        })
      }
      // 当月天数
      for (var i = 0; i < lastDay; i++) {
        res.push({
          'month': this.month,
          'date': i+1,
          'selected': this.date === i+1 ? true : false,
          'clock':false
        })
      }
      // 下月天数空位补零
      for (let i = 1; i < 7 - weekLastDay; i++) {
        res.push({
          'month': this.month,
          'date': 0,
          'selected': false,
          'clock':false
        })
      }
      // 天相同则增加样式
      forEach(res, (item, i) =>{
        this.clockList.findIndex((v) => {
          if (v == item.date) {
            res[i].clock = true
          }
        })
      })
      // 数据重组
      this.days = oneToTwoInArray(res)
    },

    // 选择天
    selectDay (params) {
      const { month, date, selected } = params
      if (!date) return
      forEach(this.days, (arr) => {
        forEach(arr, (item) => {
          item.date === date ? (item.selected = true) : (item.selected = false)
        })
      })
      this.date = date
      this.$emit('select-date', {
        'year': this.year,
        'month': this.month,
        'date': this.date,
      })
    },

    // 选择年月日
    selectYearMonth () {
      this.$emit('select-year-month', {
        'year': this.year,
        'month': this.month
      })
    },

    // 今日
    jumpToday () {
      this.getDate()
      this.render(`${this.year}-${this.month}-${this.date}`)
    },

    // 上一个月
    beforeMonth () {
      this.month--
      if (this.month < 1) {
        this.year--
        this.month = 12
      }
      this.render(`${this.year}-${this.month}-${this.date}`)
      this.$emit('before-month', {
        'year': this.year,
        'month': this.month,
        'date': this.date,
      })
    },

    // 下一个月
    afterMonth () {
      this.month++
      if (this.month > 12) {
        this.year++
        this.month = 1
      }
      this.render(`${this.year}-${this.month}-${this.date}`)
      this.$emit('after-month', {
        'year': this.year,
        'month': this.month,
        'date': this.date,
      })
    },

    getDate () {
      const CURR_DATE = new Date()
      this.year = CURR_DATE.getFullYear(); // 返回指定日期对象的年份(四位数年份时返回四位数字)
      this.month = CURR_DATE.getMonth() + 1; // 返回指定日期对象的月份(0-11)
      this.date = CURR_DATE.getDate(); // 返回日期对象月份中的第几天(1-31-今天是几号)
      // let day = DATE.getDay(); // 返回日期对象当天在星期中是第几天(0-6)
    }
  },
}
</script>

<style lang="scss" scoped>
@import './calendar.scss';
</style>
