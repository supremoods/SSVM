<!-- Dashboard -->
<template>
    <div class="flex p-4 flex-col w-full overflow-y-scroll">
        <div class="header-title flex">
            <h1 class="text-base-red font-bold text-lg">Sales Dashboard</h1>
        </div>
        <div class="flex justify-between">
            <!-- add switch toggle for filter by month only -->
            <label class="switch">
                <input type="checkbox" v-model="isFilterByMonth" @change="handleFilterByMonthChange">
                <span class="slider">Filter by month only </span>
            </label>
            
            <!-- add dropdown filter-->
            <div class="dropdown w-32 flex flex-col gap-1 relative">
                <button class="dropbtn bg-base-white w-full text-base flex justify-between items-center px-3 py-2 rounded-lg" @click="isDropdownProduct = !isDropdownProduct">{{ selectedProduct }} <i class='bx bx-chevron-down'></i></button>
                <div v-show="isDropdownProduct" class="dropdown-content flex flex-col absolute top-12 w-full shadow-lg rounded-lg">
                    <h1 v-for="product, index in products" :key="index" class="text-base p-2 bg-base-white" @click="filterByProduct(product)">{{ product }}</h1>
                </div>  
            </div>
        </div>
        <div class="flex gap-2">
            <div class="dropdown w-52 flex flex-col gap-1 relative">
                <button class="dropbtn bg-base-white flex-col text-base flex  px-3 py-2 rounded-lg" @click="isDropdownMonth = !isDropdownMonth">
                    <div class="flex">
                        <h1 class="text-base-black/70">Month</h1>
                    </div>
                    <div class="flex items-center w-full gap-1 justify-center">
                        <i class='bx bxs-calendar text-base-red'></i><span class="flex-grow text-left">{{ selectedMonth }}</span> <i class='bx bx-chevron-down'></i>
                    </div>
                </button>
                <div v-show="isDropdownMonth" class="dropdown-content flex flex-col max-h-96 overflow-y-scroll absolute top-20 w-full shadow-lg rounded-lg z-10">
                    <h1 v-for="month, index in months" :key="index" class="text-base p-2 bg-base-white" @click="filterByMonth(month)">{{ month }}</h1>
                </div>  
                <div class="flex text-base-red/5"></div>
            </div>

            <div v-show="!isFilterByMonth" class="dropdown w-52 flex flex-col gap-1 relative">
                <button class="dropbtn bg-base-white flex-col text-base flex  px-3 py-2 rounded-lg" @click="isDropdownDays = !isDropdownDays">
                    <div class="flex">
                        <h1 class="text-base-black/70">Day</h1>
                    </div>
                    <div class="flex items-center w-full gap-1 justify-center">
                        <i class='bx bxs-calendar text-base-red'></i><span class="flex-grow text-left">{{ selectedDays }}</span> <i class='bx bx-chevron-down'></i>
                    </div>
                </button>
                <div v-show="isDropdownDays" class="dropdown-content flex flex-col max-h-96 overflow-y-scroll absolute top-20 w-full shadow-lg rounded-lg z-10">
                    <h1 v-for="day, index in days" :key="index" class="text-base p-2 bg-base-white" @click="filterByDays(day)">{{ day }}</h1>
                </div>  
                <div class="flex text-base-red/5"></div>
            </div>
        </div>
        <div class="flex gap-2 mt-4">
            <div class="flex flex-col bg-base-white w-64 rounded-lg">
                <h1 class="total-sales-title text-base p-3">
                    Total Sales
                </h1>
                <h1 class="total-sales text-2xl font-bold text-center p-7">
                    {{ totalSales }}
                </h1>
            </div>
            <div class="flex flex-col bg-base-white w-64 rounded-lg">
                <h1 class="total-revenue-title text-base p-3">
                    Total Revenue
                </h1>
                <h1 class="total-revenue text-2xl font-bold text-center p-7">
                    ₱ {{ totalRevenue }}
                </h1>
            </div>
        </div>
        <div class="flex mt-4">
            <div class="flex bg-base-white w-full">
                <vue-good-table
                class="w-full"
                :columns="columns"
                :rows="rows"
                :pagination-options="{
                  enabled: true
                }"
                >
                </vue-good-table>
            </div>
        </div>
           <!-- Add the print button -->
        <div class="flex justify-center mt-4">
            <button class="bg-base-red text-base-white px-4 py-2 rounded-lg" @click="printTable">Print</button>
        </div>

    </div>    
</template>

