<template>
  <div class="toggle is-flex">
    <label
      class="toggle__label"
      for="toggle"
      @click="toggle">
      <slot>
        <strong>{{ label }}</strong>
      </slot>
    </label>
    <input
      id="toggle"
      class="toggle__checkbox"
      type="checkbox">
  </div>
</template>

<script>
export default {
  name: 'VToggle',

  props: {
    value: {
      type: Boolean,
      default: false,
      required: true
    }
  },

  computed: {
    label () {
      return this.value ? 'ON' : 'OFF'
    }
  },

  methods: {
    emit (value, key = 'input') {
      this.$emit(key, value)
    },

    toggle () {
      this.emit(!this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.toggle {
  position: relative;

  &__label {
    cursor: pointer;

    strong {
      color: $color-secundary;
    }
  }

  &__checkbox {
    position: absolute;
    top: 0;
    left: 0;

    width: .1px;
    height: .1px;
    opacity: 0;
  }
}
</style>
