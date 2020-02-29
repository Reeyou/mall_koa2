const router = require('koa-router')()
import User from '../controller/user/user'

// import userModel from '../models/user'
// const User = require('../models/user')


router.prefix('/admin')

router.post('/register', User.register)
// router.post('/register', async(ctx,next) => {
//   const { username,password } = ctx.request.body

//   let user = new User({
//     username,
//     password,
//   })
//   try {
//     data = await user.save()
//     code = 200
//     msg = '注册成功'
//   } catch(e) {
//     code = -1
//     msg = '注册失败'
//   }
//   ctx.response.body = {
//     code,
//     msg,
//     data
//   }
// })


module.exports = router