<script>

    export default {
        data: () => ({
            isFilterByMonth: false,
            products: ['All', 'Ballpen', 'Marker'],
            isDropdownProduct: false,
            selectedProduct: '',
            isDropdownMonth: false,
            selectedMonth: '',
            isDropdownDays: false,
            selectedDays: '',
            totalSales: 0,
            totalRevenue: 0,
            columns: [
            {
                label: "ID",
                field: "id",
                numeric: false,
                html: false
            },
			{
				label: "Description",
				field: "description",
				numeric: false,
				html: false
			},
            {
                label: "Quantity",
                field: "quantity",
                numeric: false,
                html: false
            },
            {
                label: "Price",
                field: "price",
                numeric: false,
                html: false
            },
            {
                label: "Total",
                field: "total",
                numeric: false,
                html: false
            },
            {
                label: "Date",
                field: "date",
                numeric: false,
                html: false
            },
            {
                label: "Reference",
                field: "reference",
                numeric: false,
                html: false
            }
		    ],
            rows: [
              
            ],
        }),
        methods: {
            handleFilterByMonthChange(){
                this.selectedDays = '' 
                    this.filter()
            },
            filterByProduct(value){
                this.selectedProduct = value
                this.isDropdownProduct = !this.isDropdownProduct
                this.filter()
            },
            filterByMonth(value){
                this.selectedMonth = value
                this.isDropdownMonth = !this.isDropdownMonth
                if (this.isFilterByMonth) {
                    this.selectedDays = '' 
                    this.filter()
                }else{
                    this.filter()
                }
            },
            filterByDays(value){
                console.log(value)
                this.selectedDays = value
                this.isDropdownDays = !this.isDropdownDays
                this.filter()
            },
            async getSales(){
                // get all sales using axios
                const res = await this.$axios.get('/getSales');

                // Update the total sales and total revenue
                this.totalSales = res.data.reduce((acc, sale) => parseInt(acc) + parseInt(sale.quantity), 0);
                this.totalRevenue = res.data.reduce((acc, sale) => parseInt(acc) + parseInt(sale.total), 0);

                return res.data
            },
            filter() {
                // Retrieve the filtered sales based on the selected criteria
                const filteredSales = this.getSales().then(res => {
                    // Apply filters based on selectedProduct, selectedMonth, and selectedDays
                    let filteredData = res;

                    if (this.selectedProduct !== 'All') {
                        filteredData = filteredData.filter(sale => sale.description === this.selectedProduct);

                        // Update the total sales and total revenue
                        this.totalSales = filteredData.reduce((acc, sale) => parseInt(acc) + parseInt(sale.quantity), 0);
                        this.totalRevenue = filteredData.reduce((acc, sale) => parseInt(acc) + parseInt(sale.total), 0);
                    }

                    if (this.selectedMonth) {
                        filteredData = filteredData.filter(sale => {
                            const saleMonth = new Date(sale.date).toLocaleString('default', { month: 'long' });
                            return saleMonth === this.selectedMonth;
                        });

                        // Update the total sales and total revenue
                        this.totalSales = filteredData.reduce((acc, sale) => parseInt(acc) + parseInt(sale.quantity), 0);
                        this.totalRevenue = filteredData.reduce((acc, sale) => parseInt(acc) + parseInt(sale.total), 0);
                    }

                    if (this.selectedDays) {
                        const date = this.selectedMonth + ' ' + this.selectedDays;
                        filteredData = filteredData.filter(sale => {
                            const saleDate = new Date(sale.date).toLocaleString('default', { month: 'long' }) + ' ' + new Date(sale.date).getDate();
                            return saleDate === date;
                        });

                        // Update the total sales and total revenue
                        this.totalSales = filteredData.reduce((acc, sale) => parseInt(acc) + parseInt(sale.quantity), 0);
                        this.totalRevenue = filteredData.reduce((acc, sale) => parseInt(acc) + parseInt(sale.total), 0);
                    }

                    return filteredData;
                });

                // Update the rows with the filtered sales
                filteredSales.then(res => {
                    this.rows = res;
                });
            },
            printTable() {
            // Create a new window to print the table
            const printWindow = window.open('', '_blank');
            
            // Build the HTML content to be printed
            const tableHTML = `
                <html>
                <head>
                    <style>
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        padding: 8px;
                        text-align: left;
                        border-bottom: 1px solid #ddd;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                    </style>
                </head>
                <body>
                    <h1>Sales Report</h1>
                    <table>
                    <thead>
                        <tr>
                        ${this.columns
                            .map((column) => `<th>${column.label}</th>`)
                            .join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${this.rows
                        .map(
                            (row) =>
                            `<tr>${this.columns
                                .map(
                                (column) =>
                                    `<td>${row[column.field]}</td>`
                                )
                                .join('')}</tr>`
                        )
                        .join('')}
                    </tbody>
                    </table>
                </body>
                </html>
            `;
            
            // Write the HTML content to the print window
            printWindow.document.open();
            printWindow.document.write(tableHTML);
            printWindow.document.close();
            
            // Call the print function
            printWindow.print();
            }
        },
        computed: {
            // get all months
            months() {
                const months = [];
                const date = new Date();
                
                for (let i = 0; i < 12; i++) {
                    date.setMonth(i);
                    const month = date.toLocaleString('default', { month: 'long' });
                    months.push(month);
                }
                
                return months;
            },
            getCurrentMonth() {
                const date = new Date();
                const month = date.toLocaleString('default', { month: 'long' });
                return month
            },
            // get days based on selected month
            days() {
                const date = new Date();
                console.log(this.months.indexOf(this.selectedMonth))
                date.setMonth(this.months.indexOf(this.selectedMonth)+1);

                // Set the date to the last day of the selected month
                date.setDate(0);
                // Get the number of days in the month
                return date.getDate();
            },
            // get current day
            getCurrentDay() {
                const date = new Date();
                const day = date.toLocaleString('default', { day: 'numeric' });
                return day
            },

        },
        mounted() {
            this.selectedProduct = this.products[0]
            this.selectedMonth = this.getCurrentMonth
            this.selectedDays = this.getCurrentDay

            this.filter()
        }
    }
</script>

