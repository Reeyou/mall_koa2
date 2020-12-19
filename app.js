const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const koaBody = require('koa-body');
const mongoose = require('mongoose')
const dbs = require('./config/db.config')

const session = require('koa-generic-session')
const Redis = require('koa-redis')

const index = require('./routes/index')
const users = require('./routes/users')
const product = require('./routes/product')
const user = require('./routes/user')
const upload = require('./routes/upload')
// error handler
onerror(app)

// session缓存
app.use(
    session({
        store: new Redis()
    })
)

// 使用koa-body代替koa-bodyparser和koa-multer解析文件上传
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
    },
    formLimit: "10mb",
    jsonLimit: "10mb"
}));
// middlewares
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

mongoose.connect(dbs.dbs, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
var db = mongoose.connection;
//输出连接日志
db.on('error', function callback () {
    console.log("Connection error");
});

db.once('open', function callback () {
    console.log("Mongo working!");
})
// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(product.routes(), product.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app