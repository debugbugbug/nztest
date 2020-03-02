<template>
  <div>
    <div class="query">
      <!-- <input type="text" v-model="mytext">
      <button @click="handleChangepage()">取消</button>-->
      <van-search
        v-model="mytext"
        show-action
        placeholder="请输入搜索关键词"
        @cancel="onCancel"
      />
      <div v-show="mytext">
        <ul v-if="searchList.length">
          <!-- <li v-for="data in searchList" :key="data.cinemaId">
            {{data.name}}
          </li>-->
          <cinema-item v-for="data in searchList" :key="data.cinemaId" :data="data"></cinema-item>
        </ul>
        <div v-else>没有匹配到</div>
      </div>
    </div>
    <!-- mytext为空false显示，true不为空隐藏 -->
    <!-- <div class="distance" v-show="!mytext">
      <ul>
        <li v-for="(data,index) in topDatalist" :key="index">{{data.name}}</li>
      </ul>
    </div> -->
    <van-list v-show="!mytext">
      <van-cell v-for="(data,index) in topDatalist" :key="index" :title="data.name" />
    </van-list>
  </div>
</template>
<script>
import cinemaItem from './Cinema/CinemaItem'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Vue from 'vue'
import { Search, List, Cell } from 'vant'

Vue.use(Search)
Vue.use(List)
Vue.use(Cell)
export default {
  data () {
    return {
      mytext: ''
    }
  },
  components: {
    cinemaItem
  },
  methods: {
    onCancel () {
      this.$router.back()
    },
    // 把tabbar命名空间的hide和show方法截出
    ...mapMutations('tabbar', ['hide', 'show']),
    ...mapActions('cinema', ['getCinemaAction'])
  },
  mounted () {
    // console.log('mounted')
    // console.log(this.$store.state.cinemaList)
    // this.$store.state.isTabbarShow = false
    // 同步状态  -提交到mutation
    // this.$store.commit('tabbar/hide')
    this.hide()
    // 异步请求
    if (this.cinemaList.length === 0) {
      // this.$store.dispatch('cinema/getCinemaAction')
      this.getCinemaAction()
    } else {
      // console.log('使用缓存')
    }
  },
  destroyed () {
    // console.log('destroyed')
    // this.$store.state.isTabbarShow = true
    // this.$store.commit('tabbar/show')
    this.show()
  },
  computed: {
    ...mapState('cinema', ['cinemaList']),
    ...mapGetters('cinema', ['topDatalist']),
    // topDatalist () {
    //   return this.$store.state.cinemaList.slice(0, 5)
    // },
    searchList () {
      return this.cinemaList.filter(
        item =>
          item.name.includes(this.mytext) ||
          item.name.toUpperCase().includes(this.mytext) ||
          item.name.toLowerCase().includes(this.mytext)
      )
    }
  }
}
</script>
