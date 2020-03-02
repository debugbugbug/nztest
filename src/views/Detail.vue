<template>
  <div v-if="filminfo">
    <!-- <div class="detailtitle" v-title="60">
        <img @click="handleback()" class="imgages" src="../../img/zuojiantou.png" alt="">
        <span>{{filminfo.name}}</span>
    </div>-->
    <m-title v-title="40" @back="handleBack()">{{filminfo.name}}</m-title>
    <div class="film-img">
      <img class="imgage" :src="filminfo.poster" alt />
    </div>
    <div class="film-detail">
      <div class="col">
        <div class="film-name">
          <span class="name">{{filminfo.name}}</span>
          <span class="item">{{filminfo.item.name}}</span>
        </div>
        <div class="film-grade">
          <span class="grade">{{filminfo.grade}}</span>
          <span class="grade-text">分</span>
        </div>
      </div>
      <div class="film-category grey-text">{{filminfo.category}}</div>
      <div class="film-premiere-time grey-text">{{filminfo.premiereAt | premiereAt}}上映</div>
      <div class="film-nation-runtime grey-text">
        <span>{{filminfo.nation}}</span>
        <span>| {{filminfo.runtime}}分钟</span>
      </div>
      <div class="film-synopsis grey-text" :class="isActive?'hidde':''">{{filminfo.synopsis}}</div>
      <div class="toggle">
        <img
          @click="isActive=!isActive"
          :class="isActive?'':'upper'"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAICAMAAADHqI+lAAAAOVBMVEVHcEy9xcW9wMW9wcW////Bwca9wcW9wMW9wMW+wMW+wcW9wcXMzMy+wMa+wce9wMe9wca9wMW9wMWKU/2FAAAAEnRSTlMAH+jGBDa6/vaatcIPdlNSdckJHB8JAAAASUlEQVQIHQXBhwGDMAADMCVksQr4/2MrObYCQNkOZ2oH6DWna2Q9wG9lXLQ984V3Zm/gntlb2zNvgN/KGFkPAL0mtQNA+b4C/AGl4gJfgEWzrAAAAABJRU5ErkJggg=="
          alt
        />
        <!-- <button @click="isActive=!isActive">click</button> -->
      </div>
    </div>
    <div class="actors">
      <div class="actors-title-bar">
        <span class="actors-title-text">演职人员</span>
      </div>
      <div class="swip">
        <swiper
          :data="{
            slidesPerView: 3,
            spaceBetween: 8,
            freeMode: true
          }"
          kerwinclass="actor"
        >
          <div class="swiper-slide" v-for="(data,index) in filminfo.actors" :key="index">
            <img class="img2" :src="data.avatarAddress" alt />
          </div>
        </swiper>
      </div>
    </div>
    <div class="photos">
      <div class="photos-title-bar">
        <span class="photos-title-text">剧照</span>
        <span @click="isPhotoShow=true" class="photos-to-all">全部(4)</span>
      </div>
      <div class="pho">
        <swiper
          :data="{
            slidesPerView: 2,
            spaceBetween: 10,
            freeMode: true
          }"
          kerwinclass="photo"
        >
          <div
            @click="handlePreview(index)"
            class="swiper-slide"
            v-for="(data,index) in filminfo.photos"
            :key="data"
          >
            <img :src="data" alt />
          </div>
        </swiper>
      </div>
    </div>
    <m-photo @event="handlePreview" v-show="isPhotoShow" :list="filminfo.photos">
      <m-title @back="handlePhotoShow">剧照（{{filminfo.photos.length}}）</m-title>
    </m-photo>
  </div>
</template>
<script>
import http from '@/util/http'
import swiper from '@/components/Swiper'
import photo from './Detail/Photo'
import Vue from 'vue'
import { ImagePreview, Dialog } from 'vant'

