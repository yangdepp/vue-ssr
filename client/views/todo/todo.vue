<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下去要做什么？"
      @keyup.enter="addTodo"
    >
    <item :todo="todo" v-for="todo in filteredTodos" :key="todo.id" @del="deleteTodo"/>
    <tabs
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clearAllCompleted="clearAllCompleted"
    />
    <!-- <router-view/> -->
  </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0
export default {
  metaInfo: {
    title: 'TODO'
  },
  // beforeRouteEnter (to, from, next) {
  //   console.log('todo before enter')
  //   // 通过vm可以获取数据
  //   next(vm => {
  //     console.log(vm)
  //   })
  // },

  // 同一个组件在不同路由下显示时调用
  // beforeRouteUpdate (to, from, next) {
  //   console.log('todo before update')
  //   next()
  // },

  // beforeRouteLeave (to, from, next) {
  //   console.log('todo before leave')
  //   // 可以控制页面离开的钩子
  //   // if (global.confirm('are you sure')) {
  //   //   next()
  //   // }
  //   next()
  // },

  // props: ['id'],
  data () {
    return {
      todos: [],
      filter: 'all'
    }
  },
  mounted () {
    // 可以把路由参数由props传进来，直接打印
    // console.log(this.id)
  },
  components: {
    Item,
    Tabs
  },
  computed: {
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    addTodo (e) {
      if (!e.target.value.trim()) {
        return
      }
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    deleteTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
}
</script>

<style lang="less" scoped>
.real-app {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}
.add-input {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
</style>


