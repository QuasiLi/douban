export default {
    //验证手机号
    validPhone(value){
        return new RegExp('^1[3456789]\\d{9}$').test(value)
    },

    //验证密码
    validPassword(value,min,max){ // \w 匹配字母或数字或下划线或汉字 等价于 '[^A-Za-z0-9_]'
        return new RegExp('^[!@\\.\\w]{'+ min +',' + max + '}$').test(value);
    },

    //验证密码两值===严格相等
    validEqual(v1,v2){
        return Object.is(v1,v2)
    },

    randomValidCode(){
        //获取时间
        //substr(start,length)
        //时间 -> 返回毫秒数 -> 转成字符串 -> 抽取字符串(从倒数第三个开始，取3个)
        var time = new Date().getTime().toString().substr(-3,3)

        //获取随机数
        //随机数 -> 转成字符串 -> 抽取字符串(从倒数第三个开始，取3个)
        var random = Math.random().toString().substr(-3,3)

        //concat() 方法用于连接两个或多个数组。
        // 该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本
        return time.concat(random)
    }
}