Vue.use(Dialog)
Vue.use(ImagePreview)
// console.log(moment().format('YYYY/MM/DD'))
export default {
  // filters:{
  //   //局部
  // }，
  components: {
    swiper,
    'm-photo': photo
  },
  methods: {
    handleBack () {
      this.$router.back()
    },
    handlePhotoShow () {
      this.isPhotoShow = false
    },
    handlePreview (index) {
      ImagePreview({
        images: this.filminfo.photos,
        startPosition: index,
        closeable: true,
        closeIconPosition: 'top-left'
      })
    }
  },
  data () {
    return {
      filminfo: null,
      isActive: true,
      isPhotoShow: false
    }
  },
  beforeMount () {
    Dialog.confirm({
      title: '该影片没有排期',
      message: '弹窗内容',
      confirmButtonText: '同意',
      cancelButtonText: '拒绝'
    })
      .then(() => {
        // on confirm
        this.$router.back()
      })
      .catch(() => {
        // on cancel
      })
  },
  mounted () {
    // window.onscroll = () => {
    //   // console.log(document.documentElement.scrollTop)
    //   if (document.documentElement.scrollTop > 40) {
    //     console.log('show')
    //   } else {
    //     console.log('hidden')
    //   }
    // }
    // this.$router 路由对象
    // this.$route 当前唯一匹配的路由对象
    // console.log(this.$route.params.kerwinid, '利用id去请求接口数据')
    http
      .request({
        url: `/gateway?filmId=${this.$route.params.kerwinid}&k=185481`,
        headers: {
          'X-Host': 'mall.film-ticket.film.info'
        }
      })
      .then(res => {
        // console.log(res.data)
        this.filminfo = res.data.data.film
      })
  }
  // destroyed () {
  //   window.onscroll = null
  // }
}
</script>
<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
body {
  background: #f4f4f4;
}
img {
  width: 100%;
}
div {
  box-sizing: border-box;
}
.film-img {
  width: 100%;
}
.imgage {
  width: 100%;
  height: 50%;
  display: block;
}
.film-detail {
  padding: 15px;
  padding-top: 12px;
  background-color: #fff;
}
.col {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.film-name {
  width: 256px;
  display: flex;
  align-items: center;
}
.film-name .name {
  color: #191a1b;
  font-size: 18px;
  height: 24px;
  line-height: 24px;
  margin-right: 7px;
}
.film-name .item {
  font-size: 9px;
  color: #fff;
  background-color: #d2d6dc;
  height: 14px;
  line-height: 14px;
  padding: 0 2px;
  border-radius: 2px;
  display: inline-block;
}
.film-detail .film-grade {
  width: calc(100% - 250px);
  text-align: right;
  color: #ffb232;
}
.grade {
  font-size: 18px;
  font-style: italic;
}
.grade-text {
  font-size: 10px;
}
.grey-text {
  font-size: 13px;
  color: #797d82;
  margin-top: 4px;
}
.film-detail .film-synopsis {
  margin-top: 12px;
}
.film-detail .hidde {
  height: 36px;
  overflow: hidden;
}
.film-detail .toggle img {
  width: 8px;
  margin: auto;
}
.film-detail .toggle {
  text-align: center;
  display: block;
  height: auto;
  width: 20px;
  margin: auto;
  line-height: normal;
}
.film-detail .upper {
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}
.actors {
  margin-top: 10px;
  background-color: #fff;
}
.actors .actors-title-bar {
  width: 100%;
  padding: 15px;
}
.actors .actors-title-bar .actors-title-text {
  font-size: 16px;
  text-align: left;
  color: #191a1b;
}
.swip {
  padding-left: 6px;
}
.photos {
  margin-top: 10px;
  margin-bottom: 60px;
  background-color: #fff;
}
.photos .photos-title-bar {
  height: 62px;
  width: 100%;
  padding: 15px;
}
.photos-title-bar .photos-title-text {
  font-size: 16px;
  text-align: left;
  color: #191a1b;
}
.photos .photos-title-bar span {
  display: inline-block;
  height: 22.5px;
  line-height: 22px;
}
.photos .photos-title-bar .photos-to-all {
  font-size: 13px;
  color: #797d82;
  float: right;
}
.imgages {
  width: 30px;
  height: 30px;
}
// .detailtitle{
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 40px;
//   background: white;
//   text-align: center;
//   line-height: 40px;
//   .imgages{
//     position: absolute;
//     left: 0;
//     top: 6px;
//   }
// }
</style>
