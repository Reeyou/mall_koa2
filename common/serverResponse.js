// import Constants from './constants'

export default class ServerResponse {
    constructor(code, msg, data) {
        this.code = code
        this.msg = msg
        this.data = data
    }

    // 操作成功
 static SUCCESS(ctx, msg, data) {
        ctx.response.body = new ServerResponse(200, msg, data)
        return ctx.response.body
    }

    // 操作错误
    static ERROR(ctx, msg, data) {
        ctx.response.status = 500
        ctx.response.body = new ServerResponse(500, msg, data)
        return ctx.response.body
    }

    // 未登录
    static UN_LOGIN(ctx) {
        ctx.response.status = 401
        ctx.response.body = new ServerResponse(401, 'UN_LOGIN', {})
        return ctx.response.body
    }

    // 没有权限 forbidden
    static FORBIDDEN(ctx) {
        ctx.response.status = 403
        ctx.response.body = new ServerResponse(403, 'FORBIDDEN', {})
        return ctx.response.body
    }

    // 参数错误
    static ILLEGAL_ARGUMENT(ctx, msg) {
        ctx.response.status = 400
        ctx.response.body = new ServerResponse(400, msg, {})
        return ctx.response.body
    }
}
