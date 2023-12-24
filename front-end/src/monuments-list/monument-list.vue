<template>
  <div class="monuments-container">
    <div class="monuments" v-if="isCurrentView">
      <div class="monuments__header">
      <span
        class="btn-filter"
        @click="openFilter" />
        <span @click="openGeoMap" class="btn-map"/>
      </div>
      <div class="monuments__search-container">
        <div class="monuments__search">
          <input
            type="text"
            class="input monuments__search-input">
        </div>
      </div>
      <div class="monuments__list">
        <div v-for="monument in monuments" :key="monument.id"
             class="monument"
             @click="openMonument(monument)">
          <div>
            <div class="monument__name">{{ monument.name }}</div>
          </div>
        </div>
      </div>
      <div class="monuments__pagination">
        <button class="btn-purple" @click="swapPrevPage" :disabled="pageNum === 1">Назад<span class="monuments__pagination-arrow"></span></button>
        <span class="monuments__pagination-number">{{ pageNum }}</span>
        <button class="btn-purple" @click="swapNextPage" :disabled="!monuments.length">Вперед<span class="monuments__pagination-arrow"></span></button>
      </div>
    </div>
    <monument-page
      v-if="isMonumentPage"
      :monument="selectedMonument"
      @returned="toCurrentView" />
    <geo-map
        v-if="isGeoMapView"
        :apiFilterStr="apiFilterStr"
        @returned="toCurrentView"/>
    <filtering-form
      v-if="isFilterView"
      :filters="filters"
      @returned="closeFilter"
      @submitted="filterOptions"
      @rejected="dropFilters" />
  </div>
</template>

<script>
import FilteringForm from '../shared/filtering-form'
import { FiltersBuilder } from '../services/filtering/FiltersBuilder'
import MonumentPage from './monument-page'
import GeoMap from "../geo-map/geo-map";
import {compareFn} from "@/shared/utils";

export default {
  name: "MonumentsList.vue",
  inject: ['monumentsReceiver'],
  components: {
    GeoMap,
    MonumentPage,
    FilteringForm
  },
  data () {
    return {
      monuments: [],
      geographies: [],
      pageNum: 1,
      pageItemsAmt: 12,
      apiFilterStr: '',
      isFilterView: false,
      isMonumentPage: false,
      isGeoMapView: false,
      filters: [],
      selectedMonument: {}
    }
  },
  computed: {
    isCurrentView () {
      return !this.isFilterView && !this.isMonumentPage && !this.isGeoMapView
    }
  },
  async mounted () {
    await this.initGeographies()
    await this.initMonuments()
    this.buildFilters()
  },
  methods : {
    openGeoMap () {
      this.isGeoMapView = true
    },
    toCurrentView () {
      this.isFilterView = false
      this.isMonumentPage = false
      this.isGeoMapView = false
    },
    openMonument (monument) {
      this.selectedMonument = monument
      this.isMonumentPage = true
    },
    async initGeographies () {
      this.geographies = await this.monumentsReceiver.getGeographies()
    },
    openFilter () {
      this.isFilterView = true
    },
    buildFilters () {
      this.filters = new FiltersBuilder()
        .setSubject([])
        .buildGeographyFilter(this.geographies.sort((a, b) => compareFn(a.region, b.region)))
        .getResult()
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
      this.pageNum += this.monuments.length ? 1 : 0
    },
    filterOptions () {
      this.apiFilterStr = this.filters.reduce((acc, cur) => acc + '&' + cur.getAPIFilter(), '')
      this.dropFilters()
      this.initMonuments()
      this.pageNum = 1
    },
    dropFilters () {
      this.pageNum = 1
      this.closeFilter()
    },
    closeFilter () {
      this.isFilterView = false
    },
    async initMonuments () {
      this.monuments = await this.monumentsReceiver.getMonuments(this.pageItemsAmt, this.pageItemsAmt * (this.pageNum - 1), this.apiFilterStr)
    }
  }
}
</script>

<style lang="sass">
$white: #FFFFFF

.monuments-container
  background: #F1F3F5
  display: flex
  flex-direction: column
  height: 100%
  flex-grow: 1
.monuments
  display: flex
  flex-direction: column
  flex-grow: 1
  padding: 12px 8px 0px 8px
  &__list
    flex-grow: 1
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
      border: 1px solid white
      background: #885ACB
      padding: 5px 10px
      font-size: 14px
      color: #FFFFFF
      text-transform: uppercase
      font-style: normal
      font-weight: 500
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