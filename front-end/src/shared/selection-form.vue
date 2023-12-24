<template>
  <div class="selection-form">
    <div
      class="selection-form__caller"
      @click="openSelector">
      <slot :selected-value-label="getValueLabel(savedValue)" />
    </div>
    <modal-window
      :show-modal="showForm"
      :is-light="true"
      :show-close="false">
      <div class="selection-form__content">
        <span class="selection-form__header">{{ headLabel }}</span>
        <label
          v-for="(value, key) in values" :key="key"
          class="selection-form__value">
          <input
            v-model="selectedValue"
            type="radio"
            :value="value">
          <span class="radio-btn" />
          <span class="selection-form__value-label">{{ getValueLabel(value) }}</span>
        </label>
        <span
          class="form__btn"
          @click="submit">применить</span>
        <span
          class="form__btn form__btn-reject"
          @click="reject">отменить</span>
      </div>
    </modal-window>
  </div>
</template>

<script>
import ModalWindow from './modal-window'

export default {
  name: 'SelectionForm',
  components: { ModalWindow },
  props: {
    headLabel: String,
    values: [Array, Set],
    initialValue: [String, Object, Number],
    valueLabelKey: String,
    isDisabled: Boolean
  },
  data () {
    return {
      showForm: false,
      selectedValue: null,
      savedValue: Object
    }
  },
  created () {
    this.savedValue = this.initialValue
    this.setSavedValue()
  },
  methods: {
    getValueLabel (value) {
      return this.valueLabelKey ? value[this.valueLabelKey] : value
    },
    setSavedValue () {
      this.selectedValue = this.savedValue
    },
    openSelector () {
      if (this.isDisabled) {
        return
      }
      this.showForm = true
    },
    submit () {
      this.showForm = false
      this.savedValue = this.selectedValue
      this.$emit('submitted', this.selectedValue)
    },
    reject () {
      this.setSavedValue()
      this.showForm = false
    }
  }
}
</script>

<style lang="sass">

.selection-form
  &__content
    padding: 25px 8px
  input
    position: absolute
    visibility: hidden
  &__header
    font-size: 16px
    line-height: 21px
    margin-bottom: 12px
  &__value
    display: flex
    align-items: center
    margin-top: 12px
    &-label
      margin-left: 5px
      font-weight: normal
      font-size: 14px
      line-height: 32px
</style>
