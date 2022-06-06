process.env.VUE_APP_ASSETS_VERSION = require('./package.json').version

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/scss/src/_variables.scss";'
      }
    }
  },
  outputDir: 'docs',
  pwa: {
    assetsVersion: process.env.VUE_APP_ASSETS_VERSION,
    name: 'TK Rolex',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black'
  }
}
