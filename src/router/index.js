import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // 标题设置
  if (to.meta.title) {
    document.title = `专治跌打损伤-${to.meta.title}`
  }
  next()
})

export default router
