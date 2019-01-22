import Vuex from 'vuex'
import defaultState from './state/state'
import muations from './mutations/mutations'
import getters from './getters/getters'

export default () => {
  return new Vuex.Store({
    state: defaultState,
    muations,
    getters
  })
}
