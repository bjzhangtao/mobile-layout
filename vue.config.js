'use strict'

module.exports = {
  // 部署应用包时的基本URL
  publicPath: '/',

  outputDir: 'dist',

  /**
   * true: 会将 lint 错误输出为编译警告
   * false: 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
   * error: lint 错误在开发时直接显示在浏览器中
   */
  lintOnSave: process.env.NODE_ENV !== 'production',

  /**
   * 默认prod静态资源自动带hash码，开发不带
   */
  chainWebpack: () => {},
  configureWebpack: () => {},

  // 生产环境构件支持source map
  productionSourceMap: true,

  devtool: '#source-map',

  devServer: {
    open: true,
    host: 'local.m.jd.com',
    port: 8080,
    https: true,
    hotOnly: false,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'https://local.m.jd.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }, // string | Object
    before: () => {},
    pluginOptions: {}
  },
};
