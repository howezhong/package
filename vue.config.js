const path = require('path')
const SpritesmithPlugin = require('webpack-spritesmith')

function resolve (dir) {
  return path.join(__dirname, dir)
}
const hasSprite = false
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
  // configureWebpack: {
  //   resolve: {
  //     extensions: ['.js', '.json', '.vue', '.scss', '.html']
  //   }
  // },
  configureWebpack: config => {
    config.resolve.extensions.push(...['.js', '.json', '.vue', '.scss', '.html'])
    if (process.env.NODE_ENV === 'production') {
      // 去除打包时候的console
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
    }
    if (hasSprite) {
      config.resolve.modules = ['node_modules', './src/assets/images']
      const plugins = spriteFn()
      config.plugins = [...config.plugins, ...plugins]
    }
  },
  css: {
    // 定位样式所在的vue文件及行数
    sourceMap: true,
    loaderOptions: {
      sass: {
        // sass 全局变量, $path 可以配置图片cdn 前缀, scss 里 background: url($path + '/images/404.png')
        prependData: `
          @import "@/styles/_variable.scss";
          @import "@/styles/_mixin.scss";
          $path: "${process.env.ROOTPATH}";
        `
      }
    }
  },
  // 代理
  devServer: {
    // open: true, // 是否自动打开浏览器页面
    // host: 'localhost', // 指定使用一个 host, 默认是 localhost
    // port: 8181, // 端口地址
    proxy: {
      '^/api': {
        // 目标代理接口地址
        target: 'http://192.168.1.1:8181',
        // 如果是https接口，需要配置这个参数
        // secure: false,
        // 开启代理，在本地创建一个虚拟服务端
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}

const templateFunction = (data) => {
  let shared = `.ico {
    display: inline-block;
    background: url(${data.sprites[0].image}) center no-repeat;
    background-size: ${data.spritesheet.width}px ${data.spritesheet.height}px;
  }`

  let perSprite = data.sprites.map(function (sprite) {
    return '.ico-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
      .replace('N', sprite.name)
      .replace('W', sprite.width)
      .replace('H', sprite.height)
      .replace('X', sprite.offset_x)
      .replace('Y', sprite.offset_y)
  }).join('\n')

  return shared + '\n' + perSprite
}

const spriteFn = () => {
  return [
    new SpritesmithPlugin({
      src: {
        // 图标根路径
        cwd: path.resolve(__dirname, './src/assets/images/sprites'),
        glob: '**/*.png'
      },
      target: {
        // 生成雪碧图目标路径与名称
        image: path.resolve(__dirname, './src/assets/images/sprite.[hash:6].png'),
        css: [
          [path.resolve(__dirname, './src/styles/sprites/sprite.scss'), {
            format: 'function_based_template'
          }]
        ]
      },
      customTemplates: {
        'function_based_template': templateFunction
      },
      // scss文件中引用雪碧图的相对位置路径配置
      apiOptions: {
        cssImageRef: `$path+'sprite.[hash:6].png'`
      },
      spritesmithOptions: {
        algorithm: 'binary-tree',
        padding: 5
      }
    })
  ]
}
