// 组装数据，可以每个页面公用
export default {
  fullName (state) {
    return `${state.firstName} ${state.lastName}`
  }
}
