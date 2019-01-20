import Vue from 'vue'

const component = {
  props: {
    active: Boolean,
    // 验证
    active1: {
      validator (value) {
        return typeof value === 'boolean'
      }
    }
  },
  template: `
    <div>
      <p>{{text}}</p>
      <span v-if="active">see me if active</span>
    </div>
  `,
  // 如果组件不是通过new出来的，必须使用data function,并且return
  data () {
    return {
      text: 'This is a component'
    }
  }
}

// Vue.component('CompOne', component)

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  template: `
    <div>
      <comp-one :active="true" :active1="true"></comp-one>
    </div>`,
  data: {
  },
  methods: {
  }
})
