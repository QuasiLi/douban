<template>
    <div class="home">
        <div class="nav">
            <div class="nav-text"><span>豆瓣</span></div>
            <div class="nav-search" @click="goState({name:'Search'})"><img src="../assets/search_list.png" alt="" class="auto-img"></div>
            <div class="nav-people" @click="goState({name:'Register'})"><img class="auto-img" src="../assets/people.png" alt=""></div>
        </div>
        <hr/>
        <div class="hot-film">
            <div class="hot-top-box">
                <div class="hot-text"><span>影院热映</span></div>
                <div class="more" @click="goState({name:'More'})"><span>更多</span></div>
            </div>
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
        <div class="hot-film">
            <div class="hot-top-box">
                <div class="hot-text"><span>新片速递</span></div>
                <div class="more" @click="goState({name:'More'})"><span>更多</span></div>
            </div>
            <div class="qf">
                <div @click="goState({name:'Detail',params:{pid:item.id}})" class="videos" v-for="(item,index) in filmList2">
                    <div>
                        <img class="auto-img fimg" :src="item.images.medium" alt="">
                    </div>
                    <div>
                        <div class="film-title">{{item.title}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="banner-box">
            <div><img class="auto-img" src="../assets/666.jpg" alt=""></div>
            <div><img class="auto-img" src="../assets/777.jpg" alt=""></div>
        </div>
        <div class="classify">
            <div class="classify-title"><span>分类浏览</span></div>
        </div>
        <div class="classify-list">
            <van-row>
                <van-col class="cell-col">
                    <van-list>
                        <van-cell :title="item.title" v-for="(item, index) in listData" :key="index">
                            <div class="classify-icon"><img class="auto-img" src="../assets/arrow-right.png" alt=""></div>
                        </van-cell>
                    </van-list>
                </van-col>
            </van-row>
        </div>
        <div class="buttom-box">
            <div class="buttom">
                <div class="buttom-logo"><img class="auto-img" src="../assets/douban-app-logo.png" alt=""></div>
                <div class="buttom-text"><span>豆瓣</span></div>
            </div>
        </div>
    </div>
</template>

<script>
    const url = '/api/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b'

    import Vue from 'vue'

    import { Row, Col,List,Cell,CellGroup,Icon} from 'vant'

    Vue.use(Row).use(Col).use(List).use(Cell).use(CellGroup).use(Icon)

    export default {
        name: "Home",

        data(){
          return {
              // 电影列表
              filmList:[],

              //电影列表2
              filmList2:[],

              listData: [
                  {title: '动作'},
                  {title: '爱情'},
                  {title: '喜剧'},
                  {title: '科幻'},
                  {title: '奇幻'},
                  {title: '悬疑'},
                  {title: '冒险'},
                  {title: '剧情'},
                  {title: '战争'}
              ]
          }
        },

        created(){
            // 获取数据
            var hotFilm = JSON.parse(localStorage.getItem('hotFilm'))
            // console.log('sdgsd',hotFilm)

            this.axios.get(url).then(r => {
                //写入数据
                localStorage.setItem('hotFilm',JSON.stringify(r.data.subjects))


            }), err => {
                alert(err)
            }

            //获取电影列表
            this.filmList = hotFilm.slice(0,9)
            //
            this.filmList2 = hotFilm.slice(10)

        },

        methods:{
            //跳转以及传值
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
        .nav-people{
            width: 30PX;
            height: 30PX;
            float: right;
            padding: 5PX 0;
            margin-right: 0.2666rem;
        }
    }
    .hot-film{
        .hot-top-box{
            overflow: hidden;
            margin: 0.5333rem 0;
            .hot-text{
                float: left;
                span{
                    margin-left: 0.2666rem;
                    font-size: 18PX;
                }
            }
            .more{
                float: right;
                margin-right: 0.5333rem;
                span{
                    font-size: 14PX;
                    color: green;
                }
            }
        }
        .qf{
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
    }
    .banner-box{
        width: 95%;
        margin: 0.5333rem auto;
    }
    .classify{
        .classify-title{
            span{
                margin-left: 0.2666rem;
                font-size: 18PX;
            }
        }
    }
    .classify-list{
        .cell-col{
            margin-top: 0.5333rem;
            margin-left: 0.2666rem;
        }
        .van-cell{
            overflow: hidden;
            .van-cell__title{
                float: left;
            }
            display: inline-block;
            width: 40%;
            padding: 0.26667rem 0.3rem;
            color: green;
            font-size: 16PX;
            border:1PX solid #ddd;
            border-right: 0PX;
            border-bottom: 0PX;
            .classify-icon{
                display: inline-block;
                float: right;
                width: 24PX;
                height: 24PX;
            }
        }
    }
    .buttom-box{
        width: 100%;
        text-align: center;
        .buttom{
            width: 150PX;
            margin: 30PX auto;
            .buttom-logo{
                width: 50PX;
                height: 50PX;
                float: left;
            }
            .buttom-text{
                padding: 10PX;
                font-size: 24PX;
            }
        }
    }
</style>