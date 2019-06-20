<template class="container">
    <table class="table table-hover" v-if="cartList.length">
        <thead>
            <tr>
                <th>商品信息</th>
                <th>商品单价</th>
                <th>商品数量</th>
                <th>小计</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in cartList">
                <td class="cart-info">
                    <img :src="productDictList[item.id].image">
                    <router-link :to="'/product/' + item.id">
                        {{ productDictList[item.id].name }}</router-link>
                </td>
                <td class="price">
                    ¥ {{ productDictList[item.id].cost }}
                </td>
                <td>
                    <button class="btn btn-default" @click="handleCount(index, -1)" :disabled="item.count === 1">-</button>
                    <input type="text" class="btn" disabled v-model="item.count">
                    <button class="btn btn-default" @click="handleCount(index, 1)">+</button>
                </td>
                <td class="price">
                    ¥ {{ productDictList[item.id].cost * item.count }}
                </td>
                <td>
                    <button  class="btn btn-primary" @click="handleDelete(index)">移除</button>
                </td>
            </tr>
        </tbody>
        <div class="cart-footer">
            <div class="cart-footer-info">
                共计 <span class="count">{{ countAll }}</span> 件
            </div>
            <div class="cart-footer-info">
                应付总金额(RMB)
                <span class="price">¥ {{ costAll - promotion }}</span>
            </div>
            <div class="cart-footer-info">
                <button class="btn btn-success" @click="handleOrder">马上支付</button>
            </div>
        </div>
    </table>
    <div class="empty" v-else>当前购物车暂无商品,快去加入商品吧！</div>
</template>
<script>
    import product_data from '../product';
    export default {
        name: "cart",
        data(){
            return {
                promotion: 0,
                promotionCode: '',
                productList: product_data
            }
        },
        computed: {
            cartList(){
                return this.$store.state.cartList;
            },
            productDictList(){//将productList传入dict
                const dict = {};
                this.productList.forEach(item => {
                    dict[item.id] = item;
                });
                return dict;
            },
            countAll(){
                let count = 0;
                this.cartList.forEach(item => {
                    count += item.count;
                });
                return count;
            },
            costAll(){
                let cost = 0;
                this.cartList.forEach(item => {
                    cost += this.productDictList[item.id].cost * item.count;
                });
                return cost;
            }
        },
        methods: {
            handleOrder(){
                this.$store.dispatch('buy').then(() => {
                    window.alert('购买成功');
                })
            },
            handleCount(index, count){
                if(count < 0 && this.cartList[index].count === 1) return;
                this.$store.commit('editCartCount', {
                    id: this.cartList[index].id,
                    count: count
                });
            },
            handleDelete(index){
                this.$store.commit('deleteCart', this.cartList[index].id);
            }
        }
    }
</script>

<style scoped>
    table{
        margin: 0 5px 0 5px;
    }
    tr{
        width: 15%;
    }
    img{
        width: 40px;
        height: 40px;
    }
    .price{
        color: red;
        padding-top: 18px;
    }
    .promo{
        padding-left: 30px;
    }
    .count{
        color: red;
    }
    .cart-footer{
        padding: 32px;
    }
    .cart-footer-info{
        display: inline-block;
        padding: 0 16px;
        font-size: 18px;
        /*margin-left: 10%;*/
    }
    .empty{
        text-align: center;
        font-size: 18px;
        margin-top: 20px;
    }
</style>