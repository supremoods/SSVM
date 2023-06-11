<template>
  <div class="flex bg-base-gray h-screen justify-center items-center relative">
    <dispense
      @view-dispense="showViewDispense"
    />
    <view-dispense 
      :isView="isViewDisp"
      @cancel="showViewDispense"
    />
  </div>
</template>

<script>
import Dispense from '@/components/dispense/'
import ViewDispense from '@/components/dispense/ViewDispense';

export default {
  data: () => ({
    isViewDisp: false
  }),
  components: {
    Dispense,
    ViewDispense
  },
  methods: {
    showViewDispense(show) {
      this.isViewDisp = show
    },
    checkSession(){
      this.$axios.get('/checkSession')
        .then(response => {
          const isLoggedIn = response.data;
          if (!isLoggedIn) {
            // User is logged in
            window.location.href = '/login';
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  beforeMount() {
    // call api "/checkSession"  
    this.checkSession();
  }
}
</script>
