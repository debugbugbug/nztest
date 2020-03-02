<template>
    <nav class="navv">
       <ul>
            <!-- <router-link to="/film" tag="li" activeClass="kerwin">电影</router-link>
            <router-link to="/cinema" tag="li" activeClass="kerwin">影院</router-link>
            <router-link to="/center" tag="li" activeClass="kerwin">我的</router-link> -->
            <router-link v-for="(data,index) in datalist" :to="data.link" :key="index" tag="li" activeClass="kerwin">
            <i class="iconfont" :class="data.icon"></i>
            <span>{{data.nm}}</span>
            </router-link>
            <!-- 作业一：v-for -->
        </ul>
    </nav>
</template>
<script>
export default {
  data () {
    return {
      datalist: [
        {
          link: '/film',
          nm: '电影',
          icon: 'icon-dianying'
        },
        {
          link: '/cinema',
          nm: '影院',
          icon: 'icon-yingyuan'
        },
        {
          link: '/center',
          nm: '我的',
          icon: 'icon-wode'
        }
      ]
    }
  }
}
</script>
<style lang="scss">
   .kerwin{
       color: orange
   }
   .navv{
       z-index:10;
       position: fixed;
       left: 0px;
       bottom: 0px;
       width: 100%;
       height: 50px;
       background: white;
       ul{
           display: flex;
           li{
               flex: 1;
               line-height: 20px;
               text-align: center;
               display: flex;
               flex-direction: column;
           }
       }
   }

</style>
