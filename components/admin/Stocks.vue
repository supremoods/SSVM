<!-- Dashboard -->
<template>
    <div class="flex p-4 w-full">
        <div class="flex flex-col gap-4 w-full">
            <div class="header-title flex">
                <h1 class="text-base-red font-bold text-lg">Sales Dashboard</h1>
            </div>
            <div class="flex gap-6 justify-center">
                <Card v-for="(product, index) in stocks"
                    :key="index"
                    :product="product"
                    @update:productPrice="updateProductPrice"
                    @update:productQuantity="updateProductQty"
                />
            </div>
            <div class="flex add-btn justify-end">
                <button class="bg-base-red rounded-lg px-5 py-3 shadow shadow-black/60 gap-3" @click="updateStocks"><h1 class="text-base text-base-white font-bold"><i class='bx bxs-save' ></i>Save</h1></button>
             </div>
        </div>
    </div>    
</template>

<script>
    import Card from '@/components/admin/Card'
    import { mapState } from 'vuex';

    export default {
        data: () => ({

        }),
        methods: {
            updateProductPrice(product) {
                if(product.name == 'Ballpen'){
                    this.$store.commit('stocks/setPrice', {
                        index: 0,
                        price: product.price
                    });
                }else{
                    this.$store.commit('stocks/setPrice', {
                        index: 1,
                        price: product.price
                    });
                }
            },
            updateProductQty(product) {
                if(product.name == 'Ballpen'){
                    this.$store.commit('stocks/setQuantity', {
                        index: 0,
                        quantity: product.quantity
                    });
                }else{
                    this.$store.commit('stocks/setQuantity', {
                        index: 1,
                        quantity: product.quantity
                    });
                }

                console.log(this.stocks);
            },
            updateStocks(){
                this.stocks.forEach(stock => {
                    // mapActions
                    this.$store.dispatch('stocks/updateStocks', {
                        stock
                    });
                });
                this.$toast.show({
                    type: 'success',
                    title: 'Success',
                    message: `Stocks updated successfully`,
                    classTimeout: 'bg-base-green'
                })
            }
        },
        components: {
            Card
        },
        computed: {
            ...mapState({
                products: state => state.products,
                stocks: state => state.stocks.stocks
            }),

        },
        watch: {

        },
        mounted() {

        }
    }
</script>