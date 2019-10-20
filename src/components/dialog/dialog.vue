<template>
  <transition name="fade">
    <div class='dialog-container' v-show="isShow">
      <div class="dialog-mask" @click="onClose"></div>
      <div class="dialog-box" :style="styles">
        <slot name="closeIcon"></slot>
        <div class="dialog-header" v-if="showHeader">
          <p class="dialog-title">{{title}}</p>
          <svg class="el-icon-close" v-if="showClose" @click="onClose" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </div>
        <div class="dialog-content" :style="maxHeight">
          <slot></slot>
        </div>
        <div class="dialog-btns" v-if="showBtns">
          <button class="btn btn-primary" @click="onOk">确定</button>
          <button class="btn btn-warning" @click="onCancel">取消</button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Dialog',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    // 是否显示关闭按钮
    showClose: {
      type: Boolean,
      default: true
    },
    // 是否显示头部
    showHeader: {
      type: Boolean,
      default: true
    },
    // 是否显示按钮组
    showBtns: {
      type: Boolean,
      default: true
    },
    // 弹窗的宽度
    width: {
      type: [Number, String],
      default: '80%'
    },
    // 弹窗的高度
    height: {
      type: [Number, String],
      default: '80%'
    }
  },
  data () {
    return {}
  },
  computed: {
    styles () {
      if (typeof this.width === 'string') {
        return { maxWidth: `${this.width}` }
      } else {
        return { width: `${this.width}px` }
      }
    },
    maxHeight () {
      return {
        maxHeight: this.height === 0 ? '380px' : `${this.height}px`
      }
    }
  },
  methods: {
    // 确定
    onOk () {
      this.$emit('on-ok')
    },
    // 取消
    onCancel () {
      this.$emit('update:isShow', false)
      this.$emit('on-cancel')
    },
    onClose () {
      this.$emit('update:isShow', false)
      this.$emit('on-close')
    },
    onKeyup (ev) {
      if (ev.keyCode === 27) this.$emit('update:isShow', false)
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('keyup', this.onKeyup)
    })
  },
  destroyed () {
    window.removeEventListener('keyup', this.onKeyup)
  }
}
</script>
<style lang='scss' scoped>
@import "./dialog.scss";
</style>
