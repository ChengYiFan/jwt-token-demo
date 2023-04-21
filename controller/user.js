const UserService = require('../service/user')
const jwt = require('../service/jwt')
module.exports = {
  // api 登录认证
  apilogin: async(ctx, next) => {
    const {
      name,
      password
    } = ctx.request.body
    const result = await UserService.apilogin(name, password)
    if (result && result.status === 0) {
      const token = jwt.publish({ id: result.data.id })
      ctx.set('authorization', 'Bearer ' + token)
    }
    ctx.body = JSON.stringify(result)
    await next()
  },
  // api 获取用户信息
  getuserinfo: async(ctx, next) => {
    const result = await UserService.getuserinfo()
    ctx.body = JSON.stringify(result)
    await next()
  },
  // 登录页
  login: async(ctx) => {
    await ctx.render('user/login', {
      btnName: '登录',
    })
  },
  // 用户中心
  ucenter: async(ctx, next) => {
    await ctx.render('user/ucenter')
    await next()
  },
}