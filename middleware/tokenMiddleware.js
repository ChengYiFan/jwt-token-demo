const { pathToRegexp } = require("path-to-regexp");
const jwt = require("../service/jwt");
/**
 * 对受保护资源访问进行授权码校验的中间件
 */

// 设置需要token验证的URI
let needToToken = [
  { method: "POST", path: "/api/user/getuserinfo" },
]

// 为了匹配是否URI路径对应，使用path-to-regexp模块
module.exports = () => {
  return async (ctx, next) => {
    // 过滤出当前URI模块是否需要token认证
    const apis = needToToken.filter((api) => {
      const req = ctx.request;
      let reg = pathToRegexp(api.path);
      return api.method === req.method && reg.exec(req.url)
    })
  
    // 如果没有，不要认证，直接放行
    if (apis.length == 0) {
      await next()
      return
    }

    try {
      // 鉴权逻辑
      //验证jwt是否正确  
      const result = jwt.verify(ctx)
      if (result) {
        //认证通过
        ctx.loginId = result.id
        await next()
      } else {
        console.error('权限认证未通过')
        ctx.redirect('/login', '302')
        await next()
      }
    } catch (err) {
      console.error(err)
    }
  };
}
