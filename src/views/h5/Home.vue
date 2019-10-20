<template>
  <div class="h5-home-container clearfix">
    <ul class="home-menu">
      <li class="home-menu-item" v-for="(item, i) in lists" :key="i">
        <router-link :to="item.path" class="btn btn-primary">{{item.name}}</router-link>
      </li>
    </ul>
    <div class="home-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'H5Home',
  data () {
    return {
      lists: [
        { name: '多选框', path: 'checkbox' },
        { name: '日历', path: 'calendar' }
      ]
    }
  }
}
</script>
<style lang="scss">
.h5-home-container {
  overflow: auto;
}
.home-menu {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 15px 10px;
  border-bottom: 1px solid #b063c5;
  margin-bottom: 10px;
}
.home-menu-item {
  & + .home-menu-item {
    margin-left: 10px;
  }
}
.home-content {
  display: flex;
  justify-content: center;
  padding: 10px;
  height: 100%;
  overflow-y: auto;
}
</style>
