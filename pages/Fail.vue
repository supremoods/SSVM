<template>
    <div class="flex h-screen justify-center items-center">
      <div class="message bg-white p-4 rounded border">
        <h2 class="text-xl font-bold mb-4">GCash Payment Not Successful</h2>
        <p class="text-gray-600 mb-4">Maybe you're trying to send a value that doesn't meet the price or your internet connection is unstable. Please contact the staff for assistance.</p>
        <div class="countdown text-gray-600 mb-4">
          <span class="mr-2">Redirecting in:</span>
          <span class="font-bold">{{ countdown }}</span>
        </div>
        <div class="button-container">
          <button class="button" @click="redirectToHome">Go to Home</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        countdown: 30,
        timer: null
      };
    },
    mounted() {
      this.startCountdown();
    },
    methods: {
      startCountdown() {
        this.timer = setInterval(() => {
          this.countdown--;
          if (this.countdown === 0) {
            clearInterval(this.timer);
            this.redirectToHome();
          }
        }, 1000);
      },
      redirectToHome() {
        // Perform the redirection to the home page here
        console.log("Redirecting to home...");

        window.location.href = "http://localhost:3000";
      }
    }
  };
  </script>
  
  <style>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
  
  .message {
    max-width: 400px;
    width: 90%;
    text-align: center;
  }
  
  .countdown {
    font-size: 16px;
  }
  
  .button-container {
    display: flex;
    justify-content: center;
  }
  
  .button {
    background-color: #3B82F6;
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  