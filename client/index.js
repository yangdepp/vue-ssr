import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import Vuex from 'vuex'

import './assets/style/global.less'
import createRouter from './config/router'
import createStore from './store/store.js'

Vue.use(VueRouter)
Vue.use(Vuex)
const router = createRouter()
const store = createStore()
// 全局的导航守卫
router.beforeEach((to, from, next) => {
  console.log('before each is invoked')
  next()
  // // 验证一些页面需要登录，就可以强制跳转
  // if (to.fullPath === '/app') {
  //   next('/login')
  // } else {
  //   next()
  // }
})

router.beforeResolve((to, from, next) => {
  console.log('before resolve is invoked')
  next()
})

// 跳转完成后
router.afterEach((to, from) => {
  console.log('after each is invoked')
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
