<template>
  <div class="root">
    <loader v-show="requestCount" />
    <monuments-list />
  </div>
</template>

<script>
import MonumentsList from "@/monuments-list/MonumentsList";
import Loader from './loader/loader'

export default {
  name: 'App',
  components: {
    MonumentsList,
    Loader
  },
  data () {
    return {
      globalConfig: {}
    }
  },
  computed: {
    requestCount () {
      return this.globalConfig.requestCount
    }
  },
  mounted() {
    this.globalConfig = this.$globalConfig
  }
}
</script>

<style lang="sass">
@import './icons.sass'

$grey-light: #000000

body
  background: #F1F3F5
  margin: 0

.root
  height: 100%
  width: 100%
  position: relative
  display: flex
  flex-direction: column
  background: #F1F3F5
  font-family: Rostelecom Basis
  font-style: normal
  font-weight: 500
  color: $grey-light
  &__content
    width: 100%
    height: 100%
    flex-grow: 1

</style>
