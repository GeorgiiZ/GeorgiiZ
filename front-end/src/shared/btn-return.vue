<template>
  <div>
    <span
      class="return-control"
      @click="$emit('returned')">
      <span class="return-control__btn btn-return" />
      <span class="return-control__text">{{ text }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'BtnReturn',
  props: {
    text: String
  }
}
</script>

<style lang="sass">

.return-control
  flex-grow: 1
  display: flex
  align-items: center
  color: #6C6E80
  &__text
    margin-left: 5px
    font-size: 14px
    line-height: 18px
  &__btn
    padding-top: 5px

</style>
