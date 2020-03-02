<template>
    <div class="swiper-container" :class="kerwinclass">
        <div class="swiper-wrapper">
          <slot></slot>
        </div>
    </div>
</template>

<script>
// 万物皆模块
import Swiper from 'swiper'
// css通过 import引入,css插到页面中
import 'swiper/css/swiper.css'
export default {
  props: ['data', 'kerwinclass'],
  // props: ['data','kerwinclass'],
  mounted () {
    /* eslint-disable no-new */
    new Swiper('.' + (this.kerwinclass ? this.kerwinclass : 'swiper-container'), this.data)
  }
}
</script>

<style lang="scss" scoped>
// *{
//   padding: 0;
//   margin: 0;
// }
// .swiper-container{
//   width: 100%;
//   // height: 200px;
//   background: greenyellow;
// }
</style>
