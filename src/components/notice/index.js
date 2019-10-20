const Notice = {}
let timer = null
// 默认配置
const defaultOption = {
  type: 'success', // 默认显示位置 'success' 'default' 'info' 'warning' 'error'
  duration: 2000, // 持续时间
  message: ''
}

Notice.install = (Vue, options = {}) => {
  Object.assign(defaultOption, options)
  Vue.prototype.$notice = option => {
    if (timer) return
    Object.assign(defaultOption, option)
    const NoticeTpl = Vue.extend({
      render (h) {
        return h('div', {
          class: ['notice-wrapper', `notice-${defaultOption.type}`, 'slide-in-top']
        }, [
          h('div', {
            class: 'notice-header'
          }, [
            h('div', {
              class: 'notice-title',
              domProps: {
                innerHTML: defaultOption.message
              }
            })
          ])
        ])
      }
    })
    let tpl = new NoticeTpl().$mount().$el
    document.body.appendChild(tpl)
    if (defaultOption.duration) {
      timer = setTimeout(() => {
        document.body.removeChild(tpl)
        clearTimeout(timer)
        timer = null
      }, defaultOption.duration)
    }
  }
}

export default Notice
