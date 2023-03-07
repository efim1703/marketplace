import { createStore } from 'vuex'

const dollarStore = createStore({
  state: {
    dollarToRuble: 78,
    oldDollarToRuble: 78
  },
  getters: {
    getDollarToRuble(state) {
      return state.dollarToRuble
    },
    getOldDollarToRuble(state) {
			return state.oldDollarToRuble
		},
  },
  mutations: {
    setDollarToRuble(state, dollar) {
      state.dollarToRuble = dollar
    },
    setOldDollarToRuble(state, dollar) {
			state.oldDollarToRuble = dollar
    }
  },
  actions: {
    setDollarToRuble({commit, state}, dollar) {
      commit('setOldDollarToRuble', state.dollarToRuble)
      commit('setDollarToRuble', +dollar)
    },
  },
})

export default dollarStore