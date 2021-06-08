<template>
  <div class="geo-map">
    <btn-return
        class="components__return"
        text="Достопримечательности"
        @returned="toPrevious" />
    <yandex-map
        class="geo-map__ymap"
        :settings="settings"
        :coords="centerCoords"
        :zoom="zoom"
        :cluster-options="clusterOptions">
      <ymap-marker
          v-for="(monument, key) in monuments" :key="key"
          :marker-id="key"
          :coords="getCoords(monument)"
          cluster-name="1">
        <template slot="balloon">
          <span @click="monumentClicked(monument)">{{ monuments.name }}</span>
        </template>
      </ymap-marker>
    </yandex-map>
  </div>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'

import BtnReturn from '../shared/btn-return'
import {Monument} from "@/models/Monument";

export default {
  components: { yandexMap, ymapMarker, BtnReturn },
  inject: ['monumentsReceiver'],
  name: "geo-map",
  props: {
    apiFilterStr: String
  },
  data () {
    return {
      monuments: Array,
      settings: {
        apiKey: 'b75bd140-fe4f-4d15-a14a-148a823669e8\n',
        lang: 'ru_RU',
        coordorder: 'latlong',
        version: '2.1'
      },
      clusterOptions: {
        '1': {
          clusterDisableClickZoom: true,
          clusterOpenBalloonOnClick: true,
        }
      }
    }
  },
  computed: {
    centerCoords () {
      if (!this.monuments?.[0]){
        return [66.41747258078992, 94.25025752215694]
      }
      const coords = this.getCoords(this.monuments?.[0])
      return coords.map(c => (parseInt(c * 100)) / 100)
    },
    zoom () {
      return this.apiFilterStr ? 11 : 4
    }
  },
  async mounted () {
    this.monuments = await this.initMonuments()
  },
  methods: {
    monumentClicked (monument) {
      console.log('monument clicked')
      this.$emit('monument-selected', monument)
    },
    async initMonuments () {
      if (!this.apiFilterStr) {
        return []
      }
      return await this.monumentsReceiver.getMonuments(0, 0, this.apiFilterStr)
    },
    getCoords (monument) {
      let coords = monument?.address?.mapPosition?.coordinates
      if (!coords?.length) {
        return [0, 0]
      }
      return [coords[0], coords[1]].sort((a, b) => b - a)
    },
    toPrevious () {
      this.$emit('returned')
    },
  }
}
</script>

<style lang="sass">
.geo-map
  padding-top: 10px
  width: 100%
  height: 94vh
  &__ymap
    margin-top: 10px

.ymap-container
  height: 100%

</style>