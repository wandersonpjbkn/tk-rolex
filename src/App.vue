<template>
  <div id="app">
    <v-slide />
    <v-powered />
  </div>
</template>

<script>
import { seoMeta } from '@/utils'

export default {
  name: 'App',
  components: {
    VSlide: () => import('@/components/VSlide'),
    VPowered: () => import('@/components/VPowered')
  },
  data: () => ({
    seo: {
      title: 'TK Rolex',
      description: 'Aquela amizade sincera e do peito',
      noindex: true
    }
  }),
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
  height: var(--default-height);
  row-gap: $default-padding;
  padding: 0 $default-padding;
  background-color: #f5f5f5;

  font: {
    family: Avenir, Helvetica, Arial, sans-serif;
    size: calc(var(--default-size) * 1px);
  }
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  @media (min-width: 960px) {
    --default-height: 100vh;
  }
}
</style>
