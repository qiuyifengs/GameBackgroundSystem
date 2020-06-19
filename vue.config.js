const CompressionWebpackPlugin = require('compression-webpack-plugin')
const VueFilenameInjector = require('@d2-projects/vue-filename-injector')
const ThemeColorReplacer = require('webpack-theme-color-replacer')
const forElementUI = require('webpack-theme-color-replacer/forElementUI')
const cdnDependencies = require('./dependencies-cdn')
const proxyConfig = require('./proxy.config')

const path = require('path')
const webpack = require('webpack')
const createThemeColorReplacerPlugin = require('./config/plugin.config')

// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)

// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_BUILD_TIME = require('dayjs')().format('YYYY-M-D HH:mm:ss')

// 基础路径 注意发布之前要先修改这里
let publicPath = process.env.VUE_APP_PUBLIC_PATH || '/'

// 设置不参与构建的库
let externals = {}
cdnDependencies.forEach(package => { externals[package.name] = package.library })

// 引入文件的 cdn 链接
const cdn = {
  css: cdnDependencies.map(e => e.css).filter(e => e),
  js: cdnDependencies.map(e => e.js).filter(e => e)
}

const isProd = process.env.NODE_ENV === 'production'

// http://nadmin.mddgame.com/v1 // 内网测试
// http://admin.local.com/v1 // 本地服务
// http://testheroadmin.mddgame.com/v1 
// http://rmanager.mddgame.com/v1
// http://rfrontend.mddgame.com/v1 生产环境地址
const vueConfig = { 
  publicPath,
  lintOnSave: true,
  devServer: {
    publicPath,
    proxy: proxyConfig
    // proxy: {
    //   '/api/': {
    //     target: 'http://admin.local.com/v1', // 后端服务器
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme
          'primary-color': '#FA541C',
          'link-color': '#FA541C',
          'border-radius-base': '2px'
        },
        javascriptEnabled: true
      },
      // 设置 scss 公用变量文件
      sass: {
        prependData: `@import '~@/assets/style/public.scss';`
      }
    }
  },
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      createThemeColorReplacerPlugin()
    ]
  },
  // configureWebpack: config => {
  //   const configNew = {}
  //   if (process.env.NODE_ENV === 'production') {
  //     configNew.externals = externals
  //     configNew.plugins = [
  //       // gzip
  //       new CompressionWebpackPlugin({
  //         filename: '[path].gz[query]',
  //         test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
  //         threshold: 10240,
  //         minRatio: 0.8,
  //         deleteOriginalAssets: false
  //       }),
  //       // Ignore all locale files of moment.js
  //       new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  //     ]
  //     configNew.externals = isProd ? assetsCDN.externals : {}

  //   }
    
  //   if (process.env.VUE_APP_PREVIEW === 'true') {
  //     config.plugins.push(createThemeColorReplacerPlugin)
  //   }

  //   if (process.env.NODE_ENV === 'development') {
  //     // 关闭 host check，方便使用 ngrok 之类的内网转发工具
  //     configNew.devServer = {
  //       disableHostCheck: true
  //     }
  //   }

  //   return configNew
  // },
  // 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
  chainWebpack: config => {
    /**
     * 添加 CDN 参数到 htmlWebpackPlugin 配置中
     */
    config.plugin('html').tap(args => {
      if (process.env.NODE_ENV === 'production') {
        args[0].cdn = cdn
      } else {
        args[0].cdn = []
      }
      return args
    })
    /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
     */
    config.plugins
      .delete('prefetch')
      .delete('preload')
    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config.resolve
      .symlinks(true)
    config
      // 开发环境 sourcemap 不包含列信息
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )
      // 预览环境构建 vue-loader 添加 filename
      .when(process.env.VUE_APP_SCOURCE_LINK === 'TRUE',
        VueFilenameInjector(config, {
          propName: process.env.VUE_APP_SOURCE_VIEWER_PROP_NAME
        })
      )
    // markdown
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('text-loader')
      .loader('text-loader')
      .end()
    // svg
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .include
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'd2-[name]'
      })
      .end()
    // image exclude
    const imagesRule = config.module.rule('images')
    imagesRule
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
    // 重新设置 alias
    config.resolve.alias
      .set('@api', resolve('src/api'))
    // 判断环境加入模拟数据
    const entry = config.entry('app')
    
    // 分析工具
    if (process.env.npm_config_report) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
  // 不输出 map 文件
  productionSourceMap: false,
  // i18n
  pluginOptions: {
    i18n: {
      locale: 'zh-chs',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}

// if (process.env.VUE_APP_PREVIEW === 'true') {
//   console.log('VUE_APP_PREVIEW', true)
//   // add `ThemeColorReplacer` plugin to webpack plugins
//   vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
// }

module.exports = vueConfig