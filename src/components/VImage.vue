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
    },
    index: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data: () => ({
    width: null,
    height: null
  }),
  methods: {
    async getDimensions ({ currentTarget }) {
      const index = this.index
      const rect = currentTarget.getBoundingClientRect()
      const { width, height } = rect

      this.width = width
      this.height = height

      await Promise.resolve(this.$emit('dimension', { width, index }))
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
