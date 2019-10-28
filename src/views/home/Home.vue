<template>
  <div class="home-container clearfix">
    <p class="desc-tip">因为IE兼容性问题, 渐变会无效, 顾改成svg方式</p>
    <p class="mi-title">组件封装示例</p>
    <svg xmlns="http://www.w3.org/2000/svg" viewBoxs="0 0 280 100" width="280" height="100">
      <defs>
        <linearGradient id="svgTitle" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#ffecc8"/>
          <stop offset="75%" style="stop-color:#ffc37a"/>
        </linearGradient>
      </defs>
      <text class="gradient-text" text-anchor="middle" x="50%" y="50%" dy=".35em">组件封装示例</text>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
    }
  }
}
</script>
<style lang="scss">
.home-container {
  font-size: 30px;
  padding-top: 5%;
  text-align: center;
}
.desc-tip {
  padding-bottom: 25px;
}
</style>
