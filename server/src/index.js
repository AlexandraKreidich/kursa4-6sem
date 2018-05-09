const Koa = require('koa')
const cors = require('koa-cors')
const bodyParser = require('koa-bodyparser')
const routerMiddleware = require('./router')

const app = new Koa()
app.use(bodyParser())

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    console.log(error)
  }
})

app.use(cors())
app.use(routerMiddleware.routes())
app.use(routerMiddleware.allowedMethods())

app.listen(3001, () => {
  console.log('Waiting for requests...')
})
