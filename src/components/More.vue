<template>
    <div class="more">
        <div class="nav">
            <div class="nav-text" @click="goState({name:'Home'})"><span>豆瓣</span></div>
        </div>
        <hr>
        <div class="hot-top-box">
            <div class="hot-text"><span>更多电影</span></div>
        </div>
        <div class="filmList">
            <div class="qf">
                <div @click="goState({name:'Detail',params:{pid:item.id}})" class="videos" v-for="(item,index) in filmList">
                    <div>
                        <img class="auto-img fimg" :src="item.images.medium" alt="">
                    </div>
                    <div>
                        <div class="film-title">{{item.title}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "More",

        data(){
          return {
              filmList:[]
          }
        },

        created(){
            //获取电影列表数据
            var hotFilm = JSON.parse(localStorage.getItem('hotFilm'))
            //console.log('sgsd',hotFilm)
            this.filmList = hotFilm
        },

        methods:{
            goState(path){
                this.$router.push(path)
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
    .hot-top-box{
        overflow: hidden;
        margin: 0.4rem 0;
        .hot-text{
            float: left;
            span{
                margin-left: 0.2666rem;
                font-size: 18PX;
            }
        }
    }
    .qf{
        margin-top: 0.2666rem;
        display: inline-block;
        .videos{
            width: 110PX;
            float: left;
            margin: 0.1333rem 0.3333rem;
            text-align: center;
            .fimg{
                width: 110PX;
                height: 145PX;
            }
            .film-title{
                font-size: 14PX;
                margin: 0.1333rem 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
</style>