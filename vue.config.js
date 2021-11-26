module.exports = {
  devServer: {
    port: '8070',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '': {
        target: '',
        changeOrigin: true,
        pathRewrite: {
          // '^/api': '/api',
        },
      },
    },
  },
}
