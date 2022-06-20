<template>
  <div>
   <card></card>
   <sale></sale>
   <observe></observe>
  </div>
</template>

<script>
import Observe from './Observe.vue'
import Sale from './Sale.vue'
import Card from './Card.vue'
export default {
  name: 'Dashboard',
  components:{
    Card,
    Sale,
    Observe
  }
 
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
