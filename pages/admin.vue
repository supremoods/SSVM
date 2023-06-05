<template>
    <div class="flex bg-base-gray h-screen relative">
        <Sidebar
            @dashboard="dashboard"
            @stocks="stocks"
        />
        <Dashboard v-if="isDashboard"/>
        <Stocks v-if="isStocks" />
    </div>
    
</template>

<script>

import Sidebar from '@/components/admin/Sidebar'
import Dashboard from '@/components/admin/Dashboard'
import Stocks from '@/components/admin/Stocks'
import { mapState } from 'vuex'

export default {
    data: () => ({
        isDashboard: true,
        isStocks: false,
    }),
    computed: {

   },
    components: {
        Sidebar,
        Dashboard,
        Stocks
    },
    methods: {
        dashboard() {
            this.isDashboard = true
            this.isStocks = false
        },
        stocks() {
            this.isDashboard = false
            this.isStocks = true
        }  

    },
    watch: {

    },

   mounted() {

   },
}

</script>