const Router = require('koa-router')
const handler = require('./handler')

const appRouter = new Router()

appRouter.get('/annotations', handler.findAnnotations)

module.exports = appRouter
