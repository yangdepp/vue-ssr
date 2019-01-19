import Vue from 'vue'

const app = new Vue({
  //  挂载的地方
  // el: '#root',
  template: '<div ref="div">{{text}}</div>',
  data: {
    text: 0
  }
})
app.$mount('#root')

// app.text = 'text1'

setInterval(() => {
  // app.text += 1
  // 通过app.$options.data修改data的值，是没有变化的
  // 说明传入的options在init vue实例时，做过修改，不是同一个对象
  // app.$options.data.text += 1
  // 直接修改$data上的text，是会生效的，说明视图中的和data中的对象是同一个，双向绑定
  // app.$data.text += 1
}, 1000)

// console.log(app.$data)
// console.log(app.$props)
// console.log(app.$el)
// console.log(app.$options)
// 此时把app.text += 1取消注释，一秒后触发render时，会调下面的函数
// 说明给render方法赋值有作用，只是要等到下一次render时才会生效
// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }
// $root是vue的一个实例，vue是一个树状结构往下渲染的，有一个最上层的根节点，这个根节点就是new的app
// console.log(app.$root === app)
// 在使用组件时，子组件
// console.log(app.$children)
// 插槽
// console.log(app.$slots)
// console.log(app.$scopedSlots)
// 可以快速的定位模板某一个组件和节点，如果是html节点，就返回html对象，如果是组件，就返回组件实例
// console.log(app.$refs)
// 服务端渲染时，才会做判断
// console.log(app.$isServer)
