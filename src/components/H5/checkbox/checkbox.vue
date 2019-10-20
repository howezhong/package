<template>
  <label class="yui-checkbox">
    <input type="checkbox" :checked="checked" :value="value" :disabled="disabled" @click="handleClick"/>
    <span class="iconfont" :class="classes" :style="styles"></span>
    <span class="yui-checkbox-text">
      <slot></slot>
    </span>
  </label>
</template>

<script>
const hexColorReg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const rgbColorReg = /^[rR][gG][Bb]\s*\(\s*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)\s*,\s*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)\s*,\s*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)\s*\)\s*$/;

export default {
  name: 'CheckBox',
  props: {
    value: {
      type: [Boolean, String, Number, Array],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 最小12px, 最大48px
    size: {
      type: [Number, String],
      default: 40,
      validator (value) {
        const newValue = Number.parseInt(value, 10);
        return Number.isInteger(newValue) && newValue >= 12 && newValue <= 48;
      }
    },
    // 必须是十六进制或rgb颜色字符串
    // color: {
    //   type: String,
    //   default: '#b2b2b2',
    //   validator (value) {
    //     return hexColorReg.test(value) || rgbColorReg.test(value);
    //   }
    // },
    // 形状
    shape: {
      type: String,
      default: 'square',
      validator(value) {
        return ['square', 'circle'].indexOf(value) > -1;
      }
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    styles () {
      return {
        fontSize: `${Number.parseInt(this.size, 10) / 100}rem`,
        // color: `${this.color}`
      }
    },
    classes () {
      return [
        this.shape === 'square' ?
        this.checked ? 'icon-checked' : 'icon-check' :
        this.checked ? 'icon-circle-checked' : 'icon-circle-check'
      ]
    }
  },
  methods: {
    handleClick () {
      if (this.disabled) return;
      this.$emit('click', this.value);
    }
  }
}
</script>

<style lang="less">
@color: #333;

.yui-checkbox {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  padding-right: 0.1rem;

  > input[type='checkbox'] {
    position: absolute;
    left: -9999em;
    vertical-align: middle;
    opacity: 0;
    cursor: pointer;
  	z-index: -1;
  }

  .icon-check {
    color: #b2b2b2;
  }

  .icon-checked {
    color: #2fc28c;
    transition: all 0.3s;
  }
}

.yui-checkbox-text {
  font-family: "PingFangSC";
  margin-left: 0.15rem;
  font-size: 0.32rem;
  color: @color;
  pointer-events: none;
}
</style>