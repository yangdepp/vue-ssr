<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <p>{{count}}</p>
    <!-- <todo></todo> -->
    <router-link to="/app">app</router-link>
    <router-link to="/login">login</router-link>
    <transition name="fade">
      <router-view/>
    </transition>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import todo from './views/todo/todo.vue'
export default {
  props: ['id'],
  data () {
    return {}
  },
  mounted () {
    // 可以打印路由对象，拿到参数等
    // console.log(this.$route)
    // 可以把路由参数传进来，直接打印
    // console.log(this.id)
    console.log(this.$store)
    let i = 1
    setInterval(() => {
      this.$store.commit('updateCount', i++)
    }, 1000)
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  components: {
    Header,
    Footer,
    todo
  }
}
</script>

<style lang="less" scoped>
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
#cover {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #999;
  opacity: 0.7;
  z-index: -1;
}
</style>
