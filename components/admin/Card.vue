<template>
    <div class="flex flex-col bg-base-white rounded-lg p-5 shadow shadow-black/60">
      <div class="flex header-title justify-between">
        <h1 class="text-2xl text-base-red/80 font-bold">{{ product.name }}</h1>
      </div>
      <div class="image-container h-44 w-44">
        <img class="w-full h-full object-cover" :src="require(`~/assets/image/${product.image}`)" alt="">
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <label for="Price">Price</label>
          <input type="number" class="border border-base-gray rounded-lg p-2" :value="product.price" @change="updatePrice($event.target.value)">
        </div>
        <div class="flex flex-col">
          <label for="Quantity">Quantity</label>
          <input type="number" class="border border-base-gray rounded-lg p-2" :value="product.quantity" @change="updateQuantity($event.target.value)">
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: {
        type: Object,
        required: true
      }
    },
    computed:{

    },
    methods: {
      updatePrice(value) {
        this.$emit('update:productPrice', {
            ...this.product,
            price: parseInt(value)
        });
      },
      updateQuantity(value) {
        this.$emit('update:productQuantity', {
            ...this.product,
            quantity: parseInt(value)
        });
      }
    }
  };
  </script>
  