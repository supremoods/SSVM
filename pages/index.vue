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
    }
  },
 
}
</script>
