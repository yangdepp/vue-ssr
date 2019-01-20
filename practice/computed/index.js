import Vue from 'vue'
new Vue({
  el: '#root',
  template: `
    <div>
      <p>Name: {{name}}</p>
      <p>Name: {{getName()}}</p>
      <p>Number: {{number}}</p>
      <p>FullName: {{fullName}}</p>
      <p>lastName: {{lastName}}</p>
      <p>
        <input type="text" v-model="number"/>
      </p>
      <p>
        firstName:<input type="text" v-model="firstName"/>
      </p>
      <p>
        lastName:<input type="text" v-model="lastName"/>
      </p>
      <p>
        name:<input type="text" v-model="name"/>
      </p>
      <p>
        obj.a:<input type="text" v-model="obj.a"/>
      </p>
    </div>
  `,
  data: {
    firstName: 'Jokcy',
    lastName: 'Lou',
    number: 0,
    fullName: '',
    obj: {
      a: '123'
    }
  },
  // 重新渲染时不会调用，没有缓存
  // 只有返回的值发生变化时，才会重新计算
  computed: {
    name: {
      get () {
        console.log('new name')
        return `${this.firstName} ${this.lastName}`
      },
      // 一般不要用set
      set (name) {
        const names = name.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    }
  },
  // watch方法默认最初绑定时是不会执行的，只有在值发生变化时才会发生
  // 主要应用场景是，监听到某一数据变化，向后台发送数据
  watch: {
    firstName (newName, oldName) {
      this.fullName = newName + ' ' + this.lastName
    },
    lastName: {
      handler (newVal, oldVal) {
        this.lastName = newVal
      },
      immediate: true
    },
    obj: {
      handler () {
        console.log('obj.a changed')
      },
      immediate: true,
      // 对象默认只监听引用的变化，所以加上deep
      // 也可以用下面的方式
      deep: true
    }
    // 'obj.a': {
    //   handler () {
    //     console.log('obj.a changed')
    //   },
    //   immediate: true
    // }
  },
  methods: {
    getName () {
      console.log('get name invoked')
      return `${this.firstName} ${this.lastName}`
    }
  }
})
