const { defineConfig } = require('@vue/cli-service')
// 按需导入中的自动导入配置
// const AutoImport = require('unplugin-auto-import/webpack')
// const Components = require('unplugin-vue-components/webpack')
// const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
console.log('process.env.VUE_APP_BASE_API', process.env.VUE_APP_BASE_API)
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  devServer: {
    // 跨域代理
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      require('unplugin-element-plus/webpack')({
        // options
      }),
      require('unplugin-vue-components/webpack')({
        /* options */
      })
      // require('unplugin-auto-import/webpack')({
      //   /* options */
      // })
      // 按需导入中的自动导入配置
      // AutoImport({
      //   resolvers: [ElementPlusResolver()]
      // }),
      // Components({
      //   resolvers: [ElementPlusResolver()]
      // })
    ]
  }
})
