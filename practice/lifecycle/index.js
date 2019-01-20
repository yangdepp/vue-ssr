import Vue from 'vue'

new Vue({
  el: '#root',
  // template: '<div>{{text}}</div>',
  data: {
    text: 'abc'
  },
  beforeCreate () {
    console.log(this, 'beforeCreate')
  },
  created () {
    console.log(this, 'created')
  },
  beforeMount () {
    console.log(this, 'beforeMount')
  },
  // render()方法,会在beforeMount和mounted
  // 如果有template就会解析成render function
  // 在.vue中都是没有template的，都经过vue-loader处理，直接变成render function
  render (h) {
    console.log('render function invoked')
    return h('div', {}, this.text)
  },
  // 会捕获本组件render的错误
  renderError (h, error) {
    return h('div', {}, error.stack)
  },
  // errorCaptured
  errorCaptured () {
    // 会向上冒泡，并且正式环境可以使用
  },
  mounted () {
    console.log(this, 'mounted')
  },
  // 每次数据更新时，执行beforeUpdate, updated
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  },
  updated () {
    console.log(this, 'updated')
  },
  // 跟keep-alive有关系
  activated () {
    console.log(this, 'activated')
  },
  deactivated () {
    console.log(this, 'deactivated')
  },
  beforeDestroy () {
    console.log(this, 'beforeCreate')
  },
  // 可以销毁实例
  destroyed () {
    console.log(this, 'destroyed')
  }
})
