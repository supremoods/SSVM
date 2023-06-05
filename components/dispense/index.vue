<template>
   <div class="wrapper flex flex-col h-5/6">
      <div class="card-container grow ">
         <div class="wrapper flex gap-4">
            <Card v-for="(product, index) in products"
               :key="index"
               :index="index"
               :product="product"
            />
         </div>
      </div>


      <div class="flex add-btn justify-end">
         <button @click="ViewDispense" class="bg-base-red w-80 h-16 rounded-lg shadow shadow-black/60"><h1 class="text-2xl text-base-white font-bold"><i class='bx bx-cart-add'></i>Add</h1></button>
      </div>
   </div>
</template>

<script>
import Card from '@/components/dispense/Card'
import { mapState } from 'vuex'

export default ({
   props: {
      isCancel: Boolean
   },
   components: {
      Card
   },
   data: () => ({
      isEmpty: true
   }),
   computed: {
      ...mapState({
         products: state => state.products,
      }),
   },
   methods: {
      ViewDispense() {
         if (this.checkEmpty()){
            return this.$toast.show({
                  type: 'danger',
                  title: 'alert',
                  message: `Please select a product`,
                  classTimeout: 'bg-base-red'
            })
         }
         this.$emit('view-dispense', true)
      },
      checkEmpty() {
        return this.isEmpty = this.products.every(product => product.quantity === 0)
      }
   },
   watch: {
      isCancel() {
         this.products.forEach(product => {
            product.quantity = 0
         })
      }
   }
})
</script>
