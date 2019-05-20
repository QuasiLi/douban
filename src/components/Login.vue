<template>
    <div class="login">
        <div class="title-box">
            <span>登录豆瓣</span>
        </div>
        <div class="inner-box">
            <div class="inner">
                <div class="phone">手机号: <input type="text" v-model="userInfo.phone" placeholder="请输入手机号"></div>
                <div class="password">密码: <input type="password" v-model="userInfo.password" placeholder="密码(8-16位)"></div>
            </div>
        </div>
        <div class="skip" @click="goState({name:'Register'})">
            <div><a href="#">没有账号？立即注册</a></div>
        </div>
        <div class="login-btn" @click="login">
            <button>登录</button>
        </div>
    </div>
</template>

<script>
    import validForm from '../utils/validForm.js'

    import { Toast } from 'vant'

    export default {
        name: "Login",

        data(){
          return {
              // 用户列表
              users:[],

              components:{
                  [Toast.name]:Toast
              },

              //用户信息
              userInfo:{
                  phone:'',
                  password:''
              }
          }
        },

        methods:{
            goState(path){
                this.$router.push(path)
            },

            //登录
            login(){
                //验证手机号
                if(!validForm.validPhone(this.userInfo.phone)){
                    this.$toast('手机号不正确,请重新输入')
                    this.userInfo.phone = ''
                }else if(!validForm.validPassword(this.userInfo.password,8,16)){ //验证密码
                    this.$toast('密码只支持!@_.字母数字组合,请重新输入')
                    this.userInfo.password = ''
                }else{
                    var usersData = localStorage.getItem('users')

                    //如果用户存在
                    if(usersData){
                        this.users = JSON.parse(usersData)

                        for(var i = 0; i < this.users.length; i++){
                            if(this.users[i].phone == this.userInfo.phone){
                                //如果手机号匹配，验证密码
                                if(this.users[i].password == this.userInfo.password){
                                    //保存用户登录状态
                                    localStorage.setItem('userLogin',JSON.stringify({userId:this.userInfo.phone,loginStatus:true}))

                                    this.$toast('登录成功')
                                    //跳转
                                    this.$router.push({name:'Home'})
                                }
                            }
                        }
                    }else{
                        //用户不存在
                        this.$toast('该用户不存在，请先注册')
                        this.userInfo.phone = ''
                        this.userInfo.password = ''
                    }
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .title-box{
        width: 100%;
        margin-top: 1.6rem;
        text-align: center;
        span{
            font-size: 30PX;
        }
    }
    .inner-box{
        margin-top: 0.8rem;
        .inner {
            font-size: 16PX;
            div {
                width: 8rem;
                margin: 0rem auto;
                padding: 12px 0;
                border-top: 1px solid lightgray;
                border-bottom: 1px solid lightgrey;
                input {
                    border: none;
                    outline: none;
                }
            }
            .note{
                .send{
                    padding: 2px 5px;
                    background-color: limegreen;
                    color: white
                }
            }
        }
    }
    .skip{
        width: 8rem;
        margin: 0.1333rem auto;
        a{
            color: gray;
        }
    }
    .login-btn{
        text-align: center;
        margin-top: 0.4rem;
        button{
            outline: none;
            padding: 10px 100px;
            background-color: limegreen;
            border: none;
            font-size: 16px;
            color: white;
            border-radius: 5px;
        }
    }
</style>