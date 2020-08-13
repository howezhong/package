import Vue from 'vue'
import ProgressBar from './ProgressBar.vue'

/**
 * 加载进度条
 * @param {String} color 进度条颜色
 * @param {Number} height 进度条高度, 单位 px, 默认 2
 * @param {Number} duration 隐藏时的持续时间, 单位 ms, 默认 800
 */

const Instance = Vue.extend(ProgressBar)
const progress = new Instance().$mount()
document.body.appendChild(progress.$el)
let timer = null
let duration = 800

function clearTimer () {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function hide (fn) {
  setTimeout(() => {
    fn.show = false
    fn.percent = 0
  }, duration)
}

function assign (status = 'success', fn = progress) {
  fn.show = true
  fn.status = status
}

// 不用this, 因为箭头函数的this是谁调用它就指向谁, 怕引起未知错误
progress.start = () => {
  clearTimer()
  assign()
  timer = setInterval(() => {
    if (progress.percent < 90) {
      progress.percent += Math.floor(Math.random() * 3 + 1)
    }
  }, 200)
}

progress.finish = () => {
  clearTimer()
  assign()
  progress.percent = 100
  hide(progress)
}

progress.error = () => {
  clearTimer()
  assign('error')
  progress.percent = 100
  hide(progress)
}

progress.config = (options) => {
  if (options.color) {
    progress.color = options.color
  }
  if (options.height) {
    progress.height = options.height
  }
  if (options.duration) {
    duration = options.duration
  }
}

export default progress
