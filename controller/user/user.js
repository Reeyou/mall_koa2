'use strict'

import userModel from '../../models/user'
import formidable from 'formidable'

class user {
  async register(ctx, next) {
    const { username,password } = ctx.request.body
    let code, msg, data
  let user = new userModel({
    username,
    password,
  })
  try {
    data = await user.save()
    code = 200
    msg = '注册成功'
  } catch(e) {
    code = -1
    msg = '注册失败'
  }
  ctx.response.body = {
    code,
    msg,
    data
  }
    // const form = new formidable.IncomingForm()
    // let code, msg, data
    // console.log(111)
    // console.log(ctx)
    // // debugger
    // const req = ctx.request
    // form.parse(req, async (err, fields, files) => {
    //   if(err) {
    //     console.log(err)
    //     return
    //   }
    //   const userData = {
    //     username: fields.username,
    //     password: fields.password
    //   }
    //   try {
    //     const userEntity = await userModel.create(userData)
    //     data = await userEntity.save()
    //     code = 200
    //     msg = '注册成功'
    //   } catch (error) {
    //     console.log(error)
    //   }
    //   ctx.body = {
    //     code: code,
    //     msg: msg,
    //     data,
    //   }
    // })
  }
}

export default new user()