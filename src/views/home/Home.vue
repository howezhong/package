<template>
  <div class="home-container clearfix">
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
  name: 'Home',
  data () {
    return {
      lists: [
        { name: '数字滚动', path: 'digital-roll' },
        { name: '走马灯', path: 'lantern' },
        { name: '分页', path: 'pagination' },
        { name: '轮播图', path: 'swipe' },
        { name: '侧边栏', path: 'sidebar' },
        { name: '弹窗', path: 'dialog' },
        { name: '下拉选择器', path: 'select' },
        { name: '日历(H5)', path: 'calendar' }
      ]
    }
  }
}
</script>
<style lang="scss">
// .home-container {
// }
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
