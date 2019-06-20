<template>
<!--    产品详细内容展示-->
    <div v-if="product">
        <div class="product">
            <div class="product-image">
                <img :src="product.image">
            </div>
            <div class="product-info">
                <h1>{{ product.name }}</h1>
                <div class="product-cost">￥{{ product.cost }}</div>
                <button class="btn btn-info" @click="handleAddCart">加入购物车</button>
            </div>
        </div>
        <div class="product-detail">
            <h3>产品介绍</h3>
            <ul class="detail">
                <li>
                    <span class="spanLeft">商品名称：{{ product.name }}</span>
                    <span class="spanRight">商品编号：{{ product.number }}</span>
                </li>
                <li>
                    <span class="spanLeft">屏幕尺寸：{{ product.size }}</span>
                    <span class="spanRight">显卡型号：{{product.Graphics}}</span>
                </li>
                <li>
                    <span class="spanLeft">系统：{{ product.System }}</span>
                    <span class="spanRight">硬盘容量：{{product.capacity}}</span>
                </li>
                <li>
                    <span class="spanLeft">处理器：{{ product.CPU }}</span>
                    <span class="spanRight">内存容量：{{product.RAM}}</span>
                </li>
                <li>
                    <span class="spanLeft">物理分辨率：{{ product.Resolution }}</span>
                    <span class="spanRight">屏幕类型：{{product.Screen}}</span>
                </li>
                <li>
                    <span class="spanLeft">商品毛重：{{ product.weight }}</span>
                    <span class="spanRight">商品产地：{{ product.city }}</span>
                </li>
            </ul>
        </div>
        <div class="product">
            <div class="product-image">
                <img :src="product.imagede1">
            </div>
            <div class="product-image">
                <img :src="product.imagede2">
            </div>
        </div>
    </div>
</template>

<script>
    //导入本地数据
    import product_data from '../product.js';

    export default {//暴露数据
        data(){
            return {
                //获取路由中的参数
                id: parseInt(this.$route.params.id),
                product: null
            }
        },
        methods: {
            getProduct(){
                setTimeout( () => {
                    this.product = product_data.find(item => item.id === this.id);
                }, 500);
            },
            handleAddCart(){
                this.$store.commit('addCart', this.id)
            }
        },
        mounted(){
            //初始化数据
            this.getProduct()
        }
    }
</script>
<!-- scoped属性表示只对当前组件有效，不影响其他组件 -->
<style scoped>
    .product,.product-detail{
        margin: 32px;
        padding: 32px;
        background: #fff;
        border: 1px solid #dddee1;
        border-radius: 10px;
        overflow: hidden;
    }
    .product-image{
        width: 50%;
        height: 550px;
        float: left;
    }
    .product-image img{
        height: 100%;
    }
    .product-info{
        width: 50%;
        padding: 150px 0 250px 0;
        height: 150px;
        float: left;
        text-align: center;
    }
    .product-cost{
        font-size: 18px;
        color: #f2352e;
        margin: 8px 0;
    }
    .product-detail{
        text-align: center;
    }
    .product-detail img{
        display: block;
        width: 50%;
        margin: 32px auto;
        padding: 32px;
        border-bottom: 1px solid #dddee1;
    }
    .detail{
        text-align: center;
        margin-top: 20px;
        padding: 0;
        list-style-type: none;
    }
    li{
        margin-left: 15%;
        margin-top: 5px;
        -webkit-font-smoothing: antialiased;
        color: #666;
        text-align: left;
    }
    .spanLeft{
        float: left;
        width: 450px;
    }
    .spanRight{
        width: 300px;
        margin-left: 10%;
    }
</style>