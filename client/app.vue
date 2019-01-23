<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <!-- <p>{{counter}}{{fullName}}</p> -->
    <!-- <todo></todo> -->
    <!-- <router-link to="/app">app</router-link>
    <router-link to="/login">login</router-link> -->
    <!-- 路由过渡动画 -->
    <transition name="fade">
      <router-view/>
    </transition>
    <Footer></Footer>
    <!-- <router-view name="a"/> -->
  </div>
</template>
<script>
// import {
//   // mapState,
//   // mapGetters,
//   // mapActions,
//   // mapMutations
// } from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import todo from './views/todo/todo.vue'
export default {
  data () {
    return {}
  },
  mounted () {
    // 可以打印路由对象，拿到参数等
    // console.log(this.$route)
    // console.log(this.$store, this['a/textPlus'])
    // let i = 1
    // setInterval(() => {
    //   this.$store.commit('updateCount', i++)
    // }, 1000)
    // this.updateCountAsync({
    //   num: 5,
    //   time: 2000
    // })
    // let i = 1
    // setInterval(() => {
    //   this.updateCount(i++)
    // }, 1000)
    // this['a/updateText']('text222')
  },
  computed: {
    // 一般用法
    // count () {
    //   return this.$store.state.count
    // },
    // 同名
    // ...mapState(['count']),
    // 不同名，可用对象接收
    // ...mapState({
    //   counter: 'count'
    // }),
    // 还可以用函数接收
    // ...mapState({
    //   counter: (state) => state.count
    //   // textA: state => state.a.text
    // }),
    // // fullName () {
    // //   return this.$store.getters.fullName
    // // }
    // ...mapGetters({
    //   'fullName': 'fullName'
    //   // 'textPlus': 'a/textPlus'
    // })
    // textA () {
    //   return this.$store.state.b.text
    // }
  },
  methods: {
    // ...mapActions(['updateCountAsync']),
    // ...mapMutations(['updateCount'])
  },
  components: {
    Header,
    Footer
    // todo
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
