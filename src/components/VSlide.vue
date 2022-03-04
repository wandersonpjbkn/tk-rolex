<template>
  <main class="slide">
    <div class="instruction">
      <small>{{ instruction }}</small>
    </div>

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
          :mobile-width="containerWidth"
          :style="`left:${imagePosition(index)}px`"
          @size="adjustPosition($event, index)" />

      </div>
    </section>
  </main>
</template>

<script>
import VImage from '@/components/VImage'

export default {
  name: 'VSlide',
  components: {
    VImage
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
    defaultPadding: null,
    threshold: 848
  }),
  computed: {
    isMobile () {
      const env = navigator.userAgent || navigator.vendor || window.opera
      let check = false

      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(env) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(env.substr(0, 4))) {
        check = true
      }

      return check
    },
    instruction () {
      let prefix = 'passe o mouse'

      if (this.isMobile) { prefix = 'deslize o dedo' }

      return `${prefix} sobre a imagem`
    },
    isWidthLowerThanThreshold () {
      const rect = document.documentElement.getBoundingClientRect()
      return rect.width < this.threshold
    },
    loading () {
      return this.imgs.length !== this.position.length
    },
    currentSlideShift () {
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
    },
    containerWidth () {
      return this.frameWidth / this.imgQttyCounter
    }
  },
  watch: {
    currentSlideShift (value) {
      this.move = (this.containerWidth * value * (-1)) + this.containerWidth
    }
  },
  created () {
    this.getCSSVariablesData()
    this.hydratedImgs()
  },
  mounted () {
    this.setListeners()
  },
  methods: {
    getCSSVariablesData () {
      const size = getComputedStyle(document.documentElement).getPropertyValue('--default-size')
      this.defaultPadding = parseInt(size) * 2
    },
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

      if (this.isWidthLowerThanThreshold) {
        container.addEventListener('touchstart', this.setStart)
        container.addEventListener('touchmove', this.setCurrentTouchMove)
      } else {
        container.addEventListener('mouseenter', this.setStart)
        container.addEventListener('mousemove', this.setCurrentMouseMove)
      }
    },
    setStart (event) {
      this.start = event.target.offsetLeft
    },
    setCurrentMouseMove (event) {
      this.current = event.pageX
    },
    setCurrentTouchMove (event) {
      this.current = event.changedTouches[0].pageX
    }
  }
}
</script>

<style lang="scss" scoped>
.slide {
  @extend %flex-center;

  flex-direction: column;
  padding-top: $default-padding;
  color: #f5f5f5;

  &__loading {
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
  }

  &__container {
    $ratio: 480 / 848;

    position: relative;
    width: 100%;
    max-width: 848px;
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

    @media (min-width: 848px) {
      height: 480px;
    }
  }

  &__images {
    position: absolute;
    height: inherit;
    pointer-events: none;

    &.opaque {
      opacity: 0;
    }
  }
}

.instruction {
  margin-bottom: 20px;

  text-align: center;
}

small {
  font: {
    size: .75em;
    style: italic;
  }
  color: #2c3e50;
}
</style>
