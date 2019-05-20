<template>
    <div class="register">
        <div class="title-box">
            <span>注册豆瓣</span>
        </div>
        <div class="inner-box">
            <div class="inner">
                <div class="phone">手机号: <input type="text" v-model="userInfo.phone" placeholder="请输入手机号"></div>
                <div class="password">密码: <input type="password" v-model="userInfo.password" placeholder="密码(8-16位)"></div>
                <div class="repassword">密码确认: <input type="password" v-model="userInfo.repassword" placeholder="确认密码"></div>
                <div class="note">短信验证码:<input type="text" v-model="userInfo.note"><input @click="sendCode" class="send" type="button" :value="value"></div>
            </div>
        </div>
        <div class="skip" @click="goState({name:'Login'})">
            <div><a href="#">已有账号？立即登录</a></div>
        </div>
        <div class="login-btn">
            <button @click="register">注册</button>
        </div>
    </div>
</template>

<script>
    import validForm from '../utils/validForm.js'

    import tool from '../utils/tool.js'

    import { Toast } from 'vant'

    export default {
        name: "Register",

        data(){
          return {
              //用户信息
              userInfo:{
                  phone:'',
                  password:'',
                  repassword:'',
                  note:''
              },

              components:{
                  [Toast.name]:Toast
              },

              //随机验证码
              randomCode:'',

              value:'发送验证码',

              //用户列表
              users:[]

          }
        },

        methods:{
            //跳转
            goState(path){
                this.$router.push(path)
            },

            //注册
            register(){
                //验证手机号
                if(!validForm.validPhone(this.userInfo.phone)){
                    this.$toast('手机号不正确,请重新输入')
                    this.userInfo.phone = ''
                }else if(!validForm.validPassword(this.userInfo.password,8,16)){ //验证密码
                    this.$toast('密码只支持!@_.字母数字组合,请重新输入')
                    this.userInfo.password = ''
                }else if(!validForm.validEqual(this.userInfo.password,this.userInfo.repassword)){
                    this.$toast('两次密码不一致，请重新输入')
                    this.userInfo.repassword = ''
                }else if(!validForm.validEqual(this.randomCode,this.userInfo.note) || this.userInfo.note < 6){
                    this.$toast('验证码不正确，请重新输入')
                    this.userInfo.note = ''
                }else{
                    //注册前需要验证是否注册过
                    for(var i = 0; i < this.users.length; i++){
                        if(this.users[i].phone == this.userInfo.phone){
                            this.$toast('该手机号已注册')
                            return
                        }
                    }

                    //如果不存在该用户，则写入本地服务
                    //生成用户信息
                    var time = new Date()
                    var dbid = 'db' + time.getTime()
                    var phone = this.userInfo.phone
                    var password = this.userInfo.password
                    var registerTime = tool.format(time, 'yyyy-MM-dd hh:mm:ss')

                    var user = {
                        dbid,
                        phone,
                        password,
                        registerTime
                    }

                    this.users.push(user)
                    var usersData = JSON.stringify(this.users)

                    //写入到本地存储
                    localStorage.setItem('users',usersData)

                    this.$toast('注册成功')
                    this.$router.push({name:'Login'})
                }
            },

            //发送验证码
            sendCode(){
                var btn = document.querySelector('.send')
                if(!validForm.validPhone(this.userInfo.phone)){
                    this.$toast('手机号不正确,请重新输入')
                    this.userInfo.phone = ''
                }else{
                    //60秒后自动恢复
                    var time = 5

                    btn.style.backgroundColor = 'gray'

                    this.value = time + '秒后重发'

                    var timer = setInterval(() => {
                        if(time <= 0){

                            btn.style.backgroundColor = 'limegreen'

                            this.value = '发送验证码'

                            clearInterval(timer)
                            time = null
                        }else{
                            this.value = --time + '秒后重发'
                        }
                    },1000)

                    //发送验证码
                    this.randomCode = validForm.randomValidCode()
                    this.$toast('验证码是' + this.randomCode)
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
                width: 9rem;
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
        width: 9rem;
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