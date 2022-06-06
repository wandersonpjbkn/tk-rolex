<template>
  <main class="slide">
    <div class="instruction">
      <small>{{ instruction }}</small>
    </div>

    <section
      ref="container"
      class="slide__container"
      @touchstart="setAxisXDimensions($event.currentTarget)"
      @mouseenter="setAxisXDimensions($event.currentTarget)"
      @touchmove="setCurrentTouchMove"
      @mousemove="setCurrentMouseMove">

      <span
        v-if="isLoading"
        class="slide__loading">
        loading ...
      </span>

      <div
        class="slide__images"
        :class="{ 'opaque': isLoading }"
        :style="`left:${slideRecuo}px;width:${totalCollectionWidth}px`">

        <v-image
          v-for="(src, index) in collection.list"
          :key="index"
          :data-index="index"
          :data-width="collection.widths[index]"
          :index="index"
          :src="src"
          :style="getItemStyle(index)"
          @dimension="addItemWidth" />

      </div>
    </section>

    <div class="range">
      <v-range
        :step="1"
        :min="axisX.start"
        :max="axisX.end"
        :value="axisX.current"
        @range="swipe" />
    </div>

    <v-toggle
      v-model="info.show"
      class="toggle">
      Infos: <strong>turn {{ infoShowStatus }}</strong>
    </v-toggle>

    <template v-if="info.show">
      <p class="info">
        <strong>axisX</strong>
        <br>
        <span>start: {{ axisX.start }}</span> ||
        <span>end: {{ axisX.end }}</span> ||
        <span>current: {{ axisX.current }}</span>
        <span
          ref="line"
          class="line" />
      </p>

      <p class="info">
        <strong>slide</strong>
        <br>
        <span>width: {{ Math.round(slideWidth) }}</span> ||
        <span>current: {{ slideCurrent }}</span> ||
        <span>differ: {{ slideDiffer }}</span> ||
        <span>recuo: {{ slideRecuo }}</span>
      </p>
    </template>

  </main>
</template>

<script>
import VImage from '@/components/VImage'
import VRange from '@/components/VRange'
import VToggle from '@/components/VToggle'

export default {
  name: 'VSlide',
  components: {
    VImage,
    VRange,
    VToggle
  },
  data: () => ({
    collection: {
      name: 'tk-rolex',
      extension: 'gif',
      length: 14,
      frames: 118,
      list: [],
      widths: []
    },
    axisX: {
      start: 0,
      end: 0,
      current: 0
    },
    threshold: 800,
    info: {
      show: false
    }
  }),
  computed: {
    isSmallScreen () {
      const rect = document.documentElement.getBoundingClientRect()
      return rect.width < this.threshold
    },
    isLoading () {
      const { list, widths } = this.collection

      if (widths.length === 0) return true
      else return list.length !== widths.length
    },
    infoShowStatus () {
      return this.info.show ? 'OFF' : 'ON'
    },
    instruction () {
      const suffix = 'sobre a imagem ou controle com o swipe'
      let prefix = 'passe o mouse'

      if (this.isSmallScreen) { prefix = 'deslize o dedo' }

      return `${prefix} ${suffix}`
    },
    totalCollectionWidth () {
      return this.collection.widths.reduce((a, b) => a + b, 0)
    },
    slideWidth () {
      return this.totalCollectionWidth / this.collection.frames
    },
    slideDiffer () {
      return Math.abs(this.axisX.start - this.axisX.current)
    },
    slideCurrent () {
      return Math.round((this.slideDiffer * this.collection.frames) / this.slideWidth)
    },
    slideRecuo () {
      const recuo = this.slideWidth * this.slideCurrent * (-1)
      const recuoThreshold = (this.totalCollectionWidth - this.slideWidth) * (-1)

      return Math.max(recuo, recuoThreshold)
    }
  },
  watch: {
    slideWidth (value) {
      if (isNaN(value)) return
      this.axisX.end = Math.round(value)
    }
  },
  mounted () {
    this.collection.list = []
    this.collection.widths = []

    this.loadCollection()
  },
  methods: {
    loadCollection () {
      const { name, length, extension } = this.collection
      this.collection.list = Array.from({ length }, (_, index) => {
        return require(`@/assets/imgs/${name}-${index + 1}.${extension}`)
      })
    },
    getItemStyle (index) {
      const widths = this.collection.widths.slice(0, index)
      return `left: ${widths.reduce((a, b) => a + b, 0)}px;`
    },
    addItemWidth ({ width, index }) {
      this.collection.widths.splice(index, 0, width)
    },
    setAxisXDimensions (target) {
      const { offsetLeft, offsetWidth } = target

      this.axisX.start = offsetLeft // pageX initial
      this.axisX.end = offsetLeft + offsetWidth // pageX final
    },
    setCurrent (pageX) {
      this.axisX.current = pageX
      this.setLine(pageX)
    },
    setCurrentMouseMove ({ pageX }) {
      this.setCurrent(pageX)
    },
    setCurrentTouchMove ({ changedTouches }) {
      const [touch] = changedTouches
      this.setCurrent(touch.pageX)
    },
    swipe (value) {
      const { container } = this.$refs

      this.setAxisXDimensions(container)
      this.setCurrent(value)
    },
    setLine (pageX) {
      const line = this.$refs.line
      let value = pageX

      if (this.axisX.start === 0 && !this.isSmallScreen) {
        value = parseInt(pageX) + parseInt(this.$refs.container.offsetLeft)
      }

      if (line) { line.style = `--range-pointer:${value}px;` }
    }
  }
}
</script>

<style lang="scss" scoped>
.slide {
  $ratio: 440 / 800;

  @extend %flex-center;

  flex-direction: column;
  padding-top: $default-padding;

  &__loading {
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    color: #f5f5f5;
  }

  &__container {
    position: relative;
    width: 100%;
    max-width: 800px;
    height: calc(100vw * #{$ratio});
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

    cursor: pointer;

    @media (min-width: 800px) {
      height: 440px;
    }
  }

  &__images {
    position: absolute;
    pointer-events: none;

    height: inherit;

    &.opaque {
      opacity: 0;
    }
  }
}

.instruction {
  margin-bottom: 2rem;
  text-align: center;
}

small {
  font: {
    size: .75em;
    style: italic;
  }
}

.range {
  margin-top: 2rem;
  width: 220px;

  input {
    margin: 0;
    width: inherit;
  }
}

.info {
  margin-top: 2rem;
  text-align: center;
}

.line {
  position: fixed;
  top: 0;
  left: var(--range-pointer);

  display: block;
  height: 100vh;
  width: 1px;
  background-color: $color-warning;

  transform: translateX(-50%);
}

.toggle {
  margin-top: 30px;
}
</style>
