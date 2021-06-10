<template>
  <img
    ref="img"
    :src="src">
</template>

<script>
export default {
  name: 'VImage',
  props: {
    src: {
      type: String,
      default: '',
      required: true
    }
  },
  data: () => ({
    width: null
  }),
  watch: {
    width () {
      this.emitWidth()
    }
  },
  mounted () {
    this.setListeners()
  },
  methods: {
    setListeners () {
      const img = this.$refs.img
      img.addEventListener('load', this.getWidth)
    },
    getWidth () {
      const img = this.$refs.img
      this.width = img.clientWidth
    },
    async emitWidth () {
      const img = this.$refs.img
      await this.$emit('size', this.width)
      await img.removeEventListener('load', this.getWidth)
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  position: absolute;
}
</style>
