<template>
<transition :name="animation">
    <div class="modal is-active" v-if="isActive">
      <div class="modal-background" @click="cancel"></div>
      <div class="animation-content"
        :class="{ 'modal-content': !hasModalCard }"
        :style="{ maxWidth: newWidth }">
        <component
          v-if="component"
          v-bind="props"
          v-on="$listeners"
          :is="component"
          @close="close">
        </component>
        <div v-else-if="content" v-html="content"></div>
        <slot v-else></slot>
      </div>
      <button v-if="canCancel" class="modal-close is-large" @click="cancel"></button>
    </div>
  </transition>
</template>
<script>
/**
 * Most of this code exists thanks to @rafaelpimpa
 * https://github.com/rafaelpimpa/buefy/tree/dev/src/components/modal
 */
export default {
  name: 'modal',
  props: {
    active: Boolean,
    component: Object,
    content: String,
    props: Object,
    width: {
      type: [ String, Number ],
      default: 960
    },
    hasModalCard: Boolean,
    animation: {
      type: String,
      default: 'zoom-out'
    },
    canCancel: {
      type: Boolean,
      default: true
    },
    onCancel: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      isActive: this.active || false,
      newWidth: typeof this.width === 'number'
              ? this.width + 'px'
              : this.width
    }
  },
  watch: {
    active(value) {
      this.isActive = value
    },
    isActive() {
      if (typeof window !== 'undefined') {
        const action = this.isActive ? 'add' : 'remove'
        document.documentElement.classList[action]('is-clipped')
      }
    }
  },
  methods: {
      /**
       * Close the Modal if canCancel.
       */
    cancel() {
      if (!this.canCancel) return
      this.close()
    },

    close() {
      this.onCancel.apply(null, arguments)
      this.$emit('close')
    },
      /**
       * Keypress event that is bound to the document.
       */
    keyPress(event) {
          // Esc key
      if (event.keyCode === 27) this.cancel()
    }
  },
  created() {
    if (typeof window !== 'undefined') {
      document.addEventListener('keyup', this.keyPress)
    }
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('keyup', this.keyPress)
    }
  }
}
</script>
<style>
.is-clipped {
  overflow: hidden;
}
.zoom-in-enter-active,
.zoom-in-leave-active {
    transition: opacity 150ms ease-out;
    .animation-content,
    .animation-content {
        transition: transform 150ms ease-out;
    }
}
.zoom-in-enter,
.zoom-in-leave-active {
    opacity: 0;
    .animation-content,
    .animation-content {
        transform: scale(0.95);
    }
}

.zoom-out-enter-active,
.zoom-out-leave-active {
    transition: opacity 150ms ease-out;
    .animation-content,
    .animation-content {
        transition: transform 150ms ease-out;
    }
}
.zoom-out-enter,
.zoom-out-leave-active {
    opacity: 0;
    .animation-content,
    .animation-content {
        transform: scale(1.05);
    }
}

</style>
