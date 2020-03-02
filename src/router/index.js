import Vue from 'vue'
import VueRouter from 'vue-router' // 路由核心模块
import Film from '@/views/Film'
// import Cinema from '@/views/Cinema'
import Center from '@/views/Center'
import ErrorComponent from '@/views/ErrorComponent'
import Nowplaying from '@/views/Film/Nowplaying'
import Comingsoon from '@/views/Film/Comingsoon'
import Detail from '@/views/Detail'
import Login from '@/views/Login'
import Search from '@/views/Search'
import City from '@/views/City'
Vue.use(VueRouter) // 注册路由插件

// 路由映射表
const routes = [
  {
    path: '/film',
    component: Film,
    children: [
      {
        path: '/film/nowplaying',
        component: Nowplaying
      },
      {
        path: '/film/comingsoon',
        component: Comingsoon
      },
      {
        path: '/film',
        redirect: '/film/nowplaying'
      }
    ]
  },
  {
    path: '/film/nowplaying/detail',
    component: Detail,
    redirect: '/film/detail'
  },
  {
    path: '/cinema',
    // component: Cinema
    component: () => import(/* webpackChunkName:'kerwincinema' */'@/views/Cinema') // webpack 代码分割
  },
  {
    path: '/center',
    component: Center
  },
  {
    path: '/cinema/search',
    component: Search
  },
  {
    path: '/city',
    component: City
  },
  {
    path: '/detail/:kerwinid', // kerwinid为占位符，前面的:不能删掉
    component: Detail
  },
  {
    path: '/login',
    component: Login
  },

  {
    path: '/',
    redirect: '/film'
  },
  {
    path: '*',
    component: ErrorComponent
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

// 配置全局路由守卫（拦截）

// router.beforeEach((to, from, next) => {
//   // to and from are both route objects. must call `next`.
//   console.log(to) // 跳转的是center才拦截
//   if (to.path === '/center') {
//     // console.log('被拦截了')
//     if (localStorage.getItem('token')) {
//       next()
//     } else {
//       // 重定向到login页面
//       next('/login')
//     }
//   } else {
//     next()
//   }
// })
export default router
