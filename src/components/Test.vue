<template>
    <button @click="getFilm">获取正在热映电影数据</button>
</template>

<script>
    const url = '/api/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b'
    const url2 = '/info/subject/'
    export default {
        name: "Test",

        data(){
            return{
                filmId:null
            }
        },

        methods:{
            getFilm(){
                this.axios.get(url).then(r => {
                    localStorage.setItem('hotFilm2',JSON.stringify(r.data.subjects))
                }), err => {
                    alert(err)
                }
            }
        },

        mounted(){


            // var filmUrl = url2 + this.currentInfo.id
            // //console.log('filmUrl',filmUrl)
            // this.axios.get(filmUrl).then(r => {
            //     localStorage.setItem('filmInfo',JSON.stringify(r.data))
            // })
        }
    }
</script>

<style scoped>

</style>