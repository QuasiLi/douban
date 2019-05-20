//导入文件时，如果没有./,默认从node_modules查找文件
import routesComponent from './routesComponent.js'

//路由配置
export  default [
    {
        path:'/test',
        name:'Test',
        component:routesComponent.Test
    },
    {
        path:'/detail/:pid',
        name:'Detail',
        component:routesComponent.Detail
    },
    {
        path:'/',
        name:'Home',
        component:routesComponent.Home
    },
    {
        path:'/more',
        name:'More',
        component:routesComponent.More
    },
    {
        path:'/search',
        name:'Search',
        component:routesComponent.Search
    },
    {
        path:'/register',
        name:'Register',
        component:routesComponent.Register
    },
    {
        path:'/login',
        name:'Login',
        component:routesComponent.Login
    }
]