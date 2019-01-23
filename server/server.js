const koa = require('koa')

const app = new koa()

const isDev = process.env.NODE_ENV === 'development'

// koa中间件，打印每一个请求的路径，若报错则catch err提醒
app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.path}`)
    next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})

