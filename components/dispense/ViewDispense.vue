<template>
   <div class="view-dispense absolute bg-black/50 top-0 right-0 h-full flex justify-end" :class="{'active': isView}">
      <div class="wrapper bg-base-white w-5/6 flex flex-col">
         <div class="product-table flex-grow">
            <table class="table-fixed w-full border border-separate border-spacing-7">
               <thead >
                  <tr>
                     <th>Item</th>
                     <th>Qty</th>
                     <th>Price</th>
                     <th>Delete</th>
                  </tr>
               </thead>
               <tbody class="w-full">
                  <tr v-for="(item, index) in products" :key="index">
                     <td>{{ item.name }}</td>
                     <td class="flex gap-2">
                        <div class="dec-btn">
                           <button @click="decrement(item.name)" class="bg-base-red w-10 h-10 rounded-lg "><i class='bx bx-minus  text-base-white'></i></button>
                        </div>
                        <div class="count-value flex flex-grow h-10 bg-slate-100 rounded-lg shadow shadow-black/60 justify-center items-center">
                           <h1 class="text-lg text-slate-700">{{ item.quantity }}</h1>
                        </div>
                        <div class="add-btn">
                           <button @click="increment(item.name, item.quantity)" class="bg-base-red w-10 h-10  rounded-lg "><i class='bx bx-plus  text-base-white'></i></button>
                        </div>
                     </td>
                     <td>
                        <h1 class="text-lg font-bold">₱{{ item.price }}</h1>
                     </td>
                     <td>
                        <div class="delete-btn">
                           <button @click="deleteList(item.name)" class="bg-base-white w-10 h-10  rounded-lg shadow shadow-black/50"><i class='bx bxs-trash  text-base-red'></i></button>
                        </div>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
         <hr class="bg-black/90 ">
         <div class="receipt flex p-4 ">
            <div class="flex justify-between w-full">
               <h1 class="text-2xl font-bold">Total:</h1>
               <h1 class="text-2xl font-bold">
                  <span class="text-base-red">₱</span> {{ total }}
               </h1>
            </div>
         </div>
         <div class="action-btns w-full flex justify-between p-4">
            <button @click="cancel" class="bg-base-gray h-14 w-36 rounded-lg shadow shadow-black/60 flex justify-center items-center">
               <h1 class="text-xl text-base-red font-bold">
                  <i class='bx bx-cart'></i>Cancel</h1>
            </button>
            <button class="bg-base-red h-14 w-36 rounded-lg shadow shadow-black/60 flex justify-center items-center" @click="insertSales">
               <h1 class="text-xl text-base-white font-bold">
                  <i class='bx bx-cart'></i>Dispense</h1>
            </button>
         </div>
      </div>
   </div>
</template>

<script>
import { mapState, mapGetters  } from 'vuex'

export default ({
   props: {
      isView: {
         type: Boolean,
         required: false
      }
   },
   computed: {
      ...mapState({
         products: state => state.products.filter(product => product.quantity > 0),
         stocks: state => state.stocks.stocks
      }),
      ...mapGetters({
         total: 'total'
      }),
      getDateTime(){
         const date = new Date()
         const month = date.getMonth() + 1
         const day = date.getDate()
         const year = date.getFullYear()
         const hours = date.getHours()
         const minutes = date.getMinutes()
         const seconds = date.getSeconds()
         return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`
      }

   },
   methods: {
      increment(name, qty) {
         console.log(qty)
         if(this.getQuantity(name, qty) < 1){
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
      },
      deleteList(name) {
         this.$store.commit('clearProduct', name)
      },
      cancel() {
         this.$store.commit('clear')
         this.$emit('cancel', false)
      },
      getQuantity(name, qty){
         const product = this.stocks.find(stock => stock.name === name)
         return product.quantity - qty
      },
      insertSales(){

         this.products.forEach(product => {
            const { name, quantity, price } = product;
            const date = this.getDateTime;
            const reference = Math.random().toString(36).substr(2, 9);

            if (name === 'Ballpen') {
               this.ballpenCount = quantity;
               this.ballpenPrice = price;
               this.ballpenName = name;
               this.ballpenDate = date;
               this.ballpenReference = reference;
            } else {
               this.markerCount = quantity;
               this.markerPrice = price;
               this.markerName = name;
               this.markerDate = date;
               this.markerReference = reference;
            }
         });

         console.log(this.ballpenCount, this.ballpenPrice, this.ballpenName, this.ballpenDate, this.ballpenReference);
         console.log(this.markerCount, this.markerPrice, this.markerName, this.markerDate, this.markerReference);

         const payload = this.$axios.post('/paymentCheckout', {
            amount: this.total,
            ballpen: {
               name: this.ballpenName,
               quantity: this.ballpenCount,
               price: this.ballpenPrice,
               date: this.ballpenDate,
               reference: this.ballpenReference
            },
            marker: {
               name: this.markerName,
               quantity: this.markerCount,
               price: this.markerPrice,
               date: this.markerDate,
               reference: this.markerReference
            }
         })

         payload.then((res) => {
            console.log(res)
            if(res.status == 200){
               console.log('sheeshh')
               const checkout_url = res.data

               // route to the checkout url
               window.location.href = checkout_url
            }
         })
         // this.res = false
         // this.products.forEach(product => {
         //   this.res = this.$store.dispatch('insertSales', {
         //          sales: {
         //             description: product.name, 
         //             quantity: product.quantity, 
         //             price: product.price,
         //             date: this.getDateTime,
         //             reference : '0DHJ2229120001112'
         //          },
         //          stock: {
         //             name: product.name,
         //             quantity: this.getQuantity(product.name, product.quantity)
         //          }
         //    })
         //    if(product.name === 'Ballpen'){
         //       for (let i = 0; i < product.quantity; i++){
         //          const delay = 1000; 
         //          setTimeout(() => {
         //             this.$axios.get('http://192.168.4.4/pen/dispense');
         //          }, i * delay);
         //       }
         //       this.$store.commit('stocks/setQuantity', {index: 0, quantity: this.getQuantity(product.name, product.quantity)})
         //    }else{
         //       for (let i = 0; i < product.quantity; i++){
         //          const delay = 1000; 
         //          setTimeout(() => {
         //             this.$axios.get('http://192.168.4.4/marker/dispense');
         //          }, i * delay);
         //       }
         //       this.$store.commit('stocks/setQuantity', {index: 1, quantity: this.getQuantity(product.name, product.quantity)})
         //    }
         // })

         // if(!this.res){
         //    return this.$toast.show({
         //       type: 'danger',
         //       title: 'alert',
         //       message: `Something went wrong`,
         //       classTimeout: 'bg-base-red'
         //    })
         // }
         // // add axios here

         // this.$emit('cancel', false)
         // this.$toast.show({
         //    type: 'success',
         //    title: 'Success',
         //    message: 'Dispense successfully',
         //    classTimeout: 'bg-base-green'
         // })
      }
   },
   watch:{
      // check all products if quantity is 0
      products: {
         handler: function (val) {
            if (val.length === 0) {
               this.$emit('cancel', false)
            }
         },
         deep: true
      }

   }

})
</script>
