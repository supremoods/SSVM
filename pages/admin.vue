<template>
    <div v-if="!isLoading" class="flex bg-base-gray h-screen relative">
        <div v-if="isLoading" class="loader">Loading...</div>
        <Sidebar @dashboard="dashboard" @stocks="stocks" />
        <Dashboard v-if="isDashboard" />
        <Stocks v-if="isStocks" />
        <account-settings v-if="isAccountSettings" />
    </div>
    <div v-else class="flex bg-base-gray h-screen relative">
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
import Sidebar from '@/components/admin/Sidebar'
import Dashboard from '@/components/admin/Dashboard'
import Stocks from '@/components/admin/Stocks'
import AccountSettings from '@/components/admin/AccountSettings'

export default {
    data() {
        return {
            isLoading: true,
            isDashboard: true,
            isStocks: false,
            isAccountSettings: false,
        };
    },
    components: {
        Sidebar,
        Dashboard,
        Stocks,
        AccountSettings
    },
    methods: {
        dashboard() {
            this.isStocks = false
            this.isAccountSettings = false
            this.isDashboard = true
        },
        stocks() {
            this.isDashboard = false
            this.isAccountSettings = false
            this.isStocks = true
        },
        accountSettings() {
            this.isDashboard = false
            this.isStocks = false
            this.isAccountSettings = true
        },
        async checkSession() {
            try {
                const response = await this.$axios.get('/checkSession');
                const isLoggedIn = response.data;
                if (!isLoggedIn) {
                    // User is not logged in
                    window.location.href = '/login';
                } else {
                    // User is logged in, set isLoading to false
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
}
</script>

<style>
.loader {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	height: 150px;
	width: 150px;
}

</style>
