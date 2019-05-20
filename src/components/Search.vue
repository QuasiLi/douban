<template>
    <div class="search">
        <div class="back" @click="back">关闭</div>
        <div class="search-box">
            <input class="s" type="search" placeholder="请输入关键字" v-model="keyWord">
            <input class="b" type="button" value="搜索" @click="onSearch">
        </div>
        <div class="history">
            <p>搜索历史</p>
        </div>
        <div class="his-box">
            <div class="his-text" v-for="(item,index) in searchHistory" @click="searchForTag(item)"><span>{{item}}</span></div>
        </div>
        <div class="film-data">
            <div class="filmList">
                <div class="qf">
                    <div @click="goState({name:'Detail',params:{pid:item.id}})" class="videos" v-for="(item,index) in searchFilm">
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
    </div>
</template>

<script>
    import { Search } from 'vant';

    export default {
        name: "Search",

        data(){
            return {
                keyWord:'流浪地球',

                //搜索电影
                searchFilm:[],

                //当前搜索电影历史记录
                searchHistory:[]
            }
        },

        components:{
            [Search.name]:Search
        },

        created(){
          //获取当前的搜索电影记录
            var searchHistoryData = localStorage.getItem('searchHistory')
            console.log('sdgds',searchHistoryData)

            this.searchHistory = searchHistoryData == undefined ? [] : JSON.parse(searchHistoryData)
        },

        methods:{
            //跳转事件
            goState(path){
              this.$router.push(path)
            },
            back(){
              this.$router.go(-1)
            },

            //搜索事件
            onSearch(){
                if(this.keyWord == '' || this.keyWord == undefined){
                    // this.$toast('搜索关键不能为空')
                    alert('搜索关键不能为空')
                    return
                }

                this.searchFilm = []

                var match = new RegExp('(' + this.keyWord + ')','img')
                // new RegExp('(水)?(井)?')   (水井) | ((水)?(井)?)
                //console.log('match ==>',match)

                //1、获取电影列表
                var filmData = JSON.parse(localStorage.getItem('hotFilm'))
                //console.log('asfag',filmData)

                //2、遍历电影列表，符合的就push
                filmData.forEach(v => {
                    if(match.test(v.title)){
                        this.searchFilm.push(v)
                    }
                })

                if (!this.searchHistory) {

                    this.searchHistory = [];

                } else if (this.searchHistory.length >= 10) {

                    //当超过第10个，弹出第1个
                    this.searchHistory.shift();

                }

                this.searchHistory.push(this.keyWord)

                localStorage.setItem('searchHistory',JSON.stringify(this.searchHistory))
            },

            searchForTag(keyWord) {
                this.keyWord = keyWord;
                this.onSearch();
            }
        }
    }
</script>

<style scoped lang="less">
    .back{
        float: left;
        padding: 0.1066rem;
        font-size: 16PX;
        color: green;
        margin: 0 0.2666rem
    }
    .search-box{
            margin: 0.4rem 0.2666rem 0 0.2666rem;
            .s{
                padding: 5PX 10PX;
                border: 2PX solid green;
                width: 70%;
                outline: none;
        }
            .b{
                vertical-align: bottom;
                padding: 5PX 10PX;
                border: 2PX solid green;
                border-left: none;
                color: white;
                background-color: green;
                outline: none;
        }
    }
    .history{
        margin-top: 0.4rem;
        margin-left: 0.2666rem;
        p{
            font-size: 16PX;
        }
    }
    .his-box{
        margin-top: 0.2666rem;
        margin-left: 0.2666rem;
        overflow: hidden;
        .his-text{
            float: left;
            padding: 3PX 12PX;
            background-color: #ddd;
            margin-right: 0.8rem;
            margin-bottom: 0.4rem;
            max-width: 260PX;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
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

</style>