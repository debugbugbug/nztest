import Vue from 'vue' // es6中模块化规范 引入
import App from './App.vue'
import router from './router'
import store from './store'
// import store from './store'
import '@/util/filter' // 引入全局过滤器
import '@/util/directive' // 引入指令
import '@/util/component' // 引入组件

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App) // 把App组件渲染到app div上
}).$mount('#app')

// $mount  vue另一种写法，直接把实例挂载到app节点上
// 直接把组件都渲染完，然后挂载到节点上
