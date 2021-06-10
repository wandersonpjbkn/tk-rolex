module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/scss/src/_variables.scss";'
      }
    }
  },
  publicPath: '/tk-rolex',
  outputDir: 'docs',
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './service-worker.js'
    }
  }
}
