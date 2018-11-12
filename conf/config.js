/*
  code
    0: 请求且操作成功
    -100: 操作错误（如：登录验证错误等）
    -200: 数据库操作错误
*/

// 数据库连接配置
let config = {
  connectionLimit: 50,
  host: '120.79.235.152',
  user: 'root',
  password: 'ms686996',
  database: 'mqyun',
  port: 3306,
  multipleStatements: true
}

module.exports = config;