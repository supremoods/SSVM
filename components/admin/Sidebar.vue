<!-- Dashboard -->
<template>
    <div class="flex bg-base-white w-56">
        <div class="flex flex-col w-full">
            <div class="logo-title p-10">
                <h1 class=" text-xl font-bold text-base-red">SSVM</h1>
            </div>
            <div class="nav-items flex flex-col h-full">
                <div class="nav-item text-base py-5 px-10"  @click="dashboard()" :class="{'active' : isDashboard}">
                    <h1>Dashboard</h1>
                </div>
                <div class="nav-item text-base py-5 px-10"  @click="stocks()" :class="{'active' : isStocks}">
                    <h1>Stocks</h1>
                </div>
                <div class="flex-grow">
                </div>
                <div class="nav-item text-base p-10"  @click="logout">
                    <h1>Logout</h1>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
    export default {
        data: () => ({
            isDashboard: true,
            isStocks: false,
            isAccountSettings: false,
        }),
        methods: {
            dashboard() {
                this.isDashboard = true
                this.isStocks = false
                this.isAccountSettings = false
                // emit
                this.$emit('dashboard', true)
            },
            stocks() {
                this.isDashboard = false
                this.isStocks = true
                this.isAccountSettings = false

                // emit
                this.$emit('stocks', true)
            },
            accountSettings() {
                this.isDashboard = false
                this.isStocks = false
                this.isAccountSettings = true

                this.$emit('accountSettings', true)
            },
            logout() {
                this.$axios
                .get("/logout")
                .then(() => {
                    // Logout successful
                    console.log("Logout successful");
                    window.location.href = "/login"; // Redirect to home page
                })
                .catch((error) => {
                    console.log("Error logging out:", error);
                });
            },
        }
    }
</script>