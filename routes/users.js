const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)

// 接口返回response
const initRes = require('../common/common').initRes
const errRes = require('../common/common').errRes

// token验证
const checkToken = require('../common/common').checkToken

// lib
const userLib = require('../lib/modules/user')

router.prefix('/user')

// 用户注册
router.post('/reg', async (ctx, next) => {
  let {
    account,
    password,
    nickname
  } = ctx.request.body,
    response = initRes(),
    isExistence = false
  await userLib.checkUser(account).then(res => {
    if (res[0].count > 0) {
      isExistence = true
      response.code = -100
      response.message = '账号已存在'
    }
  }).catch(err => {
    errRes(response, -200, '检查用户账号是否存在时出现错误', err)
  })
  if (!isExistence) {
    await userLib.addUser(account, password, nickname).then((res) => {
      response.message = '注册成功'
    }).catch(err => {
      errRes(response, -200, '注册用户时出现错误', err)
    })
  }
  ctx.body = response
})

// 用户登录
router.post('/login', async (ctx, body) => {
  let {
    account,
    password
  } = ctx.request.body,
    response = initRes()
  await userLib.checkUser(account, password).then(res => {
    if (res.length > 0) {
      response.message = '登录成功'
      let userToken = {
        uid: res[0].id,
        account: res[0].account
      }
      const token = jwt.sign(userToken, 'my_token', {
        expiresIn: '2h'
      })
      response.token = token
    } else {
      response.code = -100
      response.message = '账号或密码错误'
    }
  }).catch(err => {
    errRes(response, -200, '检查用户账号信息时出现错误', err)
  })
  ctx.body = response
})

// 获取用户列表
router.get('/list', checkToken, async (ctx, next) => {
  let response = initRes()
  await userLib.getUserList().then(res => {
    response.data = res
  }).catch(err => {
    errRes(response, -200, '获取用户列表时出现错误', err)
  })
  ctx.body = response
})

// 获取自己的信息
router.get('/myinfo', checkToken, async (ctx, next) => {
  let {
    uid
  } = ctx.request.body,
    response = initRes()
  await userLib.getUserInfoById(uid).then(res => {
    delete res[0].password
    response.data = res
  }).catch(err => {
    errRes(response, -200, '获取用户信息时出现错误', err)
  })
  ctx.body = response
})

// 更新自己的信息
router.post('/updateMyInfo', checkToken, async (ctx, next) => {
  let {
    nickname,
    birthday,
    phone,
    sex,
    address,
    uid
  } = ctx.request.body,
    response = initRes()
  await userLib.updateUserInfoById(nickname, birthday, phone, sex, address, uid).then(res => {
    response.message = '修改信息成功'
  }).catch(err => {
    errRes(response, -200, '更新用户信息时出现错误', err)
  })
  ctx.body = response
})

module.exports = router
