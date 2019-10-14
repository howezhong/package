<template>
  <div class="lantern-container" :style="styles" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <div class="lantern-content-warp">
      <p class="lantern-content" v-for="(item, i) in lists" :key="i" :style="stylesContent">{{item}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MiLantern', // 走马灯
  props: {
    lists: {
      type: Array,
      default: () => [
        '君不见黄河之水天上来，奔流到海不复回。',
        '君不见高堂明镜悲白发，朝如青丝暮成雪。',
        '人生得意须尽欢，莫使金樽空对月。',
        '天生我材必有用，千金散尽还复来。',
        '烹羊宰牛且为乐，会须一饮三百杯。',
        '岑夫子，丹丘生，将进酒，杯莫停。',
        '与君歌一曲，请君为我侧耳听。',
        '钟鼓馔玉不足贵，但愿长醉不复醒。',
        '古来圣贤皆寂寞，惟有饮者留其名。',
        '陈王昔时宴平乐，斗酒十千恣欢谑。',
        '主人何为言少钱，径须沽取对君酌。',
        '五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。'
      ]
    },
    width: {
      type: Number,
      default: 360
    },
    height: {
      type: Number,
      default: 0
    },
    // 移动速度
    speed: {
      type: Number,
      default: 25
    },
    // 每个时间点的移动距离
    distance: {
      type: Number,
      default: 1
    },
    // 容器背景色
    bgColor: {
      type: String,
      default: '#e5e5e5'
    },
    // 字体颜色
    colors: {
      type: String,
      default: 'indianred'
    }
  },
  data () {
    return {
      nodeLists: [], // 所有滚动内容的dom节点
      parentWrapWidth: 0, // 父容器的宽度
      contentTotalWidth: 0, // 内容的总宽度(加了css属性值, 如marginLeft)
      firstChildWidth: 0, // 第一个元素的宽度(加了css属性值, 如marginLeft)
      offset: 0 // 移动时的偏移量
    }
  },
  computed: {
    styles () {
      return {
        width: `${this.width}px`,
        height: this.height !== 0 ? `${this.height}px` : '35px',
        lineHeight: this.height !== 0 ? `${this.height}px` : '35px',
        backgroundColor: this.bgColor
      }
    },
    stylesContent () {
      return {
        color: this.colors
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initialize()
    })
  },
  methods: {
    initialize () {
      this.parentWrap = document.querySelector('.lantern-content-warp')
      this.parentWrapWidth = this.getRect(this.parentWrap, 'width')
      this.nodeLists = [...this.parentWrap.children]
      if (this.nodeLists.length === 0) return
      // 克隆节点, loop 无限循环的时候方可无缝衔接
      this.cloneNodes()
      for (let i = 0; i < this.nodeLists.length; i++) {
        let ml = this.getTheStyle(this.nodeLists[i], 'marginLeft')
        let rl = this.getTheStyle(this.nodeLists[i], 'marginRight')
        this.contentTotalWidth += this.getRect(this.nodeLists[i], 'width') + parseInt(ml) + parseInt(rl)
      }
      if (this.speed !== 0) {
        this.setAutoPlay()
      }
    },
    setAutoPlay () {
      clearInterval(this.timer)
      // 如果文字长度小于盒子宽度都不移动
      if (this.parentWrapWidth > this.contentTotalWidth) return
      this.getFirstChildWidth()
      this.timer = setInterval(() => {
        this.offset = this.offset + this.distance
        this.setStyle(this.parentWrap, `translate3d(-${this.offset}px, 0, 0)`)
        // 移动长度大于总长度后重置移动长度为初始值
        if (this.offset >= (this.contentTotalWidth - this.firstChildWidth)) {
          this.offset = this.distance
          this.setStyle(this.parentWrap, `translate3d(-${this.offset}px, 0, 0)`)
        }
      }, this.speed)
    },
    // 悬停
    mouseenter () {
      clearInterval(this.timer)
      this.$emit('stop')
    },
    // 启动
    mouseleave () {
      this.setAutoPlay()
      this.$emit('starting')
    },
    // 获取第一个元素的长度和属性值, 用于loop的时候计算使用
    getFirstChildWidth () {
      this.firstChildWidth = 0
      let ml = this.getTheStyle(this.nodeLists[0], 'marginLeft')
      let rl = this.getTheStyle(this.nodeLists[0], 'marginRight')
      this.firstChildWidth += this.getRect(this.nodeLists[0], 'width') + parseInt(ml) + parseInt(rl)
    },
    // 克隆第一个节点, 并插入到最后面和重置数组
    cloneNodes () {
      let head = this.nodeLists[0].cloneNode(this.nodeLists[0], true)
      this.parentWrap.appendChild(head)
      this.nodeLists = [...this.parentWrap.children]
      this.nodeLists.length = this.nodeLists.length
    },
    setStyle (el, transform) {
      el.style = `
        WebkitTransform: ${transform};
        MozTransform: ${transform};
        OTransform: ${transform};
        transform: ${transform};
      `
    },

    /**
     * 获取某个元素相对于视窗的位置集合(top, right, bottom, left...)
     * @param {Object} el Dom对象
     * @param {String} attr(Attributes) css属性名称
     */
    getRect (el, attr = '') {
      return attr ? el.getBoundingClientRect()[attr] : el.getBoundingClientRect()
    },

    /**
     * 获取计算属性
     * @param {Object} el 获取计算样式的Element
     * @param {String} prop css 属性名
     * @param {String} pseudoElt 指定一个要匹配的伪元素的字符串, 必须对普通元素省略(或null)
     */
    getTheStyle (el, prop, pseudoElt = null) {
      // 返回当前 document 对象所关联的 window 对象, 没有则返回null
      const win = document.defaultView
      if (win && win.getComputedStyle) {
        return win.getComputedStyle(el, pseudoElt)[prop]
      } else {
        return el.currentStyle[prop] // IE
      }
    }
  },
  destroyed () {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>
<style lang='scss' scoped>
.lantern-container {
  overflow: hidden;
}
.lantern-content-warp {
  font-size: 18px;
  white-space: nowrap;
}
.lantern-content {
  display: inline-block;
  margin-left: 25px;
  margin-right: 25px;
}
</style>
