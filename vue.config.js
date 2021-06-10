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
    assetsVersion: '1.0.1',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './service-worker.js'
    }
  }
}
