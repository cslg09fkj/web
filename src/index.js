import Vue from 'vue';
import VueRouter from 'vue-router';//引入路由
import Routers from './router';
import Vuex from 'vuex';
import App from './app.vue';
import './style.css';
import product_data from './product';
import util from './util';
Vue.use(VueRouter);//定义路由
Vue.use(Vuex);//调用VUEX

//路由配置
const RouterConfig = {
    routes: Routers
};
const router = new VueRouter(RouterConfig);//路由实例化

//配置Vuex状态管理
const store = new Vuex.Store({
    state: {
        //商品列表信息
        productList: [],
        //购物车数据
        cartList: [],
        username: window.sessionStorage.getItem('username'),
        loginStatus: window.sessionStorage.getItem('loginStatus')
    },
    getters: {
        //品牌筛选
        brands: state => {
            const brands = state.productList.map(item => item.brand);
            return util.getFilterArray(brands);//返回满足条件的数组
        },
        //颜色筛选
        colors: state => {
            const colors = state.productList.map(item => item.color);
            return util.getFilterArray(colors);
        }
    },
    mutations: { //同步数据
        //添加商品列表
        setProductList(state, data){
            state.productList = data;
        },
        //添加购物车
        addCart(state, id){
            const add = state.cartList.find(item => item.id === id);
            if(add){
                add.count++;
            }
            else{
                state.cartList.push({
                    id: id,
                    count: 1
                })
            }
        },
        //购物车数量
        editCartCount(state, payload){
            const product = state.cartList.find(item => item.id === payload.id);
            product.count += payload.count;
        },
        //删除购物车
        deleteCart(state, id){
            const index = state.cartList.findIndex(item => item.id === id);
            state.cartList.splice(index, 1)
        },
        //清空购物车
        emptyCart(state){
            state.cartList = [];
        },
        //获取用户
        getUser(state, username){
            state.username = username;
        },
        //获取登录状态
        getLoginStatus(state, flag){
            state.loginStatus = flag;
        }
    },
    actions: {
        //异步请求product list，use setTimeout
        getProductList(context){//商品列表初始化
            setTimeout(() => {
                context.commit('setProductList', product_data)
            }, 500);
        },
        buy(context){
            //After use ajax ask for server do,then clear cart
            return new Promise(resolve => {
                setTimeout(() => {
                    context.commit('emptyCart');
                    resolve();
                }, 500);
            });
        },
    }
});
var app = new Vue({
    el: '#app',
    router,
    store,
    render: h => { //挂载App
        return h(App)
    }
})