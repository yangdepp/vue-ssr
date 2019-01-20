import Vue from 'vue'

const component = {
  props: {
    active: {
      type: Boolean
      // required: true
    },
    propOne: String
  },

  template: `
    <div>
      <p>{{text}}</p>
      <span v-if="active">see me if active</span>
      <p>{{propOne}}</p>
    </div>
  `,
  // 如果组件不是通过new出来的，必须使用data function,并且return
  data () {
    return {
      text: 'This is a component'
    }
  }
}
const CompVue = Vue.extend(component)

new CompVue({
  el: '#root',
  // 可以传入一个data
  propsData: {
    propOne: '123',
    active: true
  }
})
