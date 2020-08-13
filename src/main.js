import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@babel/polyfill'
import progress from '@@/progressBar'

import './styles/_index.scss'

// 定义全局根路径, 如: 图片cdn路径, 网站服务器里的图片路径
Vue.prototype.$path = process.env.VUE_APP_ROOT_PATH
Vue.prototype.$progress = progress

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
