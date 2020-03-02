<template>
    <div>
       <div class="title">
           <div class="left" @click="handleChangePage('city')">{{cityName}}</div>
           <div class="cine">影院</div>
           <div class="right"><img @click="handleChangePage('/cinema/search')" src="../../img/search.png" alt=""></div>
       </div>
       <div class="select" >
           <div @click="isAreaShow=!isAreaShow" :class="isAreaShow?'actives':''">{{this.current}}</div>
           <div>APP订票</div>
           <div>最近去过</div>
       </div>
       <div class="area" v-show="isAreaShow">
           <ul class="areaa">
               <li :class="data===current?'active':''" @click="handleArea(data)" v-for="data in arealist" :key="data">
                   <!-- <div> -->
                       {{data}}
                   <!-- </div> -->
               </li>
           </ul>
       </div>
       <div class="content" :style="{height:scrollHeight}">
           <ul>
               <cinema-item @click.native="handle(data.cinemaId)" v-for="data in computedDatalist" :key="data.cinemaId" :data="data">

               </cinema-item>
               <!-- <li v-for="data in computedDatalist" :key="data.cinemaId">
                   <h4>{{data.name}}</h4>
                   <p>{{data.address}}</p>
               </li> -->
           </ul>
       </div>
    </div>
</template>
<script>
import cinemaItem from './Cinema/CinemaItem'
import { mapState, mapActions, mapMutations } from 'vuex' // mapState是vuex提供的切割函数
import Vue from 'vue'
import { Toast } from 'vant'
import BetterScroll from 'better-scroll'
Vue.use(Toast)
export default {
  methods: {
    handle (id) {
      // console.log(id)
    },
    handleArea (data) {
      // 改变current值，current值改变，计算属性自动计算一遍
      this.current = data
      this.isAreaShow = false
    },
    handleChangePage (path) {
      if (path === 'city') {
        // 清空共享状态vuex cinemaList
        this.setCinemaList([])
      }
      this.$router.push(path)
      // localStorage.getItem('cityId')
      // localStorage.getItem('cityName')
    },
    ...mapMutations('cinema', ['setCinemaList']),
    ...mapActions('cinema', ['getCinemaAction'])

  },
  beforeMount () {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      overlay: true, // 是否显示背景遮罩层
      duration: 0 // 不会消失
    })
    setTimeout(() => {
      Toast.clear()
    }, 2000)
  },
  components: {
    cinemaItem
  },
  data () {
    return {
    //   datalist: [],
      isAreaShow: false,
      current: '全城', // 选中的是哪个区
      scrollHeight: '0px'
    }
  },
  mounted () {
    this.scrollHeight = document.documentElement.clientHeight - 80 - 50 + 'px'
    // 初始化betterscroll
    /* eslint-disable no-new */
    new BetterScroll('.content', {
      scrollbar: {
        fade: true,
        interactive: false
      },
      click: true // 支持click事件
    })
    // dispatch 到 vuex中action
    if (this.cinemaList.length === 0) {
      // this.$store.dispatch('cinema/getCinemaAction')
      this.getCinemaAction(this.cityId).then(res => {
        // 异步结束
        Toast.clear()
      })
    } else {
      // console.log('使用缓存')
    }

    // http.request({
    //   url: '/gateway?cityId=310100&ticketFlag=1&k=956387',
    //   headers: {
    //     'X-Host': 'mall.film-ticket.cinema.list'
    //   }
    // }).then(res => {
    // //   console.log(res.data.data.cinemas)
    //   this.datalist = res.data.data.cinemas

    // //   var newarr = this.datalist.map(item => item.districtName)
    // //   console.log(newarr)
    // //   console.log(Array.from(new Set(newarr)))
    // })
  },
  computed: {
    ...mapState('cinema', ['cinemaList']),
    ...mapState('city', ['cityName', 'cityId']),
    // 所有区的计算属性
    arealist () {
      //   对象=>映射成里面的某个属性
      var newarr = this.cinemaList.map(item => item.districtName)
      // 利用set结构进行数组去重，Array.from 把类数组结构转换成数组结构
      var arealist = ['全城', ...Array.from(new Set(newarr))]
      return arealist
    },
    // 根据选择的不同区域，过滤出相应区域的影院
    computedDatalist () {
      if (this.current === '全城') return this.cinemaList
      return this.cinemaList.filter(item => item.districtName === this.current)
    }
  }
}
</script>
<style lang="scss" scoped>
.actives{
    color: #ff5f16!important;
}
.active{
    // div{
        border: 1px solid orange!important;
    // }

}
body{
    background: #fff!important;
}
    .title{
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 44px;
        line-height: 44px;
        overflow: hidden;
        margin: 0;
        padding: 0;
        z-index: 3000;
        background-color: #fff;
        .cine{
            text-align: center;
            font-size: 17px;
            color: #191a1b;
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .left{
        width: 15%;
        display: flex;
        justify-content: center;
        font-size: 13px;
    }
    .right{
        width: 15%;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width: 18px;
            height: 18px;
        }
    }
    .select{
            position: fixed;
            height: 44px;
            width: 100%;
            top: 44px;
            right: 0;
            text-align: center;
            background-color: #fff;
            z-index: 2000;
            div{
                float: left;
                width: 33.3%;
                line-height: 44px;
                font-size: 14px;
                color: #191a1b;
            }
    }
    .content{
        position: relative;
        left: 0;
        top: 90px;
        height: 300px;
        overflow: hidden;
    }
    .area{
        position: fixed;
        top: 88px;
        left: 0;
        width: 100%;
        background: #fff;
        z-index: 2000;
        ul{
            display: flex;
            flex-wrap: wrap;
            padding-left: 10px;
            li{
                width: 21%;
                margin-right: 10px;
                box-sizing: border-box;
                text-align: center;
                font-size: 12px;
                padding-left: 0px;
                padding-top: 0px;
                margin-bottom: 15px;
                height: 30px;
                line-height: 30px;
                color: #797d82;
                border-radius: 3px;
                border: 1px solid rgba(210,214,220,.5);
            }
        }
    }
</style>
