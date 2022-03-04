<template>
  <footer>
    <p>make with <span>❤</span> by {{ author }}</p>
  </footer>
</template>

<script>
export default {
  name: 'VPowered',
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

span {
  color: $color-primary
}
</style>
