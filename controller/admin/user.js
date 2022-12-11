const database = require("../../config/database_config");

module.exports = {
    user(req, res){
        database.getConnection((err, connection) => {
            connection.query('SELECT * FROM user', function (err, result, field) {
              if (err) throw err;
              res.render('user', {database : result});
              connection.release();
            })
        })
    }
}