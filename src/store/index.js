import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    value: ''
  },
  mutations: {
    getValue (state, searchValue) {
      state.value = searchValue
    }
  }
})
