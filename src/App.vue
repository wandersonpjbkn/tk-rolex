<template>
  <div id="app">
    <v-slide />
    <v-powered />
    <v-pwa-refresh
      v-if="pwa.updateExists"
      :registration="pwa.registration"
      @updated="pwa.updateExists = false" />
  </div>
</template>

<script>
import { seoMeta } from '@/utils'

export default {
  name: 'App',
  components: {
    VSlide: () => import('@/components/VSlide'),
    VPowered: () => import('@/components/VPowered'),
    VPwaRefresh: () => import('@/components/VPwaRefresh')
  },
  data: () => ({
    seo: {
      title: 'TK Rolex',
      description: 'Algum aniver muito loko, uma rola verde, um TK sorridente, um vídeo para gerações!',
      noindex: true
    },
    pwa: {
      refreshing: false,
      registration: null,
      updateExists: false
    }
  }),
  created () {
    document.addEventListener('pwaRefreshRequest', this.updateAvailable, { once: true })

    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (this.pwa.refreshing) return

        this.pwa.refreshing = true
        window.location.reload()
      })
    }
  },
  methods: {
    updateAvailable (event) {
      this.pwa.registration = event.detail
      this.pwa.updateExists = true
    }
  },
  metaInfo () {
    return seoMeta(this.seo)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/main';

#app {
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100vh;
  row-gap: $default-padding;
  padding: 0 $default-padding;
  background-color: #f5f5f5;

  font: {
    family: Avenir, Helvetica, Arial, sans-serif;
    size: 16px;
  }
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
