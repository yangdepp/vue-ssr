import Router from 'vue-router'

import routes from './routes'

export default () => {
  return new Router({
    routes,
    mode: 'history',
    // 所有的路径都在这个之上
    // base: '/base/'
    // 匹配
    linkActiveClass: 'active-link',
    // 精确匹配
    linkExactActiveClass: 'exact-active-link',
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return {x: 0, y: 0}
      }
    }
    // url后面跟着的参数，字符串转成JSON Object
    // parseQuery (query) {

    // },
    // stringifyQuery (obj) {

    // }
  })
}
