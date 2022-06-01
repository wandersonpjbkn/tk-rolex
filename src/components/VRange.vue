<template>
  <input
    ref="range"
    v-bind="$attrs"
    :value="value"
    :style="`--range-pointer:${pointer}`"
    type="range"
    class="base-range"
    @input="input">
</template>

<script>
export default {
  name: 'VRange',

  props: {
    value: {
      type: [Number, String],
      default: 0,
      required: true
    }
  },

  data: () => ({
    pointer: ''
  }),

  watch: {
    value (value) {
      this.track(value)
    }
  },

  mounted () {
    this.track()
  },

  methods: {
    emit (value, key = 'range') {
      this.$emit(key, value)
    },

    track (data = null) {
      const el = this.$refs.range
      const { max, min } = this.$attrs

      const current = parseInt(data || el.value)
      const point = (current - min) / (max - min)

      if (isNaN(point)) return

      this.pointer = point
    },

    input ({ target }) {
      const { value } = target

      this.track(value)
      this.emit(value)
    }
  }
}
</script>

<style lang="scss" scoped>
$bar-size: 5px;

@mixin dot {
  --dot-size: 30px;

  width: var(--dot-size);
  height: var(--dot-size);
  border-radius: 50%;
  background: var(--color-secundary);
  border: 0;

  cursor: pointer;

  @media (min-width: 768px) {
    --dot-size: 20px;
  }
}

@mixin fill($bg-color: var(--color-primary)) {
  background-color: $bg-color;
  height: $bar-size;
}

@mixin bar($bg-color: var(--color-primary)) {
  @include fill($bg-color);

  width: 100%;
  cursor: pointer;
}

@mixin reset {
  /** default */
  -webkit-appearance: none;
  appearance: none;

  /** webkit/blink */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  /** ie */
  &::-ms-track {
    background-color: var(--color-grey);
    border-color: var(--color-grey);
    color: var(--color-grey);
  }
}

@mixin thumb {
  /** webkit/blink */
  &::-webkit-slider-thumb {
    @include dot;
  }

  /** firefox */
  &::-moz-range-thumb {
    @include dot;
  }

  /** ie */
  &::-ms-thumb {
    @include dot;
  }
}

@mixin track {
  /** webkit/blink */
  &::-webkit-slider-runnable-track {
    @include bar;
  }

  /** firefox */
  &::-moz-range-track {
    @include bar(var(--color-grey));
  }
}

@mixin progress {
  /** firefox */
  &::-moz-range-progress {
    @include fill(var(--color-primary));
  }

  /** ie */
  &::-ms-fill-lower {
    @include fill(var(--color-primary));
  }
  &::-ms-fill-upper {
    @include fill(var(--color-grey));
  }
}

.base-range {
  --range-pointer: 0;

  @include reset;
  @include thumb;
  // @include track;
  // @include progress;

  width: 100%;
  height: $bar-size;
  outline: none;

  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(var(--range-pointer), var(--color-primary)),
    color-stop(var(--range-pointer), var(--color-grey))
  );
}
</style>
