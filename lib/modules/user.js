const db = require('../pub');

module.exports = {
    // 检查账号是否存在
    checkUser: (account, password) => {
        let sql = "",
            params;
        if (password != undefined && password.length > 0) {
            sql = "select * from user where account = ? and password = ?;";
            params = [account, password];
        } else {
            sql = "select count(account) as count from user where account = ?;";
            params = account;
        }
        return db.exec(sql, params);
    },
    // 注册用户
    addUser: (...params) => {
        let sql = "insert into user(account, password, nickname) values(?, ?, ?);";
        return db.exec(sql, params);
    },
    // 用户列表
    getUserList: () => {
        let sql = "select * from user;";
        return db.exec(sql, '');
    }
}