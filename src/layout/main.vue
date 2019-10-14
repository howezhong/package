<template>
  <div class='layout-container'>
    <z-header></z-header>
    <main class="main-container">
      <sidebar></sidebar>
      <div class="content-container">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>
<script>
import Sidebar from '@/layout/components/sidebar'
import zHeader from '@/layout/components/header'

export default {
  name: 'Main',
  components: {
    zHeader,
    Sidebar
  },
  data () {
    return {
      name: ''
    }
  },
  methods: {}
}
</script>
<style lang='scss' scoped>
@import "./main.scss";
</style>
