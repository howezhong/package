/**
 * 查找目标元素, 存在返回下标, 不存在返回-1
 * @param {Array} arr 数组元素
 * @param {String, Number} elem
 */
export const isHave = (arr, elem) => {
  return arr.findIndex(item => item === elem)
}

/**
 * 把一维数组转成二维数组
 * @param {Array} arr 一维数组数据
 * @param {Number} num 每行显示数量
 */
export const oneToTwoInArray = (arr, num = 7) => {
  if (!arr) return
  const len = arr.length
  // 超出一行 num 增加行数
  let lineNum = len % num === 0 ? len / num : Math.floor((len / num) + 1)
  let res = []
  for (let i = 0; i < lineNum; i++) {
    // (0 * 7, 0 * 7 + 7) (1 * 7, 1 * 7 + 7)
    res.push(arr.slice(i * num, i * num + num))
  }
  return res
}

/**
 * 遍历
 * @param {Array} arr 数组
 * @param {Function} fn 回调函数
 */
export const forEach = (arr, fn) => {
  if (!arr.length || !fn) return
  let i = -1
  let len = arr.length
  while (++i < len) {
    let item = arr[i]
    fn(item, i, arr)
  }
}

/**
 * 获取计算属性
 * @param {Object} el 获取计算样式的Element
 * @param {String} prop css 属性名
 * @param {String} pseudoElt 指定一个要匹配的伪元素的字符串, 必须对普通元素省略(或null)
 */
export const getTheStyle = (el, prop, pseudoElt = null) => {
  // 返回当前 document 对象所关联的 window 对象, 没有则返回null
  const win = document.defaultView
  if (win && win.getComputedStyle) {
    return win.getComputedStyle(el, pseudoElt)[prop]
  } else {
    return el.currentStyle[prop] // IE
  }
}

/**
 * 获取URL中的参数
 * @return {Object}
 */
export const GetUrlParams = () => {
  // window.location.search 是从当前URL?号开始的字符
  const URL = window.location.search
  let theQuery = {}
  if (!URL && URL.indexOf('?') === -1) {
    return false
  }
  let arr = URL.substr(1).split('&')
  for (let i = 0, len = arr.length; i < len; i++) {
    theQuery[arr[i].split('=')[0]] = decodeURIComponent(arr[i].split('=')[1])
  }
  return theQuery
}

/**
 * 格式化时间
 * @param {Int/empty} timestamp 时间
 * @return {Object}
 */
export const DateFormat = timestamp => {
  const strTime = timestamp ? new Date(timestamp) : new Date()
  return {
    year: strTime.getFullYear(),
    month: zero(strTime.getMonth() + 1),
    date: zero(strTime.getDate()),
    hours: zero(strTime.getHours()),
    minutes: zero(strTime.getMinutes()),
    seconds: zero(strTime.getSeconds())
  }
}

/**
 * 时分转成时间戳
 * 得到当前的年月日秒, 然后组合传进来的时分, 转成时间戳存入数据库, Date.parse只精确到秒,毫秒会用0补
 * @param {String} time 时分
 */
export const timeFormat = time => {
  if (!time) return
  let arrTime = time.split(':')
  let dateTime = new Date()
  let year = dateTime.getFullYear()
  let month = dateTime.getMonth() + 1
  let date = dateTime.getDate()
  let hours = arrTime[0]
  let minutes = arrTime[1]
  let seconds = dateTime.getSeconds()
  let strTime = `${year}/${month}/${date}/ ${hours}:${minutes}:${seconds}`
  return Date.parse(strTime)
}

// 补零
export const zero = date => {
  return date < 10 ? `0${date}` : date
}

/**
 * 本地存储
 * @param {String} key 键
 * @param {any} value 值
 */
export const setStore = (key, value) => {
  if (!key || typeof key !== 'string') return
  if (typeof value !== 'string') {
    value = JSON.stringify(value)
  }
  window.sessionStorage.setItem(key, value)
}

/**
 * 获取
 * @param {String} key 键
 */
