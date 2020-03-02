import Vue from 'vue'
import Vuex from 'vuex'
import cinema from './module/cinemaModule'
import tabbar from './module/tabbarshowModule'
import city from './module/cityModule'
import createPersistedState from 'vuex-persistedstate'
// 注册vuex这个插件
Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState({
    reducer (data) {
      return {
        city: data.city
      }
    }
  })], // 持久化的插件
  modules: {
    cinema,
    tabbar,
    city
  }
})
export default store
// 状态管理
// 缓存数据-->内存  只要刷新页面，数据就丢了
// 订单，详情...不适用vuex缓存
// 1.非父子通信的问题
// 2.缓存后端数据，提高用户体验

// 注意：vuex中只能有一个store，
//  为了防止多人修改，我们切割成子store，再合并成唯一的一个大的store对象
// 模块写法
// export default new Vuex.Store({
// 存放公共状态
// state: {
// isTabbarShow: true,
// cinemaList: []
// },
// 唯一修改状态的地方
// mutations: {
// show (state) {
//   console.log('show')
//   state.isTabbarShow = true
// },
// hide (state) {
//   console.log('hide')
//   state.isTabbarShow = false
// },
// setCinemaList (state, data) {
//   console.log('setCinemaList', data)
//   state.cinemaList = data
// }
// },
// 异步处理
// actions: {
// getCinemaAction (store) {
//   http.request({
//     url: '/gateway?cityId=310100&ticketFlag=1&k=956387',
//     headers: {
//       'X-Host': 'mall.film-ticket.cinema.list'
//     }
//   }).then(res => {
//     console.log('影院', res.data)
//     // commit支持传参
//     store.commit('setCinemaList', res.data.data.cinemas)
//     // this.datalist = res.data.data.cinemas

//   //   var newarr = this.datalist.map(item => item.districtName)
//   //   console.log(newarr)
//   //   console.log(Array.from(new Set(newarr)))
//   })
// }
// },
// 对上面的"全局状态"进行处理
// getters: {
// topDatalist (state) {
//   return state.cinemaList.slice(0, 5)
// }
//   },
//   modules: {
//   }
// })
