/* eslint-disable @typescript-eslint/no-var-requires */
const AutoImport = require('unplugin-auto-import/webpack')
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
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
      ],
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
}
