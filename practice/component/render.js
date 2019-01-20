import Vue from 'vue'

const ChildComponent = {
  template: `<div>Child component:{{data.value}}</div>`,
  inject: ['grandPa', 'data'],
  mounted () {
    // 可以用$parent.$options访问父组件的name等
    console.log(this.$parent.$options.name)
    // 通过父级提供一个provide，子组件inject，可以拿到父级实例对象
    console.log(this.grandPa)
  }
}

const component = {
  name: 'comp',
  components: {
    ChildComponent
  },
  template: `
  <div :style="style">
    <slot></slot>
  </div>
`,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: 'slot vule 456'
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  // 默认不提供reactive特性，即父组件改变，子组件不会跟着改变
  provide () {
    const data = {}
    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true
    })
    return {
      grandPa: this,
      data
    }
  },
  el: '#root',
  data () {
    return {
      value: '123'
    }
  },
  mounted () {
    // console.log(this.$refs.comp, this.$refs.span)
  },
  // template: `
  //   <div>
  //     <comp-one ref="comp">
  //       <span ref="span">{{value}}</span>
  //     </comp-one>
  //   </div>
  // `,
  render (createElement) {
    return createElement(
      'comp-one',
      {
        ref: 'comp'
      },
      [
        createElement('span', {
          ref: 'span'
        }, this.value)
      ]
    )
  }
})
