import http from '@/util/http'

const module = {
  namespaced: true, // 命名空间
  state: {
    cinemaList: []
  },
  actions: {
    getCinemaAction (store, id) {
      http.request({
        url: `/gateway?cityId=${id}&ticketFlag=1&k=956387`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        console.log('影院', res.data)
        // commit支持传参
        store.commit('setCinemaList', res.data.data.cinemas)
        // this.datalist = res.data.data.cinemas

        //   var newarr = this.datalist.map(item => item.districtName)
        //   console.log(newarr)
        //   console.log(Array.from(new Set(newarr)))
      })
    }
  },
  mutations: {
    setCinemaList (state, data) {
      console.log('setCinemaList', data)
      state.cinemaList = data
    }
  },
  getters: {
    topDatalist (state) {
      return state.cinemaList.slice(0, 5)
    }
  }
}

export default module
