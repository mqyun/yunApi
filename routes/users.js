const router = require('koa-router')()

router.prefix('/user')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.all('/list', async (ctx, next) => {
  ctx.body = {
    'code': 0,
    data: {
      'pageNo': 1,
      'pageSize': 3,
      'totalCount': 1024,
      'list': [{
        'id': 0,
        'account': 'mqyun',
        'username': 'mqy'
      }, {
        'id': 1,
        'account': 'mqyun1',
        'username': 'mqy1'
      }, {
        'id': 2,
        'account': 'mqyun2',
        'username': 'mqy2'
      }],
      'message': '请求成功'
    }
  }
})

module.exports = router
