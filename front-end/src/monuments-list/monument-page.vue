<template>
  <div class="monument-page">
    <btn-return
        class="components__return"
        text="Достопримечательности"
        @returned="toPrevious" />
    <div class="monument-page__main">
      <span class="monument-page__name">{{ monument.name }}</span>
      <div  :class="{'expanded': isImgExpanded}">
        <span class="editable-property__value" @click="toggleImgExpander()">Изображение</span>
      </div>
      <embed class="monument-page__img" v-if="isImgExpanded" :src="monument.photo" style="width:100%; height:100%;"/>
      <div class="monument-page__property"
          v-for="(property, key) in monumentProperties" :key="key">
        <span class="monument-page__property-name">{{ property.name }}: </span>
        <span class="monument-page__property-value">
          {{ property.value }}
        </span>
      </div>
    </div>
  </div>  
</template>

<script>
import  BtnReturn from '../shared/btn-return'
import { Monument } from "@/models/Monument";

export default {
  inject: ['monumentsReceiver', 'monumentsMapper'],
  props: {
    monument: Monument
  },
  name: "monument-page",
  data () {
    return {
      monumentExtended: {},
      isImgExpanded: true
    }
  },
  components: {
    BtnReturn
  },
  computed: {
    monumentProperties () {
      return this.monumentsMapper.formProperties(this.monumentExtended).filter(x => x.value)
    }
  },
  async created () {
    this.monumentExtended = await this.monumentsReceiver.getMonument(this.monument.id)
  },
  methods: {
    toPrevious () {
      this.$emit('returned')
    },
    toggleImgExpander () {
      this.isImgExpanded = !this.isImgExpanded
    }
  }
}
</script>

<style lang="sass">

.monument-page
  display: flex
  flex-direction: column
  flex-grow: 1
  padding: 12px 8px 32px 8px
  &__img
    flex-grow: 1
  &__name
    display: flex
    font-size: 16px
    line-height: 20px
    margin-bottom: 10px
  &__main
    flex-grow: 1
    margin-top: 10px
    display: flex
    flex-direction: column
    padding: 8px
    margin-bottom: 4px
    background: linear-gradient(0deg, rgba(92, 90, 203, 0.06), rgba(92, 90, 203, 0.06)), #F7F4FF
    box-shadow: 0px 2px 5px rgba(108, 110, 128, 0.2)
    border-radius: 3px
  &__property
    display: flex
    align-items: center
    padding: 7px 0
    &-name
      color: #6C6E80
      font-weight: normal
      font-size: 12px
      line-height: 15px
    &-value
      margin-left: 5px
      color: #000000
      font-weight: normal
      font-size: 14px
      line-height: 18px

.editable-property
  &__value
    display: flex
    align-items: center
    color: #885ACB
    font-size: 14px
    line-height: 18px
    &:after
      margin-left: 5px
      content: ''
      width: 0
      height: 0
      border-left: 5px solid transparent
      border-right: 5px solid transparent
      border-top: 5px solid #885ACB

.expanded
  .editable-property__value
    &:after
      transform: rotate(180deg)

</style>