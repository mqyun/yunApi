const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)

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
  response.err = err;
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
    await next(payload);
  } else {
    errRes(response, -100, '您还未登录', err);
    ctx.body = response;
  }
}

module.exports = {
  initRes,
  errRes,
  checkToken
}