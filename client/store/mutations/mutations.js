// 都是同步修改操作，异步操作在actions中
export default {
  updateCount (state, num) {
    state.count = num
  }
}
