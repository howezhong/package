<template>
  <div class="dialog-wrapper">
    <button class="btn btn-success" @click="onOpen">弹窗</button>
    <Dialog :is-show.sync="isShow" title="重要公告" @on-ok="onDetermine"></Dialog>
  </div>
</template>
<script>
import Dialog from '@@/dialog'

export default {
  name: 'DialogTest',
  components: {
    Dialog
  },
  data () {
    return {
      // 是否显示公告弹窗
      isShow: false
    }
  },
  methods: {
    onOpen () {
      this.isShow = true
    },
    onDetermine () {
      console.log('确定')
    }
  }
}
</script>
<style lang='scss' scoped>
@import "~@/styles/variable";
</style>
