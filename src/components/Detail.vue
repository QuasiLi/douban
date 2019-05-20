<template>
    <div class="detail">
        <div class="nav">
            <div class="nav-text" @click="goState({name:'Home'})"><span>豆瓣</span></div>
        </div>
        <hr/>
        <div class="title-box">
            <div class="title">{{currentInfo.title}}</div>
        </div>
        <div class="content-box">
            <div class="content-img"><img class="auto-img" :src="currentInfo.images.medium"></div>
        </div>
        <div class="look-box">
            <div class="look-l" @click="toastShow">想看</div>
            <div class="look-r" @click="toastShow">看过</div>
        </div>
        <div class="channel-box">
            <div class="channel-text">
                <span>所属频道</span>
            </div>
            <div class="channel-btn" >
                <div class="btn" v-for="(item,index) in filmChannel">{{item}} <span>></span></div>
            </div>
        </div>
        <div class="intro-box">
            <div class="intro-title">
                {{currentInfo.title}}的剧情简介
            </div>
            <div class="intro-text">
                {{this.filmSummary}}
            </div>
        </div>
    </div>
</template>

<script>

    const url = '/info/subject/26311974?apikey=0b2bdeda43b5688921839c8ecb20399b'

    import { Toast } from 'vant'

    export default {
        name: "Detail",

        data(){
            return {
                //电影信息所属频道
                filmChannel:[],

                //电影信息简介
                filmSummary:null,

                title:'',
            }
        },

        components:{
          [Toast.name]:Toast
        },

        created(){
            // 获取电影数据
            var hotFilm = JSON.parse(localStorage.getItem('hotFilm'))
            //console.log('asf',hotFilm)

            //遍历电影id
            for(var i = 0; i < hotFilm.length; i++){
                if(this.$route.params.pid == hotFilm[i].id){
                    this.currentInfo = hotFilm[i]
                    break
                }
            }
            //console.log('asfa',this.currentInfo)

            //获取电影信息数据
            var filmUrl = '/info/subject/' + this.currentInfo.id + '?apikey=0b2bdeda43b5688921839c8ecb20399b'
            // console.log('filmUrl',filmUrl)
            this.axios.get(filmUrl).then(r => {
                // console.log('rrrr =>',r)
                // localStorage.setItem('filmInfo',JSON.stringify(r.data))
                //console.log('asgs',r.data.summary)
                this.filmSummary = r.data.summary
            })

            //获取电影信息所属频道
            this.filmChannel = this.currentInfo.genres
        },

        mounted(){

        },

        methods:{
            //跳转
            goState(path){
                this.$router.push(path)
            },

            //轻提示
            toastShow(){
                console.log('dsgsd')
                this.$toast('请先登录')
            }

        }

    }
</script>

<style scoped lang="less">
    .nav{
        overflow: hidden;
        margin: 0.2666rem 0;
        .nav-text{
            width: 50PX;
            height: 30PX;
            display: inline-block;
            line-height: 30PX;
            vertical-align: middle;
            margin: 0.1333rem 0 0.1333rem 0.2666rem;
            span{
                font-size: 20PX;
                color: limegreen;
                font-weight: bold;
            }
        }
        .nav-search{
            width: 30PX;
            height: 30PX;
            vertical-align: middle;
            display: inline-block;
        }
    }
    .title-box{
        margin-top: 0.4rem;
        margin-left: 0.2666rem;
        .title{
            font-size: 26PX;
        }
    }
    .content-box{
        margin-top: 0.4rem;
        margin-left: 0.2666rem;
        margin-right: 0.2666rem;
    }
    .look-box{
        text-align: center;
        overflow: hidden;
        margin-top: 0.8rem;
        .look-l{
            margin-left: 0.2666rem;
            padding: 5px 70px;
            border: 1PX solid orange;
            border-radius: 5PX;
            float: left;
            font-size: 14px;
        }
        .look-r{
            margin-right: 0.2666rem;
            padding: 5px 70px;
            border: 1PX solid orange;
            border-radius: 5PX;
            float: right;
            font-size: 14px;
        }
    }
    .channel-box{
        margin-top: 0.8rem;
        margin-left: 0.2666rem;
        .channel-text{
            span{
                font-size: 18PX;
                color: gray;
            }
        }
        .channel-btn{
            margin-top: 0.4rem;
            text-align: center;
            overflow: hidden;
            .btn{
                margin-right: 0.2666rem;
                margin-bottom: 0.2666rem;
                width: 80PX;
                height: 30PX;
                line-height: 30PX;
                border: 1px solid green;
                border-radius: 10PX;
                font-size: 14PX;
                color: green;
                float: left;
                span{
                    font-size: 14PX;
                    margin-left: 0.2666rem;
                }
            }
        }
    }
    .intro-box{
        margin: 0.4rem 0.2666rem 0.8rem 0.2666rem;
        .intro-title{
            font-size: 18PX;
            color: gray;
        }
        .intro-text{
            margin-top: 0.2666rem;
            font-size: 16PX;
        }
    }
</style>