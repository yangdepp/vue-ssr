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

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
