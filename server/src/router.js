const Router = require('koa-router')
const handler = require('./handler')

const appRouter = new Router()

appRouter.get('/annotations', handler.findAnnotations)

appRouter.get('/definitions', handler.getDefinitions)

module.exports = appRouter
