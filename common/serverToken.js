// 创建token
const jwt = require('jsonwebtoken')

/**
 * 创建token
 * @param {*} id 
 */
const createToken = (id) => {
    const token = jwt.sign(
        {
            id: id
        },
        'cedric1990',
        {
            expiresIn: '300s'
        }
    )

    return token
}

/**
 * 
 */
const checkToken = async (ctx, next) => {
    // 检验是否存在 token
    // axios.js 中设置了 authorization
    const authorization = ctx.get('Authorization')
    if (authorization === '') {
        ctx.throw(401, 'no token detected in http headerAuthorization')
    }

    const token = authorization.split(' ')[1]

    // 检验 token 是否已过期
    try {
        await jwt.verify(token, 'cedric1990')
    } catch (err) {
        ctx.throw(401, 'invalid token')
    }

    await next()
}

export {
    createToken,
    checkToken
}