<template>
  <div class="monuments">
    <div v-if="!isFilterView">
      <div class="monuments__header">
      <span
        class="btn-filter"
        @click="openFilter" />
        <span class="btn-map"/>
      </div>
      <div class="monuments__search-container">
        <div class="monuments__search">
          <input
            type="text"
            class="input monuments__search-input">
        </div>
      </div>
      <div v-for="monument in monuments" :key="monument.id"
           class="monument">
        <div>
          <!--        <embed src="https://okn-mk.mkrf.ru/maps/show/id/131367" style="width:600px; height:500px;"/>-->
          <!--        <iframe src="https://okn-mk.mkrf.ru/maps/show/id/131367" style="width:600px; height:500px;" frameborder="0"></iframe>-->
          <!--        <img :src="'https://okn-mk.mkrf.ru/maps/show/id/131367'">-->
          <div class="monument__name">{{ monument.name }}</div>
        </div>
      </div>
      <div class="monuments__pagination">
        <button class="monuments__pagination-btn" @click="swapPrevPage">Назад<span class="monuments__pagination-arrow"></span></button>
        <span class="monuments__pagination-number">{{ pageNum }}</span>
        <button class="monuments__pagination-btn" @click="swapNextPage">Вперед<span class="monuments__pagination-arrow"></span></button>
      </div>
    </div>
    <filtering-form
      v-if="isFilterView"
      :filters="filters"
      :filter-values="filterValues"
      @returned="closeFilter"
      @submitted="filterOptions"
      @rejected="dropFilters" />
  </div>
</template>

<script>
import FilteringForm from '../shared/filtering-form'

export default {
  name: "MonumentsList.vue",
  inject: ['monumentsReceiver'],
  components: {
    FilteringForm
  },
  data () {
    return {
      monuments: [],
      pageNum: 1,
      pageItemsAmt: 12,
      isFilterView: false,
      filters: [],
      filterValues: {},
    }
  },
  mounted () {
    this.initMonuments()
  },
  methods : {
    openFilter () {
      this.isFilterView = true
    },
    swapNextPage () {
      this.incrPageNum()
      this.initMonuments()
    },
    swapPrevPage () {
      this.decrPageNum()
      this.initMonuments()
    },
    decrPageNum () {
      this.pageNum -= this.pageNum === 1 ? 0 : 1
    },
    incrPageNum () {
      this.pageNum ++
    },
    filterOptions (filterValues) {
      this.filterValues = filterValues
      // this.filteredOptions = launchFiltering(this.options, this.filters, filterValues)
      this.closeFilter()
    },
    dropFilters () {
      this.filterValues = {}
      this.closeFilter()
    },
    closeFilter () {
      this.isFilterView = false
    },
    async initMonuments () {
      this.monuments = await this.monumentsReceiver.getMonuments(this.pageItemsAmt, this.pageItemsAmt * this.pageNum)
    }
  }
}
</script>

<style lang="sass">
$white: #FFFFFF

.monuments
  padding: 12px 8px 0px 8px
  background: #F1F3F5
  display: flex
  flex-direction: column
  flex-grow: 1
  height: 100%
  &__search
    display: flex
    flex-grow: 1
    font-size: 13px
    line-height: 19px
    &-container
      position: relative
      display: flex
      justify-content: space-between
      align-items: center
      padding-bottom: 10px
    &-input
      padding: 0 6px 0 27px
      height: 35px
      flex-grow: 1
    &:before
      display: flex
      align-items: center
      justify-content: center
      width: 14px
      height: 20px
      top: 8px
      left: 8px
      position: absolute
      content: url('../assets/vector-icons/loupe.svg')
  &__header
    display: flex
    justify-content: space-between
    padding-bottom: 10px
  &__pagination
    flex-grow: 1
    display: flex
    frex-direction: column
    justify-content: space-between
    align-items: center
    padding: 10px 0
    max-height: 37px
    &-btn
      display: flex
      padding: 10px
      border: 1px solid black
      border-radius: 10%
      position: relative
      &:active
        opacity: 0.5
    &-number
      border: 1px solid black
      padding: 5px 10px
      font-weight: normal
      font-size: 14px
.monument
  display: flex
  padding: 3px 8px
  background: $white
  box-shadow: 0px 2px 5px rgba(108, 110, 128, 0.1)
  border-radius: 3px 3px 0px 0px
  margin-bottom: 1px
  flex-grow: 1
  &__name
    padding: 10px 0px
    min-height: 20px

</style>