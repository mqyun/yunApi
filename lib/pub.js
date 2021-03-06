const mysql = require('mysql')
const config = require('../conf/config')

let pool = mysql.createPool(config)

let exec = (sql, params) => {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
        return
      }
      connection.query(sql, params, function (error, res) {
        connection.release()
        if (error) {
          reject(error)
          return
        }
        resolve(res)
      })
    })
  })
}

let checkUserById = (uid) => {
  let sql = "select * from user where id = ?;";
  return exec(sql, uid);
}

module.exports = {
  exec,
  checkUserById
}