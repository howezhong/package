/* eslint-disable indent */
/**
 * axios封装
 * 有拦截器以及请求方法
 */
import axios from 'axios'
import qs from 'qs' // 用来序列化post类型的数据
// import { Toast } from 'vant' // 提示组件

const Instance = axios.create({
  method: 'get',
  baseURL: process.env.NODE_ENV === 'development' ? 'http://***.com' : 'http://***.com',
  // 请求头信息
  headers: {
    // 'Accept': 'application/json',
    // 'Content-Type': 'application/json;charset=UTF-8'
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  // 设置超时时间
  timeout: 5000,
  // 携带凭证
  withCredentials: false,
  // 返回数据类型
  responseType: 'json',
  token: '',
  // 参数
  data: {}
})

// request(请求拦截器)
Instance.interceptors.request.use(config => {
  // step: 容错处理

  // step: loading 动画
  // 请求开始的时候可以结合 vuex 开启全屏的 loading 动画

  // step: auth 处理
  // 带上 token, 可以结合 vuex 或者 localStorage
  // if (store.getters.token) {
  //   // 让每个请求携带token--Authorization为自定义key 请根据实际情况自行修改
  //   config.headers.Authorization = '...'
  // } else {
  //   // 重定向到登录页面
  // }
  // 大小写容错
  config.method = config.method.toLowerCase()
  // step: 参数处理
  // 根据请求方法, 序列化传来的参数, 根据后端需求是否序列化
  if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  // step: 请求错误时做些事(接口错误、超时等) 关闭loadding
  console.log('request:', error)
  return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
})

// response(响应拦截器)
Instance.interceptors.response.use(res => {
  if (res.status.toString().charAt(0) === '2') {
    return res.data
  }
  return res
}, err => {
  if (!err && !err.response) {
    err.message = '服务器连接失败'
    return false
  }
  switch (err.response.status) {
    case 400:
      err.message = '请求错误'
      break
    case 401:
      err.message = '未授权, 请重新登录'
      // toLogin()
      break
    case 403:
      err.message = '拒绝访问'
      break
    case 404:
      err.message = `未找到该资源`
      break
    case 405:
      err.message = '请求方法未允许'
      break
    case 408:
      err.message = '请求超时'
      break
    case 500:
      err.message = '服务器内部错误'
      break
    case 501:
      err.message = '服务未实现'
      break
    case 502:
      err.message = '网关错误'
      break
    case 503:
      err.message = '服务不可用'
      break
    case 504:
      err.message = '网关超时'
      break
    case 505:
      err.message = 'http版本不支持该请求'
      break
    default:
      err.message = `连接错误${err.response.status}`
  }
  console.error(err)
  return Promise.reject(err)
})

// /**
//  * 提示函数
//  * 禁止点击蒙层、显示一秒后关闭
//  */
// const tip = msg => {
//     Toast({
//         message: msg,
//         duration: 1000,
//         forbidClick: true
//     })
// }
// /**
//  * 跳转登录页
//  * 携带当前页面路由, 以期在登录页面完成登录后返回当前页面
//  */
// const toLogin = () => {
//     router.replace({
//         path: '/login',
//         query: {
//             // redirect: router.currentRoute.fullPath
//         }
//     })
// }

/**
 * get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get (url, params = {}) {
  return Instance.get(url, { params })
}

/**
 * post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post (url, params = {}) {
  return Instance.post(url, params)
}
/**
 * put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put (url, params = {}) {
  return Instance.put(url, params)
}
/**
 * delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function _delete (url, params = {}) {
  return Instance.delete(url, params)
}
/**
 * all请求
 * @param {Array} arr 请求的数组
 */
export function all (arr = []) {
  return Instance.all(arr).then(axios.spread((acct, perms) => {
    // Both requests are now complete
  }))
}

export default Instance
