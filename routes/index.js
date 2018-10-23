const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'yunApi接口本地调试工具'
  })
})

module.exports = router
