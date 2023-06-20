<template>
    <div class="flex flex-col h-screen justify-center items-center bg-gray-100">
      <div class="receipt bg-white p-4 rounded border shadow-lg">
        <h2 class="text-2xl font-bold mb-4">Order Summary</h2>
        <table class="w-full mb-4">
          <thead>
            <tr>
              <th class="py-2">Item</th>
              <th class="py-2">Qty</th>
              <th class="py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="penCount > 0">
              <td class="py-2">Pen</td>
              <td class="py-2">x{{ penCount }}</td>
              <td class="py-2">₱{{ penPrice }}</td>
            </tr>
            <tr v-if="markerCount > 0">
              <td class="py-2">Marker</td>
              <td class="py-2">x{{ markerCount }}</td>
              <td class="py-2">₱{{ markerPrice }}</td>
            </tr>
          </tbody>
        </table>
        <hr class="my-4" />
        <div class="total flex justify-end">
          <span class="mr-2">Total</span>
          <span class="font-bold">₱{{ total }}</span>
        </div>
      </div>
      <div v-if="!dispensed" class="loading-animation flex flex-col justify-center items-center mt-4">
        <div class="loader animate-spin rounded-full border-t-2 border-t-base-red border-primary h-12 w-12"></div>
        <p class="mt-2 text-red-600 text-3xl font-bold">Dispensing</p>
      </div>
      <div v-else class="flex flex-col justify-center items-center mt-4">
        <p class="mt-2 text-green-600 text-3xl font-bold">Done dispensing!</p>
        <button @click="redirectToHome" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded">
          Redirect to Home
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from "vuex";
  
  export default {
    data() {
      return {
        penCount: 0,
        markerCount: 0,
        penPrice: 0,
        markerPrice: 0,
        total: 0,
        ballPenReference: "",
        ballPenDate: "",
        markerReference: "",
        markerDate: "",
        loading: true,
        dispensed: false,
      };
    },
    computed: {
      ...mapState({
        stocks: (state) => state.stocks.stocks,
      }),
    },
    methods: {
      getQuantity(name, qty) {
        const product = this.stocks.find((stock) => stock.name === name);
        return product.quantity - qty;
      },
      redirectToHome() {
        console.log("Redirecting to home...");
        window.location.href = "http://localhost:3000";
      },
   
    },
    mounted() {
      const urlParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlParams.entries());
  
      this.total = parseInt(params.total) || 0;
  
      // Ballpen
      this.penCount = parseInt(params.ballpenQuantity) || 0;
      this.penPrice = parseInt(params.ballpenPrice) || 0;
      this.ballPenReference = params.ballpenReference;
      this.ballPenDate = params.ballpenDate;
  
      // Marker
      this.markerCount = parseInt(params.markerQuantity) || 0;
      this.markerPrice = parseInt(params.markerPrice) || 0;
      this.markerReference = params.markerReference;
      this.markerDate = params.markerDate;

      
      if (this.penCount > 0) {
        let penDispensedCount = 0;

        for (let i = 0; i < this.penCount; i++) {
          const delay = 1000;
          setTimeout(() => {
            this.$axios.get("http://192.168.106.1/pen/dispense").then(() => {
              penDispensedCount++;

              if (penDispensedCount === this.penCount) {
                this.$store
                  .dispatch("insertSales", {
                    sales: {
                      description: "Ballpen",
                      quantity: this.penCount,
                      price: this.penPrice,
                      date: this.ballPenDate,
                      reference: this.ballPenReference,
                    },
                    stock: {
                      name: "Ballpen",
                      quantity: this.getQuantity("Ballpen", this.penCount),
                    },
                  })
                  .then(() => {
                    this.loading = false;
                    this.dispensed = true;
                  });
              }
            });
          }, i * delay);
        }
      }

      if (this.markerCount > 0) {
        let markerDispensedCount = 0;

        for (let i = 0; i < this.markerCount; i++) {
          const delay = 1000;
          setTimeout(() => {
            this.$axios.get("http://192.168.106.1/marker/dispense").then(() => {
              markerDispensedCount++;

              if (markerDispensedCount === this.markerCount) {
                this.$store
                  .dispatch("insertSales", {
                    sales: {
                      description: "Marker",
                      quantity: this.markerCount,
                      price: this.markerPrice,
                      date: this.markerDate,
                      reference: this.markerReference,
                    },
                    stock: {
                      name: "Marker",
                      quantity: this.getQuantity("Marker", this.markerCount),
                    },
                  })
                  .then(() => {
                    this.loading = false;
                    this.dispensed = true;
                  });
              }
            });
          }, i * delay);
        }
      }

  
    },
  };
  </script>
  
  <style>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
  
  .receipt {
    max-width: 400px;
    width: 90%;
  }
  
  .total {
    margin-top: 10px;
  }
  
  .loading-animation {
    margin-top: 20px;
  }
  
  .loader {
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-left-color: transparent;
  }
  </style>
  