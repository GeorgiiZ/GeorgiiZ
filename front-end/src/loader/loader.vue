<template>
  <div class="loader">
    <div class="loader_line" />
  </div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style lang="sass">
.loader
  position: fixed
  top: 0
  left: 0
  overflow: hidden
  width: 100%
  height: 6px
  z-index: 55
  background: #C3ACE5
  .loader_line
    position: absolute
    width: 70%
    height: 6px
    left: -68%
    top: 0
    background: linear-gradient(90deg, rgba(120, 0, 255, 0) 0%, #7800FF 49.02%, rgba(120, 0, 255, 0) 100%)
    animation: doLeft 1s linear infinite
    animation-delay: .5s

@keyframes doLeft
  0%
    left: -34%
  100%
    left: 100%
</style>
