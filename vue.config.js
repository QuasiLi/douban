const url = 'https://api.douban.com/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b'
const url2 = 'http://api.douban.com/v2/movie/subject/26835471?apikey=0b2bdeda43b5688921839c8ecb20399b'

module.exports = {

    baseUrl: "./",

    configureWebpack: {
        devServer:{
            proxy: {
                "/api": {
                    target: "https://api.douban.com/v2/movie",
                    pathRewrite: {"^/api" : ""},
                    changeOrigin:true
                },
                "/info": {
                    target: "https://api.douban.com/v2/movie",
                    pathRewrite: {"^/info" : ""},
                    changeOrigin:true
                },
            }
        }
    }
}