<template>
  <div class="option-filter">
    <div class="option-filter__header">
      <span>Фильтры</span>
      <span
        class="option-filter__close btn-cross"
        @click="close" />
    </div>
    <div class="option-filter__body">
      <div v-for="(filter, key) in filters" :key="key">
        <selection-form
          class="option-filter__item"
          :head-label="filter.name"
          :values="['Все', ...filter.getValues()]"
          :value-label-key="filter.getValueKey()"
          :initial-value="filter.getSelectedValue()"
          @submitted="value => setSelectedValue(filter, value)">
          <template #default="{ selectedValueLabel }">
            <span class="option-filter__select-label">{{ filter.name }}</span>
            <span class="option-filter__select">{{ selectedValueLabel  === 'Все' ? '' : selectedValueLabel }}</span>
          </template>
        </selection-form>
      </div>
    </div>
    <div class="option-filter__footer">
      <span
        class="form__btn"
        @click="submit">принять</span>
      <span
        class="form__btn form__btn-reject"
        @click="reject">сбросить</span>
    </div>
  </div>
</template>

<script>
import SelectionForm from './selection-form'
export default {
  name: 'FilteringForm',
  components: { SelectionForm },
  props: {
    filters: Array,
  },
  data () {
    return {
      hideCheck: false
    }
  },
  methods: {
    getValueLabel (selectedValue, valueKey) {
      return valueKey ? selectedValue[this.valueLabelKey] : selectedValue
    },
    setSelectedValue (filter, value) {
      const resultVal = value === 'Все' ? null : value
      filter.setSelectedValue(resultVal)
    },
    submit () {
      this.$emit('submitted', this.filters)
    },
    reject () {
      this.$emit('rejected')
    },
    close () {
      this.$emit('returned')
    }
  }
}
</script>

<style lang="sass">

.option-filter
  overflow: hidden
  display: flex
  flex-direction: column
  background: #FFFFFF
  flex-grow: 1
  padding: 25px 8px
  &__header
    display: flex
    justify-content: space-between
    align-items: center
  &__body
    display: flex
    flex-direction: column
    flex-grow: 1
    overflow-y: auto
  &__item
    margin-top: 12px
  &__select
    overflow: hidden
    display: flex
    align-items: center
    padding: 8px
    height: 32px
    background: #FFFFFF
    border: 1px solid #C1C9D4
    box-sizing: border-box
    box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.09)
    border-radius: 3px
    &:after
      margin-left: auto
      content: url('../assets/vector-icons/arrow-down.svg')
      width: 8px
      height: 5.2px
    &-label
      font-size: 12px
      font-weight: normal
      line-height: 20px
      color: #6C6E80
</style>
