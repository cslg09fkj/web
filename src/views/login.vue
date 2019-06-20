<template>
    <div class="signupbg">
        <template v-if="login">
            <div>
                <form class="login-info-form">
                <p>账户登录</p><br>
                <div class="form-group col-md-12">
                    <input placeholder="用户名/手机号" class="form-control" type="text" v-model="username" maxlength="20"/>
                </div>
                <div class="form-group col-md-12">
                    <input placeholder="输入密码" class="form-control" type="password" v-model="password" maxlength="15"/>
                </div>
                <div>
                    <button type="submit" @click="toShop" class="btn btn-primary">登录</button>
                    <button type="button" @click="changeLogin(false,true)" class="btn btn-primary">去注册</button>
                </div>
                <div class="footer">© 2019 Tadm.com 版权所有</div>
            </form>
            </div>
        </template>
        <template v-if="register">          
            <form class="login-info-form">
                <p>欢迎注册</p><br>
                <div class="form-group col-md-12">
                    <input placeholder="用户名/手机号" class="form-control" type="text" v-model="username" maxlength="20"/>
                </div>
                <div class="form-group col-md-12">
                    <input placeholder="输入密码" class="form-control" type="password" v-model="password" maxlength="15"/>
                </div>
                <div class="form-group col-md-12">
                    <input placeholder="确认密码" class="form-control" type="password" v-model="confirmPassword" maxlength="15"/>
                </div>
                <div>
                    <button type="submit" @click="Register" class="btn btn-primary">注册</button>
                    <button type="button" @click="changeLogin(true,false)" class="btn btn-primary">已有账号</button>
                </div>
            </form>
        </template>
    </div>
</template>

<script>
    import util from '../util';
    export default {
        name: "login",
        data(){
            return {
                login: false,
                register: true,
                username: '',
                password: '',
                confirmPassword: '',
            }
        },
        methods: {
            Register(){
                if(!util.trim(this.username) || !util.trim(this.password) ){
                    window.alert('账号或密码不能为空');
                    return;
                }
                if(this.confirmPassword !== this.password){
                    window.alert('密码不一致，请重新输入');
                    this.password = '';
                    this.confirmPassword = '';
                }
                else{
                    window.sessionStorage.setItem('username', this.username);
                    window.sessionStorage.setItem('password', this.password);
                    this.register = false;
                    window.sessionStorage.setItem('loginStatus', 'login');
                    this.$store.commit('getUser', this.username);
                    console.log(window.sessionStorage);
                    console.log(sessionStorage.getItem('username'));
                    console.log(this.password);
                    window.alert('注册成功，进入网站首页');
                    window.location.href = '/list';//窗口wed地址
                }
            },
            changeLogin(l, r){
                this.login = l;
                this.register = r;
            },
            toShop(){
                let username = window.sessionStorage.getItem('username');
                let password = window.sessionStorage.getItem('password');
                if(!util.trim(this.username) || !util.trim(this.password) ){
                    window.alert('账号或密码不能为空');
                    return;
                }
                console.log(window.sessionStorage);
                console.log(this.username);
                console.log(this.password);
                if(username === this.username && password === this.password){
                    this.login = false;
                    window.sessionStorage.setItem('loginStatus', 'login');
                    this.$store.commit('getUser', this.username);
                    window.alert('登录成功，进入网站首页');
                    window.location.href = '/list';
                }
                else{
                    window.alert('账号或密码错误');
                }
            },
        }
    }
</script>

<style scoped>
    .signupbg{
        background-image: url("/src/images/signupbg.jpg");
        background-size: 100% 100%;
        background-repeat:repeat-x;
    }
    .login-info-form{
        width: 350px;
        height: 500px;
        background-color: #E9E9F2;
        position: relative;
        margin-left: 40%;
    }
    p{
        font-size: 16px;
        color: #3c3c3c;
        font-weight: 700;
        text-align: center;
        padding-top: 20px;
     }
    button{
        width: 80px;
        margin-left: 60px;
        margin-top: 50px;
    }
    .footer{
        color: #ccc3c3;
        font: 13px/1.5 "Microsoft YaHei",tahoma,arial,'Hiragino Sans GB','\5b8b\4f53',sans-serif;
        margin-left: 25%;
        position: absolute;
        bottom: 0px;
    }
</style>