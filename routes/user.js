const router = require('koa-router')()
import User from '../controller/user/user'

// import userModel from '../models/user'
// const User = require('../models/user')


router.prefix('/admin')

router.post('/register', User.register)
router.post('/login', User.login)
router.post('/sendCode', User.sendCode)
router.post('/getUserList', User.getUserList)



module.exports = router