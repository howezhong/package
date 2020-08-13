<template>
  <transition name="fade">
    <div class="progress-bar" v-show="show">
      <div class="progress-bar-inner" :class="classes" :style="styles"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    show: Boolean,
    percent: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 2
    },
    status: {
      type: String,
      default: 'success',
      validator: v => ['success', 'error'].includes(v)
    },
    // 进度条颜色
    color: String
  },
  computed: {
    classes () {
      return [`progress-bar-${this.status}`]
    },
    styles () {
      const params = {
        width: `${this.percent}%`,
        height: `${this.height}px`
      }
      if (this.color) {
        params.backgroundColor = this.color
      }
      return params
    }
  }
}
</script>

<style lang='scss' scoped>
.progress-bar {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  &-inner {
    transition: width 0.2s linear;
  }
  &-success {
    background-color: $loading-color;
  }
  &-error {
    background-color: $loading-color-error;
  }
}
</style>
