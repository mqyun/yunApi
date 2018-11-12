const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)

const checkUserById = require('../lib/pub').checkUserById

// 初始化接口返回
function initRes() {
  return {
    code: 0,
    message: 'success'
  }
}

// 修改接口返回
function errRes(response, code, message, err) {
  response.code = code;
  response.message = message;
  if (err) {
    response.err = err;
  }
}

// 验证token
async function checkToken(ctx, next) {
  const token = ctx.header.authorization;
  let payload;
  let response = initRes();
  if (token) {
    payload = await verify(token.split(' ')[1], 'my_token');
    console.log(payload);
    ctx.request.body.uid = payload.uid;
    await checkUserById(payload.uid).then(res => {
      if (res.length === 0) {
        errRes(response, -100, '用户token验证出现错误');
      }
    }).catch(err => {
      console.log(err);
    })
    if (response.code < 0) {
      ctx.body = response;
    } else {
      await next(payload);
    }
  } else {
    errRes(response, -100, '您还未登录');
    ctx.body = response;
  }
}

module.exports = {
  initRes,
  errRes,
  checkToken
}