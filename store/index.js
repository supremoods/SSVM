export const state = () => ({
   products:[
      {
         name: 'Ballpen',
         price: 1,
         image: 'Ballpen.png',
         quantity: 0
      },
      {
         name: 'Marker',
         price: 1,
         image: 'Marker.png',
         quantity: 0
      }
   ],
})

export const mutations = {
   increment(state, name) {
      const index = state.products.findIndex(product => product.name === name);
      state.products[index].quantity++;
   },
   decrement(state, name) {
      const index = state.products.findIndex(product => product.name === name);
      if (state.products[index].quantity > 0)
         state.products[index].quantity--;
   },
   clearProduct(state, name){
      const index = state.products.findIndex(product => product.name === name);
      state.products[index].quantity = 0;
   },
   clear(state) {
      state.products.forEach(product => {
         product.quantity = 0;
      });
   },
   set(state, payload) {
      state.products[payload.index].quantity = payload.value;
   },
   setPrice(state, payload) {
      state.products[payload.index].price = payload.price;
   },
}

export const getters = {
   products: state => state.products,
   total: state => {
      return state.products.reduce((total, product) => {
         return total + product.price * product.quantity;
      }, 0);
   }
}

export const actions = {
   async nuxtServerInit({ commit, state, dispatch }) {
      const res = await this.$axios.get('/getProduct');
   
      res.data.forEach(product => {
         const index = state.products.findIndex(p => p.name === product.name);
         if (index !== -1) {
            commit('setPrice', {
            index: index,
            price: product.price
            });
         }
      });

      // Dispatch the nuxtServerInit action in the stocks module
      await dispatch('stocks/nuxtServerInit');
   },

   async insertSales({ commit, state }, payload) {
      const res = await this.$axios.post('/insertSales', payload.sales);
      console.log(res.data);

      if(res.data){
         const res = await this.$axios.put('/updateStocksQuantity', payload.stock)
         if(res){
            commit('clear');
            return true;
         }
      }
      return false;
   }
 };
