<template>
  <div v-if="!isLoading" class="flex items-center justify-center h-screen">
      <!-- Your login form here -->
      <div class="bg-white p-8 shadow-md rounded-md">
        <h2 class="text-xl text-base-red font-semibold mb-4">SSVM</h2>
        <form @submit.prevent="login">
          <input v-model="password" type="password" class="border rounded-md px-3 py-2 mb-4 w-full" placeholder="Please Input the key" required>
          <button type="submit" class="bg-base-red text-white px-4 py-2 rounded-md w-full">Login</button>
        </form>
      </div>
  </div>
  <div v-else class="flex bg-base-gray h-screen relative">
      <!-- Your loader SVG code here -->
      <svg class="loader" viewBox="0 0 100 100">
            <g fill="none" stroke="#FF2E2E" stroke-linecap="round" stroke-linejoin="round" stroke-width="6">
                <!-- left line -->
                <path d="M 21 40 V 59">
                    <animateTransform attributeName="transform" attributeType="XML" type="rotate"
                        values="0 21 59; 180 21 59" dur="2s" repeatCount="indefinite" />
                </path>
                <!-- right line -->
                <path d="M 79 40 V 59">
                    <animateTransform attributeName="transform" attributeType="XML" type="rotate"
                        values="0 79 59; -180 79 59" dur="2s" repeatCount="indefinite" />
                </path>
                <!-- top line -->
                <path d="M 50 21 V 40">
                    <animate attributeName="d" values="M 50 21 V 40; M 50 59 V 40" dur="2s" repeatCount="indefinite" />
                </path>
                <!-- btm line -->
                <path d="M 50 60 V 79">
                    <animate attributeName="d" values="M 50 60 V 79; M 50 98 V 79" dur="2s" repeatCount="indefinite" />
                </path>
                <!-- top box -->
                <path d="M 50 21 L 79 40 L 50 60 L 21 40 Z">
                    <animate attributeName="stroke" values="rgba(255,0,0,1); rgba(100,100,100,0)" dur="2s"
                        repeatCount="indefinite" />
                </path>
                <!-- mid box -->
                <path d="M 50 40 L 79 59 L 50 79 L 21 59 Z" />
                <!-- btm box -->
                <path d="M 50 59 L 79 78 L 50 98 L 21 78 Z">
                    <animate attributeName="stroke" values="rgba(255,0,0,1); #FF2E2E" dur="2s" repeatCount="indefinite" />
                </path>
                <animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 0; 0 -19"
                    dur="2s" repeatCount="indefinite" />
            </g>
        </svg>
  </div>
</template>

<script>
export default {
  data() {
      return {
          isLoading: true,
          password: '',
      };
  },
  methods: {
      async login() {
          try {
              const response = await this.$axios.post('/verifyPassword', {
                  password: this.password,
              });
              const data = response.data;

              if (data) {
                  // Password matches, login successful
                  console.log('Login successful');
                  window.location.href = '/admin';
              } else {
                  return this.$toast.show({
                      type: 'danger',
                      title: 'alert',
                      message: 'Access Denied',
                      classTimeout: 'bg-base-red'
                  });
              }
          } catch (error) {
              console.log('Error:', error);
          }
      },
      async checkSession() {
          try {
              const response = await this.$axios.get('/checkSession');
              const isLoggedIn = response.data;
              if (isLoggedIn) {
                  // User is logged in
                  window.location.href = '/admin';
              }else{
                this.isLoading = false;
              }
          } catch (error) {
              console.log(error);
          }
      }
  },
  async beforeMount() {
      await this.checkSession();
  }
};
</script>

<style>
/* Add your own custom styles here */
.loader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 150px;
  width: 150px;
}
</style>
