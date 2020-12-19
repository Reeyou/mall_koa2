'use strict'

import userModel from '../../models/user'
import ServerResponse from '../../common/serverResponse'
import { smtp } from '../../config'
import { checkToken, createToken } from '../../common/serverToken'
const nodemailer = require("nodemailer")
const Redis = require('koa-redis')
const Store = new Redis().client
class user {
    /**
     * 注册验证码
     * @param {*} code 
     */
    async sendCode (ctx) {
        const { email } = ctx.request.body
        const saveExpire = await Store.hget(`nodemail:${email}`, 'expire')
        // 检验已存在的验证码是否过期，以限制用户频繁发送验证码
        if (saveExpire && new Date().getTime() - saveExpire < 0) {
            return ServerResponse.ERROR(ctx, '发送过于频繁，请稍后再试', {})
        }
        const transporter = nodemailer.createTransport({
            host: smtp.host,
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: smtp.user,
                pass: smtp.pass
            },
        });
        const mailOptions = {
            from: '"Fred Foo 👻" <993830137@qq.com>', // sender address
            to: email, // list of receivers
            subject: "TMALL注册验证码", // Subject line
            html: `您正在注册TMALL网站，您的注册验证码为 <b>${ko.code}</b>`, // html body
        }
        const ko = {
            code: smtp.code(),
            expire: smtp.expire(),
            email: ctx.request.body.email
        }
        await transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return console.log('error')
            } else {
                Store.hmset(`nodemail:${ko.email}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
            }
        });
        return ServerResponse.SUCCESS(ctx, '验证码已发送,请注意查收,可能会有延时,有效期5分钟', {})
    }
    /**
     * 用户注册
     * @param {*} username 
     * @param {*} password
     * @param {*} email
     * @param {*} code
     */
    async register (ctx, next) {
        const { username, password, email, code } = ctx.request.body
        if (!username) {
            throw new Error('用户名参数错误')
        } else if (!password) {
            throw new Error('缺少password参数')
        }
        let hasUser = await userModel.findOne({ username }, null, { lean: true })
        if (hasUser) {
            return ServerResponse.ERROR(ctx, '该用户名已存在', {})
        }
        let hasEmail = await userModel.findOne({ email }, null, { lean: true })
        if (hasEmail) {
            return ServerResponse.ERROR(ctx, '该邮箱已被注册', {})
        }
        if (code) {
            const saveCode = await Store.hget(`nodemail:${email}`, 'code')
            const saveExpire = await Store.hget(`nodemail:${email}`, 'expire')
            if (code === saveCode) {
                if (new Date().getTime() - saveExpire > 0) {
                    return ServerResponse.ERROR(ctx, '验证码已过期', {})
                }
            } else {
                return ServerResponse.ERROR(ctx, '请输入正确的验证码', {})
            }
        } else {
            return ServerResponse.ERROR(ctx, '请输入验证码', {})
        }
        let user = new userModel({
            username,
            password,
            email
        })
        try {
            let result = await user.save()
            if (result) {
                return ServerResponse.SUCCESS(ctx, '注册成功', {})
            } else {
                return ServerResponse.ILLEGAL_ARGUMENT(ctx, '注册失败', {})
            }
        } catch (e) {
            console.log(e)
            return ServerResponse.ERROR(ctx, e, {})
        }
    }
    /**
     * 用户登录
     * @param {*} username
     * @param {*} password
     */
    async login (ctx) {
        let hasUser
        const { username, password } = ctx.request.body
        if (!username) {
            throw new Error('缺少username参数')
        } else if (!password) {
            throw new Error('缺少password参数')
        }

        hasUser = await userModel.findOne({ username })
        console.log(hasUser)
        if (!hasUser) {
            return ServerResponse.ILLEGAL_ARGUMENT(ctx, '该用户名不存在')
        }
        if (hasUser.password !== password) {
            return ServerResponse.ILLEGAL_ARGUMENT(ctx, '密码错误')
        } else {
            let token = createToken(username)
            hasUser.token = token
            try {
                let s_result = await hasUser.save()
                console.log(s_result)
                return ServerResponse.SUCCESS(ctx, '登录成功', { userinfo: hasUser })
            } catch (e) {
                console.log(e)
                return ServerResponse.ERROR(ctx, e, {})
            }
        }
    }
    async getUserList (ctx) {
        const {pageSize = 1, limit = 10} = ctx
        let result = []
        try {
            let user_list = await userModel.find()
                .skip((pageSize - 1) * limit)
                .limit(Number(limit))
            if (user_list) {
                user_list.map((val, index) => {
                    result.push({
                      email: val.email,
                      username: val.username,
                      role: val.role,
                      create_time: val.create_time,
                      update_time: val.update_time,
                    })
                  })
                return ServerResponse.SUCCESS(ctx, '查找成功', { list: result })
            } else {
                return ServerResponse.ERROR(ctx, '查找失败', {})
            }
        } catch (e) {
            return ServerResponse.ERROR(ctx, e.message, {})
        }
    }
}

export default new user()