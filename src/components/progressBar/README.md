#### 参数

| 属性 | 说明 | 类型 | 默认值 |
| -- | -- | -- | -- |
| color | 进度条颜色 | String | - |
| height | 进度条高度, 单位px | Number | 2 |
| duration | 隐藏时的持续时间, 单位ms | Number | 800 |

#### 方法

```js
this.$progress.start() // 开始
this.$progress.finish() // 结束
this.$progress.error() // 错误
this.$progress.config(options) // 修改配置参数
```

#### Quick start

```sh
# main.js
import progress from '@@/progressBar'
Vue.prototype.$progress = progress

# router
import progress from '@@/progressBar'
progress.start()
progress.finish()
```
