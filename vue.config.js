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
    name: 'TK Rolex',
    themeColor: '#111111',
    msTileColor: '#111111',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    assetsVersion: '3.0.7',
    manifestOptions: {
      short_name: 'Monte Seu Box',
      start_url: './dashboard',
      display: 'fullscreen',
      orientation: 'portrait',
      background_color: '#111111',
      theme_color: '#111111',
      icons: [
        {
          src: '/img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './service-worker.js'
    }
  }
}
