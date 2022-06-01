<template>
  <img
    :src="src"
    @load="getDimensions">
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
    width: null,
    height: null
  }),
  methods: {
    getDimensions ({ target }) {
      const rect = target.getBoundingClientRect()
      const { width, height } = rect

      this.width = width
      this.height = height

      this.$emit('dimension', { width })
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  position: absolute;

  width: auto;
  height: 100%;
}
</style>
