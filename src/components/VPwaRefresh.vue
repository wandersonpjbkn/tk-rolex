<template>
  <aside
    :class="`pwa-refresh--${position}`"
    class="pwa-refresh"
    @click="close(true)">

    <div class="pwa-refresh__call">
      <p>Novo conteúdo disponível, atualize</p>
    </div>

    <div class="pwa-refresh__action">
      <button class="btn__link pwa-refresh__btn">
        <span class="btn__link--text pwa-refresh__time">
          {{ time }}s
        </span>
      </button>
    </div>

  </aside>
</template>

<script>
const propsPositionValidation = [
  'top',
  'top-right',
  'right',
  'bottom-right',
  'bottom',
  'bottom-left',
  'left',
  'top-left'
]

export default {
  name: 'VPwaRefresh',

  props: {
    position: {
      type: String,
      default: 'bottom-right',
      required: false,
      validator: value => ~propsPositionValidation.indexOf(value)
    },

    timeElapse: {
      type: Number,
      default: 3,
      required: false
    }
  },

  data: () => ({
    time: 0
  }),

  watch: {
    time (value) {
      value === 0 && this.close()
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.time = this.timeElapse

      setTimeout(() => {
        this.countdown()
      }, 1000)
    })
  },

  methods: {
    close (closeNow = false) {
      const reload = () => window.location.reload(true)

      if (closeNow) return reload()

      setTimeout(() => {
        reload()
      }, 1000)
    },

    countdown () {
      const interval = setInterval(() => {
        this.time === 0
          ? clearInterval(interval)
          : this.time = this.time - 1
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.pwa-refresh {
  $recuo: 20px;
  $color-primary: #22bf4f;
  $color-forefront: #111;

  position: fixed;
  z-index: 20;

  display: grid;
  width: auto;
  height: 40px;
  border-radius: 40px;
  background-color: $color-primary;

  grid-template-columns: auto auto;
  grid-template-areas: "call action";
  align-items: center;

  color: $color-forefront;

  animation: from-bottom ease;
  cursor: pointer;

  &--top {
    top: $recuo;
    left: 50%;

    transform: translateX(-50%);
  }

  &--top-right {
    top: $recuo;
    right: $recuo;
  }

  &--right {
    top: 50%;
    right: $recuo;

    transform: translateY(-50%);
  }

  &--bottom-right {
    bottom: $recuo;
    right: $recuo;
  }

  &--bottom {
    bottom: $recuo;
    left: 50%;

    transform: translateX(-50%);
  }

  &--bottom-left {
    bottom: $recuo;
    left: $recuo;
  }

  &--left {
    top: 50%;
    left: $recuo;

    transform: translateY(-50%);
  }

  &--top-left {
    top: $recuo;
    left: $recuo;
  }

  &__call {
    grid-area: call;
    padding: 0 5px 0 15px;

    font-size: .875em;
  }

  &__action {
    grid-area: action;
    margin-right: 5px;
  }

  &__btn {
    $size: 30px;

    width: $size;
    height: $size;
    min-height: $size;
    padding: 2px;
    border-radius: 50%;
    border: none;
    background-color: darken($color-primary, 15);
  }

  &__time {
    font-weight: normal;
    font-family: inherit;
    text-transform: inherit;
    color: $color-forefront;
  }
}
</style>
