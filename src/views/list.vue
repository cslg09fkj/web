<template>
<!--    实现筛选排序操作-->
    <div v-show="list.length">
        <div class="list-control">
            <div class="list-filter">
                <span class="choose">筛选:&nbsp;&nbsp;</span>
                <button class="btn btn-info">
                    <span @click="handleFilterDefault" >
                        默认
                    </span>
                </button>
                <div class="btn-group"><!--//下拉列表-->
                    <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">品牌
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu">
                        <li :class="{on: item === filterBrand}" v-for="item in brands"
                            @click="handleFilterBrand(item)">
                            <a>{{ item }}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="list-filter">
                <div class="btn-group">
                    <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">颜色
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu">
                        <li :class="{on: item === filterColor}" v-for="item in colors"
                            @click="handleFilterColor(item)">
                            <a>{{ item }}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="list-order">
                <span class="choose">排序:&nbsp;&nbsp;</span>
                <button class="btn btn-info">
                    <span :class="{on: order === ''}" @click="handleOrderDefault">
                        默认
                    </span>
                </button>
                <button class="btn btn-info">
                    <span :class="{ on: order.indexOf('sales')>-1 }" @click="handleOrderSales">
                        销量
                        <template v-if="order === 'sales-desc'">↓</template>
                        <template v-if="order === 'sales-asc'">↑</template>
                    </span>
                </button>
                <button class="btn btn-info">
                    <span :class="{ on: order.indexOf('cost') > -1}" @click="handleOrderCost">
                        价格
                        <template v-if="order === 'cost-desc'">↓</template>
                        <template v-if="order === 'cost-asc'">↑</template>
                    </span>
                </button>
                <span class="choose">已选筛选条件:</span>
                <span class="hasChosen">{{ this.filterBrand }}</span>
                <span class="hasChosen">{{ this.filterColor }}</span>
            </div>
        </div>
        <Product v-for="(item,index) in filteredAndOrderedList" :info="item" :key="item.id" v-if="index>=(curpage-1)*pagesize&&index<curpage*pagesize"><!--//info和key都是作为传递的作用,传给components的product-->
        </Product>
         <nav class="col-md-offset-5 pagina">
            <ul class="pagination">
                <template v-for="page in Math.ceil(filteredAndOrderedList.length/pagesize)">
                    <li v-on:click="PrePage()" id="prepage" v-if="page==1" class="disabled"><a href="#">上一页</a></li>
                    <li v-if="page==1" class="active" v-on:click="NumPage(page, $event)"><a href="#">{{page}}</a></li>
                    <li v-else v-on:click="NumPage(page, $event)"><a href="#">{{page}}</a></li>
                    <li id="nextpage" v-on:click="NextPage()" v-if="page==Math.ceil(filteredAndOrderedList.length/pagesize)"><a href="#">下一页</a></li>
                </template>
            </ul>
        </nav>
        <div class="product-not-found" v-show="!filteredAndOrderedList.length">
            暂无相关商品
        </div>
    </div>
</template>
<script src="https://cdn.staticfile.org/jquery/3.3.1/jquery.js"></script>
<script>
    import Product from '../components/product.vue';
    export default {
        components: { Product },//模板
        computed: {//计算属性
            list(){//从Vuex获取商品列表信息
                return this.$store.state.productList;//数据调用
            },
            brands(){
                return this.$store.getters.brands;
            },
            colors(){
                return this.$store.getters.colors;
            },
            filteredAndOrderedList(){//生成目标列表
                let list = [...this.list];
                if(this.filterBrand !== ''){
                    list = list.filter(item => item.brand === this.filterBrand);
                }
                if(this.filterColor !== ''){
                    list = list.filter(item => item.color === this.filterColor);
                }
                if(this.order !== ''){
                    if(this.order === 'sales-desc'){ //销量排序
                        list = list.sort((a, b) => b.sales - a.sales);
                    }
                    else if(this.order === 'sales-asc'){
                        list = list.sort((a, b) => a.sales - b.sales);
                    }
                    else if(this.order === 'cost-desc'){ //价格排序
                        list = list.sort((a, b) => b.cost - a.cost);
                    }
                    else if(this.order === 'cost-asc'){
                        list = list.sort((a, b) => a.cost - b.cost);
                    }
                }
                return list;
            }
        },
        data(){
            return {
                filterBrand: '',
                filterColor: '',
                //sales销量
                order: '',
                pagesize: 4,
    			curpage:1
            }
        },
        methods: {
            handleFilterDefault(){//
                this.filterBrand = '';
                this.filterColor = '';
            },
            handleFilterBrand(brand){ //品牌筛选操作
                if (this.filterBrand === brand) {
                    this.filterBrand = '';//default
                }else{
                    this.filterBrand = brand;
                }
            },
            handleFilterColor(color){ //颜色筛选操作
                if (this.filterColor === color) {
                    this.filterColor = '';//default
                }else{
                    this.filterColor = color;
                }
            },
            handleOrderDefault(){
                this.order = '';
            },
            handleOrderSales(){ //销量状态转变
                if(this.order === 'sales-desc'){
                    this.order = 'sales-asc';
                }
                else{
                    this.order = 'sales-desc';
                }
            },
            handleOrderCost(){ //价格状态转变
                if(this.order === 'cost-desc'){
                    this.order = 'cost-asc';
                }
                else{
                    this.order = 'cost-desc';
                }
            },
            //上一页方法
            PrePage: function (event) {
                $(".pagination .active").prev().trigger("click");//同龄遍历,
            },
            //下一页方法
            NextPage: function (event) {
                $(".pagination .active").next().trigger("click");
            },
            //点击页码的方法
            NumPage: function (num, event) {
                if (this.curpage == num) {
                    return;
                }
                this.curpage = num;
                $(".pagination li").removeClass("active");//移除active
                if (event.target.tagName.toUpperCase() == "LI") {//获取标签
                    $(event.target).addClass("active");
                }
                else {
                    $(event.target).parent().addClass("active");//A标签
                }
                if (this.curpage == 1) {//上下页的禁止
                    $("#prepage").addClass("disabled");
                }
                else {
                    $("#prepage").removeClass("disabled");
                }
                if (this.curpage == Math.ceil(this.filteredAndOrderedList.length / this.pagesize)) {
                    $("#nextpage").addClass("disabled");
                }
                else {
                    $("#nextpage").removeClass("disabled");
                }
            }
        },
        mounted(){
            this.$store.dispatch('getProductList');//提交异步,解决异步问题
        }
    }
</script>

<style scoped>
	.pagina{
		position: absolute;
		top: 620px;
	}
    .list-control{
        background: #fff;
        border-radius: 6px;
        margin: 16px;
        padding: 16px;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
    }
    .list-filter{
        margin-bottom: 16px;
        float: left;
        margin-right: 10px;
    }
    button{
        margin-right: 15px;
    }
    .list-filter a:hover{
        color: red;
    }
    .choose{
        font-size: 16px;
    }
    .hasChosen{
        color: hotpink;
        font-size: 16px;
    }
    .product-not-found{
        text-align: center;
        padding: 32px;
    }
</style>