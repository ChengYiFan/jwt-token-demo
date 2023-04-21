const router = require('koa-router')()  // koa 路由中间件
const ResourceController = require('./controller/resource')
const UserController = require('./controller/user')
const tokenMiddleware = require('./middleware/tokenMiddleware')

module.exports = (app) => {
  router.get( '/', ResourceController.index )

  router.get('/ucenter', UserController.ucenter)

  // 定义登录页面
  router.get('/login', UserController.login)

  // 登录接口
  router.post('/api/user/login', UserController.apilogin)
  // 获取用户信息的接口
  router.post('/api/user/getuserinfo', UserController.getuserinfo)

  // 注册路由
  app.use(router.routes())
    .use(router.allowedMethods())
    .use(tokenMiddleware())
}