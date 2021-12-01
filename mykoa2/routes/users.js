const router = require('koa-router')()

router.prefix('/users'); // 这里路由中间件，分组模块;

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
