<template>
  <div class="roll-container">
    <div class="roll-wrap" :style="{
      'transform': `translate3d(0, ${tranY}px, 0)`,
      'transition-duration': `${durationing}ms`,
      '-webkit-transform': `translate3d(0, ${tranY}px, 0)`,
      '-webkit-transition-duration': `${durationing}ms`,
      'transition-timeing-function': 'ease-in-out'}">
      <span class="digtal-print" v-for="(item, i) in calcTotal" :key="`${i}`">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DigitalRoll',
  props: {
    // 最终显示的数字
    digital: {
      type: Number,
      default: 0
    },
    // 滚动时长
    times: {
      type: Number,
      default: 50000
    },
    // 动画延迟时间
    duration: {
      type: Number,
      default: 300
    },
    // 滚动速度, 越小速度越快
    speed: {
      type: Number,
      default: 1000
    },
    // 滚动数字的个数
    total: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      speeding: this.speed, // 定时器执行时间
      tranY: 0, // 每个时间点的移动距离
      durationing: this.duration, // 元素切换时的延迟时间
      rollingTime: 0, // 滚动时长
      slideWrap: null, // 可滚动元素父盒子
      slideEls: [], // 所有可滚动元素的dom集合
      totalHeight: 0, // 可滚动元素的总高度
      slideElHeight: 0 // 可滚动元素的高度
    }
  },
  watch: {
    // 当滚动时长(秒) 大于传入的秒数的时候停止滚动, 并显示最终数字
    rollingTime (n) {
      if (n * 1000 > this.times) {
        this._clearInterval()
      }
    },
    duration (n) {
      n && (this.durationing = this.duration)
    },
    speed (n) {
      n && (this.speeding = this.speed)
    }
  },
  computed: {
    calcTotal () {
      let nodes = []
      for (let i = 0; i <= this.total; i++) {
        nodes.push(i)
      }
      return nodes
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.updateEvent()
    })
  },
  methods: {
    updateEvent () {
      this.slideWrap = this.$el.querySelector('.roll-wrap')
      this.slideEls = [...this.slideWrap.children]
      if (this.slideEls.length === 0) return

      for (let i = 0; i < this.slideEls.length; i++) {
        this.totalHeight += this.getRect(this.slideEls[i], 'height')
      }
      if (this.speed !== 0) {
        this.timeing = setInterval(() => {
          this.rollingTime++
        }, 1000)
        this.setAutoPlay()
      }
    },

    setAutoPlay () {
      clearInterval(this.timer)
      this.slideElHeight = this.getRect(this.slideEls[0], 'height')
      this.timer = setInterval(() => {
        this.tranY -= this.slideElHeight
        if (Math.abs(this.tranY) >= this.totalHeight) {
          this.tranY = 0
        }
      }, this.speeding)
    },

    // 停下的时候根据传入的号码数字进行定位, 并清楚定时器和返回事件
    _clearInterval () {
      this.durationing = 1000
      this.tranY = this.digital * this.slideElHeight * (-1)
      clearInterval(this.timer)
      clearInterval(this.timeing)
      this.$emit('stopRoll')
    },

    /**
     * 获取某个元素相对于视窗的位置集合(top, right, bottom, left...)
     * @param {Object} el Dom对象
     * @param {String} attr(Attributes) css属性名称
     */
    getRect (el, attr = '') {
      return attr ? el.getBoundingClientRect()[attr] : el.getBoundingClientRect()
    }
  },
  destroyed () {
    clearInterval(this.timer)
    clearInterval(this.timeing)
    this.timer = null
    this.timeing = null
  }
}
</script>

<style scoped lang="scss">
@import "./DigitalRoll.scss";
</style>
