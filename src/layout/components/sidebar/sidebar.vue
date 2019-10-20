<template>
  <div class='sidebar-container'>
    <section class="sidebar-navigate">
      <ul class="sidebar-menu">
        <li :class="['sidebar-menu-item', {'sidebar-menu-active': isActive===item.path}]" v-for="(item, i) in lists" @click="switchMent(item)" :key="i">
          <router-link :to="item.path">{{item.name}}</router-link>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
export default {
  name: 'Sidebar',
  data () {
    return {
      lists: [
        { name: '首页', path: '/' },
        { name: 'PC组件', path: '/pc' },
        { name: 'H5组件', path: '/h5' }
      ],
      isActive: '/'
    }
  },
  methods: {
    switchMent (params) {
      this.isActive = params.path
    }
  },
  mounted () {
    this.isActive = this.$route.path
  }
}
</script>
<style lang='scss' scoped>
@import "./sidebar.scss";
</style>
