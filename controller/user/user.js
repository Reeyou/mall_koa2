'use strict'

import userModel from '../../models/user'
import ServerResponse from '../../common/serverResponse'

class user {
  async register(ctx, next) {
    let code, msg, data
    const {username, password} = ctx.request.body
    if(!username) {
      throw new Error('用户名参数错误')
    } else if(!password) {
      throw new Error('缺少password参数')
    }
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
  }

  async login(ctx) {
    let code, msg, user
    const {username, password} = ctx.request.body
    if(!username) {
      throw new Error('缺少username参数')
    } else if(!password) {
      throw new Error('缺少password参数')
    }
    try {
        user = await userModel.findOne({ username, password }, null, { lean: true })
        if(!user) {
         return ServerResponse.ILLEGAL_ARGUMENT(ctx, '用户名或密码错误')
        } else {
          return ServerResponse.SUCCESS(ctx,'登录成功',{})
        }
      } catch(e) {
        return ServerResponse.ERROR(ctx,e,{})
      }
  }
}

export default new user()