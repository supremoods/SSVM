export const state = () => ({
    stocks:[]
 })
 
 export const mutations = {
      setStocks(state, stocks) {
         state.stocks = stocks;
      },
      setQuantity(state, payload) {
         state.stocks[payload.index].quantity = payload.quantity;
      },
      setPrice(state, payload) {
         state.stocks[payload.index].price = payload.price;
      },
 }
 
 export const getters = {
    stocks: state => state.stocks,
    total: state => {
       return state.stocks.reduce((total, product) => {
          return total + product.price * product.quantity;
       }, 0);
    }
 }

export const actions = {
   async nuxtServerInit({ commit, state }) {
      const res = await this.$axios.get('/getStocks');
      commit('setStocks', res.data);
   },

   async updateStocks({ commit, state }, payload) {
      const res = await this.$axios.put('/updateStocks', payload);
      console.log(res.data);
      // commit('setStocks', res.data);
   }
}

 
 