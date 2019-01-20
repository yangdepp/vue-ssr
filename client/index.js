import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'

import './assets/style/global.less'
import createRouter from './config/router'
import store from './store/store.js'

Vue.use(VueRouter)
const router = createRouter()

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
