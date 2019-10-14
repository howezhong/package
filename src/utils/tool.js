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
  const URL = window.location.search;
  let theQuery = {};
  if (!!!URL && URL.indexOf('?') === -1) {
    return false;
  }
  let arr = URL.substr(1).split('&');
  for (let i = 0, len = arr.length; i < len; i++) {
    theQuery[arr[i].split('=')[0]] = decodeURIComponent(arr[i].split('=')[1]);
  }
  return theQuery;
}

/**
 * 格式化时间
 * @param {Int/empty} timestamp 时间
 * @return {Object}
 */
export const DateFormat = timestamp => {
  const strTime = timestamp ? new Date(timestamp) : new Date();
  return {
    year: strTime.getFullYear(),
    month: zero(strTime.getMonth() + 1),
    date: zero(strTime.getDate()),
    hours: zero(strTime.getHours()),
    minutes: zero(strTime.getMinutes()),
    seconds: zero(strTime.getSeconds())
  };
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
