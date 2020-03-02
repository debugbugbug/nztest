<template>
    <div>
      <swiper :key="looplist.length">
        <div class="swiper-slide" v-for="data in looplist" :key="data.bannerId">
          <img class="imgs" :src="data.imgUrl">
        </div>
      </swiper>
    <div>
      <ul class="ul">
        <router-link to="/film/nowplaying" tag="li" activeClass="kerwins" class="lii">正在热映</router-link>
        <router-link to="/film/comingsoon" tag="li" activeClass="kerwins" class="lii">即将上线</router-link>
      </ul>
    </div>
    <!-- <div @click="handleClick()" class="aa">正在热映</div>
    <div @click="handleClick1()" class="aa">即将上线</div> -->
       <!-- 路由容器 -->
    <router-view></router-view>
    </div>
</template>
<script>
import swiper from '@/components/Swiper'
import http from '@/util/http'
import { mapState } from 'vuex'
// import Vue from 'vue'
// Vue.component('swiper', swiper)
export default {
  components: {
    swiper
  },
  data () {
    return {
      looplist: []
    }
  },
  computed: {
    ...mapState('city', ['cityId'])
  },
  mounted () {
    http.request({
      url: `/gateway?type=2&cityId=${this.cityId}&k=611590`,
      headers: {
        'X-Host': 'mall.cfg.common-banner'
      }
    }).then(res => {
      // console.log(res.data.data)
      // var obj = {
      //   bannerId: 2222222222,
      //   imgUrl: 'https://static.maizuo.com/pc/v5/usr/movie/f046c5d6b2c397a8194ab14dc439d7dd.jpg?x-oss-process=image/quality,Q_70'
      // }
      // this.looplist = [...res.data.data, obj]
      if (res.data.data) {
        this.looplist = res.data.data
      }
    })
    // axios({
    //   url: 'https://m.maizuo.com/gateway?type=2&cityId=310100&k=611590',
    //   headers: {
    //     'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1581587558193273528990","bc":"310100"}',
    //     'X-Host': 'mall.cfg.common-banner'
    //   }
    // }).then(res => {
    //   console.log(res.data)
    // })
  },
  methods: {
    handleClick () {
      this.$router.push('/film/nowplaying')
    },
    handleClick1 () {
      this.$router.push('/film/comingsoon')
    }
  }
}
</script>
<style lang="scss">
 .imgs{
  width: 100%;
  // height: 100%;
}
 .aa{
     width: 50%;
     height: 50px;
     float: left;
     text-align: center;
     line-height: 50px;
 }
 .kerwins{
     color: orange;
 }
 .ul{
     display: flex;
    .lii{
        flex:1;
     width: 50%;
     height: 50px;
     text-align: center;
     line-height: 50px;
 }
 }

</style>
