import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div @click="handleClick">
      {{isActive ? 'active' : 'not active'}}
      <p v-html="html"></p>
    </div>`,
  data: {
    isActive: false,
    html: '<span>123</span>'
  },
  methods: {
    handleClick () {
      alert('clicked')  // eslint-disable-line
    }
  }
})
