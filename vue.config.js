module.exports = {
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    // 代理转发功能（反向代理）
    proxy: {
      '/kerwin': {
        target: 'http://m.maoyan.com',
        changeOrigin: true,
        pathRewrite: {
          '^/kerwin': ''
        }

        // /kerwin/ajax/comingList  ====>  ajax/comingList
      }
    }
  },
  lintOnSave: true
}