export const getStore = key => {
  if (!key || typeof key !== 'string') return
  let val = window.sessionStorage.getItem(key)
  return val && JSON.parse(val)
}

/**
 * 清空
 * @param {String} key 键
 */
export const clearStore = key => {
  if (!key || typeof key !== 'string') return
  window.sessionStorage.setItem(key, '')
}

/**
 * 删除
 * @param {String} key 键
 */
export const removeStore = key => {
  if (!key) return
  if (isArray(key) && key.length !== 0) {
    forEach(key, res => {
      window.sessionStorage.removeItem(res)
    })
  }
  if (typeof key === 'string') {
    window.sessionStorage.removeItem(key)
  }
}

/**
 * 判断是否是数组
 * @param {Object} arr
 */
export const isArray = arr => {
  if (!Array.isArray) {
    Array.isArray = function (arr) {
      return Object.prototype.toString.call(arr) === '[object Array]'
    }
  } else {
    return Array.isArray(arr)
  }
}
/**
 * @param {Number} timeStamp 判断时间戳格式是否是毫秒
 * @returns {Boolean}
 */
const isMillisecond = timeStamp => {
  const timeStr = String(timeStamp)
  return timeStr.length > 10
}
/**
 * @param {String|Number} timeStamp 时间戳
 * @returns {String} 相对时间字符串
 */
export const getRelativeTime = timeStamp => {
  // 判断当前传入的时间戳是秒格式还是毫秒
  const IS_MILLISECOND = isMillisecond(timeStamp)
  // 如果是毫秒格式则转为秒格式
  if (IS_MILLISECOND) Math.floor(timeStamp /= 1000)
  // 传入的时间戳可以是数值或字符串类型，这里统一转为数值类型
  timeStamp = Number(timeStamp)
  // 获取当前时间时间戳
  const currentTime = Math.floor(Date.parse(new Date()) / 1000)
  // 判断传入时间戳是否早于当前时间戳
  const IS_EARLY = isEarly(timeStamp, currentTime)
  // 获取两个时间戳差值
  let diff = currentTime - timeStamp
  // 如果IS_EARLY为false则差值取反
  if (!IS_EARLY) diff = -diff
  let resStr = ''
  const dirStr = IS_EARLY ? '前' : '后'
  // 少于等于59秒
  if (diff <= 59) resStr = diff + '秒' + dirStr
  // 多于59秒，少于等于59分钟59秒
  else if (diff > 59 && diff <= 3599) resStr = Math.floor(diff / 60) + '分钟' + dirStr
  // 多于59分钟59秒，少于等于23小时59分钟59秒
  else if (diff > 3599 && diff <= 86399) resStr = Math.floor(diff / 3600) + '小时' + dirStr
  // 多于23小时59分钟59秒，少于等于29天59分钟59秒
  else if (diff > 86399 && diff <= 2623859) resStr = Math.floor(diff / 86400) + '天' + dirStr
  // 多于29天59分钟59秒，少于364天23小时59分钟59秒，且传入的时间戳早于当前
  else if (diff > 2623859 && diff <= 31567859 && IS_EARLY) resStr = getDate(timeStamp)
  else resStr = getDate(timeStamp, 'year')
  return resStr
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} currentTime 当前时间时间戳
 * @returns {Boolean} 传入的时间戳是否早于当前时间戳
 */
const isEarly = (timeStamp, currentTime) => {
  return timeStamp < currentTime
}
/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
const getDate = (timeStamp, startType) => {
  const d = new Date(timeStamp * 1000)
  const year = d.getFullYear()
  const month = zero(d.getMonth() + 1)
  const date = zero(d.getDate())
  const hours = zero(d.getHours())
  const minutes = zero(d.getMinutes())
  const second = zero(d.getSeconds())
  let resStr = ''
  if (startType === 'year') resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
  else resStr = month + '-' + date + ' ' + hours + ':' + minutes
  return resStr
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * 节流
 */
export const throttling = (() => {
  let timer = null
  return function (fn, wait) {
    if (timer !== null) clearTimeout(timer)
    timer = setTimeout(fn, wait)
  }
})()
