<template>
  <div
    v-if="showModal"
    class="modal-container">
    <div
      class="modal"
      :class="{'modal_light': isLight}">
      <slot />
      <span
        v-if="showClose"
        class="modal__close btn-cross"
        @click="close" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalWindow',
  props: {
    showModal: Boolean,
    isLight: Boolean,
    showClose: {
      type: Boolean,
      default: true
    },
    isToggleCheck: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      hideCheck: false
    }
  },
  watch: {
    showModal (newValue) {
      document.body.style.overflow = newValue ? 'hidden' : 'visible'
      if (this.hideCheck) {
        this.toggleCheckAppear(newValue)
      }
    }
  },
  created () {
    this.hideCheck = this.isToggleCheck
  },
  methods: {
    // toggleCheckAppear (doHide) {
    // },
    close () {
      this.$emit('modal-close')
    }
  }
}
</script>

<style lang="sass">
.modal
  display: flex
  flex-direction: column
  position: relative
  padding: 36px 12px
  margin: 8px
  background: #515D73
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1)
  border-radius: 3px
  overflow: auto
  &_light
    background: #FFFFFF
    box-shadow: 0px 2px 5px rgba(108, 110, 128, 0.1)
    padding: 0
  &-container
    display: flex
    flex-direction: column
    justify-content: center
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 99
    background-color: rgba(16,24,40, 0.8)
  &__text
    font-weight: normal
    font-size: 14px
    line-height: 18px
    letter-spacing: 0.02em
    color: #FFFFFF
    user-select: none
  &__close
    opacity: 0.5
    position: absolute
    right: 8px
    top: 8px

</style>
