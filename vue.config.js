module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/scss/src/_variables.scss";'
      }
    }
  },

  publicPath: '/tk-rolex'
}
