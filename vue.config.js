const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

// 项目部署基础
// 默认情况下, 我们假设你的应用将被部署在域的根目录下,
// 例如: https://www.howe.com/, 则默认: '/'
// 如果您的应用程序部署在子路径中, 则需要在这指定子路径
// 例如: https://www.howe.com/howe/, 则需要将它改为'/howe/'
const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/'
  : '/'
module.exports = {
  // 如果你不需要使用eslint, 把lintOnSave设为false即可
  lintOnSave: true,
  publicPath: BASE_URL, // 打包后引用的资源路径
  productionSourceMap: false, // 设为false打包时不生成.map文件
  // assetsDir: 'static',
  // outputDir: 'dist', // 打包目录
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@@', resolve('src/components'))
      .set('assets', resolve('src/assets'))
    config.plugins.delete('prefetch') // 静态资源js按需加载配置
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.json', '.vue', '.scss', '.html']
    }
  },
  // 代理
  devServer: {
    // open: true, // 是否自动打开浏览器页面
    // host: 'localhost', // 指定使用一个 host, 默认是 localhost
    // port: 8181, // 端口地址
    proxy: {
      '^/api': {
        target: 'http://192.168.1.1:8181',
        // secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
