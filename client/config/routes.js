import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    // path: '/app/:id',
    // 定义这个，会把路由后面的参数当做props传给组件
    // props: true,
    path: '/app',
    component: Todo,
    // components: {
    //   default: Todo,
    //   a: Login
    // },
    // 给路由命名，router-link中用
    name: 'app',
    // TDK的描述
    meta: {
      title: 'this is app',
      description: 'app desc'
    }
    // 相当于/app下的一个子路由
    // 在todo组件中设置一个router-view即可
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    component: Login
    // components: {
    //   default: Login,
    //   a: Todo
    // }
  }
  // {
  //   path: '/login/exact',
  //   component: Login
  // }
]
