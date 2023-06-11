<template>
   <div class=" flex flex-col bg-base-white rounded-lg p-5 shadow shadow-black/60">
      <div class="flex header-title justify-between">
         <h1 class="text-2xl text-base-red/80 font-bold">{{ product.name }} ({{ getQuantity }})</h1>
         <h1 class="text-3xl text-base-red font-bold">₱ {{ product.price }}</h1>
      </div>
      <div class="image-container h-64 w-64">
         <img class="w-full h-full object-cover" :src="require(`~/assets/image/${product.image}`)" alt="">
      </div>
      <div class="actions-btn flex justify-between items-center gap-2">
         <div @click="decrement(product.name)" class="dec-btn">
            <button class="bg-base-red w-14 h-14 rounded-lg "><i class='bx bx-minus text-3xl text-base-white'></i></button>
         </div>
         <div class="count-value flex flex-grow h-16 bg-base-white rounded-lg shadow shadow-black/60 justify-center items-center">
            <h1 class="text-2xl ">{{ product.quantity }}</h1>
         </div>
         <div @click="increment(product.name)" class="add-btn">
            <button  class="bg-base-red w-14 h-14 rounded-lg "><i class='bx bx-plus text-3xl text-base-white'></i></button>
         </div>
      </div>
   </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
   props: {
      product: {
         type: Object,
         required: true
      },
      index: {
         type: Number,
         required: true
      }
   },
   computed: {
      ...mapState({
        stocks: state => state.stocks.stocks
      }),
      getQuantity(){
        return this.stocks[this.index].quantity - this.product.quantity;
      }
   },
   data: () => ({
      count: 0
   }),
   methods: {
      increment(name) {
         if(this.getQuantity < 1){
            return this.$toast.show({
                  type: 'danger',
                  title: 'alert',
                  message: `No more ${name} in stock`,
                  classTimeout: 'bg-base-red'
            })
         }
         this.$store.commit('increment', name)
      },
      decrement(name) {
         this.$store.commit('decrement', name)
      }
   }

}
</script>
