<template>
<div>
  <div class="monuments-list">
    <div v-for="monument in monuments" :key="monument.id"
      class="monument">
      <div>
<!--        <embed src="https://okn-mk.mkrf.ru/maps/show/id/131367" style="width:600px; height:500px;"/>-->
<!--        <iframe src="https://okn-mk.mkrf.ru/maps/show/id/131367" style="width:600px; height:500px;" frameborder="0"></iframe>-->
<!--        <img :src="'https://okn-mk.mkrf.ru/maps/show/id/131367'">-->
        <div class="monument__name">{{ monument.name }}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "MonumentsList.vue",
  inject: ['monumentsReceiver'],
  data () {
    return {
      monuments: [],
      pageNum: 1,
      pageItemsAmt: 10
    }
  },
  mounted () {
    this.initMonuments()
  },
  methods : {
    async initMonuments () {
      this.monuments = await this.monumentsReceiver.getMonuments(this.pageItemsAmt, this.pageItemsAmt * this.pageNum)
    }
  }
}
</script>

<style lang="sass">
$white: #FFFFFF

.monuments-list
  padding: 12px 8px 24px 8px
  background: #F1F3F5

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