/* eslint-disable @typescript-eslint/no-var-requires */
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  devServer: {
    port: '8070',
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    // },
    // proxy: {
    //   '': {
    //     target: '',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       // '^/api': '/api',
    //     },
    //   },
    // },
  },
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
}
