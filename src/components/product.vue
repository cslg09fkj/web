<template>
<!--    产品主页显示-->
    <div class="product">
        <router-link :to="'/product/' + info.id" class="product-main">
            <img :src="info.image">
            <h4>{{ info.name }}</h4>
            <h4>销量 {{ info.sales }}</h4>
            <!--根据产品颜色自动显示例色-->
            <div class="product-color" :style="{ background: colors[info.color] }"></div>
            <div class="product-cost">秒杀价：￥ {{ info.cost }}</div>
            <!-- 阻止事件的冒泡,防止点击的同时会触发a标签进入商品详情页,此时只执行handleAddCart-->
            <div class="product-add-cart" @click.prevent="handleAddCart">
                加入购物车
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        props: {
            info: {}
        },
        data () {
            return {
                colors: {
                    '白色': '#ffffff',
                    '金色': '#dac272',
                    '蓝色': '#233472',
                    '红色': '#f2352e',
                    '黑色': '#000000',
                    '银色': '#C0C0C0',
                    '冰钻金':'#BCB2A9',
                    '玫瑰金':'#DACBC4',
                    '灰色':'#808394',
                    '枪灰色':'#4C4C4C'
                },
            }
        },
        methods: {
            handleAddCart(){
                if(this.$store.state.loginStatus){
                    this.$store.commit('addCart', this.info.id);
                }
                else{
                    window.alert('您还未登录！');
                    window.location.href = '/login/:loginStatus';
                }
            }
        }
    }
</script>
<!-- scoped属性表示只对当前组件有效，不影响其他组件 -->
<style scoped>
    .product{
        width: 25%;/*一行显示4个*/
        float: left;
    }
    .product-main{
        display: block;
        margin: 16px;
        padding: 16px;
        border: 1px solid #dddee1;
        border-radius: 6px;
        overflow: hidden;
        background: #fff;
        text-align: center;
        position: relative;
    }
    .product-main img{
        width: 100%;
    }
    h4{
        overflow: hidden;
        text-overflow: ellipsis;/*显示省略符号来代表被修剪的文本*/
        white-space: nowrap;/*规定段落中的文本不进行换行*/
    }
    .product-main:hover h4{
        color: red;
    }
    .product-color{
        display: block;
        width: 16px;
        height: 16px;
        border: 1px solid #dddee1;
        border-radius: 50%;
        margin: 6px auto;
    }
    .product-cost{
        color: #de4037;
        margin-top: 6px;
    }
    .product-add-cart{
        display: none;
        padding: 4px 8px;
        background: #2d8cf0;
        color: #fff;
        font-size: 12px;
        border-radius: 3px;
        cursor: pointer;
        position: absolute;
        top: 5px;
        right: 5px;
    }
    .product-main:hover .product-add-cart{
        display: inline-block;
    }
</style>