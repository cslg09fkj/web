const routers = [
    {
        path: '/product/:id',
        component: (resolve) => require(['./views/product.vue'], resolve)
    },
    {
        path: '/list',
        component: (resolve) => require(['./views/list.vue'], resolve)//第二参数回调函数
    },
    {
        path: '/cart',
        component: (resolve) => require(['./views/cart.vue'], resolve)
    },
    {
        path: '/login/:loginStatus',
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
    {
        path: '/',
        redirect: '/list'
    }
];
export default routers;
