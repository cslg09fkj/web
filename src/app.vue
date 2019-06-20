<template>
<!--    主页header&footer内容-->
    <div>
        <template v-if="show">
            <div class="header">
                <router-link to="/list" class="header-home">
                    <img src="/src/images/icon.png" class="icon">
                    	首页
                </router-link>
                <div class="myF">
                    <img src="/src/images/logo.png" alt="F" class="icon">
                    F_Store
                </div>
                <div class="header-user">
                    <router-link to="/cart" class="header-cart">
                        <button type="button" class="btn btn-default">我的购物车
                            <img src="/src/images/cart.png" class="cartIcon">
                            <span v-if="cartList.length">
                                {{ cartList.length }}
                            </span>
                        </button>
                    </router-link>
                </div>
                <div class="header-user">
                    <button type="button" class="btn btn-default">
                        <span class="header-userName">{{ user }}</span>
                    </button>
                </div>
                <div class="header-user">
                    <router-link to="/login/logout">
                        <button type="button" class="btn btn-default" >退出</button>
                    </router-link>
                </div>
            </div>
        </template>
        <template v-if="!show">
            <div class="header">
                <router-link to="/list" class="header-home">
                    <img src="/src/images/icon.png" class="icon">
                    	首页
                </router-link>
                <router-link to="" class="myF">
                    <img src="/src/images/logo.png" alt="F" class="icon">
                    F_Store
                </router-link>
                <div class="header-user">
                    <router-link to="/login/login" class="header-menu-cart">
                        <button type="button" class="btn btn-default">
                            您好，请登录
                        </button>
                    </router-link>
                </div>
            </div>
        </template>
        <router-view></router-view>
        
        <div class="footer">
            <div class="mod_help_list">
                <div class="mod_help_nav">
                    <h4 class="mod_help_nav_tit">购物指南</h4>
                    <ul class="mod_help_nav_con">
                        <li><a href="javascript:void(0);">购物流程</a></li>
                        <li><a href="javascript:void(0);">会员介绍</a></li>
                        <li><a href="javascript:void(0);" target="_blank">生活旅行</a></li>
                        <li><a href="javascript:void(0);" target="_blank">常见问题</a></li>
                        <li><a href="javascript:void(0);" target="_blank">大家电</a></li>
                        <li><a href="javascript:void(0);" target="_blank">联系客服</a></li>
                    </ul></div>
                <div class="mod_help_nav">
                    <h4 class="mod_help_nav_tit">配送方式</h4>
                    <ul class="mod_help_nav_con">
                        <li><a href="javascript:void(0);" target="_blank">上门自提</a></li>
                        <li><a href="javascript:void(0);" target="_blank">211限时达</a></li>
                        <li><a href="javascript:void(0);" target="_blank">配送服务查询</a></li>
                        <li><a href="javascript:void(0);" target="_blank">配送费收取标准</a></li>
                        <li><a href="javascript:void(0);" target="_blank">海外配送</a></li>
                    </ul>
                </div>
                <div class="mod_help_nav">
                    <h4 class="mod_help_nav_tit">支付方式</h4>
                    <ul class="mod_help_nav_con">
                        <li><a href="javascript:void(0);" target="_blank">货到付款</a></li>
                        <li><a href="javascript:void(0);" target="_blank">在线支付</a></li>
                        <li><a href="javascript:void(0);" target="_blank">分期付款</a></li>
                        <li><a href="javascript:void(0);" target="_blank">邮局汇款</a></li>
                        <li><a href="javascript:void(0);" target="_blank">公司转账</a></li>
                    </ul></div>
                <div class="mod_help_nav">
                    <h4 class="mod_help_nav_tit">售后服务</h4>
                    <ul class="mod_help_nav_con">
                        <li><a href="javascript:void(0);" target="_blank">售后政策</a></li>
                        <li><a href="javascript:void(0);" target="_blank">价格保护</a></li>
                        <li><a href="javascript:void(0);" target="_blank">退款说明</a></li>
                        <li><a href="javascript:void(0);" target="_blank">返修/退换货</a></li>
                        <li><a href="javascript:void(0);" target="_blank">取消订单</a></li>
                    </ul>
                </div>
                <div class="mod_help_nav">
                    <h4 class="mod_help_nav_tit">特色服务</h4>
                    <ul class="mod_help_nav_con">
                        <li><a href="javascript:void(0);" target="_blank">夺宝岛</a></li>
                        <li><a href="javascript:void(0);" target="_blank">DIY装机</a></li>
                        <li><a href="javascript:void(0);" target="_blank">延保服务</a></li>
                        <li><a href="javascript:void(0);" target="_blank">TadmE卡</a></li>
                        <li><a href="javascript:void(0);" target="_blank">Tadm通信</a></li>
                        <li><a href="javascript:void(0);" target="_blank">Tadm智能</a></li>
                    </ul>
                </div>
            </div>
            <div class="footinfo">
                关于我们 | 联系我们 | 联系客服 | 合作招商 | 商家帮助 | 营销中心 | 友情链接
                | 销售联盟 | 风险监测 | 隐私政策 | English Site | Media & IR
            </div>
            <div>
                Copyright © 2019 F.com 版权所有 | 消费者维权热线：4006067733
            </div>
            <div class="footer-a">
                <a href="http://t.knet.cn/?verify_searchDM=&isFromVerify=true">可信网站信用评估</a>
                <a href="http://www.cyberpolice.cn">网络警察提醒您</a>
                <a href="https://search.szfw.org/cert/l/CX20120111001803001836" target="_blank">诚信网站</a>
                <a href="http://www.12377.cn/" target="_blank">中国互联网举报中心</a>
                <a href="http://www.12377.cn/node_548446.htm" target="_blank">网络举报APP下载</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return { //加载username
                user: this.$store.state.username
            }
        },
        computed: {
            cartList(){ //加载cart data
                return this.$store.state.cartList;
            },
            show(){ //确定登录状态
                return this.$store.state.loginStatus;
            }
        }
    }
</script>