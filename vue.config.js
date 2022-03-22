// Temporary until we can use https://github.com/webpack/webpack-dev-server/pull/2143
const packageName = 'app1'
// const webpack = require('webpack')

// element
const ThemeColorReplacer = require('webpack-theme-color-replacer')
const forElementUI = require('webpack-theme-color-replacer/forElementUI')
function getThemeCluster(theme) {
  const tintColor = (color, tint) => {
    let red = parseInt(color.slice(0, 2), 16)
    let green = parseInt(color.slice(2, 4), 16)
    let blue = parseInt(color.slice(4, 6), 16)
    if (tint === 0) { // when primary color is in its rgb space
      return [red, green, blue].join(',')
    } else {
      red += Math.round(tint * (255 - red))
      green += Math.round(tint * (255 - green))
      blue += Math.round(tint * (255 - blue))
      red = red.toString(16)
      green = green.toString(16)
      blue = blue.toString(16)
      return `#${red}${green}${blue}`
    }
  }
  const shadeColor = (color, shade) => {
    let red = parseInt(color.slice(0, 2), 16)
    let green = parseInt(color.slice(2, 4), 16)
    let blue = parseInt(color.slice(4, 6), 16)
    red = Math.round((1 - shade) * red)
    green = Math.round((1 - shade) * green)
    blue = Math.round((1 - shade) * blue)
    red = red.toString(16)
    green = green.toString(16)
    blue = blue.toString(16)
    return `#${red}${green}${blue}`
  }
  const clusters = [theme]
  for (let i = 0; i <= 9; i++) {
    clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
  }
  clusters.push(shadeColor(theme, 0.1))
  return clusters
}

// copy
const CopyWebpackPlugin = require('copy-webpack-plugin')

// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)

// 预加载
// const PrerenderSpaPlugin = require('prerender-spa-plugin')
// const routesConfig = require('./router-config')

/**
 * You will need to set publicPath if you plan to deploy your site under a sub path,
 * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
 * then publicPath should be set to '/bar/'.
 * In most cases please use '/' !!!
 * Detail: https://cli.vuejs.org/config/#publicpath
 */
const publicPath = process.env.VUE_APP_PUBLIC_PATH || '/'
const assetsDir = 'static'

// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_BUILD_TIME = require('dayjs')().format('YYYY-M-D HH:mm:ss')
process.env.VUE_APP_URL = publicPath + assetsDir

