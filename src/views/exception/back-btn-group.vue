<template>
  <div>
    <button class="btn btn-open" type="text" @click="backHome">返回首页</button>
    <button class="btn btn-open" type="text">返回上一页({{ second }}s)</button>
  </div>
</template>

<script>
import './exception.scss'
export default {
  name: 'backBtnGroup',
  data () {
    return {
      second: 500,
      timer: null
    }
  },
  methods: {
    backHome () {
      // this.$router.replace({
      //   name: this.$config.homeName
      // })
    },
    backPrev () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      if (this.second === 0) this.backPrev()
      else this.second--
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>
