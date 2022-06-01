<template>
  <footer>
    <p>make with <v-heart class="icn" /> by {{ author }}</p>
  </footer>
</template>

<script>
import VHeart from '@/components/VHeart'

export default {
  name: 'VPowered',
  components: {
    VHeart
  },
  data: () => ({
    author: 'wandersonpjbkn'
  })
}
</script>

<style lang="scss" scoped>
p {
  padding-bottom: $default-padding;
  font: {
    size: .75em;
  }
  text: {
    align: center;
    transform: lowercase;
  }
}

.icn {
  width: auto;
  height: .75em;
}
</style>
