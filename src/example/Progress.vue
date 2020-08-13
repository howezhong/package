<template>
  <main class='wrapper'>
    <button class="btn btn-success mr10" @click="start">开始</button>
    <button class="btn btn-primary mr10" @click="finish">结束</button>
    <button class="btn btn-warning" @click="error">错误</button>
  </main>
</template>
<script>
export default {
  name: 'Progress',
  methods: {
    start () {
      this.$progress.start()
    },
    finish () {
      this.$progress.finish()
    },
    error () {
      this.$progress.error()
    }
  }
}
</script>
