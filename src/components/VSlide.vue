<template>
  <main class="slide">
    <section
      ref="container"
      class="slide__container">

      <span
        v-if="loading"
        class="slide__loading">
        loading ...
      </span>

      <div
        class="slide__images"
        :class="{ 'opaque': loading }"
        :style="`left:${move}px`">

        <v-image
          v-for="(src, index) in imgs"
          :key="index"
          :src="src"
          :style="`left:${imagePosition(index)}px`"
          @size="adjustPosition($event, index)" />

      </div>
    </section>
  </main>
</template>

<script>
// const log = options => console.log(...options)

export default {
  name: 'VSlide',
  components: {
    VImage: () => import('@/components/VImage')
  },
  data: () => ({
    imgs: [],
    imgArrayCounter: 14,
    imgQttyCounter: 118,
    imgName: 'tk-rolex',
    position: [],
    start: 0,
    current: 0,
    move: 0,
    containerWidth: 848
  }),
  computed: {
    loading () {
      return this.imgs.length !== this.position.length
    },
    shift () {
      const abs = Math.abs(this.start - this.current)
      const frame = (abs * this.imgQttyCounter) / this.containerWidth

      return Math.max(Math.round(frame), 1)
    },
    frameWidth () {
      return [...this.position]
        .reduce((total, item) => {
          total += item
          return total
        }, 0)
    }
  },
  watch: {
    shift (value) {
      this.move = (this.containerWidth * value * (-1)) + this.containerWidth
    }
  },
  async mounted () {
    await this.hydratedImgs()
    this.setListeners()
  },
  methods: {
    hydratedImgs () {
      for (let index = 1; index <= this.imgArrayCounter; ++index) {
        this.imgs.push(require(`@/assets/imgs/${this.imgName}-${index}.gif`))
      }
    },
    adjustPosition (size, index) {
      this.$set(this.position, index, size)
    },
    imagePosition (index) {
      const size = [...this.position]
        .slice(0, index)
        .reduce((total, item) => {
          total += item
          return total
        }, 0)

      return size
    },
    setListeners () {
      const container = this.$refs.container
      container.addEventListener('mouseenter', this.setStart)
      container.addEventListener('mousemove', this.setCurrent)
    },
    setStart (event) {
      this.start = event.target.offsetLeft
    },
    setCurrent (event) {
      this.current = event.pageX
    }
  }
}
</script>

<style lang="scss" scoped>
.slide {
  @extend %flex-center;

  padding-top: $default-padding;

  &__loading {
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
  }

  &__container {
    position: relative;
    width: 848px;
    height: 480px;
    background-color: #333;
    overflow: hidden;
    border-radius: 15px;
    box-shadow:
      0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      0 6.7px 5.3px rgba(0, 0, 0, 0.048),
      0 12.5px 10px rgba(0, 0, 0, 0.06),
      0 22.3px 17.9px rgba(0, 0, 0, 0.072),
      0 41.8px 33.4px rgba(0, 0, 0, 0.086),
      0 100px 80px rgba(0, 0, 0, 0.12);
  }

  &__images {
    position: absolute;

    &.opaque {
      opacity: 0;
    }
  }
}
</style>
