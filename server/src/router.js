const Router = require('koa-router')
const handler = require('./handler')

const appRouter = new Router()

appRouter.get('/annotation', handler.findAnnotation)

module.exports = appRouter
