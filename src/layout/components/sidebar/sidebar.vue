<template>
  <div class='sidebar-container'>
    <section class="sidebar-navigate">
      <ul class="sidebar-menu">
        <li class="sidebar-menu-item" v-for="(item, i) in lists" :key="i">
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
        { name: '组件', path: '' }
      ]
    }
  },
  methods: {}
}
</script>
<style lang='scss' scoped>
@import "./sidebar.scss";
</style>
