<template>
  <div>
    <van-index-bar :index-list="indexList">
      <div v-for="(data,index) in datalist" :key="index">
        <van-index-anchor :index="data.index">{{data.index}}</van-index-anchor>
            <van-cell @click="handleClick(item)" v-for="(item,index) in data.list" :key="index" :title="item.name" />
      </div>
    </van-index-bar>
  </div>
</template>
<script>
import Vue from 'vue'
import { IndexBar, IndexAnchor } from 'vant'
import http from '@/util/http'
import { mapMutations } from 'vuex'
Vue.use(IndexBar)
Vue.use(IndexAnchor)
export default {
  data () {
    return {
      indexList: [],
      datalist: []
    }
  },
  mounted () {
    http.request({
      url: '/gateway?k=3563889',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    })
      .then(res => {
        // console.log(res.data.data.cities)
        this.dataFilter(res.data.data.cities)
      })
  },
  methods: {
    dataFilter (cities) {
      var letterArr = []
      for (var i = 65; i < 91; i++) {
        // console.log(i, String.fromCharCode(i))
        letterArr.push(String.fromCharCode(i))
      }
      // console.log(letterArr)
      var cityArr = []
      // filter  遍历26个字母  跟cities数据.pinyin.首字母.大写  进行过滤
      for (var j = 0; j < letterArr.length; j++) {
        // console.log(cities.filter(item => item.pinyin.substring(0, 1).toUpperCase() === letterArr[j]))
        var temparr = cities.filter(item => item.pinyin.substring(0, 1).toUpperCase() === letterArr[j])
        // temparr.length为0（false）不执行后面的
        temparr.length && cityArr.push({
          index: letterArr[j],
          list: temparr
        })
        temparr.length && this.indexList.push(letterArr[j])
      }
      // console.log(cityArr)
      this.datalist = cityArr
    },
    // 点击城市处理函数
    handleClick (item) {
      // console.log(111)
      // 修改vuex共享的城市数据
      this.setCityName(item.name)
      this.setCityId(item.cityId)

      // localStorage
      // localStorage.setItem('cityId', item.cityId)
      // localStorage.setItem('cityName', item.name)

      this.$router.back()
    },
    ...mapMutations('city', ['setCityName', 'setCityId'])
  }
}
</script>
