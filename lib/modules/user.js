const db = require('../pub');

module.exports = {
    selectAdmin: (...params) => {
        let sql = "select * from admin where account = ?;";
        return db.exec(sql, params);
    },
}