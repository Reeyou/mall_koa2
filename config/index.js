/**
*@description 存储配置
*@author bokolin
*/

// redis 地址和端口
const redis = {
    get host () {
        return '127.0.0.1'
    },
    get port () {
        return 6379
    }
}
const smtp = {
    get host () {
        return 'smtp.qq.com'
    },
    get user () {
        return '993830137@qq.com' // qq邮箱名
    },
    get pass () {
        return 'wifxfqaogoeqbfgg' // qq邮箱授权码
    },
    get code () {
        return () => {
            return Math.random()
                .toString(16)
                .slice(2, 6)
                .toUpperCase()
        }
    },
    // 定义验证码过期时间rules，5分钟
    get expire () {
        return () => {
            return new Date().getTime() + 5 * 60 * 1000
        }
    }
}
export {
    redis,
    smtp
}