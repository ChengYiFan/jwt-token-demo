module.exports = {
  // 首页
  index: async(ctx, next) => {
    await ctx.render('index')
  },
}