const webpackConfig = module.exports = {
  publicPath,
  outputDir: 'dist',
  assetsDir,
  // filenameHashing: false, // 打包hash
  lintOnSave: process.env.NODE_ENV === 'development',
  // lintOnSave: true,
  // runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: false, // 生产环境的 source map
  // parallel: require('os').cpus().length > 1,
  devServer: {
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    //   'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    // },
    publicPath,
    port: 9100,
    open: true,
    // compress: true,
    // disableHostCheck: true,
    // inline: false,
    hot: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/mall': {
        // 目标 API 地址
        target: 'https://fp.hongyanfuli.com/', // 联调
        // 如果要代理 websockets
        ws: true,
        // 将主机标头的原点更改为目标URL
        changeOrigin: false
      },
      '/group1': {
        // 目标 API 地址
        target: 'https://jd.hongyanfuli.com/', // 联调
        // 如果要代理 websockets
        ws: true,
        // 将主机标头的原点更改为目标URL
        changeOrigin: false
      }
    }
    // proxy: {
    // 	change xxx-api/login => mock/login
    // 	detail: https://cli.vuejs.org/config/#devserver-proxy
    // 	[process.env.VUE_APP_BASE_API]: {
    // 		target: `http://127.0.0.1:${port}/mock`,
    // 		changeOrigin: true,
    // 		pathRewrite: {
    // 			['^' + process.env.VUE_APP_BASE_API]: ''
    // 		}
    // 	}
    // },
    // after: require('./mock/mock-server.js')
  },
  css: {
    // requireModuleExtension: false,
    // 合并
    // extract: true,
    // sourceMap: false,
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        prependData: `
        @import '~@/assets/styles/public.scss';
        $src: "${process.env.VUE_APP_URL}";
        `
      }
    }
  },
  configureWebpack: {
    name: packageName,
    // entry: {
    //   app: './src/main.js'
    // },
    // output: {
    //   library: `${packageName}-[name]`,
    //   libraryTarget: 'umd',
    //   jsonpFunction: `webpackJsonp_${packageName}`
    // },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        '@api': resolve('src/api')
      }
    },
    // 引入高德地图
    externals: {
      // 'vue': 'Vue',
      // 'element-ui': 'ELEMENT',
      // 'vue-router': 'VueRouter',
      // 'vuex': 'Vuex',
      'AMap': 'AMap',
      'AMapUI': 'AMapUI',
      'BaiduMap': 'BMap',
      'BaiduMapLib': 'BMapLib'
    },
    plugins: [
      new CopyWebpackPlugin([{
        from: require('path').resolve(__dirname, 'static'),
        to: assetsDir,
        ignore: ['.*']
      }])
      // 自动加载模块
      // new webpack.ProvidePlugin({
      //   $: 'jquery',
      //   jQuery: 'jquery'
      // }),
      // 预加载
      // new PrerenderSpaPlugin({
      //   staticDir: resolve('dist'),
      //   routes: Object.keys(routesConfig),
      //   postProcess(ctx) {
      //     ctx.route = ctx.originalRoute
      //     ctx.html = ctx.html.split(/>[\s]+</gim).join('><')
      //     ctx.html = ctx.html.replace(
      //       /<title>(.*?)<\/title>/gi,
      //       `<title>${routesConfig[ctx.route].title}</title><meta name="keywords" content="${routesConfig[ctx.route].keywords}" /><meta name="description" content="${routesConfig[ctx.route].description}" />`
      //     )
      //     if (ctx.route.endsWith('.html')) {
      //       ctx.outputPath = path.join(__dirname, 'dist', ctx.route)
      //     }
      //     return ctx
      //   },
      //   minify: {
      //     collapseBooleanAttributes: true,
      //     collapseWhitespace: true,
      //     decodeEntities: true,
      //     keepClosingSlash: true,
      //     sortAttributes: true
      //   },
      //   renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
      //     // 需要注入一个值，这样就可以检测页面当前是否是预渲染的
      //     inject: {},
      //     headless: false,
      //     // 视图组件是在API请求获取所有必要数据后呈现的，因此我们在dom中存在“data view”属性后创建页面快照
      //     renderAfterDocumentEvent: 'render-event'
      //   })
      // })
    ]
  },
  chainWebpack: config => {
    config.plugins
      .delete('prefetch')
      .delete('preload')

    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config.resolve
      .symlinks(true)

    // config
    //   .plugin('ignore')
    //   .use(
    //     new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/)
    //   )

    // element
    config
      .plugin('theme-color-replacer')
      .use(ThemeColorReplacer, [{
        fileName: process.env.NODE_ENV !== 'development' ? assetsDir + '/css/theme-colors.[contenthash:8].css' : 'css/theme-colors-[contenthash:8].css',
        matchColors: [
          // ...forElementUI.getElementUISeries(process.env.VUE_APP_ELEMENT_COLOR) // Element-ui主色系列
          ...getThemeCluster(process.env.VUE_APP_ELEMENT_COLOR.replace('#', ''))
        ],
        externalCssFiles: ['./node_modules/element-ui/lib/theme-chalk/index.css'], // optional, String or string array. Set external css files (such as cdn css) to extract colors.
        changeSelector: forElementUI.changeSelector,
        // isJsUgly: process.env.NODE_ENV !== 'development',
        injectCss: true,
        isJsUgly: true
      }])

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

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
        symbolId: 'icon-[name]'
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
    // config.resolve.alias
    //   .set('@api', resolve('src/api'))
    // 判断环境加入模拟数据
    const entry = config.entry('app')
    if (process.env.VUE_APP_BUILD_MODE !== 'NOMOCK') {
      entry
        // .add('@/mock')
        .end()
    }

    // config.externals(['vue', 'vue-router', 'vuex'])

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'libs',
                  test: /[\\/]node_modules[\\/]/,
                  enforce: true,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                vue: {
                  name: 'core', // split vue into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  enforce: true,
                  test: /[\\/]node_modules[\\/]_?vue(.*)/ // in order to adapt to cnpm
                },
                elementUI: {
                  name: 'plugins', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  enforce: true,
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                agGrid: {
                  name: 'table',
                  priority: 20,
                  enforce: true,
                  test: /[\\/]node_modules[\\/]_?@ag-grid-community(.*)/
                },
                highlight: {
                  name: 'highlight',
                  priority: 20,
                  enforce: true,
                  test: /[\\/]node_modules[\\/]_?highlight.js(.*)/
                },
                commons: {
                  name: 'commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // config.optimization.runtimeChunk('single')
          config.optimization.runtimeChunk({
            name: entrypoint => `register-${entrypoint.name}`
          })
        }
      )

    // const cdn = {
    //   // 访问https://unpkg.com/element-ui/lib/theme-chalk/index.css获取最新版本
    //   css: ['//unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css'],
    //   js: [
    //     '//unpkg.com/vue@2.6.10/dist/vue.min.js', // 访问https://unpkg.com/vue/dist/vue.min.js获取最新版本
    //     '//unpkg.com/vue-router@3.0.6/dist/vue-router.min.js',
    //     '//unpkg.com/vuex@3.1.1/dist/vuex.min.js',
    //     '//unpkg.com/axios@0.19.0/dist/axios.min.js',
    //     '//unpkg.com/element-ui@2.10.1/lib/index.js'
    //   ]
    // }

    config.plugin('html').tap(args => {
      args[0].minify = false
      // args[0].chunksSortMode = 'none'
      // html中添加cdn
      // args[0].cdn = cdn
      return args
    })
  },
  // i18n
  pluginOptions: {
    i18n: {
      locale: 'zh_cn',
      fallbackLocale: 'en_us',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}

if (process.env.NODE_ENV === 'production') {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.configureWebpack.plugins.push(
    new CompressionWebpackPlugin({
      algorithm: 'gzip',
      // test: /\.(js|css)$/,
      test: /\.(js|css)(\?.*)?$/i,
      threshold: 102400,
      minRatio: 0.8
    })
  )
}
