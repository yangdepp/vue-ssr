import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  return new Vuex.Store({
    // 开发环境用，限制外部不可直接修改state
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions
  })
}
