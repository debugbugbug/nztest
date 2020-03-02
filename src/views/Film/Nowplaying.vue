<template>
  <div>
    <!-- nowplaying  取回真数据（作业2） -->
    <ul class="navb">
      <li class="lil" v-for="data in datalist" :key="data.filmId" @click="handleClick(data.filmId)">
        <div class="left">
          <img class="img1" :src="data.poster" alt />
        </div>
        <div class="right">
          <p class="text">
            <span class="txt">{{data.name}}</span>
            <span class="txt2">{{data.item.name}}</span>
          </p>
          <p>
            <span class="txt1">观众评分</span>
            <span class="gra">{{data.grade}}</span>
          </p>
          <p class="txt1">
            <span>主演：</span>
            {{data.actors | filterActor}}
          </p>
          <p class="txt1">{{data.nation}} | {{data.runtime}}分钟</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import http from '@/util/http'
import { mapState } from 'vuex'
export default {
  // a 声明式 导航
  // location.href 编程式导航
  data () {
    return {
      datalist: []
    }
  },
  computed: {
    ...mapState('city', ['cityId'])
  },
  methods: {
    handleClick (id) {
      // 作业3 自己创建detail组件，配置好路由，跳转detail
      this.$router.push(`/detail/${id}`)
    }
  },
  mounted () {
    // axios({
    //   url: 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=9340529',
    //   method: 'get',
    //   headers: {
    //     'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1581587558193273528990","bc":"110100"}',
    //     'X-Host': 'mall.film-ticket.film.list'
    //   }
    // }).then(res => {
    //   console.log(res.data.data.films)
    //   this.datalist = res.data.data.films
    // })
    http
      .request({
        url:
          `https://m.maizuo.com/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=4188295`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      })
      .then(res => {
        // console.log(res.data)
        this.datalist = res.data.data.films
      })
  }
}
// 作业4 调研：如何实现重定向？ 如何带着参数跳转到detail页面
</script>
<style lang="scss">
  li{
  overflow: hidden;
  padding: 5px;
  padding-left: 15px;
  img{
    float: left;
    width: 70px;
    height: 100px;
    display: block;
    margin-right: 15px;
  }
}
</style>
