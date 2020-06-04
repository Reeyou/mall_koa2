// import Constants from './constants'

export default class ServerResponse {
    constructor(code, msg, data) {
        this.code = code
        this.msg = msg
        this.data = data
    }

    // 操作成功
 static SUCCESS(ctx, msg, data) {
        ctx.response.body = new ServerResponse(0, msg, data)
        return ctx.response.body
    }

    // 操作错误
    static ERROR(ctx, msg, data) {
        ctx.response.body = new ServerResponse(1, msg, data)
        return ctx.response.body
    }

    // 未登录
    static UN_LOGIN(ctx) {
        ctx.response.body = new ServerResponse(10, 'UN_LOGIN', {})
        return ctx.response.body
    }

    // 参数错误
    static ILLEGAL_ARGUMENT(ctx, msg) {
        ctx.response.status = 400
        ctx.response.body = new ServerResponse(400, msg, {})
        return ctx.response.body
    }
}
