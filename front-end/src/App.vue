<template>
  <div class="root">
    <monuments-list />
  </div>
</template>

<script>
import MonumentsList from "@/monuments-list/MonumentsList";

export default {
  name: 'App',
  components: {
    MonumentsList
  },
  mounted() {
  }
}
</script>

<style lang="sass">
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
