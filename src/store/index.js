import { createStore } from 'vuex'

export default createStore({
  state: {
    basket: [],
  },
  getters: {
    getBasket(state) {
      return state.basket
    }
  },
  mutations: {
    setBasket(state, newBasket) {
      state.basket = newBasket
    }
  },
  actions: {
    addProductInBasket({commit, state}, product) {
      let newBasket = [...state.basket]
      let findProduct = newBasket.find(el => el.id === product.T)

      if (!findProduct) {
        findProduct = { 
          id: product.T, 
          groupId: product.G,
          count: 1
        }
        newBasket.push(findProduct)
      } else {
        findProduct.count += 1
        newBasket = newBasket.map(el => el.id === product.T ? findProduct : el)
      }

      commit('setBasket', newBasket)
    },
    setProductCount({commit, state}, params) {
      const newBasket = [...state.basket]
      newBasket.forEach(el => el.id === params.productId ? el.count = params.count : false)
      console.log(newBasket);
      console.log(params.productId);
      commit('setBasket', newBasket)
    },
    deleteProduct({commit, state}, productId) {
      const newBasket = [...state.basket].filter(({id}) => id !== productId)
      commit('setBasket', newBasket)
    }
  },
})
